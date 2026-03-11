"use client";

import { useRef } from "react";
import { features } from "../../data/siteData";
import { useWhyUsAnimation } from "../../hooks/useWhyUsAnimation";

export default function WhyUsSection() {
  const whyUsPinRef = useRef(null);
  const whyUsContentRef = useRef(null);
  const whyUsTitleRef = useRef(null);
  const rightColumnRef = useRef(null);
  const stat92Ref = useRef(null);
  const bar92Ref = useRef(null);
  const stat100Ref = useRef(null);
  const stat30kRef = useRef(null);

  useWhyUsAnimation({
    whyUsPinRef,
    whyUsContentRef,
    whyUsTitleRef,
    rightColumnRef,
    stat92Ref,
    bar92Ref,
    stat100Ref,
    stat30kRef,
  });

  return (
    <section
      ref={whyUsPinRef}
      className="relative h-screen w-full bg-white overflow-hidden" // Tło sekcji pozostaje białe
      style={{ zIndex: 50 }}
    >
      <div
        ref={whyUsContentRef}
        className="w-full h-full flex flex-col md:flex-row bg-white text-black relative px-6 md:px-12 lg:px-24"
      >
        {/* Lewa kolumna */}
        <div className="w-full md:w-1/2 flex items-center justify-start h-full pt-16 md:pt-0">
          <h2
            ref={whyUsTitleRef}
            className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85]"
          >
            Dlaczego <br />
            my?
          </h2>
        </div>

        {/* Prawa kolumna - Karty */}
        <div
          ref={rightColumnRef}
          className="w-full md:w-1/2 flex flex-col gap-8 pt-20 md:pt-32 pb-20 md:pb-32"
        >
          {features.map((item) => {
            const isLast = item.type === "last-card";
            
            return (
              <div
                key={item.id}
                className={`feature-card group relative p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between border transition-all duration-500 ease-in-out min-h-[300px] md:min-h-[340px] 
                ${isLast 
                  ? "bg-blue-600 text-white border-transparent shadow-[0_20px_50px_rgba(37,99,235,0.3)]" 
                  : "bg-white text-black border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                }`}
              >
                {/* ID elementu */}
                <span className={`absolute top-8 right-10 text-[10px] tracking-[0.3em] font-bold opacity-30`}>
                  {String(item.id).padStart(2, "0")}
                </span>

                {/* Content Logic */}
                <div className="flex flex-col h-full">
                  <p className={`text-[11px] uppercase tracking-[0.25em] mb-6 font-bold ${isLast ? "text-white/60" : "text-black/40"}`}>
                    {item.type === "text" ? "Podejście" : 
                     item.type === "stat-92" ? "Satysfakcja" :
                     item.type === "stat-100" ? "Standard" :
                     item.type === "stat-30k" ? "Wsparcie" : "Efekt"}
                  </p>

                  <div className="flex-grow flex flex-col justify-center">
                    {(item.type === "text" || item.type === "last-card") && (
                      <p className="font-semibold leading-tight tracking-tight" style={{ fontSize: "clamp(1.2rem, 2.8vh, 1.85rem)" }}>
                        {item.content}
                      </p>
                    )}

                    {item.type.includes("stat") && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <span className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                            <span ref={
                              item.type === "stat-92" ? stat92Ref : 
                              item.type === "stat-100" ? stat100Ref : stat30kRef
                            }>{item.value}</span>
                            <span className="text-3xl md:text-4xl ml-1">{item.suffix}</span>
                          </span>
                          
                          {/* Ikony / dodatki obok liczb */}
                          {item.type === "stat-92" && (
                            <div className="w-24 h-2 bg-black/[0.05] rounded-full overflow-hidden mb-2">
                              <div ref={bar92Ref} className="h-full bg-black rounded-full w-0" />
                            </div>
                          )}
                          {item.type === "stat-100" && (
                            <div className="flex -space-x-3 mb-2">
                              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-white shadow-sm" />)}
                            </div>
                          )}
                        </div>
                        
                        <p className="text-base md:text-lg font-medium opacity-70 border-t border-black/[0.05] pt-6">
                          {item.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}