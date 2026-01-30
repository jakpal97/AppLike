"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Services
 * Obsługuje: morfing obrazków do placeholderów, efekt kurtyny, collapse elementów
 */
export function useServicesAnimation({
  secondSectionRef,
  floatingImg1Ref,
  floatingImg2Ref,
  floatingImg3Ref,
  placeholder1Ref,
  placeholder2Ref,
  placeholder3Ref,
  staticImg1Ref,
  staticImg2Ref,
  staticImg3Ref,
  curtainRef,
  line1Ref,
  line2Ref,
  line3Ref,
  arrowRef,
  ctaButtonRef,
  arrowWrapperRef,
  buttonWrapperRef,
  servicesContainerRef,
  setServicesVisible,
}) {
  useLayoutEffect(() => {
    // Sprawdzenie czy wszystkie wymagane elementy istnieją
    if (
      !secondSectionRef.current ||
      !floatingImg1Ref.current ||
      !floatingImg2Ref.current ||
      !floatingImg3Ref.current ||
      !placeholder1Ref.current ||
      !placeholder2Ref.current ||
      !placeholder3Ref.current ||
      !staticImg1Ref.current ||
      !staticImg2Ref.current ||
      !staticImg3Ref.current ||
      !curtainRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !line3Ref.current ||
      !arrowRef.current ||
      !ctaButtonRef.current ||
      !servicesContainerRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const getPlaceholderState = (placeholderRef) => {
        if (!placeholderRef.current) return { top: 0, left: 0, width: 100, height: 100 };
        const rect = placeholderRef.current.getBoundingClientRect();
        return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
      };

      const pairs = [
        { floating: floatingImg1Ref.current, placeholder: placeholder1Ref },
        { floating: floatingImg2Ref.current, placeholder: placeholder2Ref },
        { floating: floatingImg3Ref.current, placeholder: placeholder3Ref },
      ];

      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "center center",
          end: "+=220%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < 0.7) setServicesVisible(false);
          },
        },
      });

      // Morfing obrazków do placeholderów
      pairs.forEach((pair) => {
        finalTl.to(
          pair.floating,
          {
            x: 0,
            y: 0,
            xPercent: 0,
            top: () => getPlaceholderState(pair.placeholder).top,
            left: () => getPlaceholderState(pair.placeholder).left,
            width: () => getPlaceholderState(pair.placeholder).width,
            height: () => getPlaceholderState(pair.placeholder).height,
            scale: 1,
            rotation: 0,
            borderRadius: "0.5rem",
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
      });

      // Pojawienie się strzałki i przycisku
      finalTl.fromTo(
        arrowRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.3
      );
      finalTl.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 },
        0.3
      );

      // Zmiana na statyczne obrazki
      finalTl.set(
        [floatingImg1Ref.current, floatingImg2Ref.current, floatingImg3Ref.current],
        { opacity: 0 },
        1
      );
      finalTl.set(
        [staticImg1Ref.current, staticImg2Ref.current, staticImg3Ref.current],
        { opacity: 1 },
        1
      );

      // Efekt kurtyny
      finalTl.addLabel("curtain", 1.5);
      finalTl.to(curtainRef.current, { y: "0%", ease: "none", duration: 2 }, "curtain");

      // Zmiany kolorów tekstu
      finalTl.to(line3Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=0.5");
      finalTl.to(ctaButtonRef.current, { opacity: 0, duration: 0.3 }, "curtain+=0.5");
      finalTl.to(line2Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=1.0");
      finalTl.to(arrowRef.current, { opacity: 0, duration: 0.3 }, "curtain+=1.0");
      finalTl.to(line1Ref.current, { color: "#fff", duration: 0.3 }, "curtain+=1.5");
      finalTl.to(
        [staticImg1Ref.current, staticImg2Ref.current, staticImg3Ref.current],
        { opacity: 0, duration: 0.3 },
        "curtain+=1.5"
      );

      // Collapse elementów
      finalTl.addLabel("collapse", 3.5);
      const gapElements = [
        placeholder1Ref.current,
        placeholder2Ref.current,
        placeholder3Ref.current,
        arrowWrapperRef.current,
        buttonWrapperRef.current,
      ];
      finalTl.to(
        gapElements,
        {
          width: 0,
          marginLeft: 0,
          marginRight: 0,
          padding: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "collapse"
      );

      // Zanikanie tekstu
      finalTl.addLabel("fadeText", 5);
      finalTl.to(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        {
          opacity: 0,
          y: -50,
          filter: "blur(10px)",
          duration: 1,
          ease: "power2.in",
        },
        "fadeText"
      );

      // Pokazanie ServicesSection
      finalTl.addLabel("showServices", 5.5);
      finalTl.to(
        servicesContainerRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onStart: () => setServicesVisible(true),
        },
        "showServices"
      );
      finalTl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, [
    secondSectionRef,
    floatingImg1Ref,
    floatingImg2Ref,
    floatingImg3Ref,
    placeholder1Ref,
    placeholder2Ref,
    placeholder3Ref,
    staticImg1Ref,
    staticImg2Ref,
    staticImg3Ref,
    curtainRef,
    line1Ref,
    line2Ref,
    line3Ref,
    arrowRef,
    ctaButtonRef,
    arrowWrapperRef,
    buttonWrapperRef,
    servicesContainerRef,
    setServicesVisible,
  ]);
}
