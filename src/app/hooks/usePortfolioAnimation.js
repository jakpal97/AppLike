"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Portfolio
 * Obsługuje: horizontal scroll, parallax efekt dla projektów
 */
export function usePortfolioAnimation({
  portfolioSectionRef,
  portfolioTrackRef,
  portfolioImagesRef,
}) {
  useLayoutEffect(() => {
    if (
      !portfolioSectionRef.current ||
      !portfolioTrackRef.current ||
      !portfolioImagesRef.current ||
      portfolioImagesRef.current.length === 0
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = portfolioTrackRef.current;
      const container = portfolioSectionRef.current;

      const scrollLength = track.scrollWidth - window.innerWidth;

      const tlPortfolio = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollLength}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tlPortfolio.to(track, { x: -scrollLength, ease: "none" });

      // Parallax dla projektów
      if (portfolioImagesRef.current.length > 0) {
        portfolioImagesRef.current.forEach((el) => {
          if (el) {
            gsap.to(el, {
              scale: 1.4,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${scrollLength}`,
                scrub: 1,
              },
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, [portfolioSectionRef, portfolioTrackRef, portfolioImagesRef]);
}
