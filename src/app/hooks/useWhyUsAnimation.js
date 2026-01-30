"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook dla animacji sekcji Why Us
 * Obsługuje: pin, scroll kart, zmianę tła, animacje liczników
 */
export function useWhyUsAnimation({
  whyUsPinRef,
  whyUsContentRef,
  whyUsTitleRef,
  rightColumnRef,
  stat92Ref,
  bar92Ref,
  stat100Ref,
  stat30kRef,
}) {
  useLayoutEffect(() => {
    if (
      !whyUsPinRef.current ||
      !whyUsContentRef.current ||
      !whyUsTitleRef.current ||
      !rightColumnRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cardsWrapper = rightColumnRef.current;
      const cardsHeight = cardsWrapper.scrollHeight;
      const viewportHeight = window.innerHeight;
      const targetY = -(cardsHeight - viewportHeight + 150);

      gsap.set(cardsWrapper, { y: "150vh" });

      const whyUsTl = gsap.timeline({
        scrollTrigger: {
          trigger: whyUsPinRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      whyUsTl.to({}, { duration: 0.5 });

      // Zmiana tła i koloru tytułu
      whyUsTl.to(
        whyUsContentRef.current,
        { backgroundColor: "#000000", duration: 1, ease: "power2.inOut" },
        "colorChange"
      );
      whyUsTl.to(
        whyUsTitleRef.current,
        { color: "#ffffff", duration: 1, ease: "power2.inOut" },
        "colorChange"
      );

      // Scroll kart
      whyUsTl.to(cardsWrapper, { y: targetY, duration: 6, ease: "none" }, ">-0.5");

      // Animacje liczników
      if (stat92Ref.current) {
        ScrollTrigger.create({
          trigger: stat92Ref.current,
          containerAnimation: whyUsTl,
          start: "top 90%",
          onEnter: () => {
            gsap.from(stat92Ref.current, {
              textContent: 0,
              duration: 1.5,
              snap: { textContent: 1 },
              ease: "power1.out",
            });
            gsap.fromTo(
              bar92Ref.current,
              { width: "0%" },
              { width: "92%", duration: 1.5, ease: "power1.out" }
            );
          },
          once: true,
        });
      }

      if (stat100Ref.current) {
        ScrollTrigger.create({
          trigger: stat100Ref.current,
          containerAnimation: whyUsTl,
          start: "top 90%",
          onEnter: () =>
            gsap.from(stat100Ref.current, {
              textContent: 0,
              duration: 1.5,
              snap: { textContent: 1 },
              ease: "power1.out",
            }),
          once: true,
        });
      }

      if (stat30kRef.current) {
        ScrollTrigger.create({
          trigger: stat30kRef.current,
          containerAnimation: whyUsTl,
          start: "top 90%",
          onEnter: () =>
            gsap.from(stat30kRef.current, {
              textContent: 0,
              duration: 1.5,
              snap: { textContent: 1 },
              ease: "power1.out",
            }),
          once: true,
        });
      }
    });

    return () => ctx.revert();
  }, [
    whyUsPinRef,
    whyUsContentRef,
    whyUsTitleRef,
    rightColumnRef,
    stat92Ref,
    bar92Ref,
    stat100Ref,
    stat30kRef,
  ]);
}
