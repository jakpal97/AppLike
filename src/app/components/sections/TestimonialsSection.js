"use client";

import { useRef } from "react";
import { testimonials } from "../../data/siteData";
import { useTestimonialsAnimation } from "../../hooks/useTestimonialsAnimation";

export default function TestimonialsSection() {
  const testimonialsPinRef = useRef(null);
  const testimonialsTitleRef = useRef(null);
  const testimonialCardsRef = useRef([]);

  useTestimonialsAnimation({
    testimonialsPinRef,
    testimonialsTitleRef,
    testimonialCardsRef,
  });

  return (
    <section
      ref={testimonialsPinRef}
      className="relative h-screen w-full bg-white overflow-hidden perspective-1000"
      style={{ zIndex: 50 }}
    >
      <div className="w-full h-full flex items-center justify-center px-4 relative">
        
        {/* TYTUŁ - Wyśrodkowany absolutnie, by nie spychał kart */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h2
            ref={testimonialsTitleRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center text-black tracking-tighter px-4"
          >
            Poznaj opinie naszych klientów.
          </h2>
        </div>

        {/* KONTENER KART - Responsywne wymiary dla 4 typów ekranów */}
        <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px] h-[450px] sm:h-[550px] md:h-[600px] lg:h-[650px]">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => (testimonialCardsRef.current[index] = el)}
              className="absolute top-0 left-0 w-full h-full bg-[#F3F4F6] rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 origin-center shadow-inner"
              style={{ zIndex: testimonials.length - index, opacity: 0 }}
            >
              <div className="relative w-full h-full">
                
                {/* NAME TAG - Responsywne przesunięcia */}
                <div className="absolute top-[10%] left-[-20%] sm:left-[-30%] md:left-[-40%] bg-white px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-3xl shadow-xl flex flex-col items-start z-20 min-w-[150px] sm:min-w-[200px]">
                  <span className="font-bold text-xl sm:text-2xl md:text-4xl text-black whitespace-nowrap">{t.name}</span>
                  {t.role && (
                    <span className="text-xs sm:text-sm md:text-xl text-gray-500 font-medium">
                      {t.role}
                    </span>
                  )}
                </div>

                {/* RATING TAG - Responsywne przesunięcia */}
                <div className="absolute top-[35%] right-[-15%] sm:right-[-35%] md:right-[-30%] bg-white px-4 md:px-6 py-2 md:py-4 rounded-2xl md:rounded-4xl shadow-xl flex flex-col items-center gap-1 md:gap-3 z-20 min-w-[140px] sm:min-w-[180px]">
                  <div className="flex text-yellow-400 gap-0.5 md:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="text-black text-xs sm:text-sm md:text-xl font-bold">({t.rating})</span>
                    <span className="text-black text-sm sm:text-lg md:text-2xl font-bold border-l border-gray-200 ml-2 pl-2 whitespace-nowrap">
                       {t.headline}
                    </span>
                  </div>
                </div>

                {/* AVATAR - Skalowany dla laptopów */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl z-10">
                  <div className={`w-full h-full ${t.imgColor}`}></div>
                </div>

                {/* QUOTE - Dopasowany do szerokości karty */}
                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] bg-white p-4 md:p-6 rounded-xl md:rounded-3xl shadow-xl z-20">
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium text-black leading-tight text-center italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}