"use client";

import { useRef } from "react";
import Link from "next/link";
import { shopTemplates } from "../../data/siteData";
import { useShopAnimation } from "../../hooks/useShopAnimation";

export default function ShopSection() {
  const shopSectionRef = useRef(null);
  const shopCardsRef = useRef([]);

  useShopAnimation({ shopCardsRef });

  return (
    <section
      ref={shopSectionRef}
      className="relative py-16 md:py-24 lg:py-32 bg-white text-black z-40 overflow-hidden"
    >
      <div className="px-4 md:px-8 lg:px-20 mb-12 md:mb-16 lg:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-widest mb-3 md:mb-4 block text-xs md:text-sm">
            Gotowe rozwiązania
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Kup szablon & <br />
            Zacznij szybciej
          </h2>
        </div>
        <Link
          href="/sklep"
          className="hidden md:flex items-center gap-2 font-bold text-base lg:text-lg border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
        >
          Zobacz wszystkie szablony ↗
        </Link>
      </div>

      <div className="px-4 md:px-8 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {shopTemplates.map((template, index) => (
          <Link href="/sklep" key={template.id} className="group cursor-pointer">
            <div
              ref={(el) => (shopCardsRef.current[index] = el)}
              className="relative aspect-[4/5] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-6"
            >
              {/* DIV Z KOLOREM */}
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundColor: template.color }}
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-xs md:text-sm">
                  Zobacz szczegóły
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end gap-2">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                {template.title}
              </h3>
              <span className="text-base md:text-lg font-bold bg-black text-white px-2 md:px-3 py-1 rounded-lg whitespace-nowrap">
                {template.price}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 md:mt-12 px-4 md:px-8 lg:hidden">
        <Link
          href="/sklep"
          className="flex items-center gap-2 font-bold text-base md:text-lg border-b border-black pb-1"
        >
          Zobacz wszystkie szablony ↗
        </Link>
      </div>
    </section>
  );
}
