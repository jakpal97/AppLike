"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services, getServiceBySlug } from "../../data/servicesData";

gsap.registerPlugin(ScrollTrigger);

const service       = getServiceBySlug("aplikacje-mobile");
const otherServices = services.filter((s) => s.slug !== "aplikacje-mobile");

function SplitTitle({ text, className }) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1]">
          <span className="hero-word inline-block will-change-transform">
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function AplikacjeMobilePage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero title
      gsap.fromTo(".hero-word",
        { yPercent: 115, skewY: 8 },
        { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.08, ease: "power4.out", delay: 0.1 }
      );

      // 2. Hero meta
      gsap.fromTo(".hero-meta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.55 }
      );

      // 3. Feature cards — clip-path wipe
      const cards = gsap.utils.toArray(".feature-card");
      const grid  = pageRef.current?.querySelector(".features-grid");
      if (cards.length && grid) {
        const clipFrom = (col) => {
          if (col === 0) return "inset(0% 100% 0% 0% round 48px)";
          if (col === 1) return "inset(100% 0% 0% 0% round 48px)";
          return            "inset(0% 0% 0% 100% round 48px)";
        };
        const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 78%", once: true } });
        cards.forEach((card, i) => {
          tl.fromTo(card,
            { clipPath: clipFrom(i % 3) },
            { clipPath: "inset(0% 0% 0% 0% round 48px)", duration: 0.8, ease: "power2.inOut" },
            i * 0.07
          );
        });
      }

      // 4. Process rows
      gsap.utils.toArray(".process-row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        const line  = row.querySelector(".process-line");
        const num   = row.querySelector(".process-num");
        const title = row.querySelector(".process-title");
        const desc  = row.querySelector(".process-desc");
        if (line)  tl.fromTo(line,  { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.5, ease: "power3.inOut" });
        if (num)   tl.fromTo(num,   { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, "-=0.1");
        if (title) tl.fromTo(title, { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
        if (desc)  tl.fromTo(desc,  { opacity: 0, y: 14  }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");
      });

      // 5. Section headings
      gsap.utils.toArray(".section-word").forEach((word) => {
        gsap.fromTo(word,
          { yPercent: 110, skewY: 5 },
          { yPercent: 0, skewY: 0, duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: word, start: "top 92%", once: true } }
        );
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">

      {/* ── HERO — layout z telefonem ── */}
      <header className="relative min-h-screen flex flex-col justify-end px-6 md:px-20 pb-16 md:pb-24 pt-36 overflow-hidden">

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: "linear-gradient(to bottom, white 0%, rgba(255,255,255,0.6) 50%, white 100%), linear-gradient(to right, white 0%, transparent 30%, transparent 70%, white 100%)",
        }} />

        <div className="relative z-10 max-w-[1400px] w-full mx-auto">

          {/* Breadcrumb */}
          <div className="hero-meta flex items-center gap-3 mb-10 md:mb-16">
            <Link href="/uslugi" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors duration-200">
              Usługi
            </Link>
            <div className="w-8 h-px bg-gray-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: service.accent }}>
              {service.num}
            </span>
          </div>

          {/* 2-kolumnowy layout: tytuł + telefon */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 mb-16 md:mb-24">

            {/* Lewa: tytuł + meta */}
            <div className="flex-1 min-w-0">
              <SplitTitle
                text={service.title}
                className="text-[clamp(3.5rem,9vw,11rem)] font-black leading-[0.88] tracking-tighter uppercase mb-12 md:mb-16"
              />
              <div className="hero-meta flex flex-col gap-6">
                <p className="text-xl md:text-2xl font-medium text-gray-700 leading-[1.25] tracking-tight max-w-2xl">
                  {service.tagline}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="hero-meta px-6 py-4 rounded-2xl border border-gray-200">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Czas realizacji</span>
                    <span className="text-xl font-black tracking-tight text-black">{service.deliveryTime}</span>
                  </div>
                  <Link
                    href="/kontakt"
                    className="hero-meta inline-flex items-center gap-3 px-7 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105"
                    style={{ backgroundColor: service.accent }}
                  >
                    Wycena <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Prawa: telefon */}
            <div className="hero-meta flex-shrink-0 flex justify-center lg:justify-end pb-4">
              <div className="relative w-[220px] sm:w-[260px]">
                <div className="relative bg-[#0a0a0a] rounded-[3.2rem] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.45)] border border-zinc-800">
                  <div className="relative bg-black rounded-[2.75rem] p-[3px] overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-20" />
                    <div className="relative w-full h-[440px] sm:h-[520px] bg-zinc-900 rounded-[2.5rem] overflow-hidden">
                      {/* Podmień src na własny filmik: /public/app-demo.mp4 */}
                      <video
                        src="/app-demo.mp4"
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover"
                        poster="/app-demo-poster.jpg"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      {/* Fallback */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
                        style={{ background: `linear-gradient(135deg, ${service.accent}22 0%, #000 100%)` }}>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Dodaj filmik</span>
                        <span className="text-[8px] text-white/20 font-mono">/public/app-demo.mp4</span>
                      </div>
                    </div>
                  </div>
                  {/* Przyciski boczne */}
                  <div className="absolute right-[-3px] top-[80px] w-[3px] h-[50px] bg-zinc-700 rounded-l-sm" />
                  <div className="absolute left-[-3px] top-[60px] w-[3px] h-[35px] bg-zinc-700 rounded-r-sm" />
                  <div className="absolute left-[-3px] top-[105px] w-[3px] h-[35px] bg-zinc-700 rounded-r-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] font-black uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-black" style={{ animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </header>

      {/* ── OPIS ── */}
      <section className="px-6 md:px-20 py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] block mb-5" style={{ color: service.accent }}>O usłudze</span>
            <div className="overflow-hidden">
              <h2 className="section-word text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter uppercase leading-[0.88]">
                Rozwiązanie<br />Premium
              </h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium lg:pt-2">{service.longDesc}</p>
        </div>
      </section>

      {/* ── CO ZAWIERA ── */}
      <section className="px-6 md:px-20 py-24 md:py-32 border-t border-gray-100" style={{ backgroundColor: `${service.accent}05` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 block mb-4">Zakres prac</span>
            <div className="flex flex-wrap gap-0">
              {["Co ", "zawiera ", "rozwiązanie"].map((w, i) => (
                <div key={i} className="overflow-hidden leading-[0.85]">
                  <span className="section-word inline-block text-[clamp(2.5rem,8vw,8rem)] font-black tracking-tighter uppercase">{w}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {service.features?.map((feat, i) => (
              <div key={i} className="feature-card group p-10 md:p-12 bg-white border border-gray-100 rounded-[3rem] hover:border-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[280px]">
                <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${service.accent}12` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke={service.accent} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-300 uppercase mb-3 block tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight group-hover:opacity-60 transition-opacity duration-300">{feat}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="px-6 md:px-20 py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 overflow-hidden">
            <h2 className="section-word text-[clamp(3rem,9vw,9rem)] font-black tracking-tighter leading-[0.85] uppercase">Proces</h2>
          </div>
          <div className="flex flex-col">
            {service.process?.map((step, i) => (
              <div key={i} className="process-row group py-10 md:py-12 border-b border-gray-100 last:border-0">
                <div className="process-line w-full h-px mb-6" style={{ backgroundColor: service.accent, transformOrigin: "left" }} />
                <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-16 items-start">
                  <span className="process-num text-xs font-black uppercase tracking-widest pt-1" style={{ color: service.accent }}>{step.step}</span>
                  <h3 className="process-title text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">{step.title}</h3>
                  <p className="process-desc text-gray-500 font-medium leading-relaxed text-sm md:text-base col-start-2 md:col-start-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 md:px-20 py-24 md:py-32 border-t border-gray-100 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 overflow-hidden">
            <h2 className="section-word text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] uppercase">FAQ</h2>
          </div>
          <div className="flex flex-col">
            {service.faqs?.map((faq, i) => (
              <div key={i} className="py-8 md:py-10 border-b border-gray-200 last:border-0 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-4 md:gap-20 group">
                <h3 className="text-base md:text-lg font-black tracking-tight group-hover:opacity-50 transition-opacity duration-300">{faq.q}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNE USŁUGI ── */}
      <section className="px-6 md:px-20 py-24 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-10">Sprawdź też</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/uslugi/${s.slug}`}
                className="group flex flex-col gap-5 p-8 rounded-[2rem] border border-gray-100 hover:border-black transition-all duration-300 hover:-translate-y-1">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: s.accent }}>{s.num}</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase group-hover:opacity-60 transition-opacity duration-300">{s.title}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.deliveryTime}</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.accent}15` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={s.accent} className="w-4 h-4 -rotate-45">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative mx-4 md:mx-8 mb-8 rounded-[2.5rem] md:rounded-[4rem] py-36 md:py-52 flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: service.accent }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 text-center px-6 flex flex-col items-center gap-12">
          <h2 className="text-white text-[clamp(3rem,10vw,10rem)] font-black leading-[0.82] tracking-tighter uppercase">
            Porozmawiajmy<br />o projekcie
          </h2>
          <Link href="/kontakt"
            className="group px-12 py-6 rounded-full bg-white font-black text-lg md:text-2xl inline-flex items-center gap-4 transition-transform duration-300 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ color: service.accent }}
          >
            Bezpłatna konsultacja
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
        <div className="absolute bottom-8 w-full px-8 md:px-20 flex justify-between text-white/30 text-[10px] font-black uppercase tracking-widest">
          <span>© 2026 AppLike</span>
          <div className="flex gap-6">
            <Link href="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
