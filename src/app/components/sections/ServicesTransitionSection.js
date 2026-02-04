"use client";

import { useRef } from "react";
import ServicesSection from "../ServicesSection";
import { graphicElements } from "../../data/siteData";
import { useServicesAnimation } from "../../hooks/useServicesAnimation";

const { Image1, Image2, Image3 } = graphicElements;

export default function ServicesTransitionSection({
  servicesVisible,
  setServicesVisible,
  floatingImg1Ref,
  floatingImg2Ref,
  floatingImg3Ref,
}) {
  const secondSectionRef = useRef(null);
  const curtainRef = useRef(null);
  const servicesContainerRef = useRef(null);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const arrowRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const arrowWrapperRef = useRef(null);
  const buttonWrapperRef = useRef(null);

  const placeholder1Ref = useRef(null);
  const placeholder2Ref = useRef(null);
  const placeholder3Ref = useRef(null);

  const staticImg1Ref = useRef(null);
  const staticImg2Ref = useRef(null);
  const staticImg3Ref = useRef(null);

  // Poprawione wywołanie hooka - przekazujemy tylko niezbędne referencje
  useServicesAnimation({
    secondSectionRef,
    floatingImg1Ref,
    floatingImg2Ref,
    floatingImg3Ref,
    placeholder1Ref,
    placeholder2Ref,
    placeholder3Ref,
    staticImg1Ref,
    staticImg2Ref,
    staticImg3Ref,
    curtainRef,
    line1Ref,
    line2Ref,
    line3Ref,
    arrowRef,
    ctaButtonRef,
    arrowWrapperRef,
    buttonWrapperRef,
    servicesContainerRef,
    setServicesVisible,
  });

  return (
    <section
      ref={secondSectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white"
      style={{ zIndex: 40 }}
    >
      <div
        ref={curtainRef}
        className="absolute left-0 bottom-0 w-full h-full overflow-hidden translate-y-full"
        style={{ zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb] to-[#60a5fa]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-white opacity-20 transform scale-150 origin-bottom-left"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div
        className="relative max-w-7xl mx-auto text-center px-4 md:px-6 py-20 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <h2 className="text-[clamp(2rem,5.5vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-black">
          <span ref={line1Ref} className="block transition-colors duration-0">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-2 gap-y-2">
              Jesteśmy{" "}
              <span
                ref={placeholder1Ref}
                className="inline-block w-[clamp(40px,7vw,90px)] h-[clamp(50px,9vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"
              >
                <div ref={staticImg1Ref} className="w-full h-full opacity-0">
                  <Image1 />
                </div>
              </span>
              <span
                ref={placeholder2Ref}
                className="inline-block w-[clamp(40px,7vw,90px)] h-[clamp(50px,9vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"
              >
                <div ref={staticImg2Ref} className="w-full h-full opacity-0">
                  <Image2 />
                </div>
              </span>
              <span
                ref={placeholder3Ref}
                className="inline-block w-[clamp(40px,7vw,90px)] h-[clamp(50px,9vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"
              >
                <div ref={staticImg3Ref} className="w-full h-full opacity-0">
                  <Image3 />
                </div>
              </span>{" "}
              kreatywnym
            </span>
          </span>

          <span ref={line2Ref} className="block mt-2 md:mt-4 transition-colors duration-0">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-2">
              studiem{" "}
              <span
                ref={arrowWrapperRef}
                className="inline-block mx-2 md:mx-4 overflow-hidden align-middle"
              >
                <span ref={arrowRef} className="inline-block text-red-500 opacity-0">
                  <svg
                    className="w-[clamp(30px,4.5vw,60px)] h-[clamp(30px,4.5vw,60px)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </span>
              </span>{" "}
              tworzącym
            </span>
          </span>

          <span ref={line3Ref} className="block mt-2 md:mt-4 transition-colors duration-0">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-2">
              skuteczne{" "}
              <span
                ref={buttonWrapperRef}
                className="inline-block mx-2 md:mx-4 overflow-hidden align-middle pointer-events-auto"
              >
                <span ref={ctaButtonRef} className="inline-block opacity-0">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 md:px-8 md:py-4 rounded-full text-[clamp(0.85rem,1.4vw,1.3rem)] transition-colors cursor-pointer whitespace-nowrap">
                    Sprawdź nas
                  </button>
                </span>
              </span>{" "}
              rozwiązania.
            </span>
          </span>
        </h2>
      </div>

      <div
        ref={servicesContainerRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{ zIndex: 30 }}
      >
        <ServicesSection
          key={servicesVisible ? "visible" : "hidden"}
          isVisible={servicesVisible}
        />
      </div>
    </section>
  );
}