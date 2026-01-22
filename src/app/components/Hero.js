"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesSection from "./ServicesSection"; 
import Link from "next/link";

// --- KOMPONENTY GRAFICZNE (Te małe w Hero) ---
const Image1 = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
    <div className="w-[30%] h-[40%] bg-gradient-to-t from-green-400 via-teal-300 to-blue-300 rounded-full" />
  </div>
);
const Image2 = () => (
  <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center gap-2 p-2">
    <div className="w-[25%] h-[40%] bg-white rounded-md transform -rotate-6" />
    <div className="w-[25%] h-[40%] bg-white rounded-md transform rotate-6" />
  </div>
);
const Image3 = () => (
  <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center">
    <div className="w-[30%] h-[25%] bg-green-200 rounded-full transform rotate-12" />
  </div>
);

// --- DANE SKLEPU (KOLORY ZAMIAST ZDJĘĆ) ---
const shopTemplates = [
    {
      id: 1,
      title: "Mono Portfolio",
      price: "1500 PLN",
      color: "#1c1c1c", // Ciemny szary
    },
    {
      id: 2,
      title: "E-Commerce Pro",
      price: "2500 PLN",
      color: "#2563eb", // Niebieski
    },
    {
      id: 3,
      title: "Restaurant Vibe",
      price: "1800 PLN",
      color: "#059669", // Zielony
    }
  ];

