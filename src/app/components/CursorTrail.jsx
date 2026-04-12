"use client";

/**
 * CursorTrail — miniatury projektów pojawiają się za kursorem.
 *
 * Żeby dodać obrazki: podmień tablicę IMAGES.
 * src: ścieżka z /public lub null (solid color placeholder).
 *
 * Użycie:
 *   import CursorTrail from "@/app/components/CursorTrail";
 *   <CursorTrail />
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const IMAGES = [
  { src: "/YelonMedia.webp",      bg: "#0f0f0f", label: "Yelonmedia"      },
  { src: "/dawidDudaStrona.webp", bg: "#1e2d3d", label: "Dawid Duda"      },
  { src: "/bistroMiarki8.png",    bg: "#2a1c12", label: "Bistro Miarki 8" },
  { src: null,                    bg: "#111827", label: "Social AI"       },
  { src: null,                    bg: "#0a0a0a", label: "Neon City"       },
  // ← dodaj: { src: "/twoje.webp", bg: "#1a1a1a", label: "Nazwa" }
];

// Liczba "slotów" w puli (im więcej, tym dłuższy ślad widoczny jednocześnie)
const POOL_SIZE = 10;

// Progi throttle i minimalny dystans (px) żeby nie spamować
const THROTTLE_MS  = 50;
const MIN_DIST_PX  = 12;

export default function CursorTrail() {
  const wrapRef  = useRef(null);
  const slotIdx  = useRef(0);   // który slot aktywujemy
  const imgIdx   = useRef(0);   // który obraz pokazujemy
  const lastTime = useRef(0);
  const lastPos  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Wyłącz na urządzeniach bez myszy (dotykowych)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const slots = Array.from(wrap.children);

    const onMove = (e) => {
      const now = performance.now();
      const dx  = e.clientX - lastPos.current.x;
      const dy  = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Throttle: czas i dystans
      if (now - lastTime.current < THROTTLE_MS || dist < MIN_DIST_PX) return;
      lastTime.current    = now;
      lastPos.current     = { x: e.clientX, y: e.clientY };

      const slot  = slots[slotIdx.current % POOL_SIZE];
      slotIdx.current++;

      const data  = IMAGES[imgIdx.current % IMAGES.length];
      imgIdx.current++;

      // Podmień obraz (direct DOM — celowo poza React reconciliation)
      const imgEl = slot.querySelector("img");
      const bgEl  = slot.querySelector(".ct-bg");
      if (imgEl) {
        if (data.src) {
          imgEl.src   = data.src;
          imgEl.style.opacity = "1";
        } else {
          imgEl.style.opacity = "0";
        }
      }
      if (bgEl) bgEl.style.backgroundColor = data.bg;

      // Pozycjonowanie w miejscu kursora
      gsap.set(slot, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
      });

      // Losowa rotacja dla organicznego wyglądu
      const rot = (Math.random() - 0.5) * 22;
      const rot2 = rot * 0.4;

      gsap.killTweensOf(slot);

      gsap.timeline()
        .fromTo(
          slot,
          { opacity: 0, scale: 0.45, rotation: rot * 2, filter: "blur(4px)" },
          {
            opacity: 0.85,
            scale: 1,
            rotation: rot,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "back.out(1.6)",
          }
        )
        .to(slot, {
          opacity: 0,
          scale: 0.82,
          rotation: rot2,
          filter: "blur(3px)",
          duration: 0.4,
          delay: 0.2,
          ease: "power3.in",
        });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 pointer-events-none z-[400] overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: POOL_SIZE }).map((_, i) => {
        const data = IMAGES[i % IMAGES.length];
        return (
          <div
            key={i}
            className="absolute top-0 left-0 w-[100px] md:w-[130px] aspect-[16/10] rounded-xl overflow-hidden opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Solid color tło — zawsze widoczne */}
            <div
              className="ct-bg absolute inset-0"
              style={{ backgroundColor: data.bg }}
            />
            {/* Obraz nad tłem */}
            {data.src && (
              <img
                src={data.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="eager"
                draggable={false}
              />
            )}
            {/* Delikatny gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        );
      })}
    </div>
  );
}
