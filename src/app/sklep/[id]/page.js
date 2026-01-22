"use client";

import { useEffect, useRef, useLayoutEffect, use } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// --- BAZA DANYCH SZABLONÓW (Musi być taka sama jak w Hero lub pobierana z jednego źródła) ---
const templatesDB = [
  {
    id: 1,
    title: "Mono Portfolio",
    category: "Personal / Portfolio",
    price: "1500 PLN",
    color: "#1c1c1c", // Ciemny szary
    description: `Minimalistyczny, surowy szablon idealny dla fotografów, architektów i designerów. 
    Skupia się na treści, eliminując zbędne ozdobniki. Ciemny motyw oszczędza energię i nadaje ekskluzywny charakter.`,
    features: ["Next.js 14 App Router", "GSAP Animations", "Optymalizacja obrazów", "Formularz kontaktowy", "CMS Ready (Sanity/Strapi)"],
    deliveryTime: "3-5 dni roboczych"
  },
  {
    id: 2,
    title: "E-Commerce Pro",
    category: "Sklep Online",
    price: "2500 PLN",
    color: "#2563eb", // Niebieski
    description: `Kompletne rozwiązanie sprzedażowe. Zaprojektowane, aby maksymalizować konwersję. 
    Przejrzysta karta produktu, szybki koszyk i intuicyjna nawigacja sprawią, że Twoi klienci pokochają zakupy.`,
    features: ["Integracja płatności (Stripe/Przelewy24)", "Panel zarządzania produktami", "Filtrowanie i sortowanie", "Newsletter", "SEO Boost"],
    deliveryTime: "7-10 dni roboczych"
  },
  {
    id: 3,
    title: "Restaurant Vibe",
    category: "Gastronomia",
    price: "1800 PLN",
    color: "#059669", // Zielony
    description: `Szablon stworzony, by pobudzać apetyt. Wielkie zdjęcia, eleganckie menu i prosty system rezerwacji stolików. 
    Idealny dla restauracji, kawiarni i bistro, które chcą wyróżnić się w sieci.`,
    features: ["Menu QR Code", "System rezerwacji", "Integracja z mapami Google", "Galeria Instagram", "Wersja mobilna First"],
    deliveryTime: "5-7 dni roboczych"
  }
];

export default function TemplateDetailsPage({ params }) {
  // Rozpakowanie params dla Next.js 15
  const unwrappedParams = use(params);
  const templateId = parseInt(unwrappedParams.id);
  
  // Znajdź szablon lub użyj pierwszego jako fallback
  const template = templatesDB.find(t => t.id === templateId) || templatesDB[0];

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // 1. Animacja wejścia Hero (kolor rozszerza się)
      gsap.fromTo(heroRef.current, 
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 1, ease: "power4.out" }
      );

      // 2. Elementy wchodzą z dołu
      gsap.from([contentRef.current, sidebarRef.current], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
      });

    }, containerRef);
    return () => ctx.revert();
  }, [templateId]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[70vh] w-full flex items-end justify-start overflow-hidden">
        {/* Kolorowe tło (Placeholder zamiast zdjęcia) */}
        <div 
            ref={heroRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ backgroundColor: template.color }}
        />
        
        {/* Tytuł na tle */}
        <div className="relative z-10 px-8 md:px-20 pb-12 md:pb-20 text-white w-full mix-blend-difference">
            <Link href="/#sklep" className="text-sm font-bold uppercase tracking-widest mb-6 inline-block border-b border-white/40 pb-1 hover:border-white transition-colors">
                ← Wróć do sklepu
            </Link>
            <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase">
                {template.title}
            </h1>
            <span className="block mt-4 text-lg md:text-2xl font-medium opacity-80">{template.category}</span>
        </div>
      </div>

      {/* --- CONTENT & SIDEBAR GRID --- */}
      <section className="px-8 md:px-20 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            {/* LEWA KOLUMNA: OPIS I FUNKCJE */}
            <div ref={contentRef} className="w-full lg:w-2/3">
                <h2 className="text-3xl font-bold mb-8">Opis rozwiązania</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-16 whitespace-pre-line">
                    {template.description}
                </p>

                <div className="border-t border-gray-200 pt-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Co zawiera pakiet?</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        {template.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-lg font-medium">
                                <span className="w-2 h-2 bg-black rounded-full block" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-gray-200 pt-12 mt-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Proces wdrożenia</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="font-black text-xl text-gray-300">01</span>
                            <p className="text-gray-600">Kupujesz szablon i przesyłasz swoje materiały (logo, teksty, zdjęcia).</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-black text-xl text-gray-300">02</span>
                            <p className="text-gray-600">Ja konfiguruję stronę, podpinam domenę i dostosowuję kolory.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-black text-xl text-gray-300">03</span>
                            <p className="text-gray-600">W ciągu {template.deliveryTime} otrzymujesz gotową, działającą stronę.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRAWA KOLUMNA: STICKY SIDEBAR (KARTA ZAKUPU) */}
            <div className="w-full lg:w-1/3 relative">
                <div ref={sidebarRef} className="lg:sticky lg:top-32 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Cena wdrożenia</span>
                        <span className="text-4xl font-black tracking-tight">{template.price}</span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-2">
                            <span>Czas realizacji</span>
                            <span className="font-bold text-black">{template.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-2">
                            <span>Wsparcie</span>
                            <span className="font-bold text-black">30 dni</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-2">
                            <span>Hosting</span>
                            <span className="font-bold text-black">Pomoc w konfiguracji</span>
                        </div>
                    </div>

                    <Link 
                        // Przekazujemy nazwę szablonu do formularza kontaktowego (opcjonalnie można to obsłużyć w /kontakt)
                        href={`/kontakt?temat=Zakup szablonu: ${template.title}`}
                        className="group relative w-full py-5 rounded-xl bg-black text-white font-bold text-xl overflow-hidden cursor-pointer inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                    >
                        <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            Zamów teraz
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                    </Link>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">
                        To nie jest automatyczny zakup. Kliknięcie przeniesie Cię do kontaktu w celu ustalenia szczegółów.
                    </p>
                </div>
            </div>

        </div>
      </section>

      {/* --- INNE SZABLONY (Opcjonalnie) --- */}
      <section className="px-8 md:px-20 py-20 border-t border-gray-100">
        <h3 className="text-2xl font-bold mb-8 uppercase tracking-tight">Zobacz też inne</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templatesDB.filter(t => t.id !== templateId).slice(0, 3).map(item => (
                <Link href={`/sklep/${item.id}`} key={item.id} className="group block">
                    <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                         <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundColor: item.color }} />
                    </div>
                    <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <span className="text-sm text-gray-500">{item.price}</span>
                </Link>
            ))}
        </div>
      </section>

    </div>
  );
}