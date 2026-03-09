"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { val: "3+", label: "Lata doświadczenia" },
  { val: "20+", label: "Zadowolonych klientów" },
  { val: "80%", label: "Klientów z polecenia" },
];

export default function AboutText() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(".about-label",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 85%" },
        }
      );

      // Duży tekst — linia po linii
      gsap.fromTo(".about-bigtext",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        }
      );

      // Stats — count up
      document.querySelectorAll(".stat-val[data-target]").forEach((el) => {
        const raw = el.dataset.target;
        const isPercent = raw.includes("%");
        const isPlus = raw.includes("+");
        const num = parseInt(raw);

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { n: 0 },
              {
                n: num,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: function () {
                  el.textContent =
                    (num < 10 ? "0" : "") +
                    Math.round(this.targets()[0].n) +
                    (isPlus ? "+" : "") +
                    (isPercent ? "%" : "");
                },
              }
            );
          },
        });

        // Fade in stat row
        gsap.fromTo(
          el.closest(".stat-row"),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-8 md:px-16 py-24 md:py-32"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 md:gap-20">

          {/* LEFT — label */}
          <div className="pt-2">
            <div className="about-label flex items-center gap-2 opacity-0">
              <div className="w-1 h-5 bg-black rounded-full" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
                O mnie
              </span>
            </div>
          </div>

          {/* RIGHT — tekst + stats */}
          <div ref={textRef}>
            {/* Duży tekst */}
            <p className="about-bigtext font-display text-[clamp(22px,3vw,38px)] leading-[1.35] tracking-[-0.5px] text-black mb-16 opacity-0">
              Jestem developerem i digitalowym partnerem dla firm które chcą być widoczne w sieci.
              Buduję strony, aplikacje mobilne i prowadzę kampanie Google Ads —
              <em className="italic"> wszystko w jednej głowie, bez przepychania odpowiedzialności.</em>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 border-t border-black/8 pt-10">
              {stats.map((s) => (
                <div key={s.label} className="stat-row opacity-0 pr-8">
                  <div
                    className="stat-val font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-2px] text-black mb-3"
                    data-target={s.val}
                  >
                    {s.val}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-black/40 leading-relaxed">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}