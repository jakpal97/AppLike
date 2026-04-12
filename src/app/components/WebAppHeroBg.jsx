"use client";

/**
 * WebAppHeroBg — subtelne tło dla podstrony "Aplikacje Web".
 * Unoszące się elementy UI webowej aplikacji (dashboard, tabela, navbar).
 */
export default function WebAppHeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      <style>{`
        @keyframes wfloatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(-2deg)} }
        @keyframes wfloatB { 0%,100%{transform:translateY(0) rotate(2.5deg)} 50%{transform:translateY(-10px) rotate(2.5deg)} }
        @keyframes wfloatC { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-18px) rotate(-1deg)} }
        @keyframes wfloatD { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-8px) rotate(1.5deg)} }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.065) 1.5px, transparent 1.5px)",
        backgroundSize: "30px 30px",
      }} />

      {/* ── Karta KPI — top right ── */}
      <div style={{
        position: "absolute", top: "11%", right: "6%", width: 200,
        background: "white", borderRadius: 18, padding: "18px",
        boxShadow: "0 6px 30px rgba(0,0,0,0.09)",
        border: "1px solid rgba(0,0,0,0.06)",
        opacity: 0.72,
        animation: "wfloatA 6.5s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
          Aktywni użytkownicy
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.04em", color: "#111", lineHeight: 1 }}>
          2,847
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 8 L5 2 L9 8" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>+12.4%</span>
          <span style={{ fontSize: 10, color: "#9ca3af" }}>ten miesiąc</span>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
          {[40, 60, 50, 80, 65, 90, 75].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 5 || i === 6 ? "#111" : "#e5e7eb",
              borderRadius: 3,
            }} />
          ))}
        </div>
      </div>

      {/* ── Navbar fragment ── */}
      <div style={{
        position: "absolute", top: "7%", left: "22%", width: 340,
        background: "white", borderRadius: 14, padding: "11px 18px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
        border: "1px solid rgba(0,0,0,0.05)",
        opacity: 0.58,
        animation: "wfloatB 8.5s ease-in-out infinite",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: "#111", flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", gap: 18 }}>
          {["Dashboard", "Projekty", "Analityka", "Ustawienia"].map((item, i) => (
            <span key={item} style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#111" : "#9ca3af" }}>
              {item}
            </span>
          ))}
        </div>
        <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
          boxShadow: "0 0 6px #22c55e88",
        }} />
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f3f4f6" }} />
      </div>

      {/* ── Tabela danych ── */}
      <div style={{
        position: "absolute", top: "52%", left: "4%", width: 290,
        background: "white", borderRadius: 14,
        boxShadow: "0 3px 20px rgba(0,0,0,0.07)",
        border: "1px solid rgba(0,0,0,0.05)",
        opacity: 0.52,
        animation: "wfloatA 9s ease-in-out infinite 1.2s",
        overflow: "hidden",
      }}>
        <div style={{ padding: "12px 14px 8px", fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase", borderBottom: "1px solid #f3f4f6" }}>
          Ostatnie projekty
        </div>
        {[
          { name: "Panel klienta", type: "SaaS", status: "live" },
          { name: "Sklep B2B", type: "E-comm", status: "live" },
          { name: "App Dashboard", type: "Web App", status: "dev" },
        ].map((row, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            borderBottom: i < 2 ? "1px solid #f9fafb" : "none",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.status === "live" ? "#22c55e" : "#f59e0b", flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#374151" }}>{row.name}</span>
            <span style={{ fontSize: 10, color: "#9ca3af" }}>{row.type}</span>
          </div>
        ))}
      </div>

      {/* ── Mini form / input fragment ── */}
      <div style={{
        position: "absolute", bottom: "22%", right: "10%", width: 230,
        background: "white", borderRadius: 16, padding: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        opacity: 0.60,
        animation: "wfloatC 7s ease-in-out infinite 0.5s",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
          Nowy projekt
        </div>
        {["Nazwa projektu", "Klient"].map((placeholder, i) => (
          <div key={i} style={{
            marginBottom: 8, padding: "9px 12px",
            background: "#f9fafb", borderRadius: 8,
            fontSize: 11, color: "#d1d5db",
            border: "1px solid #f3f4f6",
          }}>
            {placeholder}
          </div>
        ))}
        <div style={{
          marginTop: 4, padding: "9px 12px",
          background: "#111", borderRadius: 8,
          fontSize: 11, fontWeight: 700, color: "white", textAlign: "center",
          letterSpacing: "0.1em",
        }}>
          UTWÓRZ →
        </div>
      </div>

      {/* ── Tag cloud — tech stack ── */}
      <div style={{
        position: "absolute", top: "38%", right: "3%",
        display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 200,
        animation: "wfloatD 10s ease-in-out infinite 2s",
        opacity: 0.45,
      }}>
        {["React", "Next.js", "TypeScript", "Node.js", "REST API", "PostgreSQL", "Docker"].map((tag) => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
            padding: "4px 10px", borderRadius: 20,
            background: "white", border: "1px solid rgba(0,0,0,0.09)",
            color: "#374151",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
