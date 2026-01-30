"use client";

import { useRef } from "react";
import { heroText } from "../../data/siteData";
import { useHeroAnimation } from "../../hooks/useHeroAnimation";

export default function HeroSection({
  scrollContainerRef,
  floatingImg1Ref,
  floatingImg2Ref,
  floatingImg3Ref,
}) {
  const starRef = useRef(null);
  const starContainerRef = useRef(null);
  const starPillRef = useRef(null);
  const heroSliderRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroContentRef = useRef(null);
  const lettersRef = useRef([]);

  useHeroAnimation({
    scrollContainerRef,
    starRef,
    starContainerRef,
    starPillRef,
    heroSliderRef,
    lettersRef,
    heroSubtitleRef,
    heroContentRef,
    floatingImg1Ref,
    floatingImg2Ref,
    floatingImg3Ref,
  });

  return (
    <div ref={scrollContainerRef} className="h-[200vh] bg-white">
      <div
        ref={heroContentRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center overflow-hidden"
        style={{ zIndex: 30 }}
      >
        <div ref={heroSliderRef} className="flex items-center px-[2vw] md:px-[3vw] lg:px-[4vw] xl:px-[5vw]">
          <h1 className="text-[clamp(2rem,8vw,21rem)] sm:text-[clamp(3rem,10vw,21rem)] md:text-[clamp(4rem,12vw,21rem)] lg:text-[clamp(6rem,14vw,21rem)] xl:text-[clamp(9rem,18vw,21rem)] 2xl:text-[clamp(11rem,23vw,21rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-black">
            {heroText.main}
          </h1>

          <div
            ref={starPillRef}
            className="mx-[0.6vw] sm:mx-[0.8vw] md:mx-[1vw] lg:mx-[1.2vw] xl:mx-[1.5vw] bg-[#e5e5e5] rounded-full relative overflow-hidden flex-shrink-0"
            style={{
              width: "clamp(80px, 14vw, 450px)",
              height: "clamp(60px, 6.5vw, 180px)",
            }}
          >
            <div
              ref={starContainerRef}
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                right: "clamp(5px, 0.7vw, 24px)",
                width: "clamp(20px, 4.5vw, 130px)",
                height: "clamp(20px, 4.5vw, 130px)",
              }}
            >
              <svg
                ref={starRef}
                viewBox="0 0 100 100"
                className="w-full h-full fill-black"
              >
                <path d="M45,0 L55,0 L55,35 L85,15 L90,25 L65,45 L100,45 L100,55 L65,55 L90,75 L85,85 L55,65 L55,100 L45,100 L45,65 L15,85 L10,75 L35,55 L0,55 L0,45 L35,45 L10,25 L15,15 L45,35 Z" />
              </svg>
            </div>
          </div>

          <h1 className="text-[clamp(2rem,8vw,21rem)] sm:text-[clamp(3rem,10vw,21rem)] md:text-[clamp(4rem,12vw,21rem)] lg:text-[clamp(6rem,14vw,21rem)] xl:text-[clamp(9rem,18vw,21rem)] 2xl:text-[clamp(11rem,23vw,21rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap">
            {heroText.matterText.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block text-gray-300 transition-colors duration-100"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}
