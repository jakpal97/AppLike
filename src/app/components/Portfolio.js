'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Dane projektów
const projects = [
    {
        id: 1,
        title: 'Yelonmedia',
        category: 'Website',
        year: '2024',
        tags: ['Next.js', 'WebGL', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1481487484168-9b9301523d49?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Dawid Duda',
        category: 'Web App',
        year: '2023',
        tags: ['React', 'Stripe', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'FinTech Dash',
        category: 'SaaS',
        year: '2024',
        tags: ['Vue', 'D3.js', 'Python'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Social AI',
        category: 'Mobile',
        year: '2025',
        tags: ['React Native', 'OpenAI'],
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 5,
        title: 'Neon City',
        category: 'Concept',
        year: '2025',
        tags: ['UE5', 'Blender'],
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1740&auto=format&fit=crop',
    },
]

export default function Portfolio() {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const progressRef = useRef(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        const ctx = gsap.context(() => {
            const track = trackRef.current
            const container = containerRef.current

            // 1. Obliczanie szerokości przesunięcia
            // (Całkowita szerokość paska - szerokość ekranu)
            const getScrollAmount = () => {
                let trackWidth = track.scrollWidth
                return -(trackWidth - window.innerWidth)
            }

            // 2. Główna animacja scrolla poziomego
            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: 'none', // Musi być linearne dla płynnego scrolla
                scrollTrigger: {
                    trigger: container,
                    start: 'top top', // Zaczynamy gdy sekcja dotknie góry
                    end: () => `+=${track.scrollWidth - window.innerWidth}`, // Długość scrolla = długość paska
                    pin: true, // BLOKUJE SCROLL W DÓŁ
                    scrub: 1, // Płynność (zamiast true dajemy 1 sekundę opóźnienia)
                    invalidateOnRefresh: true, // Przelicza przy zmianie rozmiaru okna
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Aktualizacja paska postępu
                        if (progressRef.current) {
                            gsap.set(progressRef.current, { scaleX: self.progress })
                        }
                    }
                }
            })

            // 3. Efekt Parallax dla zdjęć (opcjonalny, dodaje smaczku)
            const images = gsap.utils.toArray('.project-img')
            images.forEach(img => {
                gsap.to(img, {
                    xPercent: 15, // Lekkie przesunięcie zdjęcia wewnątrz kontenera
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top top',
                        end: () => `+=${track.scrollWidth - window.innerWidth}`,
                        scrub: true,
                        containerAnimation: tween // Podpinamy pod główny ruch paska!
                    }
                })
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-screen bg-white overflow-hidden text-white border-t border-white/10">
            
            {/* TYTUŁ STICKY (Zostaje w miejscu) */}
            <div className="absolute top-12 left-8 md:left-20 z-20 pointer-events-none mix-blend-difference">
                <h2 className="text-5xl md:text-7xl font-black  tracking-tighter leading-none">
                    Wybrane <br />
                    <span className="font-serif italic font-light text-gray-400">Projekty</span>
                </h2>
            </div>

            {/* TRACK (To się przesuwa w lewo) */}
            {/* w-max jest kluczowe! */}
            <div ref={trackRef} className="flex h-full items-center pl-8 md:pl-20 pt-32 w-max">
                <div className="flex gap-12 md:gap-24 pr-24">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="group relative flex flex-col justify-center h-[55vh] md:h-[65vh] w-[80vw] md:w-[600px] flex-shrink-0"
                        >
                            {/* Karta */}
                            <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                
                                {/* Zdjęcie */}
                                <div className="absolute top-0 left-[-10%] w-[120%] h-full">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="project-img w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                {/* Tekst na dole karty */}
                                <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/90 to-transparent">
                                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold border border-white/20 rounded-full text-white/80 uppercase tracking-wider backdrop-blur-md">
                                        {project.category}
                                    </span>
                                    <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                                    <div className="flex gap-3">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs text-gray-400 font-mono">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Duży numer w tle */}
                            <span className="absolute -top-16 -left-4 text-[8rem] md:text-[12rem] font-black text-white/5 z-0 pointer-events-none select-none font-sans leading-none">
                                0{index + 1}
                            </span>
                        </div>
                    ))}

                    {/* Ostatni element "Zobacz więcej" */}
                    <div className="flex flex-col justify-center h-[60vh] w-[300px] flex-shrink-0 items-center justify-center">
                        <button className="group flex flex-col items-center gap-6 text-white hover:text-gray-300 transition-colors">
                            <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </div>
                            <span className="text-xl font-light tracking-widest uppercase">Zobacz wszystkie</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pasek postępu na dole */}
            <div className="absolute bottom-10 left-8 md:left-20 w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden z-30">
                <div ref={progressRef} className="h-full bg-white w-full origin-left scale-x-0" />
            </div>
        </section>
    )
}