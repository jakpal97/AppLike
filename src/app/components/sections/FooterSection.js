"use client";

import Link from "next/link";

export default function FooterSection() {
  return (
    <section
      className="relative h-screen bg-[#0a0a0a] text-white flex flex-col justify-between overflow-hidden mt-20"
      style={{ zIndex: 60 }}
    >
      {/* TŁO */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_transparent_70%)]" />
      </div>

      {/* GŁÓWNA TREŚĆ */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-4">
        {/* KINETIC TYPOGRAPHY */}
        <div className="w-full overflow-hidden mb-8 md:mb-12">
          <h2 className="text-[clamp(3rem,12vw,16rem)] font-black uppercase leading-[0.8] tracking-tighter text-center whitespace-nowrap animate-marquee pb-8 md:pb-15">
            Zacznijmy współpracę Zacznijmy współpracę
          </h2>
        </div>

        {/* CTA BUTTON */}
        <Link
          href="/kontakt"
          className="group relative inline-flex items-center justify-center w-[clamp(180px,28vw,400px)] h-[clamp(180px,28vw,400px)] rounded-full bg-white text-black transition-transform duration-500 hover:scale-110"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
          <div className="relative z-10 flex flex-col items-center gap-2 px-4">
            <span className="text-base md:text-xl lg:text-3xl text-center font-bold uppercase tracking-widest group-hover:text-white transition-colors">
              Skontaktuj się z nami
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 group-hover:text-white group-hover:rotate-45 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* FOOTER */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-6 md:py-10 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 relative z-10 bg-[#0a0a0a] gap-6 md:gap-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base lg:text-lg font-medium justify-center md:justify-start">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Strona główna
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Usługi
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Portfolio
            </a>
          </div>
        </div>

        <div className="text-center md:text-right relative">
          <span className="text-[8rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter text-white/5 absolute bottom-[-10px] md:bottom-[-20px] right-0 pointer-events-none select-none hidden md:block">
            AppLike
          </span>
          <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest relative z-10">
            © 2024 Applike. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </section>
  );
}
