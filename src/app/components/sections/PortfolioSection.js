"use client";

import { useRef } from "react";
import Link from "next/link";
import { projects } from "../../data/siteData";
import { usePortfolioAnimation } from "../../hooks/usePortfolioAnimation";

export default function PortfolioSection() {
  const portfolioSectionRef = useRef(null);
  const portfolioTrackRef = useRef(null);
  const portfolioImagesRef = useRef([]);

  usePortfolioAnimation({
    portfolioSectionRef,
    portfolioTrackRef,
    portfolioImagesRef,
  });

  return (
    <section
      ref={portfolioSectionRef}
      className="relative h-screen bg-white overflow-hidden text-black"
      style={{ zIndex: 30 }}
    >
      {/* NAGŁÓWEK */}
      <div className="absolute top-16 md:top-22 left-0 w-full px-4 md:px-8 lg:px-20 z-20 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-end mix-blend-difference text-white gap-4">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none shrink-0 uppercase">
          Nasze ostatnie
          <br />
          <span className="text-white">projekty</span>
        </h2>
        <p className="max-w-xs text-xs md:text-sm lg:text-base font-medium leading-normal md:mb-3">
          Poniżej znajdują się nasze ostatnie projekty
          <br className="hidden md:block" />
          zescroluj w bok aby zobaczyć naszą pełną galerię.
        </p>
      </div>

      {/* TRACK */}
      <div
        ref={portfolioTrackRef}
        className="flex h-full w-max items-center pl-4 md:pl-8 lg:pl-20 pr-8 md:pr-20 pt-20"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] flex-shrink-0 mr-6 md:mr-8 group overflow-hidden bg-gray-100 rounded-3xl md:rounded-4xl"
          >
            <div className="relative w-full h-full overflow-hidden bg-gray-200">
              {/* DIV Z KOLOREM */}
              <div
                ref={(el) => (portfolioImagesRef.current[index] = el)}
                className="w-full h-full scale-125 transition-transform duration-700 ease-out"
                style={{ backgroundColor: project.color }}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/40 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
            <span className="absolute top-2 md:top-4 right-4 md:right-6 text-6xl md:text-8xl lg:text-9xl font-black text-white mix-blend-overlay opacity-50 z-10 select-none">
              0{index + 1}
            </span>
          </div>
        ))}

        <div className="h-[70vh] md:h-[75vh] lg:h-[80vh] w-[250px] md:w-[300px] flex-shrink-0 flex items-center justify-center border-l border-gray-100 ml-6 md:ml-8">
          <Link href="/portfolio" className="group flex flex-col items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <span className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-widest text-center">
              View All Projects
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
