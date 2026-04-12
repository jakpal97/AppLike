"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const MODULES = [
  { 
    id: "1", 
    title: "Dlaczego ja?", 
    code: "VALUES_01", 
    content: "Partner, nie tylko wykonawca. Nie 'klepię kodu' na ślepo. Analizuję Twój biznes, by stworzyć narzędzie, które faktycznie oszczędza Twój czas lub generuje zysk.",
    values: [
      { n: "1", t: "Prawa autorskie", d: "Przekazuję pełne prawa autorskie i własność intelektualną do kodu." },
      { n: "2", t: "TypeScript", d: "Ścisłe typowanie redukujące błędy o 40%." },
      { n: "✓", t: "Security", d: "Rygorystyczny standard (JWT, SQL Injection, XSS)." },
    ]
  },
  { 
    id: "2", 
    title: "Realizacje", 
    code: "WORKS_02", 
    content: "Realne rozwiązania, które działają.",
    projects: [
      { name: "Sommelier Bot", type: "AI / Chatbot", desc: "Doradca winiarski AI wykorzystujący LLM do personalizacji rekomendacji (OpenAI + Next.js)" },
      { name: "Admin Panels", type: "Dashboard", desc: "Systemy zarządzania z analityką, wykresami na żywo i rolami (Prisma + PostgreSQL)" }
    ]
  },
  { 
    id: "3", 
    title: "The Stack", 
    code: "TECH_03", 
    content: "Nowoczesny inżynier.",
    stack: [
      { name: "Frontend", techs: ["Next.js / React", "TypeScript", "Tailwind / GSAP"] },
      { name: "Backend", techs: ["Node.js / Express", "PostgreSQL", "Prisma ORM"] },
      { name: "Cloud", techs: ["Vercel / AWS", "Docker", "Supabase"] },
    ]
  },
  { 
    id: "4", 
    title: "Workflow", 
    code: "FLOW_04", 
    content: "Jak buduję krok po kroku.",
    steps: [
      "1. Analiza & Discovery", 
      "2. Architektura & Prototyp", 
      "3. Iteracyjny Dev (Agile)", 
      "4. Testy & Deployment"
    ]
  },
];

