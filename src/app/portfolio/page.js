"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// --- DANE PROJEKTÓW ---
const allProjects = [
  {
    id: 1,
    title: "Yelonmedia",
    category: "Website / Development",
    year: "2024",
    image: "https://images.unsplash.com/photo-1481487484168-9b9301523d49?q=80&w=1600&auto=format&fit=crop",
    description: "Kompletny rebranding i strona korporacyjna dla agencji mediowej."
  },
  {
    id: 2,
    title: "Dawid Duda",
    category: "Web App / Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    description: "Aplikacja treningowa z zaawansowaną analityką postępów."
  },
  {
    id: 3,
    title: "FinTech Dash",
    category: "SaaS / UX Research",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    description: "Dashboard finansowy dla sektora bankowości enterprise."
  },
  {
    id: 4,
    title: "Social AI",
    category: "Mobile App",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    description: "Rewolucyjna aplikacja społecznościowa napędzana przez AI."
  },
  {
    id: 5,
    title: "Neon City",
    category: "Concept Art / 3D",
    year: "2023",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1600&auto=format&fit=crop",
    description: "Wizualizacje 3D dla nowej gry typu cyberpunk."
  },
  {
    id: 6,
    title: "Eco House",
    category: "Architecture",
    year: "2022",
    image: "https://images.unsplash.com/photo-1600596542815-2a4d9f6fac52?q=80&w=1600&auto=format&fit=crop",
    description: "Strona sprzedażowa dla nowoczesnego osiedla ekologicznego."
  }
];

export default function PortfolioPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // 1. Animacja wejścia tytułu
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Animacja projektów
      projectRefs.current.forEach((el, index) => {
        if (!el) return;
        
        gsap.fromTo(el, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );

        const img = el.querySelector("img");
        if (img) {
            gsap.fromTo(img,
                { scale: 1.2, y: "-10%" },
                {
                    y: "10%",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full text-black selection:bg-black selection:text-white">
      
      

      {/* HEADER */}
      <header className="pt-40 pb-20 px-8 md:px-20 relative">
        <div className="border-b border-gray-200 pb-12">
            <h1 ref={titleRef} className="text-[clamp(3.5rem,11vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase mb-8 text-black">
              Nasze <br/>
              Portfolio
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <p className="max-w-md text-lg font-medium text-gray-600">
                    Wyselekcjonowane projekty, które definiują naszą pasję do designu i technologii. Zobacz, co stworzyliśmy dla naszych klientów.
                </p>
                <div className="text-sm font-bold uppercase tracking-widest border border-black px-4 py-2 rounded-full">
                    {allProjects.length} Projects
                </div>
            </div>
        </div>
      </header>

      {/* PROJECTS GRID */}
      <section className="px-4 md:px-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 w-full">
            
            {allProjects.map((project, index) => (
                <Link 
                    href={`/portfolio/${project.id}`} // LINKUJEMY PO ID
                    key={project.id}
                    ref={el => projectRefs.current[index] = el}
                    className={`flex flex-col gap-6 group cursor-pointer block ${index % 2 !== 0 ? 'md:mt-32' : 'md:mt-0'}`}
                >
                    {/* IMAGE CONTAINER */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gray-100">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                        />
                        
                        {/* HOVER BADGE */}
                        <div className="absolute top-6 right-6 z-20 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 ease-out shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 -rotate-45">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex flex-col border-t border-gray-200 pt-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-gray-500 transition-colors duration-300">
                                {project.title}
                            </h3>
                            <span className="text-sm font-medium border border-gray-200 px-3 py-1 rounded-full">{project.year}</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">{project.category}</span>
                            <p className="text-gray-600 text-sm max-w-xs md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative py-40 bg-[#050505] flex flex-col items-center justify-center overflow-hidden z-50 rounded-t-[4rem]">
        <div className="relative z-10 flex flex-col items-center gap-10 p-4">
            <h2 className="text-white text-[clamp(4rem,13vw,12rem)] font-black text-center leading-[0.85] tracking-tighter uppercase">
              Zacznijmy <br /> 
              współpracę
            </h2>
            <Link href="/kontakt" className="group relative px-12 py-6 rounded-full bg-white text-black font-bold text-xl md:text-3xl overflow-hidden cursor-pointer inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></span>
              <span className="relative z-10 flex items-center gap-4 transition-colors duration-300 group-hover:text-white">
                Skontaktuj się z nami
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </span>
            </Link>
        </div>
        <div className="absolute bottom-8 w-full px-8 md:px-20 flex justify-between text-gray-500 text-sm font-medium uppercase tracking-widest">
            <span>© 2024 Fluke Studio</span>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
        </div>
      </section>
    </div>
  );
}