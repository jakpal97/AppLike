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
            Why client <br />
            choose us
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
            >
              {item.type === "text" && (
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                  {item.content}
                </p>
              )}

              {item.type === "stat-92" && (
                <>
                  <div className="flex justify-between items-start w-full flex-wrap gap-4">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter flex">
                      <span ref={stat92Ref}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="w-20 md:w-24 h-2 bg-gray-100 rounded-full mt-4 md:mt-6 overflow-hidden">
                      <div ref={bar92Ref} className="h-full bg-red-600 rounded-full w-0" />
                    </div>
                  </div>
                  <p className="text-base md:text-lg opacity-80 mt-6 md:mt-8 font-medium border-t border-current/10 pt-4 md:pt-6">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "stat-100" && (
                <>
                  <div className="flex justify-between items-start w-full flex-wrap gap-4">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter flex">
                      <span ref={stat100Ref}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="flex -space-x-4 mt-4 md:mt-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-400 border-4 border-white"></div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-400 border-4 border-white"></div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400 border-4 border-white"></div>
                    </div>
                  </div>
                  <p className="text-base md:text-lg opacity-80 mt-6 md:mt-8 font-medium border-t border-current/10 pt-4 md:pt-6">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "stat-30k" && (
                <>
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter flex">
                      <span ref={stat30kRef}>{item.value}</span>
                      {item.suffix}
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center mt-4 md:mt-6">
                      <span className="text-xl md:text-2xl">🚀</span>
                    </div>
                  </div>
                  <p className="text-base md:text-lg opacity-80 mt-6 md:mt-8 font-medium border-t border-current/10 pt-4 md:pt-6">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "last-card" && (
                <div className="flex flex-col h-full justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-8 md:h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
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
