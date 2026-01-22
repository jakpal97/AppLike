"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function ContactPage() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const titleRef = useRef(null);

  // Stan dla formularza
  const [selectedServices, setSelectedServices] = useState([]);
  
  const services = [
    "Web Design", 
    "Development", 
    "Branding", 
    "Motion", 
    "SEO / Marketing",
    "Other"
  ];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline();

      // 1. Tytuł wjeżdża z dołu
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Info i Formularz wjeżdżają z lekkim opóźnieniem
      tl.from([infoRef.current, formRef.current], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full text-black selection:bg-black selection:text-white overflow-hidden">
      
     

      <main className="pt-32 md:pt-48 px-8 md:px-20 pb-20">
        
        {/* --- HEADER --- */}
        <div className="mb-20 md:mb-32 border-b border-gray-200 pb-12">
            <h1 ref={titleRef} className="text-[clamp(3.5rem,11vw,11rem)] font-black leading-[0.85] tracking-tighter uppercase text-black">
              Skontaktuj <br/>
              się z nami
            </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            {/* --- LEWA KOLUMNA: DANE KONTAKTOWE --- */}
            <div ref={infoRef} className="w-full lg:w-1/3 flex flex-col gap-12">
                
                {/* Email (Big & Bold) */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Email us</span>
                    <a href="mailto:hello@fluke.com" className="text-3xl md:text-4xl font-bold underline decoration-2 decoration-gray-200 hover:decoration-black underline-offset-4 transition-all duration-300">
                        hello@fluke.com
                    </a>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Socials</span>
                        <ul className="flex flex-col gap-2 text-lg font-medium">
                            <li><a href="#" className="hover:translate-x-2 transition-transform duration-300 inline-block">Instagram ↗</a></li>
                            <li><a href="#" className="hover:translate-x-2 transition-transform duration-300 inline-block">LinkedIn ↗</a></li>
                            <li><a href="#" className="hover:translate-x-2 transition-transform duration-300 inline-block">Behance ↗</a></li>
                            <li><a href="#" className="hover:translate-x-2 transition-transform duration-300 inline-block">Twitter ↗</a></li>
                        </ul>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Office</span>
                        <p className="text-lg font-medium leading-relaxed">
                            Ul. Prosta 12/4<br/>
                            00-850 Warszawa<br/>
                            Poland
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-10">
                    <p className="text-gray-500 text-sm">
                        Preferujesz rozmowę telefoniczną?<br/>
                        <span className="text-black font-bold">+48 123 456 789</span>
                    </p>
                </div>
            </div>

            {/* --- PRAWA KOLUMNA: FORMULARZ --- */}
            <div ref={formRef} className="w-full lg:w-2/3">
                <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* Inputy podstawowe */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Name</label>
                            <input 
                                type="text" 
                                placeholder="Jan Kowalski" 
                                className="w-full border-b border-gray-200 py-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
                            />
                        </div>
                        <div className="flex flex-col gap-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Email</label>
                            <input 
                                type="email" 
                                placeholder="jan@example.com" 
                                className="w-full border-b border-gray-200 py-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Wybór usług (Tags) */}
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">I'm interested in...</label>
                        <div className="flex flex-wrap gap-3">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => toggleService(service)}
                                    className={`px-6 py-3 rounded-full border transition-all duration-300 text-sm md:text-base font-medium
                                        ${selectedServices.includes(service) 
                                            ? 'bg-black text-white border-black scale-105' 
                                            : 'bg-white text-black border-gray-200 hover:border-black'
                                        }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Wiadomość */}
                    <div className="flex flex-col gap-2 group">
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Message</label>
                        <textarea 
                            rows="4"
                            placeholder="Tell us about your project..." 
                            className="w-full border-b border-gray-200 py-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300 resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button (Wielki i czarny jak na stronie głównej) */}
                    <div className="pt-8">
                        <button className="group relative px-10 py-5 rounded-full bg-black text-white font-bold text-xl overflow-hidden cursor-pointer inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 w-full md:w-auto">
                            <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></span>
                            <span className="relative z-10 flex items-center gap-3">
                                Send Message
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </div>

      </main>

      {/* Footer Mini */}
      <footer className="w-full px-8 md:px-20 py-8 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest border-t border-gray-100">
        <span>© 2024 Fluke Studio</span>
        <span>Warsaw, PL</span>
      </footer>

    </div>
  );
}