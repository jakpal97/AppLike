"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animacja zdjęcia (parallax lub reveal)
      gsap.fromTo(
        photoRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      // Animacja napisów bocznym
      gsap.from(".animate-text", {
        x: (i) => (i === 0 ? -50 : 50),
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center overflow-hidden font-sans"
    >
      {/* GŁÓWNY KONTENER */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 grid grid-cols-12 items-center">
        
        {/* LEWA KOLUMNA: Imię i Nazwisko */}
        <div className="col-span-4 animate-text">
          <p className="text-black text-xl md:text-2xl font-medium mb-2">
            Hey there, I'm
          </p>
          <h1 className="text-black text-[clamp(60px,8vw,120px)] font-bold leading-[0.8] tracking-tighter">
            Martin<br />Robart
          </h1>
        </div>

        {/* ŚRODEK: Zdjęcie */}
        <div className="col-span-4 flex justify-center">
          <div 
            ref={photoRef}
            className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] overflow-hidden rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          >
            <Image
              src="/jakub.jpg" // Upewnij się, że ścieżka jest poprawna
              alt="Martin Robart"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* PRAWA KOLUMNA: Detale */}
        <div className="col-span-4 flex flex-col gap-12 animate-text">
          <div className="border-l-2 border-black pl-6">
            <h3 className="text-black/40 uppercase text-xs tracking-widest mb-1">Location</h3>
            <p className="text-black text-xl md:text-2xl font-semibold">
              Based in NYC<br />United States
            </p>
          </div>

          <div className="border-l-2 border-black pl-6">
            <h3 className="text-black/40 uppercase text-xs tracking-widest mb-1">Role</h3>
            <p className="text-black text-xl md:text-2xl font-semibold">
              Art director and<br />No-code Developer
            </p>
          </div>
        </div>
      </div>

      {/* WIELKI NAPIS W TLE (Digital Designer) */}
      <div className="absolute bottom-[-20px] left-0 w-full z-0 pointer-events-none">
        <h2 className="text-black text-[clamp(100px,25vw,450px)] font-black leading-none tracking-tighter opacity-[0.03] select-none whitespace-nowrap">
          Digital Designer
        </h2>
      </div>

      {/* IKONA KOSZYKA / FLOATING ELEMENT (opcjonalnie) */}
      <div className="absolute bottom-10 right-10 z-20">
        <div className="bg-black text-white p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
      </div>
    </section>
  );
}