export default function WebAppsOS() {
  const [openApps, setOpenApps] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0); // 0: pierwszy napis, 1: drugi napis
  
  const desktopRef = useRef(null);
  const zIndexRef = useRef(1000);
  const introRef = useRef(null);

  // Sekwencja powitalna
  useEffect(() => {
    if (openApps.length > 0) {
      setShowIntro(false);
      return;
    }

    const tl = gsap.timeline();
    
    // Animacja pierwszego napisu
    tl.fromTo(introRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(introRef.current, { opacity: 0, y: -20, duration: 0.8, delay: 2, ease: "power3.in", onComplete: () => setIntroStep(1) })
      // Animacja drugiego napisu
      .fromTo(introRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

  }, [introStep, openApps.length]);

  const openModule = (id) => {
    if (!openApps.find(a => a.id === id)) {
      const module = MODULES.find(m => m.id === id);
      setOpenApps(prev => [...prev, module]);
    } else {
      const el = document.getElementById(`win-${id}`);
      if (el) {
        zIndexRef.current += 1;
        el.style.zIndex = zIndexRef.current;
      }
    }
  };

  const closeApp = (id) => {
    setOpenApps(prev => prev.filter(a => a.id !== id));
  };

  useLayoutEffect(() => {
    const icons = document.querySelectorAll(".dock-icon");
    icons.forEach((icon) => {
      Draggable.create(icon, {
        type: "x,y",
        onRelease: function() {
          if (this.y < -120) {
            openModule(this.target.getAttribute("data-id"));
          }
          gsap.to(this.target, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
        }
      });
    });
  }, []); 

  useLayoutEffect(() => {
    openApps.forEach(app => {
      const element = document.getElementById(`win-${app.id}`);
      if (element && !Draggable.get(element)) {
        Draggable.create(element, {
          bounds: desktopRef.current,
          handle: `#handle-${app.id}`, 
          onPress: function() {
            zIndexRef.current += 1;
            this.target.style.zIndex = zIndexRef.current;
          }
        });
      }
    });
  }, [openApps]);

  return (
    <main 
      ref={desktopRef} 
      className="h-screen w-full bg-[#FCFCFC] overflow-hidden relative font-sans flex flex-col select-none"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

      {/* NAPISY NA ŚRODKU */}
      {showIntro && (
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none px-6">
          <h2 
            ref={introRef}
            className="text-4xl md:text-7xl font-black italic tracking-tighter text-zinc-900 text-center uppercase leading-none max-w-5xl"
          >
            {introStep === 0 
              ? "Zobacz jak budujemy aplikacje Webowe" 
              : "Przeciągnij jeden z kafelków żeby poznać treść"}
          </h2>
        </div>
      )}

      {openApps.map((app, index) => (
        <div 
          key={app.id}
          id={`win-${app.id}`}
          className="window-instance absolute w-[90vw] md:w-[540px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-zinc-200/60 overflow-hidden"
          style={{ 
            top: `${12 + (index * 5)}%`, 
            left: `${18 + (index * 5)}%`,
            zIndex: 1000 + index 
          }}
        >
          <div id={`handle-${app.id}`} className="h-12 bg-zinc-50 flex items-center justify-between px-6 border-b border-zinc-100 cursor-grab active:cursor-grabbing hover:bg-zinc-100/50">
            <div className="flex gap-2">
              <button 
                onPointerDown={(e) => e.stopPropagation()} 
                onClick={() => closeApp(app.id)} 
                className="w-3.5 h-3.5 rounded-full bg-zinc-900 hover:scale-110 transition-transform relative z-[100]" 
              />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">{app.code}</span>
          </div>

          <div className="p-10 md:p-14 pointer-events-auto">
            <header className="mb-10">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">{app.title}</span>
              </div>
              <p className="text-xl md:text-2xl font-medium text-zinc-500 leading-relaxed italic tracking-tight">{app.content}</p>
            </header>
            
            <div className="space-y-6">
                {app.values && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {app.values.map(v => (
                            <div key={v.t} className="glass-card p-6 rounded-2xl border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-5 text-[10px] text-zinc-900 font-bold italic">{v.n}</div>
                                <h3 className="text-base font-black italic tracking-tight text-zinc-900 mb-2 uppercase">{v.t}</h3>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed tracking-tight">{v.d}</p>
                            </div>
                        ))}
                    </div>
                )}

                {app.projects && (
                    <div className="space-y-6">
                        {app.projects.map(p => (
                            <div key={p.name} className="group glass-card rounded-[1.25rem] border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-black transition-all duration-300 overflow-hidden flex flex-col">
                                <div className="h-10 bg-zinc-50/50 border-b border-zinc-100/60 flex items-center px-4 gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-100"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-100"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-100"></div>
                                </div>
                                <div className="p-7">
                                    <div className="flex justify-between items-center mb-5">
                                        <span className="text-[10px] font-black uppercase text-white bg-zinc-900 px-3 py-1 rounded tracking-wider italic">{p.type}</span>
                                        <span className="text-[10px] font-medium text-zinc-400">2024</span>
                                    </div>
                                    <h3 className="text-2xl font-black italic tracking-tight text-zinc-900 mb-3 uppercase leading-none">{p.name}</h3>
                                    <p className="text-sm text-zinc-500 font-normal leading-relaxed tracking-tight">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {app.stack && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {app.stack.map(s => (
                            <div key={s.name} className="glass-card p-6 rounded-2xl border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-black rounded-t-2xl"></div>
                                <h4 className="text-[10px] font-black text-black uppercase tracking-widest mb-6 flex items-center gap-2 mt-2 italic">{s.name}</h4>
                                <ul className="space-y-4 font-bold text-xs tracking-tight italic">
                                    {s.techs.map(t => (
                                        <li key={t} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full shrink-0"></div> {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {app.steps && (
                    <div className="relative max-w-2xl glass-card p-8 md:p-10 rounded-3xl border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                        <div className="absolute left-[39px] md:left-[47px] top-10 bottom-10 w-px bg-zinc-900 opacity-20"></div>
                        <div className="space-y-9 relative">
                            {app.steps.map((s, i) => (
                                <div key={s} className="relative pl-10 md:pl-14 group">
                                    <div className="absolute w-4 h-4 bg-zinc-900 rounded-full left-0 top-1 transition-all group-hover:scale-110"></div>
                                    <h4 className="text-lg font-black italic tracking-tighter text-zinc-900 mb-2 uppercase leading-none">{s}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Link href="/kontakt" className="block w-full py-5 mt-12 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl text-center hover:bg-zinc-700 transition-all duration-300">
              Konfiguruj projekt →
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-zinc-200 shadow-2xl z-[999998]">
        {MODULES.map((m) => (
          <div
            key={m.id}
            data-id={m.id}
            onClick={() => openModule(m.id)}
            className="dock-icon w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl transition-all relative group"
          >
            <span className="font-black italic text-lg tracking-tighter select-none">{m.id}</span>
            {openApps.find(a => a.id === m.id) && (
              <div className="absolute -bottom-2 w-1.5 h-1.5 bg-zinc-900 rounded-full animate-pulse"></div>
            )}
            <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-zinc-900 text-white text-[8px] px-2 py-1 rounded font-black tracking-widest uppercase italic whitespace-nowrap">
              {m.title}
            </div>
          </div>
        ))}
        <div className="w-px h-10 bg-zinc-200 mx-2" />
        <Link href="/kontakt" className="w-16 h-16 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center font-black italic text-xs hover:bg-zinc-900 hover:text-white transition-colors">
          GO
        </Link>
      </div>

      <style jsx global>{`
        body { -webkit-tap-highlight-color: transparent; }
        .window-instance { touch-action: none; }
        .dock-icon { touch-action: none; user-select: none; }
      `}</style>
    </main>
  );
}