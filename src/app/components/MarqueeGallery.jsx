"use client";

/**
 * MarqueeGallery — dwa pasy scrollujące w przeciwnych kierunkach.
 * Użycie:
 *   import MarqueeGallery from "@/app/components/MarqueeGallery";
 *   <MarqueeGallery />
 *
 * Żeby dodać zdjęcia: podmień tablicę `images` poniżej.
 * src: ścieżka z /public lub null (wtedy wyświetla kolor zastępczy).
 */

const images = [
  { src: "/YelonMedia.webp",       title: "Yelonmedia",      category: "Strona WWW",   color: "#1a1a1a" },
  { src: "/dawidDudaStrona.webp",  title: "Dawid Duda",      category: "Strona WWW",   color: "#3b4a5a" },
  { src: "/bistroMiarki8.png",     title: "Bistro Miarki 8", category: "Web Design",   color: "#4a3728" },
  { src: null,                     title: "Social AI",       category: "Mobile App",   color: "#1e293b" },
  { src: null,                     title: "Neon City",       category: "Concept Art",  color: "#0f172a" },
  // ← Tu dodaj kolejne: { src: "/twoje-zdjecie.webp", title: "...", category: "...", color: "#..." }
];

// Duplikujemy żeby pętla była płynna
const row1 = [...images, ...images, ...images];
const row2 = [...images, ...images, ...images].reverse();

function Card({ item }) {
  return (
    <div
      className="group relative flex-shrink-0 w-[280px] md:w-[380px] h-[180px] md:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden cursor-default select-none"
      style={{ backgroundColor: item.color }}
    >
      {/* Zdjęcie */}
      {item.src ? (
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}88 100%)`,
          }}
        />
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-400 flex flex-col justify-end p-5 md:p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-1">
            {item.category}
          </span>
          <p className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * variant="default" — normalny, interaktywny pas z 2 rzędami
 * variant="bg"      — tło bohatera: 1 rząd, grayscale, opacity niska, no-interact
 */
export default function MarqueeGallery({ label = "Wybrane realizacje", variant = "default" }) {
  if (variant === "bg") {
    return (
      <div className="w-full overflow-hidden pointer-events-none select-none h-full absolute inset-0">
        <div className="marquee-bg-track flex gap-6 w-max h-full items-center">
          {row1.map((item, i) => (
            <div
              key={`bg-${i}`}
              className="flex-shrink-0 w-[260px] md:w-[340px] h-[160px] md:h-[210px] rounded-2xl overflow-hidden"
              style={{ backgroundColor: item.color }}
            >
              {item.src && (
                <img
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
        <style>{`
          .marquee-bg-track {
            animation: marquee-bg 60s linear infinite;
          }
          @keyframes marquee-bg {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-bg-track { animation: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden py-10 md:py-14 select-none">
      {label && (
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8 px-6 md:px-20">
          {label}
        </p>
      )}

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        <div className="marquee-track mb-4 md:mb-5 flex gap-4 md:gap-5 w-max">
          {row1.map((item, i) => (
            <Card key={`r1-${i}`} item={item} />
          ))}
        </div>

        <div className="marquee-track-reverse flex gap-4 md:gap-5 w-max">
          {row2.map((item, i) => (
            <Card key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track { animation: marquee-left 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-track-reverse { animation: marquee-right 35s linear infinite; }
        .marquee-track-reverse:hover { animation-play-state: paused; }
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .marquee-track-reverse { animation: none; }
        }
      `}</style>
    </div>
  );
}
