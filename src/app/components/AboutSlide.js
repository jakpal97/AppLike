'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
gsap.registerPlugin(ScrollTrigger)
export default function AboutSlide() {
const sectionRef = useRef(null)
useEffect(() => {
const ctx = gsap.context(() => {
// Imię z lewej
gsap.fromTo(
'.from-left',
                { x: -60, opacity: 0 },
                {
x: 0,
opacity: 1,
duration: 1,
ease: 'power3.out',
stagger: 0.12,
scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                },
            )
// Info z prawej
gsap.fromTo(
'.from-right',
                { x: 60, opacity: 0 },
                {
x: 0,
opacity: 1,
duration: 1,
ease: 'power3.out',
stagger: 0.15,
scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                },
            )
// Napis dolny z dołu
gsap.fromTo(
'.from-bottom',
                { y: 60, opacity: 0 },
                {
y: 0,
opacity: 1,
duration: 1.2,
ease: 'power3.out',
scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
                },
            )
// Zdjęcie scale in
gsap.fromTo(
'.photo-bg',
                { scale: 1.08 },
                {
scale: 1,
duration: 1.6,
ease: 'power3.out',
scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                },
            )
        }, sectionRef)
return () => ctx.revert()
    }, [])
return (
<section ref={sectionRef} id="o-mnie" className="relative h-screen w-full overflow-hidden bg-white">
{/* Zdjęcie jako pełne tło */}
<div className="photo-bg absolute inset-0">
  <Image 
    src="/portret.webp" 
    alt="Jakub" 
    fill 
    className="object-cover object-center" // Zmiana z object-top na object-center
    priority 
  />
</div>
{/* GÓRA — imię przesunięte niżej i w prawo, info po prawej */}
<div className="absolute top-0 left-0 right-0 flex justify-between items-start p-10 md:p-20">
{/* LEWA — imię (dodany margin-top i margin-left dla przesunięcia) */}
<div className="mt-20 ml-6 md:ml-20">
<p className="from-left font-sans text-black/50 text-lg md:text-xl font-normal mb-1">Cześć, jestem</p>
<h1
className="from-left font-sans font-bold leading-[0.85] tracking-tighter text-black"
style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}>
                        Jakub
</h1>
</div>
{/* PRAWA — bez zmian, ale p-20 w kontenerze wyżej da jej więcej miejsca */}
<div className="flex flex-col gap-6 text-right">
<div className="from-right">
<div className="w-[2px] h-8 bg-black/30 ml-auto mb-2" />
<p className="font-sans font-semibold text-black text-lg md:text-xl leading-tight text-nowrap">
                            Tarnowskie Góry
<br />
                            Śląsk, Polska
</p>
</div>
<div className="from-right">
<div className="w-[2px] h-8 bg-black/30 ml-auto mb-2" />
<p className="font-sans font-semibold text-black text-lg md:text-xl leading-tight text-nowrap">
                            Full-stack Developer
<br />& Digital Partner
</p>
</div>
</div>
</div>
{/* DÓŁ — napis, który zawsze się zmieści */}
<div className="from-bottom absolute bottom-4 left-0 w-full px-6 md:px-12 pointer-events-none overflow-hidden">
<p
className="font-sans font-black leading-none tracking-tighter text-black"
style={{
fontSize: '7.8vw', // Zredukowane, by zmieścić szerokie litery i kropki
textAlign: 'justify',
display: 'flex',
justifyContent: 'space-between',
whiteSpace: 'nowrap',
                    }}>
<span>Strony</span>
<span>Aplikacje</span>
<span>Reklamy</span>
</p>
</div>
</section>
    )
}