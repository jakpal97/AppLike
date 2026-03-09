"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    id: 1,
    type: "text",
    content: "Dostarczamy dedykowane rozwiązania oparte na kreatywności i precyzji. Gwarantujemy najwyższą jakość kodu oraz płynną komunikację na każdym etapie projektu.",
  },
  {
    id: 2,
    type: "stat",
    value: "98",
    suffix: "%",
    label: "Zadowolonych klientów, którzy polecają nasze usługi i wracają z nowymi pomysłami.",
    hasBar: true,
  },
  // ... reszta danych
];

export default function WhyUsSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const statRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      mainTl.to(containerRef.current, { backgroundColor: "#000", duration: 1 }, 0)
            .to(titleRef.current, { color: "#fff", duration: 1 }, 0)
            .to(titleRef.current, { yPercent: -100, scale: 0.8, duration: 1 }, 0.5);

      cardRefs.current.forEach((card, index) => {
        if (card) {
          mainTl.fromTo(card, 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }, 
            0.8 + index * 0.2
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#f5f5f5] flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
        
        {/* LEWA STRONA: TYTUŁ */}
        <div className="flex items-center justify-center lg:justify-start">
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] text-black"
          >
            Dlaczego <br /> my?
          </h2>
        </div>

        {/* PRAWA STRONA: KAFELKI */}
        <div className="flex flex-col gap-6 w-full max-w-[600px] ml-auto h-[70vh] justify-center">
          {features.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`p-6 md:p-10 rounded-[2.5rem] flex flex-col justify-center transition-all duration-300 ${
                item.type === "cta" ? "bg-zinc-900 text-white" : "bg-white text-black shadow-2xl"
              } 
              /* Klucz do sukcesu: elastyczna wysokość z limitem */
              min-h-fit lg:min-h-0 flex-1 max-h-[300px]`}
            >
              {item.type === "text" && (
                <p className="text-lg md:text-xl lg:text-2xl font-medium leading-snug tracking-tight">
                  {item.content}
                </p>
              )}

              {item.type === "stat" && (
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between items-center">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                      <span ref={(el) => (statRefs.current[index] = el)} data-value={item.value}>0</span>
                      {item.suffix}
                    </span>
                    {item.hasBar && (
                       <div className="hidden md:block w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-black w-[92%]" />
                       </div>
                    )}
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-4 leading-tight font-medium">
                    {item.label}
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