'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
	{
		id: 1,
		title: 'Yelonmedia',
		category: 'Strona WWW',
		tags: ['Next.js', 'WebGL'],
		image: '/yelonMediaFilm.mp4',
	},
	{
		id: 2,
		title: 'Dawid Duda',
		category: 'Strona WWW',
		tags: ['React', 'Node.js'],
		image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop',
	},
	{
		id: 3,
		title: 'FinTech Dash',
		category: 'SaaS',
		tags: ['Vue', 'D3.js'],
		image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
	},
]

export default function Portfolio() {
	const containerRef = useRef(null)
	const trackRef = useRef(null)

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			const track = trackRef.current
			const container = containerRef.current

			const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

			gsap.to(track, {
				x: getScrollAmount,
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: () => `+=${track.scrollWidth}`,
					pin: true,
					scrub: 1,
					invalidateOnRefresh: true,
				},
			})
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden py-20">
			{/* NAGŁÓWKI - TERAZ SĄ NAD KAFELKAMI (RELATIVE) */}
			<div className="container mx-auto px-8 md:px-20 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
				<div className="max-w-2xl">
					<h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-black uppercase">
						Nasze ostatnie
						<br />
						<span className="text-gray-300">Projekty</span>
					</h2>
				</div>
				<div className="max-w-xs text-right">
					<p className="text-gray-500 text-sm leading-relaxed">
						Poniżej znajdują się nasze ostatnie realizacje. Zeskroluj w bok, aby zobaczyć pełną galerię naszych prac.
					</p>
				</div>
			</div>

			{/* TRACK Z KAFELKAMI */}
			<div ref={trackRef} className="flex pl-8 md:pl-20 w-max items-start">
				<div className="flex gap-8 md:gap-16 pr-32">
					{projects.map((project, index) => (
						<div key={project.id} className="group w-[80vw] md:w-[550px] flex-shrink-0">
							{/* Nagłówek nad pojedynczym kafelkiem */}
							<div className="flex justify-between items-end mb-4 px-2">
								<div>
									<span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
										{project.category}
									</span>
									<h3 className="text-2xl font-bold text-black">{project.title}</h3>
								</div>
								<span className="text-4xl font-black text-gray-100">0{index + 1}</span>
							</div>

							<div className="relative aspect-[4/3] md:aspect-video overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl">
								{project.image.endsWith('.mp4') ? (
									<video
										src={project.image.replace('../../../public', '')} // Poprawna ścieżka dla Next.js
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
									/>
								) : (
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
									/>
								)}
							</div>

							{/* Tagi pod kafelkiem */}
							<div className="mt-4 flex gap-3 px-2">
								{project.tags.map(tag => (
									<span key={tag} className="text-[11px] font-mono text-gray-400">
										#{tag}
									</span>
								))}
							</div>
						</div>
					))}

					{/* Przycisk na końcu */}
					<div className="flex items-center justify-center w-[300px]">
						<button className="w-32 h-32 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 uppercase text-xs font-bold tracking-widest">
							Wszystkie
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
