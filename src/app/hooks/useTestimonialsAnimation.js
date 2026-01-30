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
    if (
      !testimonialsPinRef.current ||
      !testimonialsTitleRef.current ||
      !testimonialCardsRef.current ||
      testimonialCardsRef.current.length === 0
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const testCards = testimonialCardsRef.current;

      const tlTest = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialsPinRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Zanikanie tytułu
      tlTest.to(testimonialsTitleRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power2.in",
      });

      // Animacja kart
      testCards.forEach((card, index) => {
        tlTest.fromTo(
          card,
          {
            y: "120vh",
            rotationX: -45,
            opacity: 0,
            scale: 0.8,
            transformOrigin: "center top",
          },
          {
            y: "0%",
            rotationX: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          }
        );

        if (index !== testCards.length - 1) {
          tlTest.to(
            card,
            {
              y: "-120vh",
              rotationX: 45,
              opacity: 0,
              scale: 0.8,
              duration: 1,
              ease: "power2.in",
            },
            "+=0.2"
          );
        }
      });
    });

    return () => ctx.revert();
  }, [testimonialsPinRef, testimonialsTitleRef, testimonialCardsRef]);
}
