"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHeroAnimation({
  scrollContainerRef,
  starRef,
  starContainerRef,
  starPillRef,
  heroSliderRef,
  lettersRef,
  heroSubtitleRef,
  heroContentRef,
}) {
  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !scrollContainerRef.current ||
        !starRef.current ||
        !starContainerRef.current ||
        !starPillRef.current ||
        !heroSliderRef.current ||
        !heroContentRef.current
      ) {
        return;
      }

      if (!lettersRef.current || lettersRef.current.length === 0) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      initializeAnimations();
    }, 100);

    let ctx;

    function initializeAnimations() {
      ctx = gsap.context(() => {
        // Ciągła rotacja gwiazdy
        gsap.to(starRef.current, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 15,
          repeat: -1,
          ease: "none",
        });

        const getSlideDistance = () => {
          const width = window.innerWidth;
          if (width < 640) return "-30vw";
          if (width < 768) return "-50vw";
          if (width < 1024) return "-65vw";
          if (width < 1280) return "-100vw";
          if (width < 1636) return "-140vw";
          return "-150vw";
        };

        // Timeline #1: Hero tekst — animacja kończy się przy 50% scrolla
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "50% top",
            scrub: 1,
          },
        });

        tl.to(
          starContainerRef.current,
          { right: "50%", xPercent: 50, duration: 1.5, ease: "power2.inOut" },
          0
        );
        tl.to(
          starPillRef.current,
          { width: "clamp(100px, 12vw, 180px)", duration: 1.5, ease: "power2.inOut" },
          0
        );
        tl.to(
          starPillRef.current,
          { backgroundColor: "#000000", duration: 0.8, ease: "power2.inOut" },
          1.2
        );
        tl.to(
          starRef.current,
          { fill: "#ffffff", duration: 0.8, ease: "power2.inOut" },
          1.2
        );
        tl.to(
          starRef.current,
          { rotation: 720, duration: 3, ease: "power1.inOut" },
          0
        );
        tl.to(
          heroSliderRef.current,
          { x: getSlideDistance(), duration: 4, ease: "power2.inOut" },
          1.5
        );

        lettersRef.current.forEach((l, i) => {
          if (l) {
            tl.to(
              l,
              { color: "#000000", duration: 0.3, ease: "power2.out" },
              2 + i * 0.1
            );
          }
        });

        if (heroSubtitleRef?.current) {
          tl.to(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 1 }, 3);
        }

        // Ukryj fixed hero gdy scrollContainerRef całkowicie zniknie z ekranu
        gsap.to(heroContentRef.current, {
          autoAlpha: 0,
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }

    return () => {
      clearTimeout(timeoutId);
      if (typeof ctx !== "undefined" && ctx.revert) {
        ctx.revert();
      }
    };
  }, [
    scrollContainerRef,
    starRef,
    starContainerRef,
    starPillRef,
    heroSliderRef,
    lettersRef,
    heroSubtitleRef,
    heroContentRef,
  ]);
}
