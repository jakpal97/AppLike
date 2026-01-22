"use client";

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

// --- DANE SZABLONÓW ---
const templates = [
  {
    id: 1,
    title: "Mono Portfolio",
    category: "Personal / Portfolio",
    price: "1500 PLN",
    image: "",
    features: ["Next.js 14", "GSAP Animations", "Dark Mode", "CMS Ready"]
  },
  {
    id: 2,
    title: "E-Commerce Pro",
    category: "Sklep Online",
    price: "2500 PLN",
    image: "",
    features: ["Shopify / Woocommerce", "Płatności online", "Panel klienta", "SEO Optimized"]
  },
  {
    id: 3,
    title: "Restaurant Vibe",
    category: "Gastronomia",
    price: "1800 PLN",
    image: "",
    features: ["Menu Online", "Rezerwacje stolików", "Integracja z UberEats", "Galeria"]
  },
  {
    id: 4,
    title: "Corporate Clean",
    category: "B2B / Firma",
    price: "2000 PLN",
    image: "",
    features: ["Blog firmowy", "Formularze kontaktowe", "Newsletter", "Szybkie ładowanie"]
  },
  {
    id: 5,
    title: "App Landing",
    category: "SaaS / Mobile",
    price: "1200 PLN",
    image: "",
    features: ["Showcase aplikacji", "Cennik", "Opinie klientów", "FAQ"]
  }
];

export default function ShopPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // 1. Animacja tytułu
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Animacja kart (stagger)
      gsap.fromTo(cardsRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full text-black selection:bg-black selection:text-white pb-40">
      
      {/* HEADER */}
      <header className="pt-40 pb-20 px-8 md:px-20 border-b border-gray-100">
        <h1 ref={titleRef} className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter uppercase mb-6">
          Gotowe <br/>
          <span className="text-gray-400">Szablony</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl font-medium text-gray-600">
            Wybierz sprawdzony design. Oszczędź czas i pieniądze, otrzymując produkt klasy premium, który skonfiguruję pod Twoje potrzeby.
        </p>
      </header>

      {/* FILTRY (Opcjonalnie - na razie statyczne) */}
      <div className="px-8 md:px-20 py-12 flex flex-wrap gap-4">
        <button className="px-6 py-2 rounded-full border border-black bg-black text-white font-bold uppercase text-sm tracking-wide">Wszystkie</button>
        <button className="px-6 py-2 rounded-full border border-gray-200 hover:border-black text-black font-bold uppercase text-sm tracking-wide transition-colors">E-commerce</button>
        <button className="px-6 py-2 rounded-full border border-gray-200 hover:border-black text-black font-bold uppercase text-sm tracking-wide transition-colors">Portfolio</button>
        <button className="px-6 py-2 rounded-full border border-gray-200 hover:border-black text-black font-bold uppercase text-sm tracking-wide transition-colors">B2B</button>
      </div>

      {/* GRID PRODUKTÓW */}
      <section className="px-8 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {templates.map((item, index) => (
                <div 
                    key={item.id}
                    ref={el => cardsRef.current[index] = el}
                    className="group flex flex-col gap-6"
                >
                    {/* KARTA - OBRAZEK */}
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl">
                        {/* Zdjęcie */}
                        <Image 
                            src={item.image} 
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        
                        {/* Overlay na hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <Link 
                                href="/kontakt" 
                                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Zamów wdrożenie
                            </Link>
                        </div>
                    </div>

                    {/* TREŚĆ POD KARTĄ */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-3xl font-bold uppercase tracking-tight">{item.title}</h3>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                            </div>
                            <div className="bg-black text-white px-4 py-2 rounded-lg font-bold">
                                {item.price}
                            </div>
                        </div>
                        
                        {/* Lista funkcji */}
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {item.features.map((feature, i) => (
                                <li key={i} className="text-xs font-bold uppercase tracking-wide border border-gray-200 px-3 py-1 rounded-full text-gray-500">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

        </div>
      </section>

      {/* FAQ / INFO SECTION */}
      <section className="mt-40 px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                Jak to <br/>działa?
            </h2>
        </div>
        <div className="flex flex-col gap-8">
            <div className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold uppercase mb-2">1. Wybierz szablon</h3>
                <p className="text-gray-600">Przeglądnij dostępne układy i wybierz ten, który najlepiej pasuje do Twojej branży.</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-6 hover:border-black transition-colors">
                <h3 className="text-xl font-bold uppercase mb-2">2. Skonfiguruję go dla Ciebie</h3>
                <p className="text-gray-600">To nie jest "gotowiec" do pobrania. Ja wdrażam Twoje teksty, zdjęcia i kolory, dbając o jakość kodu.</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-6 hover:border-black transition-colors">
                <h3 className="text-xl font-bold uppercase mb-2">3. Start w 7 dni</h3>
                <p className="text-gray-600">Dzięki gotowej bazie, Twoja strona może być online w ekspresowym tempie przy zachowaniu jakości premium.</p>
            </div>
        </div>
      </section>

    </div>
  );
}
