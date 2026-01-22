"use client";

import { useEffect, useRef, useLayoutEffect, useState, use } from "react"; // Dodano 'use'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// --- BAZA DANYCH PROJEKTÓW ---
const projectsDB = [
  {
    id: 1,
    title: "Yelonmedia",
    category: "Website / Development",
    client: "Yelonmedia Agency",
    year: "2024",
    services: ["UI/UX Design", "Next.js Development", "3D WebGL", "Branding"],
    description: `Współpracowaliśmy z Yelonmedia, aby na nowo zdefiniować ich cyfrową obecność. Celem było stworzenie strony, która nie tylko informuje, ale przede wszystkim inspiruje.`,
    mainImage: "https://images.unsplash.com/photo-1481487484168-9b9301523d49?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Dawid Duda",
    category: "Web App / Design",
    client: "Dawid Duda Personal Brand",
    year: "2023",
    services: ["Product Design", "React Native", "Analytics Integration"],
    description: `Aplikacja treningowa nowej generacji. Skupiliśmy się na minimalizmie i czytelności danych, aby użytkownik mógł skupić się na wynikach.`,
    mainImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "FinTech Dash",
    category: "SaaS / UX Research",
    client: "Bank Corp",
    year: "2024",
    services: ["UX Research", "Dashboard Design", "Vue.js"],
    description: `Kompleksowy dashboard finansowy. Priorytetem była przejrzystość ogromnej ilości danych finansowych w czasie rzeczywistym.`,
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Social AI",
    category: "Mobile App",
    client: "Startup Inc",
    year: "2024",
    services: ["App Design", "Flutter", "AI Integration"],
    description: `Rewolucyjna aplikacja społecznościowa. Wykorzystaliśmy AI do łączenia ludzi o podobnych zainteresowaniach w czasie rzeczywistym.`,
    mainImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    gallery: [
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Neon City",
    category: "Concept Art / 3D",
    client: "Game Studio X",
    year: "2023",
    services: ["3D Modeling", "Unreal Engine 5", "Art Direction"],
    description: `Stworzyliśmy pełne środowisko 3D dla gry typu cyberpunk. Projekt wymagał optymalizacji pod silnik UE5 przy zachowaniu najwyższej jakości wizualnej.`,
    mainImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop",
    gallery: [
        "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export default function ProjectPage({ params }) {
  // --- ROZWIĄZANIE PROBLEMU (Next.js 15) ---
  // Odpakowujemy params za pomocą hooka use()
  const unwrappedParams = use(params);
  const projectId = parseInt(unwrappedParams.id);

  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);

  // Znajdź projekt na podstawie ID
  const project = projectsDB.find(p => p.id === projectId) || projectsDB[0];

  // Znajdź następny projekt (dla linku na dole)
  const nextProjectId = projectId >= projectsDB.length ? 1 : projectId + 1;
  const nextProject = projectsDB.find(p => p.id === nextProjectId) || projectsDB[0];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // 1. Parallax na Hero Image
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
            y: "20%",
            ease: "none",
            scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
            }
        });
      }

      // 2. Fade In treści
      if (contentRef.current) {
        gsap.from(contentRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            }
        });
      }

      // 3. Galeria - delikatne wejście zdjęć
      if (galleryRef.current) {
        const images = galleryRef.current.querySelectorAll("img");
        images.forEach((img) => {
            gsap.fromTo(img, 
            { clipPath: "inset(10% 10% 10% 10%)", scale: 1.1 },
            { 
                clipPath: "inset(0% 0% 0% 0%)", 
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 70%"
                }
            }
            );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [projectId]); // Ważne: restart animacji przy zmianie ID

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
      
      

      {/* HERO */}
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
            <img 
                ref={heroImageRef}
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full px-8 md:px-20 pb-12 md:pb-24 text-white z-10">
            <span className="block text-sm md:text-lg font-bold uppercase tracking-widest mb-4 opacity-80">{project.category}</span>
            <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase">
                {project.title}
            </h1>
        </div>
      </section>

      {/* INFO */}
      <section ref={contentRef} className="px-8 md:px-20 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
                <div className="md:sticky md:top-32 flex flex-col gap-10">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Client</h3>
                        <p className="text-xl font-medium">{project.client}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Year</h3>
                        <p className="text-xl font-medium">{project.year}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Services</h3>
                        <ul className="text-xl font-medium flex flex-col gap-1">
                            {project.services.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    <a href="#" className="inline-block mt-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors w-max">
                        Live Site
                    </a>
                </div>
            </div>

            {/* Description */}
            <div className="w-full md:w-2/3">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                    {project.title} — Tworzymy cyfrowe doświadczenia, które zapadają w pamięć.
                </h2>
                <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6 whitespace-pre-line">
                    {project.description}
                </div>
            </div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={galleryRef} className="px-4 md:px-20 pb-32">
        <div className="flex flex-col gap-8 md:gap-24">
            {/* 1 */}
            <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-[2rem] bg-gray-100">
                <img src={project.gallery[0]} className="w-full h-full object-cover" alt="Gallery 1" />
            </div>

            {/* 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] bg-gray-100 mt-0 md:mt-24">
                    <img src={project.gallery[1]} className="w-full h-full object-cover" alt="Gallery 2" />
                </div>
                <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] bg-gray-100">
                    <img src={project.gallery[2]} className="w-full h-full object-cover" alt="Gallery 3" />
                </div>
            </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="bg-black text-white py-32 px-8 md:px-20 relative overflow-hidden group">
        <Link href={`/portfolio/${nextProject.id}`} className="block relative z-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 block">Next Project</span>
            <h2 className="text-[clamp(3rem,10vw,8rem)] font-black uppercase tracking-tighter leading-none group-hover:text-gray-300 transition-colors">
                {nextProject.title}
            </h2>
            <div className="mt-8 flex justify-center">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
        </Link>
        <div className="absolute inset-0 bg-blue-900/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-out" />
      </section>

    </div>
  );
}