export default function Hero() {
  const [servicesVisible, setServicesVisible] = useState(false);
  
  // --- REFS ---
  const scrollContainerRef = useRef(null);
  const heroSliderRef = useRef(null);
  const starRef = useRef(null);
  const starContainerRef = useRef(null);
  const starPillRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroContentRef = useRef(null);
  const lettersRef = useRef([]);

  const floatingContainerRef = useRef(null);
  const floatingImg1Ref = useRef(null);
  const floatingImg2Ref = useRef(null);
  const floatingImg3Ref = useRef(null);

  const staticImg1Ref = useRef(null);
  const staticImg2Ref = useRef(null);
  const staticImg3Ref = useRef(null);

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

  const portfolioSectionRef = useRef(null);
  const portfolioTrackRef = useRef(null);
  const portfolioImagesRef = useRef([]); // Refy teraz wskazują na divy

  const shopSectionRef = useRef(null);
  const shopCardsRef = useRef([]);

  const whyUsPinRef = useRef(null);      
  const whyUsContentRef = useRef(null);  
  const whyUsTitleRef = useRef(null);    
  const rightColumnRef = useRef(null);   
  const stat92Ref = useRef(null);
  const bar92Ref = useRef(null);
  const stat100Ref = useRef(null);
  const stat30kRef = useRef(null);

  const testimonialsPinRef = useRef(null);
  const testimonialsTitleRef = useRef(null);
  const testimonialCardsRef = useRef([]);

  const thatMatterText = "które mają znaczenia";

  // --- DANE PORTFOLIO (KOLORY ZAMIAST ZDJĘĆ) ---
  const projects = [
    { id: 1, title: 'Yelonmedia', category: 'Website', tags: ['Next.js', 'WebGL'], color: '#334155' },
    { id: 2, title: 'Dawid Duda', category: 'Web App', tags: ['React', 'Node.js'], color: '#475569' },
    { id: 3, title: 'FinTech Dash', category: 'SaaS', tags: ['Vue', 'D3.js'], color: '#64748b' },
    { id: 4, title: 'Social AI', category: 'Mobile', tags: ['React Native', 'OpenAI'], color: '#94a3b8' },
    { id: 5, title: 'Neon City', category: 'Concept', tags: ['UE5', 'Blender'], color: '#cbd5e1' },
  ];

  const features = [
    { id: 1, type: "text", content: "We provide tailored solutions built on creativity, precision, and trust—ensuring quality results and a smooth experience every step of the way." },
    { id: 2, type: "stat-92", value: "92", suffix: "%", label: "Client satisfaction rate, fostering long-term relationships and repeat business" },
    { id: 3, type: "stat-100", value: "100", suffix: "+", label: "Active users experiencing our design every day via products we made" },
    { id: 4, type: "stat-30k", value: "30", suffix: "K", label: "Delivered a high-quality project with exceptional attention to detail" },
    { id: 5, type: "last-card", content: "We deliver creative solutions with quality results that make an impact." },
  ];

  const testimonials = [
    { id: 1, name: "Bistro Miarki 8", imgColor: "bg-yellow-400", rating: "5/5", headline: "Great design", quote: "Bardzo dobra współpraca, super kontakt, szybka realizacja projektu." },
    { id: 2, name: "Andrew Smith", role: "Owner of Ajay.", imgColor: "bg-green-500", rating: "5/5", headline: "Awesome Work", quote: "Professional, detail-oriented, and genuinely invested in our success. We couldn't have asked for a better partner." },
    { id: 3, name: "Sarah Jones", role: "CTO at TechFlow", imgColor: "bg-blue-500", rating: "5/5", headline: "Incredible", quote: "The visual impact of the new site is incredible. Conversions are up by 40% in just the first month." },
    { id: 4, name: "Michael Ross", role: "Founder at NextLevel", imgColor: "bg-orange-500", rating: "5/5", headline: "Top Class", quote: "Simply the best agency we've worked with. Their creativity and technical skills are unmatched in the industry." },
    { id: 5, name: "Emma Watson", role: "Director at Creative", imgColor: "bg-purple-500", rating: "4.8/5", headline: "Visionary", quote: "They took our rough ideas and turned them into a digital masterpiece. The process was smooth and transparent." },
    { id: 6, name: "James Lee", role: "CEO of Horizon", imgColor: "bg-teal-500", rating: "5/5", headline: "Game Changer", quote: "Our new platform is faster, sleeker, and more user-friendly than ever. This team truly delivers results." }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
        const getPlaceholderState = (placeholderRef) => {
            if (!placeholderRef.current) return { top: 0, left: 0, width: 100, height: 100 };
            const rect = placeholderRef.current.getBoundingClientRect();
            return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
        };

        // 1. HERO
        gsap.to(starRef.current, { rotation: 360, transformOrigin: "center center", duration: 15, repeat: -1, ease: "none" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: scrollContainerRef.current, start: "top top", end: "40% top", scrub: 1 } });
        tl.to(starContainerRef.current, { right: "50%", xPercent: 50, duration: 1.5, ease: "power2.inOut" }, 0);
        tl.to(starPillRef.current, { width: "clamp(100px, 12vw, 180px)", duration: 1.5, ease: "power2.inOut" }, 0);
        tl.to(starPillRef.current, { backgroundColor: "#000000", duration: 0.8, ease: "power2.inOut" }, 1.2);
        tl.to(starRef.current, { fill: "#ffffff", duration: 0.8, ease: "power2.inOut" }, 1.2);
        tl.to(starRef.current, { rotation: 720, duration: 3, ease: "power1.inOut" }, 0);
        tl.to(heroSliderRef.current, { x: "-148vw", duration: 4, ease: "power2.inOut" }, 1.5);
        lettersRef.current.forEach((l, i) => l && tl.to(l, { color: "#000000", duration: 0.3, ease: "power2.out" }, 2 + i * 0.1));
        tl.to(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 1 }, 3);

        const tl2 = gsap.timeline({ scrollTrigger: { trigger: scrollContainerRef.current, start: "40% top", end: "60% top", scrub: 1 } });
        tl2.fromTo(floatingImg1Ref.current, { opacity: 0, scale: 0.4, rotation: -15 }, { opacity: 1, scale: 1, rotation: 0 }, 0);
        tl2.fromTo(floatingImg2Ref.current, { opacity: 0, scale: 0.4, rotation: 10 }, { opacity: 1, scale: 1, rotation: 0 }, 0.2);
        tl2.fromTo(floatingImg3Ref.current, { opacity: 0, scale: 0.4, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0 }, 0.4);

        const tl3 = gsap.timeline({ scrollTrigger: { trigger: scrollContainerRef.current, start: "50% top", end: "85% top", scrub: 1 } });
        tl3.to([floatingImg1Ref.current, floatingImg2Ref.current, floatingImg3Ref.current], { top: "40%", left: "50%", xPercent: -50, scale: 0.6, duration: 2 }, 0);
        tl3.to(heroContentRef.current, { opacity: 0, duration: 1 }, 1.5);

        // 2. SERVICES
        const pairs = [
            { floating: floatingImg1Ref.current, placeholder: placeholder1Ref },
            { floating: floatingImg2Ref.current, placeholder: placeholder2Ref },
            { floating: floatingImg3Ref.current, placeholder: placeholder3Ref },
        ];
        const finalTl = gsap.timeline({
            scrollTrigger: { trigger: secondSectionRef.current, start: "center center", end: "+=220%", scrub: 1, pin: true, invalidateOnRefresh: true, onUpdate: (self) => { if (self.progress < 0.7) setServicesVisible(false); } },
        });
        pairs.forEach((pair) => {
            finalTl.to(pair.floating, { x: 0, y: 0, xPercent: 0, top: () => getPlaceholderState(pair.placeholder).top, left: () => getPlaceholderState(pair.placeholder).left, width: () => getPlaceholderState(pair.placeholder).width, height: () => getPlaceholderState(pair.placeholder).height, scale: 1, rotation: 0, borderRadius: "0.5rem", duration: 1, ease: "power2.inOut" }, 0);
        });
        finalTl.fromTo(arrowRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
        finalTl.fromTo(ctaButtonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.3);
        finalTl.set([floatingImg1Ref.current, floatingImg2Ref.current, floatingImg3Ref.current], { opacity: 0 }, 1);
        finalTl.set([staticImg1Ref.current, staticImg2Ref.current, staticImg3Ref.current], { opacity: 1 }, 1);
        finalTl.addLabel("curtain", 1.5);
        finalTl.to(curtainRef.current, { y: "0%", ease: "none", duration: 2 }, "curtain");
        finalTl.to(line3Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=0.5");
        finalTl.to(ctaButtonRef.current, { opacity: 0, duration: 0.3 }, "curtain+=0.5");
        finalTl.to(line2Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=1.0");
        finalTl.to(arrowRef.current, { opacity: 0, duration: 0.3 }, "curtain+=1.0");
        finalTl.to(line1Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=1.5");
        finalTl.to([staticImg1Ref.current, staticImg2Ref.current, staticImg3Ref.current], { opacity: 0, duration: 0.3 }, "curtain+=1.5");
        finalTl.addLabel("collapse", 3.5);
        const gapElements = [placeholder1Ref.current, placeholder2Ref.current, placeholder3Ref.current, arrowWrapperRef.current, buttonWrapperRef.current];
        finalTl.to(gapElements, { width: 0, marginLeft: 0, marginRight: 0, padding: 0, duration: 1.5, ease: "power2.inOut" }, "collapse");
        finalTl.addLabel("fadeText", 5);
        finalTl.to([line1Ref.current, line2Ref.current, line3Ref.current], { opacity: 0, y: -50, filter: "blur(10px)", duration: 1, ease: "power2.in" }, "fadeText");
        finalTl.addLabel("showServices", 5.5);
        finalTl.to(servicesContainerRef.current, { opacity: 1, duration: 1, ease: "power2.out", onStart: () => setServicesVisible(true) }, "showServices");
        finalTl.to({}, { duration: 0.5 });

        // 3. PORTFOLIO
        const track = portfolioTrackRef.current;
        const container = portfolioSectionRef.current;
        if (track && container) {
            const scrollLength = track.scrollWidth - window.innerWidth;
            const tlPortfolio = gsap.timeline({
                scrollTrigger: { trigger: container, start: 'top top', end: () => `+=${scrollLength}`, pin: true, scrub: 1, invalidateOnRefresh: true }
            });
            tlPortfolio.to(track, { x: -scrollLength, ease: "none" });
            // Parallax dla divów (zamiast zdjęć)
            if (portfolioImagesRef.current.length > 0) {
                portfolioImagesRef.current.forEach((el) => {
                    if (el) {
                        gsap.to(el, {
                            scale: 1.4, // Delikatny zoom koloru
                            ease: "none",
                            scrollTrigger: { trigger: container, start: "top top", end: () => `+=${scrollLength}`, scrub: 1 }
                        });
                    }
                });
            }
        }

        // SHOP ANIMATION
        shopCardsRef.current.forEach((card, index) => {
            if(card) {
                gsap.fromTo(card, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } })
            }
        });

        // 4. WHY US
        const cardsWrapper = rightColumnRef.current;
        if (cardsWrapper) {
            const cardsHeight = cardsWrapper.scrollHeight;
            const viewportHeight = window.innerHeight;
            const targetY = -(cardsHeight - viewportHeight + 150); 
            gsap.set(cardsWrapper, { y: "150vh" });
            const whyUsTl = gsap.timeline({ scrollTrigger: { trigger: whyUsPinRef.current, start: "top top", end: "+=4000", pin: true, scrub: 1, anticipatePin: 1 } });
            whyUsTl.to({}, { duration: 0.5 });
            whyUsTl.to(whyUsContentRef.current, { backgroundColor: "#000000", duration: 1, ease: "power2.inOut" }, "colorChange");
            whyUsTl.to(whyUsTitleRef.current, { color: "#ffffff", duration: 1, ease: "power2.inOut" }, "colorChange");
            whyUsTl.to(cardsWrapper, { y: targetY, duration: 6, ease: "none" }, ">-0.5"); 
            if (stat92Ref.current) ScrollTrigger.create({ trigger: stat92Ref.current, containerAnimation: whyUsTl, start: "top 90%", onEnter: () => { gsap.from(stat92Ref.current, { textContent: 0, duration: 1.5, snap: { textContent: 1 }, ease: "power1.out" }); gsap.fromTo(bar92Ref.current, { width: "0%" }, { width: "92%", duration: 1.5, ease: "power1.out" }); }, once: true });
            if (stat100Ref.current) ScrollTrigger.create({ trigger: stat100Ref.current, containerAnimation: whyUsTl, start: "top 90%", onEnter: () => gsap.from(stat100Ref.current, { textContent: 0, duration: 1.5, snap: { textContent: 1 }, ease: "power1.out" }), once: true });
            if (stat30kRef.current) ScrollTrigger.create({ trigger: stat30kRef.current, containerAnimation: whyUsTl, start: "top 90%", onEnter: () => gsap.from(stat30kRef.current, { textContent: 0, duration: 1.5, snap: { textContent: 1 }, ease: "power1.out" }), once: true });
        }

        // 5. TESTIMONIALS
        const testCards = testimonialCardsRef.current;
        if(testCards.length > 0) {
            const tlTest = gsap.timeline({ scrollTrigger: { trigger: testimonialsPinRef.current, start: "top top", end: "+=4500", pin: true, scrub: 1, anticipatePin: 1 } });
            tlTest.to(testimonialsTitleRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.5, ease: "power2.in" });
            testCards.forEach((card, index) => {
                tlTest.fromTo(card, { y: "120vh", rotationX: -45, opacity: 0, scale: 0.8, transformOrigin: "center top" }, { y: "0%", rotationX: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
                if (index !== testCards.length - 1) { tlTest.to(card, { y: "-120vh", rotationX: 45, opacity: 0, scale: 0.8, duration: 1, ease: "power2.in" }, "+=0.2"); }
            });
        }
    }); 
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={scrollContainerRef} className="h-[200vh] bg-white">
        <div ref={heroContentRef} className="fixed top-0 left-0 w-full h-screen flex items-center overflow-hidden" style={{ zIndex: 30 }}>
          <div ref={heroSliderRef} className="flex items-center px-[5vw]">
            <h1 className="text-[clamp(11rem,23vw,21rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-black">Strony</h1>
            <div ref={starPillRef} className="mx-[1.5vw] bg-[#e5e5e5] rounded-full relative overflow-hidden" style={{ width: "clamp(250px, 28vw, 450px)", height: "clamp(100px, 12vw, 180px)" }}>
              <div ref={starContainerRef} className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ right: "clamp(12px, 1.5vw, 24px)", width: "clamp(70px, 8vw, 130px)", height: "clamp(70px, 8vw, 130px)" }}>
                <svg ref={starRef} viewBox="0 0 100 100" className="w-full h-full fill-black"><path d="M45,0 L55,0 L55,35 L85,15 L90,25 L65,45 L100,45 L100,55 L65,55 L90,75 L85,85 L55,65 L55,100 L45,100 L45,65 L15,85 L10,75 L35,55 L0,55 L0,45 L35,45 L10,25 L15,15 L45,35 Z" /></svg>
              </div>
            </div>
            <h1 className="text-[clamp(11rem,23vw,21rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap">
              {thatMatterText.split("").map((char, index) => (
                <span key={index} ref={(el) => (lettersRef.current[index] = el)} className="inline-block text-gray-300 transition-colors duration-100">{char === " " ? "\u00A0" : char}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div ref={floatingContainerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        <div ref={floatingImg1Ref} className="absolute w-[180px] h-[220px] rounded-3xl overflow-hidden shadow-2xl opacity-0" style={{ left: "10%", top: "15%" }}><Image1 /></div>
        <div ref={floatingImg2Ref} className="absolute w-[200px] h-[240px] rounded-3xl overflow-hidden shadow-2xl opacity-0" style={{ left: "40%", top: "25%" }}><Image2 /></div>
        <div ref={floatingImg3Ref} className="absolute w-[180px] h-[180px] rounded-3xl overflow-hidden shadow-2xl opacity-0" style={{ right: "15%", top: "35%" }}><Image3 /></div>
      </div>

      {/* SERVICES */}
      <section ref={secondSectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white" style={{ zIndex: 40 }}>
      <div ref={curtainRef} className="absolute left-0 bottom-0 w-full h-full overflow-hidden translate-y-full" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb] to-[#60a5fa]" />
        <svg className="absolute bottom-0 left-0 w-full h-full text-white opacity-20 transform scale-150 origin-bottom-left" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <svg className="absolute bottom-[-10%] right-[-10%] w-[120%] h-full text-blue-300 opacity-30 mix-blend-overlay" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path fill="currentColor" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,80C840,85,960,139,1080,154.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </div>
      <div className="relative max-w-7xl mx-auto text-center px-2 md:px-4 py-20 pointer-events-none" style={{ zIndex: 10 }}>
          <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-black">
            <span ref={line1Ref} className="block transition-colors duration-0"><span className="inline-flex items-center justify-center flex-wrap md:flex-nowrap gap-x-2 gap-y-2">Jesteśmy <span ref={placeholder1Ref} className="inline-block w-[clamp(50px,8vw,90px)] h-[clamp(60px,10vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"><div ref={staticImg1Ref} className="w-full h-full opacity-0"><Image1 /></div></span><span ref={placeholder2Ref} className="inline-block w-[clamp(50px,8vw,90px)] h-[clamp(60px,10vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"><div ref={staticImg2Ref} className="w-full h-full opacity-0"><Image2 /></div></span><span ref={placeholder3Ref} className="inline-block w-[clamp(50px,8vw,90px)] h-[clamp(60px,10vw,110px)] rounded-lg align-middle relative overflow-hidden mx-1 md:mx-2"><div ref={staticImg3Ref} className="w-full h-full opacity-0"><Image3 /></div></span> kreatywnym</span></span>
            <span ref={line2Ref} className="block mt-1 md:mt-4 transition-colors duration-0"><span className="inline-flex items-center justify-center flex-wrap md:flex-nowrap gap-x-2">studiem <span ref={arrowWrapperRef} className="inline-block mx-2 md:mx-4 overflow-hidden align-middle"><span ref={arrowRef} className="inline-block text-red-500 opacity-0"><svg className="w-[clamp(35px,5vw,60px)] h-[clamp(35px,5vw,60px)]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></span></span> tworzącym</span></span>
            <span ref={line3Ref} className="block mt-1 md:mt-4 transition-colors duration-0"><span className="inline-flex items-center justify-center flex-wrap md:flex-nowrap gap-x-2">skuteczne <span ref={buttonWrapperRef} className="inline-block mx-2 md:mx-4 overflow-hidden align-middle pointer-events-auto"><span ref={ctaButtonRef} className="inline-block opacity-0"><button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full text-[clamp(0.9rem,1.5vw,1.3rem)] transition-colors cursor-pointer whitespace-nowrap">Sprawdź nas</button></span></span> rozwiązania.</span></span>
          </h2>
      </div>
      <div ref={servicesContainerRef} className="absolute inset-0 w-full h-full opacity-0" style={{ zIndex: 30 }}><ServicesSection key={servicesVisible ? 'visible' : 'hidden'} isVisible={servicesVisible} /></div>
      </section>
      
      {/* PORTFOLIO SECTION */}
      <section ref={portfolioSectionRef} className="relative h-screen bg-white overflow-hidden text-black" style={{ zIndex: 30 }}>
        {/* NAGŁÓWEK */}
        <div className="absolute top-22 left-0 w-full px-8 md:px-20 z-20 pointer-events-none flex justify-between items-end mix-blend-difference text-white">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none shrink-0 uppercase">
            Nasze ostatnie<br /><span className="text-white">projekty</span>
          </h2>
          <p className="max-w-xs md:mb-3 text-sm md:text-base font-medium leading-normal md:text-right">
            Poniżej znajduja sie nasze ostatnie projekty <br/>zescroluj w bok aby zobaczyc naszą pełną galerie. 
          </p>
        </div>

        {/* TRACK */}
        <div ref={portfolioTrackRef} className="flex h-full w-max items-center pl-8 md:pl-20 pr-20 pt-20">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="relative h-[80vh] w-[70vw] md:w-[60vw] lg:w-[50vw] flex-shrink-0 mr-8 group overflow-hidden bg-gray-100 rounded-4xl"
            >
              <div className="relative w-full h-full overflow-hidden bg-gray-200">
                 {/* ZAMIAST IMG - DIV Z KOLOREM (PLACEHOLDER) */}
                 <div 
                    ref={el => portfolioImagesRef.current[index] = el}
                    className="w-full h-full scale-125 transition-transform duration-700 ease-out" 
                    style={{ backgroundColor: project.color }} 
                 />
                 
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                 <div className="absolute bottom-0 left-0 w-full p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full backdrop-blur-sm">{project.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">{project.title}</h3>
                 </div>
              </div>
              <span className="absolute top-4 right-6 text-9xl font-black text-white mix-blend-overlay opacity-50 z-10 select-none">
                0{index + 1}
              </span>
            </div>
          ))}

          <div className="h-[80vh] w-[300px] flex-shrink-0 flex items-center justify-center border-l border-gray-100 ml-8">
             <Link href="/portfolio" className="group flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
                <span className="text-xl font-bold uppercase tracking-widest">View All Projects</span>
             </Link>
          </div>
        </div>
      </section>

      {/* --- SHOP / TEMPLATES SECTION (NOWA SEKCJA - KOLORY) --- */}
      <section ref={shopSectionRef} className="relative py-32 bg-white text-black z-40 overflow-hidden">
        <div className="px-8 md:px-20 mb-20 flex flex-col md:flex-row justify-between items-end">
            <div>
                <span className="text-blue-600 font-bold uppercase tracking-widest mb-4 block">Gotowe rozwiązania</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                    Kup szablon & <br/>Zacznij szybciej
                </h2>
            </div>
            <Link href="/sklep" className="hidden md:flex items-center gap-2 font-bold text-lg border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                Zobacz wszystkie szablony ↗
            </Link>
        </div>

        <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {shopTemplates.map((template, index) => (
                <Link href="/sklep" key={template.id} className="group cursor-pointer">
                    <div 
                        ref={el => shopCardsRef.current[index] = el}
                        className="relative aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden mb-6"
                    >
                        {/* ZAMIAST NEXT/IMAGE - DIV Z KOLOREM */}
                        <div 
                            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{ backgroundColor: template.color }}
                        />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                Zobacz szczegóły
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-blue-600 transition-colors">{template.title}</h3>
                        <span className="text-lg font-bold bg-black text-white px-3 py-1 rounded-lg">{template.price}</span>
                    </div>
                </Link>
            ))}
        </div>
        
        <div className="mt-12 px-8 md:hidden">
            <Link href="/sklep" className="flex items-center gap-2 font-bold text-lg border-b border-black pb-1">
                Zobacz wszystkie szablony ↗
            </Link>
        </div>
      </section>

      {/* --- WHY US SECTION --- */}
      <section 
        ref={whyUsPinRef} 
        className="relative h-screen w-full bg-white overflow-hidden" 
        style={{ zIndex: 50 }}
      >
          <div ref={whyUsContentRef} className="w-full h-full flex flex-col md:flex-row bg-white text-black relative px-8 md:px-20">
              <div className="w-full md:w-1/2 flex items-center justify-start h-full">
                  <h2 ref={whyUsTitleRef} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                    Why client <br />
                    choose us
                  </h2>
              </div>
              <div ref={rightColumnRef} className="w-full md:w-1/2 flex flex-col gap-6 pt-32 pb-32">
                {features.map((item) => (
                  <div key={item.id} className={`feature-card p-10 rounded-[2rem] flex flex-col justify-between shadow-xl border border-gray-100 ${item.type === "last-card" ? "bg-blue-600 text-white min-h-[300px]" : "bg-white text-black min-h-[300px]"}`}>
                    {item.type === "text" && <p className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">{item.content}</p>}
                    {item.type === "stat-92" && (
                      <>
                        <div className="flex justify-between items-start w-full">
                          <span className="text-8xl font-medium tracking-tighter flex"><span ref={stat92Ref}>{item.value}</span>{item.suffix}</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full mt-6 overflow-hidden"><div ref={bar92Ref} className="h-full bg-red-600 rounded-full w-0" /></div>
                        </div>
                        <p className="text-lg opacity-80 mt-8 font-medium border-t border-current/10 pt-6">{item.label}</p>
                      </>
                    )}
                    {item.type === "stat-100" && (
                        <>
                            <div className="flex justify-between items-start w-full">
                                <span className="text-8xl font-medium tracking-tighter flex"><span ref={stat100Ref}>{item.value}</span>{item.suffix}</span>
                                <div className="flex -space-x-4 mt-6">
                                    <div className="w-12 h-12 rounded-full bg-red-400 border-4 border-white"></div>
                                    <div className="w-12 h-12 rounded-full bg-blue-400 border-4 border-white"></div>
                                    <div className="w-12 h-12 rounded-full bg-yellow-400 border-4 border-white"></div>
                                </div>
                            </div>
                            <p className="text-lg opacity-80 mt-8 font-medium border-t border-current/10 pt-6">{item.label}</p>
                        </>
                    )}
                    {item.type === "stat-30k" && (
                      <>
                        <div className="flex justify-between items-start">
                          <span className="text-8xl font-medium tracking-tighter flex"><span ref={stat30kRef}>{item.value}</span>{item.suffix}</span>
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mt-6"><span className="text-2xl">🚀</span></div>
                        </div>
                        <p className="text-lg opacity-80 mt-8 font-medium border-t border-current/10 pt-6">{item.label}</p>
                      </>
                    )}
                    {item.type === "last-card" && (
                      <div className="flex flex-col h-full justify-center">
                         <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mb-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>
                         <p className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
          </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section 
        ref={testimonialsPinRef} 
        className="relative h-screen w-full bg-white overflow-hidden perspective-1000 "
        style={{ zIndex: 50 }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-4 relative">
            <h2 ref={testimonialsTitleRef} className="text-5xl md:text-7xl font-black text-center text-black mb-12 tracking-tighter">Testimonials from our clients.</h2>
            <div className="relative w-full max-w-[450px] h-[650px]"> 
                {testimonials.map((t, index) => (
                    <div 
                        key={t.id}
                        ref={el => testimonialCardsRef.current[index] = el}
                        className="absolute top-0 left-0 w-full h-full bg-[#F3F4F6] rounded-[2.5rem]  p-0 border border-gray-100 origin-center"
                        style={{ zIndex: testimonials.length - index, opacity: 0 }} 
                    >
                        {/* UKŁAD WEWNĄTRZ KARTY */}
                        <div className="relative w-full h-full">
                            {/* 1. NAME TAG */}
                            <div className="absolute top-32 left-[-160] bg-white px-8 py-4 rounded-3xl shadow-xl flex flex-col items-start z-20">
                                <span className="font-bold text-4xl text-black">{t.name}</span>
                                <span className="text-xl text-gray-500 font-medium">{t.role}</span>
                            </div>
                            {/* 2. RATING TAG */}
                            <div className="absolute top-60 right-[-230] bg-white px-6 py-4 rounded-4xl shadow-xl flex flex-col items-center gap-3 z-20">
                                <div className="flex text-yellow-400 gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-10 h-10 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                    <span className="text-black text-xl font-bold pl-4">({t.rating})</span>
                                </div>
                                <span className="text-black text-3xl font-bold border-l border-gray-200 pl-3 ml-1">- {t.headline}</span>
                            </div>
                            {/* 3. AVATAR */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10">
                                <div className={`w-full h-full ${t.imgColor}`}></div>
                            </div>
                            {/* 4. QUOTE */}
                            <div className="absolute bottom-[30] right-60 w-full bg-white p-8 rounded-3xl shadow-xl z-20">
                                <p className="text-xl md:text-2xl font-medium text-black leading-tight tracking-tight text-center">"{t.quote}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="relative h-screen bg-[#0a0a0a] text-white flex flex-col justify-between overflow-hidden mt-20" style={{ zIndex: 60 }}>
        
        {/* TŁO */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_transparent_70%)]" />
        </div>

        {/* GŁÓWNA TREŚĆ */}
        <div className="flex-grow flex flex-col items-center justify-center relative z-10">
            {/* KINETIC TYPOGRAPHY */}
            <div className="w-full overflow-hidden mb-12">
                <h2 className="text-[clamp(4rem,15vw,16rem)] font-black uppercase leading-[0.8] tracking-tighter text-center whitespace-nowrap animate-marquee pb-15">
                    Zacznijmy współpracę Zacznijmy współpracę
                </h2>
            </div>

            {/* CTA BUTTON */}
            <Link 
              href="/kontakt" 
              className="group relative inline-flex items-center justify-center w-[clamp(200px,30vw,400px)] h-[clamp(200px,30vw,400px)] rounded-full bg-white text-black transition-transform duration-500 hover:scale-110"
            >
                <div className="absolute inset-0 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <span className="text-xl text-center md:text-3xl font-bold uppercase tracking-widest group-hover:text-white transition-colors">Skontaktuj się z nami</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12 group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" />
                    </svg>
                </div>
            </Link>
        </div>

        {/* FOOTER */}
        <div className="w-full px-10 md:px-20 py-10 flex flex-col md:flex-row justify-between items-end border-t border-white/10 relative z-10 bg-[#0a0a0a]">
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
                <div className="flex gap-6 text-lg font-medium">
                    <a href="#" className="hover:text-blue-500 transition-colors">Strona główna</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Usługi</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Portfolio</a>
                </div>
            </div>
            
            <div className="text-right">
                <span className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-white/5 absolute bottom-[-20px] right-0 pointer-events-none select-none">
                    AppLike
                </span>
                <p className="text-sm text-gray-500 uppercase tracking-widest relative z-10">© 2024 Applike. Wszystkie prawa zastrzeżone.</p>
            </div>
        </div>
      </section>
    </>
  );
}