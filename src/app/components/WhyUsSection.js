"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    id: 1,
    type: "text",
    content: "We provide tailored solutions built on creativity, precision, and trust—ensuring quality results and a smooth experience every step of the way.",
  },
  {
    id: 2,
    type: "stat",
    value: "92",
    suffix: "%",
    label: "Client satisfaction rate, fostering long-term relationships and repeat business",
    hasBar: true,
  },
  {
    id: 3,
    type: "stat",
    value: "100",
    suffix: "+",
    label: "Active users experiencing our design every day via products we made",
    hasAvatars: true,
  },
  {
    id: 4,
    type: "stat",
    value: "30",
    suffix: "K",
    label: "Delivered a high-quality project with exceptional attention to detail",
    hasIcon: true,
  },
  {
    id: 5,
    type: "cta",
    content: "We deliver creative solutions with quality results that make an impact.",
  },
];

export default function WhyUsSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const statRefs = useRef([]);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Główna timeline z pinowaniem
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // FAZA 1: Zmiana tła z białego na czarne (0-0.3)
      mainTl.to(containerRef.current, {
        backgroundColor: "#000",
        duration: 1,
        ease: "none",
      }, 0);

      // Tekst zmienia kolor na biały
      mainTl.to(titleRef.current, {
        color: "#fff",
        duration: 1,
        ease: "none",
      }, 0);

      // FAZA 2: Tytuł jedzie do góry (0.3-0.5)
      mainTl.to(titleRef.current, {
        y: "-30vh",
        scale: 0.6,
        duration: 1,
        ease: "power2.inOut",
      }, 1);

      // FAZA 3: Karty wyłaniają się z dołu (0.5-1.5)
      cardRefs.current.forEach((card, index) => {
        if (card) {
          mainTl.fromTo(card, 
            { 
              y: 300, 
              opacity: 0,
              scale: 0.9,
            },
            { 
              y: 0, 
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            }, 
            1.2 + index * 0.15
          );
        }
      });

      // Animacje liczników (po pojawieniu się kart)
      statRefs.current.forEach((stat, index) => {
        if (stat) {
          const value = parseInt(stat.dataset.value);
          gsap.fromTo(stat, 
            { textContent: 0 },
            {
              textContent: value,
              duration: 2,
              ease: "power1.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
              },
            }
          );
        }
      });

      // Animacja progress bar
      if (barRef.current) {
        gsap.fromTo(barRef.current,
          { width: "0%" },
          {
            width: "92%",
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: barRef.current,
              start: "top 90%",
            },
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#f5f5f5] overflow-hidden"
    >
      {/* TYTUŁ */}
      <div className="absolute inset-0 flex items-center px-8 md:px-20">
        <h2
          ref={titleRef}
          className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] text-black"
        >
          Why client <br />
          choose us
        </h2>
      </div>

      {/* KARTY */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 flex items-center justify-end px-8 md:px-20"
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4 max-h-[80vh] overflow-hidden">
          {features.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`p-8 rounded-3xl min-h-[180px] flex flex-col justify-between opacity-0 ${
                item.type === "cta" 
                  ? "bg-black text-white" 
                  : "bg-white text-black shadow-lg"
              }`}
            >
              {item.type === "text" && (
                <p className="text-2xl md:text-3xl font-medium leading-tight">
                  {item.content}
                </p>
              )}

              {item.type === "stat" && (
                <>
                  <div className="flex justify-between items-start">
                    <span className="text-6xl md:text-7xl font-medium tracking-tighter">
                      <span 
                        ref={(el) => (statRefs.current[index] = el)}
                        data-value={item.value}
                      >
                        0
                      </span>
                      {item.suffix}
                    </span>
                    
                    {item.hasBar && (
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div ref={barRef} className="h-full bg-red-500 rounded-full w-0" />
                        </div>
                        <span className="text-xs text-gray-400">00%</span>
                      </div>
                    )}
                    
                    {item.hasAvatars && (
                      <div className="flex -space-x-2 mt-4">
                        <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white" />
                        <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white" />
                        <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white" />
                      </div>
                    )}
                    
                    {item.hasIcon && (
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mt-2">
                        <span className="text-2xl">🚀</span>
                      </div>
                    )}
                  </div>
                  <p className="text-base text-black/60 mt-6 font-medium">
                    {item.label}
                  </p>
                </>
              )}

              {item.type === "cta" && (
                <p className="text-2xl md:text-3xl font-medium leading-tight">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
