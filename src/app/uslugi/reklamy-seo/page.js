"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services, getServiceBySlug } from "../../data/servicesData";

gsap.registerPlugin(ScrollTrigger);

const service       = getServiceBySlug("reklamy-seo");
const otherServices = services.filter((s) => s.slug !== "reklamy-seo");

const G = { b: "#4285f4", r: "#ea4335", y: "#fbbc05", g: "#34a853" };

const COMPETITORS = [
  { url: "konkurencja1.pl",   title: "Tanie reklamy Google — Firma ABC", qs: 4 },
  { url: "innaagencja.pl",    title: "Google Ads dla Twojej firmy | XYZ", qs: 5 },
  { url: "slababranding.pl",  title: "Kampanie reklamowe — zamów online",  qs: 3 },
];

const FEATURES = [
  { n: "01", title: "Audyt Google Ads",          desc: "Analiza istniejącego konta lub budowa od zera. Identyfikacja marnotrawionego budżetu i quick wins." },
  { n: "02", title: "Kampanie Search & Display", desc: "Precyzyjne targetowanie słów kluczowych z maksymalizacją Quality Score. Twoje reklamy na szczycie." },
  { n: "03", title: "Retargeting",               desc: "Odzyskiwanie odwiedzających, którzy nie skonwertowali. Najniższy CPA w całym lejku." },
  { n: "04", title: "Techniczne SEO",            desc: "Core Web Vitals, strukturalne dane (Schema.org), sitemap, robots.txt. Fundament widoczności." },
  { n: "05", title: "Content & Link Building",   desc: "Treści zoptymalizowane pod frazy z realnym wolumenem. Linki z zaufanych domen branżowych." },
  { n: "06", title: "Raportowanie",              desc: "Dashboard z konwersjami, ROAS i pozycjami w czasie rzeczywistym. Wiesz, za co płacisz." },
];

const buildSeoLines = (name) => [
  { code: `<!DOCTYPE html>`,                                       dim: true },
  { code: `<html lang="pl">`,                                      dim: true },
  { code: `<head>`,                                                 dim: true },
  { code: `  <title>${name} — Lider w branży | Miasto</title>`,   highlight: "title", label: "Title Tag",        tip: "Klikalny nagłówek w Google. 50–60 znaków.",                color: G.b },
  { code: `  <meta name="description"`,                            highlight: "meta",  label: "Meta Description", tip: "Zajawka w SERP. 155–160 znaków.",                         color: G.g },
  { code: `    content="Opis strony ${name}...">`,                 dim: true },
  { code: `</head>`,                                               dim: true },
  { code: `<body>`,                                                 dim: true },
  { code: `  <h1>${name} — Główna fraza kluczowa</h1>`,           highlight: "h1",   label: "H1 Tag",            tip: "Jeden per stronę. Musi zawierać główną frazę.",           color: G.r },
  { code: `  <img src="hero.jpg"`,                                 dim: true },
  { code: `    alt="Zdjęcie ${name} dla Google">`,                 highlight: "alt",  label: "Alt Text",          tip: "Każdy obrazek opisany = dodatkowe frazy kluczowe.",       color: G.y },
  { code: `  <h2>${name} — szczegóły oferty</h2>`,                 highlight: "h2",   label: "H2 Tag",            tip: "Struktura nagłówków = mapa dla Google.",                  color: G.g },
  { code: `</body></html>`,                                         dim: true },
];

