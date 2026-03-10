"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutText() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Efekt Reveal dla głównego tekstu
      // Animujemy progress od 0 do 1 zsynchronizowany ze skrolowaniem
      gsap.to(".reveal-text", {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1, // To sprawia, że kolorowanie zależy od pozycji scrolla
        },
      });

      // Animacja linii serwisów (delikatny wjazd z dołu)
      gsap.fromTo(".service-item",
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: { trigger: ".services-list", start: "top 85%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  

  return (
    <section ref={sectionRef} className="bg-white px-8 md:px-16 py-32 md:py-48">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-24">
          
          {/* TEKST GŁÓWNY Z EFEKTEM REVEAL */}
          <div ref={textContainerRef} className="max-w-5xl">
            <p className="reveal-text font-sans text-[clamp(26px,4.5vw,54px)] leading-[1.15] tracking-tight font-medium">
              Nie jestem kolejną agencją z setką pracowników. 
              Jestem Twoim jedynym punktem kontaktu. 
              Projektuję, koduję i skaluję — biorąc pełną odpowiedzialność za końcowy wynik.
            </p>
          </div>


        </div>
      </div>

      <style jsx>{`
        .reveal-text {
          color: rgba(0, 0, 0, 0.15); /* Kolor bazowy (jasny szary) */
          background-image: linear-gradient(to right, #000, #000);
          background-repeat: no-repeat;
          background-size: 0% 100%; /* Startujemy od 0% szerokości czarnego koloru */
          background-clip: text;
          -webkit-background-clip: text;
          display: inline;
        }
      `}</style>
    </section>
  );
}