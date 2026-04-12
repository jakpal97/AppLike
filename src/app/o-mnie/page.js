"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Lata doświadczenia" },
  { value: "20+", label: "Zadowolonych klientów" },
  { value: "80%", label: "Klientów z polecenia" },
];

export default function AboutPage() {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wejście tytułu - skorygowany rozmiar i animacja
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.15,
      });

      // Wejście zdjęcia
      gsap.from(photoRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3,
      });

      // Reveal dla sekcji "Współpraca" i innych
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-white min-h-screen w-full text-black selection:bg-black selection:text-white overflow-x-hidden"
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="pt-36 md:pt-48 px-6 md:px-20 pb-0">
        <div className="border-b border-gray-200 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1
            ref={titleRef}
            className="text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.82] tracking-tighter uppercase text-black italic"
          >
            Jakub<br />&mdash;
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 md:mb-3 shrink-0">
            Full-stack Developer<br />& Digital Partner
          </p>
        </div>
      </header>

      {/* ── HERO — foto (kolorowe i wyśrodkowane) + intro ────── */}
      <section className="px-6 md:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Ramka ze zdjęciem (Sticky) */}
        <div
          ref={photoRef}
          className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gray-100 lg:sticky lg:top-28 flex items-center justify-center"
        >
          <Image
            src="/portret.webp"
            alt="Jakub"
            fill
            className="object-contain p-4 md:p-8" // object-contain i padding wyśrodkują postać w szarej ramce
            priority
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-widest">Dostępny dla projektów</span>
          </div>
        </div>

        {/* Intro tekst (scrollowany) */}
        <div ref={introRef} className="flex flex-col justify-start gap-10 pt-2">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-400">
            <span>Tarnowskie Góry, Śląsk</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Polska</span>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="text-[clamp(2rem,4vw,4rem)] font-black leading-[1.1] tracking-tighter uppercase italic">
               Wierzę, że design <br />musi zarabiać.
            </h2>
            <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.5] text-black">
              Jestem digitalowym partnerem dla firm, które chcą być widoczne w sieci — i które chcą, żeby to realnie działało na ich biznes.
            </p>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium">
              Buduję strony, aplikacje i prowadzę kampanie reklamowe. Wszystko w jednym miejscu — bez przepychania odpowiedzialności między agencjami i bez głuchej linii po oddaniu projektu.
            </p>
          </div>

          {/* Statsy */}
          <div className="grid grid-cols-3 border-t border-gray-100 pt-8 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-none">
                  {s.value}
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/kontakt"
              className="group relative px-8 py-4 rounded-full bg-black text-white font-bold text-base overflow-hidden inline-flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              <span className="relative z-10 flex items-center gap-3">
                Skontaktuj się
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full border border-gray-200 text-black font-bold text-base hover:border-black transition-colors duration-300"
            >
              Zobacz portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── CO ZYSKUJESZ (BENTO STYLE) ────────────────────────── */}
      <section className="px-6 md:px-20 py-20 md:py-32 border-t border-gray-100 bg-gray-50/50">
        <div className="reveal-up mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">Współpraca</span>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] uppercase italic">
            Dlaczego ja,<br />nie agencja?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Jeden punkt kontaktu", desc: "Nie przerzucam Cię między działami. Znam Twój projekt od A do Z — zawsze wiesz z kim rozmawiasz." },
            { title: "Bez znikania po wdrożeniu", desc: "Po oddaniu projektu jestem dostępny, odpowiadam w ciągu 24h i pomagam rozwijać to, co zbudowaliśmy." },
            { title: "Wyniki, nie tylko wygląd", desc: "Buduję strony zoptymalizowane pod konwersję i SEO. Design ma służyć Twoim celom biznesowym." },
            { title: "Pełna odpowiedzialność", desc: "Projektuję, koduję i wdrażam. Biorę pełną odpowiedzialność za końcowy efekt i spójność wizji." },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal-up flex flex-col gap-4 p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase italic">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA DARK ────────────────────────────────────────── */}
      <section className="relative mx-4 md:mx-8 mb-8 rounded-[2.5rem] md:rounded-[4rem] bg-[#050505] py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden text-center">
        <div className="reveal-up flex flex-col items-center gap-10 px-6">
          <h2 className="text-white text-[clamp(3.5rem,11vw,11rem)] font-black leading-[0.85] tracking-tighter uppercase italic">
            Zacznijmy<br />współpracę
          </h2>
          <Link
            href="/kontakt"
            className="group relative px-10 py-5 md:px-14 md:py-6 rounded-full bg-white text-black font-bold text-lg md:text-2xl overflow-hidden inline-flex items-center gap-4 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
            <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-300">
              Napisz do mnie
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="absolute bottom-8 w-full px-8 md:px-20 flex justify-between text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          <span>© 2026 APPLIKE</span>
          <div className="flex gap-6 uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Works</Link>
          </div>
        </div>
      </section>
    </div>
  );
}