// ── Pomocnicze komponenty ────────────────────────────────────────────────────
function GoogleG({ size = 15 }) {
  return (
    <span style={{ fontSize: size, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
      <span style={{ color: G.b }}>G</span><span style={{ color: G.r }}>o</span>
      <span style={{ color: G.y }}>o</span><span style={{ color: G.b }}>g</span>
      <span style={{ color: G.g }}>l</span><span style={{ color: G.r }}>e</span>
    </span>
  );
}

function QsBadge({ score, small }) {
  const perfect = score === 10;
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full font-black ${small ? "text-[9px] px-2.5 py-1" : "text-[10px] px-3 py-1.5"}`}
      style={{
        background: perfect ? `${G.g}18` : "rgba(0,0,0,0.05)",
        color: perfect ? G.g : "#6b7280",
        border: `1px solid ${perfect ? G.g + "35" : "transparent"}`,
      }}>
      <span>QS</span><span>{score}/10</span>{perfect && <span>✓</span>}
    </div>
  );
}

function SerpCard({ url, title, desc, qs, dim, own }) {
  return (
    <div className={`rounded-2xl p-5 border transition-all duration-500 ${own ? "border-blue-200 shadow-[0_8px_40px_rgba(66,133,244,0.12)]" : dim ? "border-gray-100" : "border-gray-200"}`}
      style={{ background: own ? "#fff" : dim ? "rgba(249,250,251,0.6)" : "#fff" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded border"
            style={{ background: own ? "#e6f4ea" : "#f3f4f6", color: own ? "#137333" : "#9ca3af", borderColor: own ? "#34a85340" : "#e5e7eb" }}>
            Reklama
          </span>
          <span className="text-[11px]" style={{ color: own ? "#4b5563" : dim ? "#d1d5db" : "#6b7280" }}>{url}</span>
        </div>
        <QsBadge score={qs} small />
      </div>
      <div className="text-sm font-semibold mb-1.5 leading-snug"
        style={{ color: own ? "#1d4ed8" : dim ? "#d1d5db" : "#1a0dab" }}>
        {title}
      </div>
      {desc && <div className="text-[11px] leading-relaxed" style={{ color: own ? "#6b7280" : "#d1d5db" }}>{desc}</div>}
    </div>
  );
}

// ── Główna strona ────────────────────────────────────────────────────────────
export default function ReklamySeoPage() {
  const pageRef = useRef(null);
  const serpRef = useRef(null);

  const [companyName, setCompanyName] = useState("");
  const [seoTitle,    setSeoTitle]    = useState("");
  const [seoDesc,     setSeoDesc]     = useState("");
  const [activeHl,    setActiveHl]    = useState(null);
  const [serpState,   setSerpState]   = useState("init");
  const [phIdx,       setPhIdx]       = useState(0);

  const name = companyName || "Twoja Firma";
  const displayTitle = seoTitle || `${name} — Najlepsza w Branży | Miasto`;
  const displayDesc  = seoDesc  || `Profesjonalne usługi ${name}. Sprawdź ofertę i zamów bezpłatną wycenę już dziś. Ponad 200 zadowolonych klientów.`;

  const YOUR_AD = {
    url:   `${name.toLowerCase().replace(/\s+/g, "")}.pl › google-ads`,
    title: `Kampanie Google Ads — ROAS 340% | ${name}`,
    desc:  `Certyfikowani specjaliści Google Ads dla ${name}. Każda złotówka pracuje. Bezpłatna analiza konta i plan działania w 48h.`,
    qs: 10,
  };

  const SEO_LINES = buildSeoLines(name);
  const PLACEHOLDER_QUERIES = ["reklama google kraków", "agencja seo", "kampanie ads"];

  // Rotacja placeholdera
  useEffect(() => {
    const id = setInterval(() => setPhIdx((v) => (v + 1) % PLACEHOLDER_QUERIES.length), 3000);
    return () => clearInterval(id);
  }, []);

  // SERP animacja — reklama wypycha konkurencję w górę
  useEffect(() => {
    const el = serpRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, start: "top 60%", once: true,
          onStart: () => setSerpState("animating"),
        },
      });

      tl.to(".your-ad", {
        y: () => {
          const adEl    = el.querySelector(".your-ad");
          const compsEl = el.querySelector(".serp-comps");
          if (!adEl || !compsEl) return -300;
          return -(compsEl.offsetHeight + 12);
        },
        duration: 0.9, ease: "power2.out",
        onComplete: () => setSerpState("done"),
      }, 0.3)
        .to(".serp-comps", {
          y: () => {
            const adEl = el.querySelector(".your-ad");
            return adEl ? adEl.offsetHeight + 12 : 120;
          },
          opacity: 0.4, duration: 0.9, ease: "power2.out",
        }, 0.3)
        .from(".qs-badge", { scale: 0, duration: 0.4, ease: "back.out(2)" }, 1);
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // SEO code — auto-cykl co 1.8s, kliknięcie pauzuje i nadpisuje
  const cycleRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const tags = ["title", "meta", "h1", "alt", "h2"];
    let i = 0;
    setActiveHl(tags[0]);

    const start = () => {
      cycleRef.current = setInterval(() => {
        if (pausedRef.current) return;
        i = (i + 1) % tags.length;
        setActiveHl(tags[i]);
      }, 1800);
    };

    // Uruchom dopiero gdy sekcja wejdzie w widok
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { start(); observer.disconnect(); }
    }, { threshold: 0.2 });

    const el = document.querySelector(".seo-code-section");
    if (el) observer.observe(el);

    return () => {
      clearInterval(cycleRef.current);
      observer.disconnect();
    };
  }, []);

  // Features reveal — IntersectionObserver (odporny na scroll glitch GSAP)
  useEffect(() => {
    const cards = document.querySelectorAll(".feat-g-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(36px)";
      card.style.transition = `opacity 0.65s ease ${i * 75}ms, transform 0.65s ease ${i * 75}ms`;
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    cards.forEach((card) => obs.observe(card));
    return () => obs.disconnect();
  }, []);


  return (
    <main ref={pageRef} className="overflow-x-hidden bg-white text-black">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-2 h-full"    style={{ background: G.b }} />
        <div className="absolute top-0 right-0 w-2 h-full"   style={{ background: G.r }} />
        <div className="absolute top-0 left-2 right-2 h-1"   style={{ background: G.y }} />
        <div className="absolute bottom-0 left-2 right-2 h-1" style={{ background: G.g }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          

          

          {/* Tytuł */}
          <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.86] tracking-tighter uppercase mb-8">
            <span style={{ color: G.b }}>Google </span>
            <span style={{ color: G.r }}>A</span>
            <span style={{ color: G.y }}>D</span>
            <span style={{ color: G.g }}>S</span>
            <br />
            <span style={{ color: "#000" }}>&amp; </span>
            <span style={{ color: G.b }}>S</span>
            <span style={{ color: G.r }}>E</span>
            <span style={{ color: G.g }}>O</span>
          </h1>

          {/* Pasek — wpisz nazwę firmy */}
          <div className="relative mx-auto mb-4 max-w-2xl">
            <div className="flex items-center gap-4 border-2 rounded-full px-6 py-4 transition-shadow duration-300 bg-white"
              style={{ borderColor: "#e5e7eb", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}>
              <GoogleG size={18} />
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={PLACEHOLDER_QUERIES[phIdx]}
                className="flex-1 text-base outline-none font-medium bg-transparent text-gray-700 placeholder:text-gray-300 placeholder:transition-all"
              />
              <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: G.b }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.5" />
                  <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-sm font-medium mb-12 text-gray-400">
            Wpisz nazwę firmy — zobaczysz ją w całej prezentacji.{" "}
            {companyName && <span className="text-black font-bold">Witaj, {name}!</span>}
          </p>

          
        </div>
      </section>

      {/* ── SERP ANIMACJA ── */}
      <section ref={serpRef} className="py-24 md:py-32 px-6 md:px-20 overflow-hidden bg-white border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Lewa — nagłówek editorial */}
          <div className="lg:sticky lg:top-28">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: G.b }}>
              Wyniki wyszukiwania
            </div>
            <h2 className="text-[clamp(3.5rem,7vw,8.5rem)] font-black leading-[0.86] tracking-tighter uppercase mb-8">
              <span style={{ color: G.b }}>{name}</span><br />
              na<br />szczycie
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs">
              Kampania z Quality Score 10/10 kosztuje mniej i wyświetla się wyżej niż konkurencja.
            </p>
          </div>

          {/* Prawa — karty SERP */}
          <div className="relative overflow-hidden pt-2">
            <div className="serp-comps grid grid-cols-1 gap-3">
              {COMPETITORS.map((c, i) => (
                <div key={i} className={`comp-${i}`}>
                  <SerpCard {...c} dim={serpState === "done"} />
                </div>
              ))}
            </div>
            <div className="your-ad mt-3">
              <SerpCard {...YOUR_AD} own />
              <div className="qs-badge flex justify-end mt-3 gap-3 items-center">
                <span className="text-[10px] text-gray-400">Wyższe pozycje. Niższy CPC. Więcej konwersji.</span>
                <QsBadge score={10} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── META TAG EDITOR ── */}
      <section className="py-24 md:py-32 px-6 md:px-20 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Formularz */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-5" style={{ color: G.g }}>Interaktywny edytor</div>
            <h2 className="text-[clamp(3rem,6vw,7rem)] font-black leading-[0.86] tracking-tighter uppercase mb-10">
              Snippet<br /><span style={{ color: G.g }}>{name}</span>
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Title Tag (nagłówek)</label>
                <input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value.slice(0, 65))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder={`${name} — Słowo Kluczowe | Miasto`}
                />
                <div className="text-[10px] font-bold mt-1.5 text-right" style={{ color: seoTitle.length > 60 ? "#ef4444" : "#d1d5db" }}>
                  {seoTitle.length}/65 znaków
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Meta Description</label>
                <textarea
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value.slice(0, 165))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:border-green-400 transition-colors resize-none"
                  placeholder={`Profesjonalne usługi ${name}. Zamów bezpłatną wycenę.`}
                />
                <div className="text-[10px] font-bold mt-1.5 text-right" style={{ color: seoDesc.length > 160 ? "#ef4444" : "#d1d5db" }}>
                  {seoDesc.length}/165 znaków
                </div>
              </div>
            </div>
          </div>

          {/* Podgląd Google snippet */}
          <div className="lg:sticky lg:top-32">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4">Podgląd w Google</div>
            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50">
                <div className="w-6 h-6 rounded-full bg-gray-100" />
                <div>
                  <div className="text-[11px] font-semibold text-gray-700">{name.toLowerCase().replace(/\s+/g, "")}.pl</div>
                  <div className="text-[10px] text-gray-400">{name.toLowerCase().replace(/\s+/g, "")}.pl › uslugi</div>
                </div>
              </div>
              <h3 className="text-[17px] font-normal leading-[1.3] mb-1.5 text-blue-700 hover:underline cursor-pointer"
                style={{ fontFamily: "Arial, sans-serif" }}>
                {displayTitle}
              </h3>
              <p className="text-[13px] text-gray-500 leading-[1.5]" style={{ fontFamily: "Arial, sans-serif" }}>
                {displayDesc.length > 155 ? displayDesc.slice(0, 155) + "…" : displayDesc}
              </p>
              <div className="flex gap-4 mt-4 flex-wrap">
                {["O nas", "Portfolio", "Kontakt", "Usługi"].map((s) => (
                  <span key={s} className="text-[11px] text-blue-600 hover:underline cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
            {/* Pasek optymalizacji */}
            <div className="mt-4 flex items-center gap-3 px-4">
              <div className="h-1.5 flex-1 rounded-full overflow-hidden bg-gray-100">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round(((seoTitle || displayTitle).length / 65) * 50 + ((seoDesc || displayDesc).length / 165) * 50))}%`,
                    background: `linear-gradient(90deg, ${G.r}, ${G.y}, ${G.g})`,
                  }} />
              </div>
              <span className="text-[10px] font-black text-gray-400">
                {Math.min(100, Math.round(((seoTitle || displayTitle).length / 65) * 50 + ((seoDesc || displayDesc).length / 165) * 50))}% optimized
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO CODE SECTION (AWARD-WINNING) ── */}
      {(() => {
        const TAG_META = {
          title: { label: "Title Tag",        color: G.b, impact: "+43%", stat: "więcej kliknięć",     desc: "Pierwsze 55 znaków decyduje o tym, czy użytkownik w ogóle zauważy Twoją stronę. Fraza kluczowa na początku." },
          meta:  { label: "Meta Description", color: G.g, impact: "+28%", stat: "wyższy CTR",           desc: "Twoja mini-oferta w organicznych wynikach. 155–160 znaków, które sprawiają, że klikają właśnie Ciebie." },
          h1:    { label: "H1 Tag",           color: G.r, impact: "×2.3", stat: "trafność zapytań",    desc: "Jeden per stronę. Musi zawierać główną frazę kluczową. Największa waga semantyczna w całym algorytmie." },
          alt:   { label: "Alt Text",         color: G.y, impact: "+18%", stat: "ruchu z Google Images", desc: "Google Images to osobne źródło ruchu. Każdy obrazek bez opisu to stracona fraza kluczowa." },
          h2:    { label: "H2 Tag",           color: G.g, impact: "+35%", stat: "głębokość sesji",     desc: "Porządkuje treść dla Google i czytelnika. Frazy long-tail. Mapa treści = lepsza indeksacja całej strony." },
        };
        const d = TAG_META[activeHl];

        return (
          <section className="seo-code-section bg-black text-white relative overflow-hidden">

            {/* Heading bar */}
            <div className="border-b border-white/[0.06] px-6 md:px-20 py-14">
              <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: G.b }}>Under the Hood</div>
                  <h2 className="text-5xl md:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase">
                    SEO to<br />
                    <span className="text-white/20">kod.</span>
                  </h2>
                </div>
                <p className="text-white/35 text-base leading-relaxed max-w-xs md:mb-2">
                  Każda linia kodu ma bezpośredni wpływ na widoczność {name} w Google.<br />
                  Kliknij element, żeby zobaczyć jego rolę.
                </p>
              </div>
            </div>

            {/* Main content */}
            <div className="px-6 md:px-20 py-16">
              <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">

                {/* Left: code terminal */}
                <div>
                  <div className="rounded-2xl border border-white/[0.1] overflow-hidden font-mono text-[12px] leading-[1.9] bg-[#0c0c0c] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-[#0f0f0f]">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                      <span className="ml-3 text-[9px] text-white/20 uppercase tracking-widest">index.html — {name}</span>
                    </div>
                    <div className="p-6 space-y-0.5">
                      {SEO_LINES.map((line, i) => {
                        const isActive = line.highlight && activeHl === line.highlight;
                        return (
                          <div key={i}
                            className="relative px-3 py-[3px] rounded-lg transition-all duration-300 cursor-pointer select-none group"
                            onClick={() => {
                              if (!line.highlight) return;
                              setActiveHl(line.highlight);
                              pausedRef.current = true;
                              setTimeout(() => { pausedRef.current = false; }, 5000);
                            }}
                            style={{
                              background: isActive ? `${line.color}15` : "transparent",
                              boxShadow:  isActive ? `inset 3px 0 0 ${line.color}, 0 0 20px ${line.color}08` : "none",
                            }}>
                            {line.highlight && !isActive && (
                              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ background: `${line.color}06` }} />
                            )}
                            <span className="relative" style={{
                              color: line.dim
                                ? "rgba(255,255,255,0.15)"
                                : isActive
                                  ? line.color
                                  : line.highlight
                                    ? "rgba(255,255,255,0.65)"
                                    : "rgba(255,255,255,0.3)",
                              fontWeight: isActive ? "600" : "400",
                            }}>
                              {line.code}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tag pills below terminal */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {[
                      { tag: "title", label: "Title",    color: G.b },
                      { tag: "meta",  label: "Meta Desc", color: G.g },
                      { tag: "h1",    label: "H1 Tag",   color: G.r },
                      { tag: "alt",   label: "Alt Text",  color: G.y },
                      { tag: "h2",    label: "H2 Tag",   color: G.g },
                    ].map((item) => (
                      <button key={item.tag}
                        onClick={() => {
                          setActiveHl(item.tag);
                          pausedRef.current = true;
                          setTimeout(() => { pausedRef.current = false; }, 5000);
                        }}
                        className="px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300"
                        style={{
                          background: activeHl === item.tag ? `${item.color}18` : "rgba(255,255,255,0.03)",
                          color:      activeHl === item.tag ? item.color : "rgba(255,255,255,0.22)",
                          border:     `1px solid ${activeHl === item.tag ? item.color + "40" : "rgba(255,255,255,0.07)"}`,
                          boxShadow:  activeHl === item.tag ? `0 4px 20px ${item.color}20` : "none",
                        }}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: impact panel */}
                <div className="lg:sticky lg:top-24 min-h-[480px] flex flex-col">
                  {d ? (
                    <>
                      {/* Tag label */}
                      <div className="flex items-center gap-2.5 mb-8">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: d.color }}>{d.label}</span>
                      </div>

                      {/* Giant impact number */}
                      <div className="mb-6">
                        <div className="font-black leading-[0.8] tracking-tighter"
                          style={{
                            fontSize: "clamp(4.5rem, 11vw, 8rem)",
                            color: d.color,
                            textShadow: `0 0 60px ${d.color}30`,
                          }}>
                          {d.impact}
                        </div>
                        <div className="text-lg font-black uppercase tracking-widest text-white/25 mt-2">{d.stat}</div>
                      </div>

                      <p className="text-white/45 text-[15px] leading-relaxed mb-8 max-w-sm">{d.desc}</p>

                      {/* Visual Google context preview */}
                      <div className="flex-1 rounded-2xl border border-white/[0.07] bg-[#0c0c0c] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/25">
                            {activeHl === "alt" ? "Google Images" : activeHl === "h2" ? "Struktura strony" : activeHl === "h1" ? "Widok strony" : "Google Search"}
                          </span>
                        </div>
                        <div className="p-6">

                          {/* SERP preview — title & meta */}
                          {(activeHl === "title" || activeHl === "meta") && (
                            <div style={{ fontFamily: "Arial, sans-serif" }}>
                              <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-6 h-6 rounded-full bg-white/[0.07] flex items-center justify-center text-[8px] text-white/30 font-bold">G</div>
                                <div>
                                  <div className="text-[11px] font-medium text-white/40">{name.toLowerCase().replace(/\s+/g, "")}.pl</div>
                                  <div className="text-[10px] text-white/20">{name.toLowerCase().replace(/\s+/g, "")}.pl › usługi › oferta</div>
                                </div>
                              </div>
                              <div className="transition-all duration-400 text-[17px] font-normal leading-snug mb-2"
                                style={{
                                  color: activeHl === "title" ? G.b : "rgba(255,255,255,0.25)",
                                  textShadow: activeHl === "title" ? `0 0 30px ${G.b}50` : "none",
                                }}>
                                {name} — Najlepsza w Branży | Miasto
                              </div>
                              <div className="transition-all duration-400 text-[13px] leading-relaxed"
                                style={{
                                  color: activeHl === "meta" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)",
                                  textShadow: activeHl === "meta" ? `0 0 20px ${G.g}35` : "none",
                                }}>
                                Profesjonalne usługi {name}. Zamów bezpłatną wycenę już dziś. Ponad 200 zadowolonych klientów w całej Polsce.
                              </div>
                            </div>
                          )}

                          {/* H1 — browser window */}
                          {activeHl === "h1" && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-white/[0.06]">
                                <div className="flex gap-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex-1 bg-white/[0.05] rounded-md px-3 py-1 text-[9px] text-white/20">
                                  {name.toLowerCase().replace(/\s+/g, "")}.pl
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex gap-6 text-[9px] text-white/20">
                                  {["Home", "Usługi", "Realizacje", "Kontakt"].map(n => <span key={n}>{n}</span>)}
                                </div>
                                <div className="pt-2">
                                  <div className="text-[17px] font-black leading-tight transition-all duration-300"
                                    style={{ color: G.r, textShadow: `0 0 30px ${G.r}45` }}>
                                    {name} — Główna Fraza Kluczowa
                                  </div>
                                </div>
                                <div className="space-y-2 pt-1">
                                  {[90, 78, 55].map((w, i) => (
                                    <div key={i} className="h-2 rounded bg-white/[0.05]" style={{ width: `${w}%` }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Alt — Google Images grid */}
                          {activeHl === "alt" && (
                            <div>
                              <div className="flex items-center gap-2 mb-4 text-[10px] text-white/25">
                                <span className="font-bold">Google</span>
                                <span className="px-2 py-0.5 rounded bg-white/[0.06] text-white/40">{name}</span>
                                <span>Grafika</span>
                              </div>
                              <div className="grid grid-cols-4 gap-1.5">
                                {[...Array(8)].map((_, i) => (
                                  <div key={i}
                                    className="rounded-md overflow-hidden relative"
                                    style={{
                                      paddingBottom: "80%",
                                      background: i === 2 ? `${G.y}10` : "rgba(255,255,255,0.04)",
                                      border: i === 2 ? `1px solid ${G.y}45` : "1px solid rgba(255,255,255,0.05)",
                                      boxShadow: i === 2 ? `0 0 16px ${G.y}20` : "none",
                                    }}>
                                    {i === 2 && (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                                        <div className="text-[6px] font-bold text-center leading-tight" style={{ color: G.y }}>
                                          alt=&quot;{name}&quot;
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* H2 — page structure */}
                          {activeHl === "h2" && (
                            <div className="space-y-2.5 font-mono text-[11px]">
                              <div className="flex items-center gap-2.5 text-white/25">
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06]">H1</span>
                                <span>{name} — Główna fraza kluczowa</span>
                              </div>
                              <div className="ml-4 space-y-1.5">
                                {[
                                  "Dlaczego warto wybrać " + name + "?",
                                  "Nasze usługi — pełna oferta",
                                  "Realizacje i case studies",
                                ].map((h, i) => (
                                  <div key={i} className="flex items-center gap-2.5 py-2 px-3 rounded-lg transition-all duration-300"
                                    style={{
                                      background: `${G.g}10`,
                                      color: G.g,
                                      boxShadow: `0 0 12px ${G.g}10`,
                                      animationDelay: `${i * 150}ms`,
                                    }}>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded font-black" style={{ background: `${G.g}20` }}>H2</span>
                                    <span className="text-[10px]">{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        Wybierz element kodu
                      </div>
                      <div className="flex gap-2">
                        {[G.b, G.r, G.y, G.g].map((c, i) => (
                          <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ background: c, animationDelay: `${i * 200}ms` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        );
      })()}


      {/* ── CO DOSTAJESZ ── */}
      <section className="py-24 md:py-36 px-6 md:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-8 border-b border-gray-100 pb-16">
            <h2 className="text-[clamp(3rem,7vw,8rem)] font-black leading-[0.88] tracking-tighter uppercase">
              Co<br />dostaje<br /><span style={{ color: G.b }}>{name}</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-sm leading-relaxed">Data-driven marketing. Każda zł ma swoje zadanie i swój wynik.</p>
          </div>
          <div className="feat-g-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.n} className="feat-g-card border border-gray-100 rounded-3xl p-8 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <div className="text-[9px] font-black uppercase tracking-widest mb-5" style={{ color: G.b }}>{f.n}</div>
                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-blue-800 transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNE USŁUGI ── */}
      <section className="px-6 md:px-20 py-24 border-t border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-10">Sprawdź też</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/uslugi/${s.slug}`}
                className="group flex flex-col gap-5 p-8 rounded-[2rem] border border-gray-100 hover:border-black transition-all duration-300 hover:-translate-y-1">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: s.accent }}>{s.num}</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase group-hover:opacity-60 transition-opacity duration-300">{s.title}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.deliveryTime}</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.accent}15` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={s.accent} className="w-4 h-4 -rotate-45">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 text-center px-6 bg-[#030712] text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, ${G.b}, ${G.r}, ${G.y}, ${G.g})` }} />
        <h2 className="text-[clamp(3rem,8vw,10rem)] font-black leading-[0.88] tracking-tighter uppercase mb-6">
          Zacznijmy<br />rosnąć
        </h2>
        {companyName && (
          <p className="text-xl mb-8 font-bold" style={{ color: G.b }}>{name}, czas na wzrost!</p>
        )}
        <Link href="/kontakt"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest text-white transition-all duration-200 hover:scale-105"
          style={{ background: G.b, boxShadow: `0 20px 60px ${G.b}40` }}>
          Bezpłatna analiza →
        </Link>
      </section>

    </main>
  );
}
