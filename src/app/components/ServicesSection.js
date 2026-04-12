'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- KOMPONENTY MOCKUPÓW (BEZ ZMIAN WIZUALNYCH, TYLKO STYLIZACJA) ---

function PhoneMockup({ videoSrc, posterSrc }) {
	return (
		<div className="relative w-[260px] sm:w-[300px] mx-auto">
			<div className="relative bg-[#000] rounded-[3.5rem] p-[10px] shadow-2xl border border-zinc-800">
				<div className="relative bg-black rounded-[3rem] p-[3px] overflow-hidden">
					<div className="relative w-full h-[500px] sm:h-[600px] bg-zinc-900 rounded-[2.75rem] overflow-hidden">
						{/* Tutaj Twój Video/Image */}
						<div className="w-full h-full bg-zinc-800 animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	)
}

// --- DANE (USUNIĘTE AKCENTY KOLORYSTYCZNE) ---
const services = [
	{
		id: '01',
		title: 'Strony WWW',
		desc: 'Strona, która nie tylko wygląda dobrze, ale realnie pracuje na Twój biznes. Przyciąga właściwych klientów i przekonuje ich do działania.',
	},
	{
		id: '02',
		title: 'Aplikacje Web',
		desc: 'Masz pomysł na narzędzie, panel lub produkt cyfrowy? Zamieniam go w gotowe, działające rozwiązanie — od pierwszego szkicu po wdrożenie.',
	},
	{
		id: '03',
		title: 'Aplikacje Mobile',
		desc: 'Twój biznes w kieszeni klientów. Buduję aplikacje na iOS i Android, które działają płynnie i wyglądają tak, jak powinny.',
	},
	{
		id: '04',
		title: 'Ads & SEO',
		desc: 'Widoczność, która przynosi klientów — płatna i organiczna. Kampanie Google Ads na szybkie efekty, SEO na długoterminowy wzrost. Razem tworzą maszynę do generowania leadów.',
	},
]

export default function ServicesSection() {
	const [activeIndex, setActiveIndex] = useState(0)
	const activeIndexRef = useRef(0)
	const containerRef = useRef(null)
	const triggerRef = useRef(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			const totalSlides = services.length

			ScrollTrigger.create({
				trigger: triggerRef.current,
				start: 'top top',
				end: `+=${totalSlides * 100}%`,
				pin: true,
				scrub: true,
				onUpdate: self => {
					const newIndex = Math.min(Math.floor(self.progress * totalSlides), totalSlides - 1)
					if (newIndex !== activeIndexRef.current) {
						activeIndexRef.current = newIndex
						setActiveIndex(newIndex)
					}
				},
			})
		}, triggerRef)

		return () => ctx.revert()
	}, [])

	return (
		<div ref={triggerRef} className="bg-white min-h-screen" style={{ position: 'relative', zIndex: 50 }}>
			<div className="relative w-full h-screen flex items-center justify-center px-4 lg:px-20 overflow-hidden">
				<div className="grid lg:grid-cols-12 gap-12 w-full max-w-[1500px] items-center">
					{/* TEKST (LEWA) */}
					<div className="w-full lg:col-span-5 z-20 order-2 lg:order-1 text-center lg:text-left">
						<div className="mb-4 overflow-hidden">
							<span className="text-[12vw] lg:text-[8vw] font-black leading-none text-black opacity-5 block tracking-tighter">
								{services[activeIndex].id}
							</span>
						</div>

						<div className="min-h-[300px] flex flex-col justify-center">
							<h3
								key={`title-${activeIndex}`}
								className="animate-in-text text-[10vw] lg:text-[5vw] font-black text-black leading-[0.9] tracking-tighter uppercase mb-6">
								{services[activeIndex].title}
							</h3>

							<p
								key={`desc-${activeIndex}`}
								className="animate-in-text text-base lg:text-xl text-black/60 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium mb-10">
								{services[activeIndex].desc}
							</p>

							<button className="flex items-center gap-4 mx-auto lg:mx-0 px-10 py-4 bg-black text-white rounded-full hover:scale-105 transition-transform w-fit">
								<span className="font-bold uppercase tracking-widest text-xs">Explore Project</span>
								<span className="text-xl">→</span>
							</button>
						</div>
					</div>

					{/* WIZUALIZACJA (PRAWA) */}
					<div className="w-full lg:col-span-7 relative h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
						{services.map((_, i) => (
							<div
								key={i}
								className={`absolute transition-all duration-700 ease-out transform ${
									i === activeIndex
										? 'opacity-100 translate-y-0 scale-100 rotate-0'
										: 'opacity-0 translate-y-20 scale-90 rotate-2 pointer-events-none'
								}`}>
								<PhoneMockup videoSrc={null} posterSrc={null} />
							</div>
						))}
					</div>
				</div>

				{/* NAWIGACJA BOCZNA (PASKI) */}
				<div className="absolute right-10 hidden lg:flex flex-col gap-4">
					{services.map((_, i) => (
						<div key={i} className="relative w-1 h-12 bg-zinc-100 overflow-hidden rounded-full">
							<div
								className="absolute top-0 left-0 w-full bg-black transition-all duration-300"
								style={{
									height: i === activeIndex ? '100%' : '0%',
									opacity: i === activeIndex ? 1 : 0,
								}}
							/>
						</div>
					))}
				</div>
			</div>

			<style jsx global>{`
				.animate-in-text {
					animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	)
}
