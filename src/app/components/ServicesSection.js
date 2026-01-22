"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const services = [
  {
    id: "01",
    title: "Advertising",
    subtitle: "Strategic Campaigns",
    desc: "Ensuring impactful experiences that resonate with your audience and drive measurable results.",
    color: "white",
    accent: "#ff3d00",
    img: "https://images.unsplash.com/photo-1544980998-294747c3276d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Branding",
    subtitle: "Identity Systems",
    desc: "Crafting unique identities that tell your story and create lasting impressions.",
    color: "white",
    accent: "#0066ff",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Digital Design",
    subtitle: "User Experience",
    desc: "User-centric interfaces that balance aesthetics with functionality.",
    color: "white",
    accent: "#00c853",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Development",
    subtitle: "Technical Solutions",
    desc: "Robust technical foundations built for scale and performance.",
    color: "white",
    accent: "#ff6d00",
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
  },
];

const AUTOPLAY_DURATION = 7000; // 7 sekund na kartę (wolniej)

export default function ServicesSection({ isVisible = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Funkcja zmiany karty
  const goToCard = useCallback((index) => {
    if (index === activeIndex) return;
    
    const direction = index > activeIndex ? 1 : -1;
    const oldCard = cardRefs.current[activeIndex];
    const newCard = cardRefs.current[index];

    // Animacja wyjścia starej karty
    gsap.to(oldCard, {
      y: direction * -120,
      scale: 0.85,
      opacity: 0,
      rotateX: direction * 15,
      filter: "blur(8px)",
      duration: 0.6,
      ease: "power3.inOut",
    });

    // Animacja wejścia nowej karty
    gsap.fromTo(
      newCard,
      {
        y: direction * 100,
        scale: 0.9,
        opacity: 0,
        rotateX: direction * -10,
        filter: "blur(8px)",
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    // Animacja tekstu
    gsap.to(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index);
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      },
    });

    gsap.to(descRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );
      },
    });

    setProgress(0);
  }, [activeIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!isVisible || isPaused) {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
      return;
    }

    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (AUTOPLAY_DURATION / 50));
      });
    }, 50);

    // Auto-advance
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % services.length;
        goToCard(next);
        return prev; // goToCard handles the actual state update
      });
    }, AUTOPLAY_DURATION);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isVisible, isPaused, goToCard]);


  // Initial animation
  useEffect(() => {
    if (!isVisible) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Staggered entrance for navigation dots
    gsap.fromTo(
      ".nav-dot",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)",
        delay: 0.5,
      }
    );
  }, [isVisible]);

  const currentService = services[activeIndex];

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ 
        backgroundColor: currentService.color,
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12">
        
        {/* LEWA STRONA - CONTENT */}
        <div className="lg:col-span-5 text-black order-2 lg:order-1">
          
          {/* Numer z progress bar */}
          <div className="mb-8 relative">
            <div className="flex items-baseline gap-4 mb-4">
              <span 
                className="text-[clamp(5rem,12vw,10rem)] font-black leading-none tracking-tighter"
                style={{ 
                  color: currentService.accent,
                  transition: "color 0.6s ease"
                }}
              >
                {currentService.id}
              </span>
              <span className="text-sm uppercase tracking-[0.3em] text-black/40 font-medium">
                / 0{services.length}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-[2px] w-full bg-black/10 overflow-hidden rounded-full">
              <div 
                ref={progressRef}
                className="h-full rounded-full transition-all duration-100 ease-linear"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: currentService.accent
                }}
              />
            </div>
          </div>

          {/* Tytuł */}
          <div className="overflow-hidden mb-4">
            <h3 
              ref={titleRef}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
            >
              {currentService.title}
              <span 
                className="block text-[clamp(1rem,1.8vw,1.5rem)] font-normal tracking-wide mt-2 uppercase"
                style={{ color: currentService.accent }}
              >
                {currentService.subtitle}
              </span>
            </h3>
          </div>

          {/* Opis */}
          <div className="overflow-hidden">
            <p 
              ref={descRef}
              className="text-black/60 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed max-w-md font-light"
            >
              {currentService.desc}
            </p>
          </div>

          {/* Navigation dots */}
          <div className="flex gap-3 mt-10">
            {services.map((service, index) => (
              <button
                key={service.id}
                className="nav-dot group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: index === activeIndex ? currentService.accent : "transparent",
                  border: `2px solid ${index === activeIndex ? currentService.accent : "rgba(0,0,0,0.15)"}`,
                }}
                onClick={() => goToCard(index)}
                aria-label={`Go to ${service.title}`}
              >
                <span 
                  className="text-xs font-bold transition-colors duration-300"
                  style={{
                    color: index === activeIndex ? "#fff" : "rgba(0,0,0,0.4)"
                  }}
                >
                  {service.id}
                </span>
                
                {/* Hover tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <div className="mt-4 flex items-center gap-2 text-black/40 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
              <span className="uppercase tracking-wider text-xs">Paused</span>
            </div>
          )}
        </div>

        {/* PRAWA STRONA - KARTY */}
        <div 
          ref={cardsContainerRef}
          className="lg:col-span-7 relative h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
          style={{ perspective: "1200px" }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                zIndex: index === activeIndex ? 10 : 1,
                transformStyle: "preserve-3d",
              }}
              onClick={() => {
                const next = (index + 1) % services.length;
                goToCard(next);
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Obrazek */}
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply"
                style={{
                  background: `linear-gradient(135deg, ${service.accent}44 0%, transparent 60%)`
                }}
              />
              
              {/* Corner accent */}
              <div 
                className="absolute top-6 left-6 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md"
                style={{ backgroundColor: `${service.accent}dd` }}
              >
                <span className="text-white font-bold text-lg">{service.id}</span>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-white/60 text-sm uppercase tracking-wider">{service.subtitle}</span>
                    <h4 className="text-white text-2xl md:text-3xl font-bold mt-1">{service.title}</h4>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
                    style={{ backgroundColor: service.accent }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Click hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-black font-medium text-sm shadow-lg">
                  Click for next →
                </div>
              </div>
            </div>
          ))}

          {/* Decorative elements */}
          <div 
            className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 blur-2xl"
            style={{ backgroundColor: currentService.accent }}
          />
          <div 
            className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-15 blur-xl"
            style={{ backgroundColor: currentService.accent }}
          />
        </div>
      </div>

      {/* Floating service indicator (mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center gap-3 z-50">
        <span 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: currentService.accent }}
        />
        <span className="text-sm font-medium">{currentService.title}</span>
      </div>
    </div>
  );
}