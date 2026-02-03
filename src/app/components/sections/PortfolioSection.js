"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/siteData";

const VideoCard = ({ src, poster, color }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    // Graj tylko gdy myszka jest nad kafelkiem
    videoRef.current?.play().catch(err => console.log("Blokada autostartu", err));
  };

  const handleMouseLeave = () => {
    // Zatrzymaj i wróć do początku (lub zostań na klatce) po zjechaniu myszką
    videoRef.current?.pause();
    // Opcjonalnie: videoRef.current.currentTime = 0; // Wróć do początku zdjęcia
  };

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster} // To jest Twoje statyczne zdjęcie widoczne na początku
      loop
      muted
      playsInline
      preload="metadata"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
      style={{ backgroundColor: color }}
    />
  );
};

export default function PortfolioSection() {
  const portfolioSectionRef = useRef(null);
  const portfolioTrackRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = portfolioTrackRef.current;
      const container = portfolioSectionRef.current;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, portfolioSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={portfolioSectionRef}
      className="relative h-screen bg-white overflow-hidden flex flex-col justify-start pt-12 md:pt-20"
      style={{ zIndex: 30 }}
    >
      {/* NAGŁÓWEK SEKCJI */}
      <div className="relative w-full px-4 md:px-8 lg:px-20 z-20 flex flex-col md:flex-row justify-between items-start md:items-end text-black gap-4 mb-6">
        <div className="shrink-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
            Nasze ostatnie
            <br />
            <span className="text-gray-300">projekty</span>
          </h2>
        </div>
        <p className="max-w-xs text-xs md:text-sm font-medium leading-normal text-gray-500 md:mb-2 text-right">
          Poniżej znajdują się nasze ostatnie projekty. <br />
          Zescroluj w bok, aby zobaczyć pełną galerię.
        </p>
      </div>

      {/* TRACK Z KAFELKAMI */}
      <div ref={portfolioTrackRef} className="flex w-max items-start pl-4 md:pl-8 lg:pl-20 pr-8 md:pr-20">
        <div className="flex gap-6 md:gap-12 pr-32">
          {projects.map((project, index) => (
            <div key={project.id} className="group w-[80vw] md:w-[500px] lg:w-[600px] flex-shrink-0">
              
              {/* Info nad kafelkiem */}
              <div className="flex justify-between items-end mb-3 px-1 pt-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <span className="text-3xl font-black text-black/10 italic">0{index + 1}</span>
              </div>

              {/* KAFELEK (VIDEO LUB OBRAZ) */}
              <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl border border-gray-100">
                {project.image && project.image.endsWith(".mp4") ? (
                  <VideoCard src={project.image} poster={project.poster} color={project.color} />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                ) : (
                  <div
                    className="w-full h-full transition-all duration-700 scale-105 group-hover:scale-100"
                    style={{ backgroundColor: project.color || "#e5e7eb" }}
                  />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              
            </div>
          ))}

          {/* PRZYCISK KOŃCOWY */}
          <div className="flex items-center justify-center w-[250px] h-full pt-20">
            <Link href="/portfolio" className="group flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">Wszystkie</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}