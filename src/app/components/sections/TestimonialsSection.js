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
      <div className="w-full h-full flex flex-col items-center justify-center px-4 relative">
        <h2
          ref={testimonialsTitleRef}
          className="text-3xl md:text-5xl lg:text-7xl font-black text-center text-black mb-8 md:mb-12 tracking-tighter"
        >
          Testimonials from our clients.
        </h2>

        <div className="relative w-full max-w-[400px] md:max-w-[450px] h-[550px] md:h-[650px]">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => (testimonialCardsRef.current[index] = el)}
              className="absolute top-0 left-0 w-full h-full bg-[#F3F4F6] rounded-[2rem] md:rounded-[2.5rem] p-0 border border-gray-100 origin-center"
              style={{ zIndex: testimonials.length - index, opacity: 0 }}
            >
              {/* UKŁAD WEWNĄTRZ KARTY */}
              <div className="relative w-full h-full">
                {/* NAME TAG */}
                <div className="absolute top-20 md:top-32 left-[-120px] md:left-[-160px] bg-white px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl shadow-xl flex flex-col items-start z-20">
                  <span className="font-bold text-2xl md:text-4xl text-black">{t.name}</span>
                  {t.role && (
                    <span className="text-base md:text-xl text-gray-500 font-medium">
                      {t.role}
                    </span>
                  )}
                </div>

                {/* RATING TAG */}
                <div className="absolute top-40 md:top-60 right-[-150px] md:right-[-230px] bg-white px-4 md:px-6 py-3 md:py-4 rounded-3xl md:rounded-4xl shadow-xl flex flex-col items-center gap-2 md:gap-3 z-20">
                  <div className="flex text-yellow-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 md:w-10 md:h-10 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-black text-base md:text-xl font-bold pl-2 md:pl-4">
                      ({t.rating})
                    </span>
                  </div>
                  <span className="text-black text-xl md:text-3xl font-bold border-l border-gray-200 pl-2 md:pl-3 ml-1">
                    - {t.headline}
                  </span>
                </div>

                {/* AVATAR */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-50 md:h-50 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl z-10">
                  <div className={`w-full h-full ${t.imgColor}`}></div>
                </div>

                {/* QUOTE */}
                <div className="absolute bottom-[20px] md:bottom-[30px] right-8 md:right-60 w-[calc(100%-2rem)] md:w-full bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl z-20">
                  <p className="text-base md:text-xl lg:text-2xl font-medium text-black leading-tight tracking-tight text-center">
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
