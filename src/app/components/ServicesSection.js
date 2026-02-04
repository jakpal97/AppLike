"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// --- KOMPONENTY MOCKUPÓW ---

function PhoneMockup({ videoSrc, posterSrc, className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current) videoRef.current.play(); }, []);

  return (
    <div className={`relative scale-[0.8] lg:scale-100 ${className}`}>
      <div className="relative w-[280px] sm:w-[300px] mx-auto">
        <div className="relative bg-[#1d1d1f] rounded-[3.5rem] p-[10px] sm:p-[12px] shadow-2xl">
          <div className="relative bg-black rounded-[3rem] p-[3px]">
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-30 flex items-center justify-center">
               <div className="w-2 h-2 bg-zinc-800 rounded-full" />
            </div>
            <div className="relative w-full h-[500px] sm:h-[598px] bg-white rounded-[2.75rem] overflow-hidden">
              <video ref={videoRef} autoPlay loop muted playsInline poster={posterSrc} className="w-full h-full object-cover">
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaptopMockup({ videoSrc, posterSrc, imageSrc, className = "" }) {
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current) videoRef.current.play(); }, []);

  return (
    <div className={`relative scale-[0.6] sm:scale-[0.85] lg:scale-100 ${className}`}>
      <div className="relative w-[90vw] max-w-[620px] mx-auto">
        <div className="relative bg-[#1d1d1f] rounded-t-2xl p-2 sm:p-3 shadow-2xl">
          <div className="relative bg-black rounded-t-xl p-1 sm:p-2 overflow-hidden">
            <div className="relative w-full aspect-[16/10] bg-zinc-900 rounded-lg overflow-hidden">
              {videoSrc ? (
                <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : (
                <img src={imageSrc} alt="Screen" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
        <div className="relative h-4 bg-gradient-to-b from-[#2d2d2f] to-[#1d1d1f] rounded-b-2xl shadow-lg" />
      </div>
    </div>
  );
}

// --- DANE ---
const services = [
  { id: "01", title: "Strony WWW", accent: "#ff3d00", type: "laptop", imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", desc: "Responsywne strony internetowe, które wyróżniają Twoją markę i przekonują odwiedzających do działania." },
  { id: "02", title: "Aplikacje Web", accent: "#0066ff", type: "image", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", desc: "Dedykowane rozwiązania webowe z panelami administracyjnymi i integracjami dopasowanymi do Twojego biznesu." },
  { id: "03", title: "Aplikacje Mobile", accent: "#00c853", type: "phone", videoSrc: "/videos/app-demo.mp4", desc: "Natywne i hybrydowe aplikacje mobilne zapewniające płynne doświadczenia na wszystkich urządzeniach." },
  { id: "04", title: "Ads & SEO", accent: "#8E4585", type: "image", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", desc: "Kompleksowe kampanie reklamowe i optymalizacja SEO zwiększające widoczność i konwersje Twojej firmy." },
];

export default function ServicesSection({ isVisible = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToCard = useCallback((index) => {
    if (index === activeIndex) return;
    const direction = index > activeIndex ? 1 : -1;
    
    gsap.to(cardRefs.current[activeIndex], { y: direction * -40, opacity: 0, duration: 0.4 });
    gsap.fromTo(cardRefs.current[index], { y: direction * 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    
    gsap.to([titleRef.current, descRef.current], {
      opacity: 0, y: -10, onComplete: () => {
        setActiveIndex(index);
        gsap.to([titleRef.current, descRef.current], { opacity: 1, y: 0, duration: 0.4 });
      }
    });
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => setProgress(p => p < 100 ? p + 0.5 : 100), 35);
    const autoChange = setInterval(() => goToCard((activeIndex + 1) % services.length), 7000);
    return () => { clearInterval(interval); clearInterval(autoChange); };
  }, [activeIndex, isVisible, goToCard]);

  const current = services[activeIndex];

  return (
    <div className="relative w-full min-h-screen flex bg-white items-center justify-center px-4 lg:px-20 py-10 lg:py-20 overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 w-full max-w-[1500px] items-center">
        
        {/* WIZUALIZACJA - NA GÓRZE NA MOBILE */}
        <div className="w-full lg:col-span-7 relative h-[350px] sm:h-[450px] lg:min-h-[600px] flex items-center justify-center order-1 lg:order-2">
          <div className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-700"
               style={{ backgroundColor: current.accent }} />
          
          {services.map((s, i) => (
            <div key={s.id} ref={el => cardRefs.current[i] = el} 
                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
                 style={{ opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 10 : 0 }}>
              <div className="pointer-events-auto">
                {s.type === "laptop" ? <LaptopMockup imageSrc={s.imageSrc} /> :
                 s.type === "phone" ? <PhoneMockup videoSrc={s.videoSrc} /> :
                 <div className="w-[280px] sm:w-[500px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 bg-white">
                   <img src={s.img} className="w-full h-full object-cover" alt={s.title} />
                 </div>}
              </div>
            </div>
          ))}
        </div>

        {/* TEKST - POD OBRAZKIEM NA MOBILE */}
        <div className="w-full lg:col-span-5 z-20 order-2 lg:order-1 text-center lg:text-left px-2">
          <div className="mb-4 lg:mb-6 flex flex-col items-center lg:items-start">
            <span className="text-[16vw] lg:text-[10vw] font-black leading-none opacity-10 block" style={{ color: current.accent }}>
              {current.id}
            </span>
            <div className="h-1 w-20 mt-[-10px] lg:mt-[-20px] mb-4" style={{ backgroundColor: current.accent }} />
          </div>

          <div ref={titleRef}>
            <h3 className="text-[10vw] lg:text-[6vw] font-black text-black leading-[0.9] tracking-tighter uppercase mb-4 lg:mb-6">
              {current.title}
            </h3>
          </div>
          
          <div ref={descRef}>
            <p className="text-base lg:text-xl text-black/50 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium mb-8">
              {current.desc}
            </p>
          </div>

          <button className="group flex items-center gap-4 mx-auto lg:mx-0 px-8 py-4 bg-black text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl">
            <span className="font-bold uppercase tracking-widest text-[10px] lg:text-xs">Explore Project</span>
            <span className="text-lg lg:text-xl group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* NAWIGACJA - DOPASOWANA DO MOBILA */}
      <div className="fixed bottom-6 lg:bottom-auto lg:right-10 flex lg:flex-col gap-3 z-50 bg-white/90 p-3 lg:p-0 rounded-full lg:rounded-none shadow-lg lg:shadow-none backdrop-blur-md">
        {services.map((_, i) => (
          <button key={i} onClick={() => goToCard(i)} className="transition-all duration-500 rounded-full"
            style={{ 
              height: isDesktop ? (activeIndex === i ? '60px' : '20px') : '6px',
              width: isDesktop ? '6px' : (activeIndex === i ? '40px' : '12px'),
              backgroundColor: activeIndex === i ? current.accent : '#d1d5db'
            }} />
        ))}
      </div>
    </div>
  );
}