export const services = [
  {
    slug: "strony-www",
    num: "01",
    title: "Strony WWW",
    tagline: "Twoja marka w sieci — szybko, pięknie, skutecznie.",
    shortDesc: "Responsywne strony internetowe zaprojektowane tak, żeby przyciągały uwagę i zamieniały odwiedzających w klientów.",
    longDesc: "Projektuję i wdrażam strony WWW, które są jednocześnie wizytówką marki i narzędziem sprzedażowym. Każda strona powstaje od zera — bez gotowych motywów WordPress, bez kompromisów na wydajności. Dbam o to, żeby projekt był spójny z Twoją identyfikacją wizualną, a kod — czysty i szybki.",
    accent: "#000000",
    accentLight: "#f5f5f5",
    // USUNIĘTO CENY ZGODNIE Z PROŚBĄ - High-end to wycena indywidualna
    deliveryTime: "2–4 tygodnie",
    // DODANO DANE WIZUALNE DLA HOVERÓW I GALERII
    images: [
      "/projects/web1.jpg", 
      "/projects/web2.jpg", 
      "/projects/web3.jpg", 
      "/projects/web4.jpg"
    ],
    features: [
      "Projekt graficzny UI/UX w Figmie",
      "Responsywność na każdym urządzeniu",
      "Optymalizacja SEO (meta, schema, sitemap)",
      "Animacje i interakcje GSAP",
      "Integracja CMS (edytowalność treści)",
      "Optymalizacja prędkości (Core Web Vitals)",
      "Formularz kontaktowy + integracje",
      "Podstawowy hosting i domena",
    ],
    process: [
      { step: "01", title: "Brief & Strategia", desc: "Poznajemy Twój biznes, cele i grupę docelową. Ustalamy architekturę informacji." },
      { step: "02", title: "Projekt UI/UX", desc: "Tworzę makiety i projekt graficzny w Figmie. Widzisz stronę zanim powstanie kod." },
      { step: "03", title: "Wdrożenie", desc: "Kodowanie w Next.js z animacjami GSAP. Pełna responsywność i optymalizacja." },
      { step: "04", title: "Testy & Launch", desc: "Testy na urządzeniach, optymalizacja prędkości i wdrożenie na produkcję." },
    ],
    faqs: [
      { q: "Jak długo trwa realizacja?", a: "Standardowa strona to 2–4 tygodnie. Przy większych projektach ustalamy harmonogram indywidualnie." },
      { q: "Czy będę mógł edytować treści?", a: "Tak. Integrujemy headless CMS, żebyś mógł samodzielnie zarządzać treścią." },
    ],
  },
  {
    slug: "aplikacje-web",
    num: "02",
    title: "Aplikacje Web",
    tagline: "Zaawansowane narzędzia cyfrowe dopasowane do Twojego biznesu.",
    shortDesc: "Dedykowane aplikacje webowe zbudowane z myślą o skalowalności i najwyższej klasy UX.",
    longDesc: "Tworzę aplikacje webowe, które rozwiązują realne problemy biznesowe. Od prostych narzędzi wewnętrznych po rozbudowane platformy SaaS. Używam nowoczesnego stosu technologicznego: Next.js, React, Supabase, Node.js — z naciskiem na wydajność i bezpieczeństwo.",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    deliveryTime: "4–10 tygodni",
    // Abstrakcyjne wideo dla high-endowego efektu w tle
    video: "/videos/abstract-tech.mp4", 
    features: [
      "Architektura full-stack (frontend + backend)",
      "Autoryzacja i system kont użytkowników",
      "Panel administracyjny / dashboard",
      "Baza danych (PostgreSQL / Supabase)",
      "Integracje API (płatności, e-mail)",
      "Role i uprawnienia użytkowników",
      "Powiadomienia e-mail i webhooki",
      "Dokumentacja techniczna",
    ],
    process: [
      { step: "01", title: "Analiza", desc: "Mapujemy funkcjonalności i wymagania techniczne. Tworzymy specyfikację." },
      { step: "02", title: "Architektura", desc: "Projekt interfejsu i bazy danych. Definiujemy endpoints API." },
      { step: "03", title: "Development", desc: "Budujemy aplikację w sprintach z regularnym feedbackiem." },
      { step: "04", title: "Deployment", desc: "Testy end-to-end i wdrożenie na infrastrukturę chmurową." },
    ],
    faqs: [
      { q: "Jakiego stosu używasz?", a: "Głównie Next.js, Supabase i Tailwind CSS dla maksymalnej wydajności." },
    ],
  },
  {
    slug: "aplikacje-mobile",
    num: "03",
    title: "Aplikacje Mobile",
    tagline: "iOS i Android. Jeden kod. Pełne doświadczenie.",
    shortDesc: "Natywne aplikacje mobilne w React Native — płynne i gotowe do publikacji w sklepach.",
    longDesc: "Projektuję aplikacje mobilne w React Native, które działają płynnie na iOS i Android. Jeden kod — dwa sklepy — oszczędność budżetu bez kompromisów na jakości. Dbam o natywne odczucia i animacje.",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    deliveryTime: "6–14 tygodni",
    // Galeria mockupów Twojej aplikacji mobilnej
    images: [
      "/projects/app-mockup1.png",
      "/projects/app-mockup2.png",
      "/projects/app-mockup3.png"
    ],
    features: [
      "Aplikacja iOS i Android (React Native)",
      "Projekt UI zgodny z Apple HIG & Material Design",
      "Push notifications",
      "Autoryzacja social login",
      "Integracja z backendem / API",
      "In-app payments",
      "Publikacja w App Store i Google Play",
    ],
    process: [
      { step: "01", title: "UX Research", desc: "Mapowanie podróży użytkownika i wireframe'y." },
      { step: "02", title: "Projekt UI", desc: "High-fidelity mockupy i interaktywny prototyp." },
      { step: "03", title: "Dev", desc: "Kodowanie i regularne buildy testowe." },
      { step: "04", title: "Sklepy", desc: "Submission i wsparcie przy review Apple/Google." },
    ],
    faqs: [
      { q: "Czy pomagasz w publikacji?", a: "Tak, przeprowadzam przez cały proces review w obu sklepach." },
    ],
  },
  {
    slug: "reklamy-seo",
    num: "04",
    title: "Reklamy & SEO",
    tagline: "Widoczność, która przekłada się na realną sprzedaż.",
    shortDesc: "Kampanie Google Ads i Meta Ads skoncentrowane na jednym celu — wzroście Twojego biznesu.",
    longDesc: "Prowadzę kampanie reklamowe z podejściem data-driven. Nie mierzę sukcesu w kliknięciach — mierzę go w leadach i sprzedaży. Analizuję rynek, konkurencję i optymalizuję budżet tak, by każda złotówka zarabiała.",
    accent: "#4285f4",
    accentLight: "#eff6ff",
    deliveryTime: "Start w 48h",
    // Abstrakcyjne wideo pokazujące wzrost/dane (np. lecące linie)
    video: "/videos/data-growth.mp4",
    features: [
      "Kampanie Google Ads (Search, PMax)",
      "Reklamy Meta (FB & IG)",
      "Audyt i optymalizacja SEO",
      "Badanie słów kluczowych",
      "Landing page konwersyjne",
      "Raporty Looker Studio",
      "A/B testy kreacji",
    ],
    process: [
      { step: "01", title: "Audyt", desc: "Analizuję obecną sytuację i konkurencję." },
      { step: "02", title: "Strategia", desc: "Dobór kanałów, grup docelowych i budżetu." },
      { step: "03", title: "Testy", desc: "Uruchomienie kampanii i zbieranie pierwszych danych." },
      { step: "04", title: "Skalowanie", desc: "Optymalizacja wyników i zwiększanie ROI." },
    ],
    faqs: [
      { q: "Kiedy efekty?", a: "W reklamach płatnych od razu po starcie. W SEO po ok. 3 miesiącach." },
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}