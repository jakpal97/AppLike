"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services } from "../data/servicesData";
import MarqueeGallery from "../components/MarqueeGallery";

gsap.registerPlugin(ScrollTrigger);

// --- KOMPONENT POMOCNICZY DLA PODGLĄDU (HOVER) ---
const HoverContent = ({ service }) => {
  if (service.slug === "strony-www" && service.images) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-gray-900">
        <div className="flex flex-col animate-[skew-scroll_15s_linear_infinite]"> 
          {[...service.images, ...service.images].map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt="" 
              className="w-full h-48 object-cover border-b border-white/5" 
            />
          ))}
        </div>
      </div>
    );
  } 
  
  if (service.slug === "aplikacje-mobilne" && service.images) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-1 p-1 bg-black">
        {service.images.slice(0, 4).map((img, index) => (
          <img key={index} src={img} alt="" className="w-full h-full object-cover rounded-sm" />
        ))}
      </div>
    );
  } 

  if (service.video) {
    return (
      <video 
        src={service.video} 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover grayscale brightness-75"
      />
    );
  }
  
  return <div className="w-full h-full" style={{ backgroundColor: service.accent }} />;
};

// --- GŁÓWNA STRONA ---
export default function ServicesPage() {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const cursorVisualRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro nagłówka
      gsap.from(titleRef.current, {
        y: 140,
        rotateX: -20,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      // Animacja wierszy usług
      gsap.from(".service-row", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });

      // ScrollTrigger dla sekcji "Reveal Up"
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      });

      // Logika poruszania podglądem za myszką
      const moveVisual = (e) => {
        if (!cursorVisualRef.current) return;
        gsap.to(cursorVisualRef.current, {
          x: e.clientX - 150, // Połowa szerokości (300px / 2)
          y: e.clientY - 200, // Połowa wysokości (400px / 2)
          duration: 0.8,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", moveVisual);
      return () => window.removeEventListener("mousemove", moveVisual);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden relative">

      {/* ── INTERAKTYWNY PODGLĄD (CURSOR) ────────────────── */}
      <div 
        ref={cursorVisualRef}
        className={`fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-[100] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out ${hoveredService ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        {hoveredService && <HoverContent service={hoveredService} />}
      </div>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="pt-40 md:pt-56 px-6 md:px-20 pb-20 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[clamp(4rem,16vw,16rem)] font-black leading-[0.75] tracking-tighter uppercase italic"
            >
              Usługi
            </h1>
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">
            Digital Solution<br />Architect — 2026
          </p>
        </div>
      </header>

      {/* ── LISTA USŁUG ─────────────────────────────────── */}
      <section className="px-6 md:px-20 relative z-10 bg-white">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/uslugi/${service.slug}`}
            className="service-row group block border-b border-gray-100 py-12 md:py-20 relative overflow-hidden transition-colors duration-500 hover:text-white"
            onMouseEnter={() => setHoveredService(service)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="relative z-10 flex items-center justify-between gap-6 mix-blend-difference">
              <div className="flex items-baseline gap-8 md:gap-16">
                <span className="text-sm font-mono text-gray-400">{service.num}</span>
                <h2 className="text-[clamp(2.2rem,8vw,8.5rem)] font-black tracking-tighter leading-none uppercase">
                  {service.title}
                </h2>
              </div>
              
              <div className="hidden lg:flex items-center gap-12 text-right">
                <p className="max-w-[240px] text-xs uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0 text-gray-400">
                  {service.shortDesc}
                </p>
                <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -rotate-45 text-current transition-transform duration-500 group-hover:rotate-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tło hovera wjeżdżające od dołu */}
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
          </Link>
        ))}
      </section>

      {/* ── MARQUEE GALLERY ─────────────────────────────── */}
      <div className="border-t border-gray-100 mt-4">
        <MarqueeGallery label="Wybrane realizacje" />
      </div>

      {/* ── SEKCJA DLACZEGO JA ──────────────────────────── */}
      <section className="px-6 md:px-20 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-20 bg-white relative z-10 border-t border-gray-100">
        <div className="reveal-up">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 block mb-6">Expertise</span>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase">
            Jeden człowiek.<br />Pełna kontrola.<br />Twój sukces.
          </h2>
        </div>
        <div className="reveal-up flex flex-col justify-center gap-8">
          <p className="text-xl md:text-2xl font-medium leading-tight text-gray-800">
            Pomijam zbędnych pośredników. Pracujesz bezpośrednio z projektantem i deweloperem w jednej osobie, co gwarantuje 100% spójności wizji.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100 mt-4">
            {[
              { val: "3+", label: "Lata" },
              { val: "20+", label: "Realizacji" },
              { val: "24h", label: "Feedback" },
            ].map((s) => (
              <div key={s.label}>
                <span className="text-4xl md:text-6xl font-black tracking-tighter block">{s.val}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCES ─────────────────────────────────────── */}
      <section className="px-6 md:px-20 py-24 bg-gray-50 relative z-10 border-y border-gray-100">
        <div className="reveal-up mb-20 text-center md:text-left">
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter uppercase leading-none">Proces</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "01", t: "Strategia", d: "Briefing i analiza celów biznesowych." },
            { n: "02", t: "Design", d: "Unikalna oprawa wizualna i UX." },
            { n: "03", t: "Dev", d: "Kodowanie w najnowszych technologiach." },
            { n: "04", t: "Ready", d: "Wdrożenie i optymalizacja wyników." },
          ].map((step) => (
            <div key={step.n} className="reveal-up p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-shadow duration-500">
              <span className="text-6xl font-black text-gray-100 block mb-6">{step.n}</span>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{step.t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="m-4 md:m-8 bg-black rounded-[3rem] md:rounded-[5rem] py-40 md:py-56 flex flex-col items-center text-center relative z-10 overflow-hidden">
        <div className="reveal-up px-6 relative z-10">
          <h2 className="text-white text-[clamp(3.5rem,12vw,12rem)] font-black leading-[0.8] tracking-[ -0.05em] uppercase mb-16">
            Stwórzmy<br />coś ikonicznego
          </h2>
          <Link
            href="/kontakt"
            className="group relative px-12 py-6 rounded-full bg-white text-black font-extrabold text-xl md:text-2xl overflow-hidden inline-block transition-transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">Zacznijmy teraz</span>
          </Link>
        </div>
        {/* Dekoracyjne koło w tle CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full pointer-events-none" />
      </section>

      {/* ── FOOTER SUBTLE ─────────────────────────────── */}
      <footer className="px-10 py-10 flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 bg-white relative z-10">
        <span>© 2026 APPLIKE</span>
        <div className="flex gap-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/portfolio" className="hover:text-black transition-colors">Works</Link>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes skew-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}