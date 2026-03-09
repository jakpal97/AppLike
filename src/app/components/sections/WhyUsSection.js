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
      className="relative h-screen w-full bg-white overflow-hidden"
      style={{ zIndex: 50 }}
    >
      <div
        ref={whyUsContentRef}
        className="w-full h-full flex flex-col md:flex-row bg-white text-black relative px-4 md:px-8 lg:px-20"
      >
        {/* Lewa kolumna - Tytuł */}
        <div className="w-full md:w-1/2 flex items-center justify-start h-full pt-16 md:pt-0">
          <h2
            ref={whyUsTitleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            Dlaczego my? <br />
            
          </h2>
        </div>

        {/* Prawa kolumna - Karty */}
        <div
          ref={rightColumnRef}
          className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 pt-20 md:pt-32 pb-20 md:pb-32"
        >
          {features.map((item) => (
            <div
              key={item.id}
              className={`feature-card p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] flex flex-col justify-between shadow-xl border border-gray-100 ${
                item.type === "last-card"
                  ? "bg-blue-600 text-white min-h-[250px] md:min-h-[300px]"
                  : "bg-white text-black min-h-[250px] md:min-h-[300px]"
              }`}
              style={{ padding: "clamp(0.75rem, 2vh, 2.5rem)" }}
            >
              {item.type === "text" && (
                <p className="font-medium leading-tight tracking-tight" style={{ fontSize: "clamp(0.9rem, 2vh, 1.5rem)" }}>
                  {item.content}
                </p>
              )}

              {item.type === "stat-92" && (
                <>
                  <div className="flex justify-between items-start w-full flex-wrap gap-2">
                    <span className="font-medium tracking-tighter flex" style={{ fontSize: "clamp(2rem, 4.5vh, 4rem)" }}>
                      <span ref={stat92Ref}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="w-16 h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <div ref={bar92Ref} className="h-full bg-red-600 rounded-full w-0" />
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mt-2 font-medium border-t border-current/10 pt-2">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "stat-100" && (
                <>
                  <div className="flex justify-between items-start w-full flex-wrap gap-2">
                    <span className="font-medium tracking-tighter flex" style={{ fontSize: "clamp(2rem, 4.5vh, 4rem)" }}>
                      <span ref={stat100Ref}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="flex -space-x-3 mt-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-400 border-4 border-white"></div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-400 border-4 border-white"></div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-400 border-4 border-white"></div>
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mt-2 font-medium border-t border-current/10 pt-2">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "stat-30k" && (
                <>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <span className="font-medium tracking-tighter flex" style={{ fontSize: "clamp(2rem, 4.5vh, 4rem)" }}>
                      <span ref={stat30kRef}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center mt-3">
                      <span className="text-lg md:text-xl">🚀</span>
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mt-2 font-medium border-t border-current/10 pt-2">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "last-card" && (
                <div className="flex flex-col h-full justify-center">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p className="font-medium leading-tight tracking-tight" style={{ fontSize: "clamp(0.9rem, 2vh, 1.5rem)" }}>
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
