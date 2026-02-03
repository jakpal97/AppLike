"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Hero
 * Obsługuje: rotację gwiazdy, przesuwanie slidera, zmianę kolorów liter
 */
export function useHeroAnimation({
  scrollContainerRef,
  starRef,
  starContainerRef,
  starPillRef,
  heroSliderRef,
  lettersRef,
  heroSubtitleRef,
  heroContentRef,
  floatingImg1Ref,
  floatingImg2Ref,
  floatingImg3Ref,
}) {
  useLayoutEffect(() => {
    // Małe opóźnienie żeby dać React czas na zamontowanie wszystkich elementów
    const timeoutId = setTimeout(() => {
      // Debug - sprawdzamy co mamy
      console.log("🔍 useHeroAnimation - Checking refs:", {
        scrollContainer: !!scrollContainerRef.current,
        star: !!starRef.current,
        starContainer: !!starContainerRef.current,
        starPill: !!starPillRef.current,
        heroSlider: !!heroSliderRef.current,
        heroContent: !!heroContentRef.current,
        floatingImg1: !!floatingImg1Ref.current,
        floatingImg2: !!floatingImg2Ref.current,
        floatingImg3: !!floatingImg3Ref.current,
        lettersCount: lettersRef.current?.length || 0,
      });

      // Sprawdzenie czy podstawowe elementy istnieją
      if (
        !scrollContainerRef.current ||
        !starRef.current ||
        !starContainerRef.current ||
        !starPillRef.current ||
        !heroSliderRef.current ||
        !heroContentRef.current
      ) {
        console.log("❌ useHeroAnimation - Brakuje podstawowych elementów");
        return;
      }

      // Sprawdzenie floating images
      if (
        !floatingImg1Ref.current ||
        !floatingImg2Ref.current ||
        !floatingImg3Ref.current
      ) {
        console.log("❌ useHeroAnimation - Brakuje floating images");
        return;
      }

      // Sprawdzenie liter (mogą być puste na początku)
      if (!lettersRef.current || lettersRef.current.length === 0) {
        console.log("❌ useHeroAnimation - Brakuje liter");
        return;
      }

      console.log("✅ useHeroAnimation - Wszystkie elementy OK, uruchamiam animacje");

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

      // Obliczamy responsywną wartość przesunięcia
      const getSlideDistance = () => {
        const width = window.innerWidth;
        if (width < 640) return "-30vw"; // Mobile - minimalny ruch
        if (width < 768) return "-50vw"; // Large mobile
        if (width < 1024) return "-65vw"; // Tablet
        if (width < 1280) return "-100vw"; // Laptop
        if (width < 1636) return "-200vw"; // Desktop
        return "-150vw"; // Large Desktop
      };

      // Timeline #1: Hero główna animacja
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "50% top", // Wydłużony czas animacji
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
        {
          width: "clamp(100px, 12vw, 180px)",
          duration: 1.5,
          ease: "power2.inOut",
        },
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

      // Zmiana koloru liter
      lettersRef.current.forEach((l, i) => {
        if (l) {
          tl.to(
            l,
            { color: "#000000", duration: 0.3, ease: "power2.out" },
            2 + i * 0.1
          );
        }
      });

      // Opcjonalnie animuj subtitle jeśli istnieje
      if (heroSubtitleRef.current) {
        tl.to(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 1 }, 3);
      }

      // Najpierw UKRYWAMY obrazki całkowicie
      gsap.set([floatingImg1Ref.current, floatingImg2Ref.current, floatingImg3Ref.current], {
        autoAlpha: 0, // autoAlpha kontroluje opacity + visibility
        scale: 0.4,
      });

      // Timeline #2: Pojawianie się obrazków
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "55% top", // Zaczynamy później
          end: "75% top",
          scrub: 1,
        },
      });

      tl2.fromTo(
        floatingImg1Ref.current,
        { autoAlpha: 0, scale: 0.4, rotation: -15 },
        { autoAlpha: 1, scale: 1, rotation: 0 },
        0
      );
      tl2.fromTo(
        floatingImg2Ref.current,
        { autoAlpha: 0, scale: 0.4, rotation: 10 },
        { autoAlpha: 1, scale: 1, rotation: 0 },
        0.2
      );
      tl2.fromTo(
        floatingImg3Ref.current,
        { autoAlpha: 0, scale: 0.4, rotation: -10 },
        { autoAlpha: 1, scale: 1, rotation: 0 },
        0.4
      );

      // Timeline #3: Centrowanie obrazków
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "65% top", // Centrujemy po pojawieniu się
          end: "95% top",
          scrub: 1,
        },
      });

      tl3.to(
        [floatingImg1Ref.current, floatingImg2Ref.current, floatingImg3Ref.current],
        {
          top: "40%",
          left: "50%",
          xPercent: -50,
          scale: 0.6,
          duration: 2,
        },
        0
      );
      tl3.to(heroContentRef.current, { opacity: 0, duration: 1 }, 1.5);
      });
    }

    return () => {
      clearTimeout(timeoutId);
      if (typeof ctx !== 'undefined' && ctx.revert) {
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
    floatingImg1Ref,
    floatingImg2Ref,
    floatingImg3Ref,
  ]);
}
