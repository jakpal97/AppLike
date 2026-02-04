"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Testimonials
 * Obsługuje: pin, 3D flip kart opinii
 */
export function useTestimonialsAnimation({
  testimonialsPinRef,
  testimonialsTitleRef,
  testimonialCardsRef,
}) {
  useLayoutEffect(() => {
    // ... (sprawdzenia refów bez zmian)

    const ctx = gsap.context(() => {
      const testCards = testimonialCardsRef.current;

      const tlTest = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialsPinRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
        },
      });

      // 1. Tytuł znika szybciej i bardziej zdecydowanie
      tlTest.to(testimonialsTitleRef.current, {
        opacity: 0,
        y: -50, // Dodatkowy ruch w górę przy znikaniu
        scale: 0.9,
        filter: "blur(15px)",
        duration: 1,
      });

      // 2. Karty wchodzą z lekkim opóźnieniem po tytule
      testCards.forEach((card, index) => {
        tlTest.fromTo(
          card,
          {
            y: "100vh",
            rotationX: -30,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: "0%",
            rotationX: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.5" // Nakładanie animacji wchodzenia na poprzednią
        );

        if (index !== testCards.length - 1) {
          tlTest.to(card, {
            y: "-100vh",
            rotationX: 30,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: "power2.in",
          }, "+=0.5");
        }
      });
    });

    return () => ctx.revert();
  }, [testimonialsPinRef, testimonialsTitleRef, testimonialCardsRef]);
}