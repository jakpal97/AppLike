"use client";

/**
 * AdsBg — subtelne tło dla podstrony "Reklamy & SEO".
 * Unoszące się elementy w stylu Google Ads / SERP.
 */

const GOOGLE_COLORS = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

function GoogleG() {
  return (
    <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: "-0.02em" }}>
      <span style={{ color: "#4285f4" }}>G</span>
      <span style={{ color: "#ea4335" }}>o</span>
      <span style={{ color: "#fbbc05" }}>o</span>
      <span style={{ color: "#4285f4" }}>g</span>
      <span style={{ color: "#34a853" }}>l</span>
      <span style={{ color: "#ea4335" }}>e</span>
    </span>
  );
}

const metrics = [
  { label: "CTR",          value: "4.8%",   delta: "+1.2%",  color: "#4285f4" },
  { label: "Wyświetlenia", value: "124K",   delta: "+34%",   color: "#34a853" },
  { label: "CPC",          value: "0.82 zł", delta: "−0.18zł", color: "#fbbc05" },
  { label: "ROAS",         value: "340%",   delta: "+85%",   color: "#ea4335" },
];

const adResults = [
  {
    url: "applike.pl › reklamy-google",
    title: "Kampanie Google Ads — Wyniki w 48h | AppLike",
    desc: "Certyfikowani specjaliści Google Ads. Maksymalizujemy zwrot z każdej złotówki. Bezpłatna analiza Twojego konta reklamowego.",
  },
  {
    url: "applike.pl › pozycjonowanie-seo",
    title: "SEO & Pozycjonowanie — Organiczny ruch, który trwa",
    desc: "Audyt SEO, link building i content strategy. Twoja firma na pierwszej stronie Google. Sprawdź wyniki naszych klientów.",
  },
];

export default function AdsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      <style>{`
        @keyframes adFloatA { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-12px) rotate(-1.5deg)} }
        @keyframes adFloatB { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
        @keyframes adFloatC { 0%,100%{transform:translateY(0) rotate(-0.5deg)} 50%{transform:translateY(-8px) rotate(-0.5deg)} }
      `}</style>

      {/* ── Google Search bar + wyniki reklam ── */}
      <div style={{
        position: "absolute", top: "10%", right: "4%", width: 400,
        animation: "adFloatA 8s ease-in-out infinite",
        opacity: 0.68,
      }}>
        {/* Search bar */}
        <div style={{
          background: "white", borderRadius: 28, padding: "13px 20px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.13)",
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 10,
        }}>
          <GoogleG />
          <div style={{ width: 1, height: 20, background: "#dadce0", margin: "0 4px" }} />
          <span style={{ flex: 1, fontSize: 13, color: "#202124" }}>
            agencja google ads kraków
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#4285f4" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="#4285f4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Ad snippets */}
        {adResults.map((ad, i) => (
          <div key={i} style={{
            background: "white", borderRadius: 12, padding: "13px 16px",
            marginBottom: 7,
            boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{
                fontSize: 9, fontWeight: 700, color: "#137333",
                background: "#e6f4ea", padding: "2px 7px",
                borderRadius: 4, border: "1px solid #34a85340",
                letterSpacing: "0.05em",
              }}>
                Reklama
              </div>
              <span style={{ fontSize: 11, color: "#202124", fontWeight: 400 }}>{ad.url}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a0dab", marginBottom: 4, lineHeight: 1.3 }}>
              {ad.title}
            </div>
            <div style={{ fontSize: 11, color: "#4d5156", lineHeight: 1.55 }}>
              {ad.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Metryki kampanii ── */}
      <div style={{
        position: "absolute", bottom: "16%", left: "3%",
        display: "flex", flexDirection: "column", gap: 8,
        animation: "adFloatB 9s ease-in-out infinite 0.8s",
        opacity: 0.62,
      }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            background: "white", borderRadius: 12, padding: "12px 18px",
            boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
            border: `1px solid ${m.color}28`,
            display: "flex", alignItems: "center", gap: 14,
            minWidth: 200,
          }}>
            {/* Color dot */}
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: m.color, flexShrink: 0,
              boxShadow: `0 0 8px ${m.color}66`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 2 }}>
                {m.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {m.value}
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: m.color }}>
              {m.delta}
            </span>
          </div>
        ))}
      </div>

      {/* ── Mini kampania / progress card ── */}
      <div style={{
        position: "absolute", top: "48%", right: "5%", width: 220,
        background: "white", borderRadius: 16, padding: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
        border: "1px solid rgba(0,0,0,0.06)",
        opacity: 0.55,
        animation: "adFloatC 7s ease-in-out infinite 1.5s",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase" }}>
            Kampania
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#34a853", background: "#e6f4ea", padding: "2px 8px", borderRadius: 20 }}>
            AKTYWNA
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 12 }}>
          Google Ads — Marzec
        </div>
        {/* Budget bar */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: "#6b7280" }}>Budżet</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>74%</span>
          </div>
          <div style={{ height: 4, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: "74%", height: "100%", background: "linear-gradient(90deg, #4285f4, #34a853)", borderRadius: 4 }} />
          </div>
        </div>
        {[
          { label: "Konwersje", val: "48" },
          { label: "Kliknięcia", val: "1,024" },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderTop: "1px solid #f9fafb" }}>
            <span style={{ fontSize: 10, color: "#6b7280" }}>{row.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>{row.val}</span>
          </div>
        ))}
      </div>

      {/* ── Google color accent dots (dekoracja) ── */}
      <div style={{ position: "absolute", top: "6%", left: "8%", display: "flex", gap: 10, opacity: 0.35 }}>
        {GOOGLE_COLORS.map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
      </div>
    </div>
  );
}
