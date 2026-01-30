"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Shop
 * Obsługuje: fade-in kart produktów
 */
export function useShopAnimation({ shopCardsRef }) {
  useLayoutEffect(() => {
    if (
      !shopCardsRef.current ||
      shopCardsRef.current.length === 0 ||
      !shopCardsRef.current.every((card) => card)
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      shopCardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [shopCardsRef]);
}
