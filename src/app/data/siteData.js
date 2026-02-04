// === DANE GRAFICZNE ===
export const graphicElements = {
  Image1: () => (
    <div className="w-full h-full">
      <img src="/googleIcon.png" alt="Ikonka Google" className="w-full h-full object-contain"/>
    </div>
  ),
  Image2: () => (
    <div className="w-full h-full ">
      <img src="/komputerIcon.png" alt="Ikona komputera " className="w-full h-full object-contain"/>
    </div>
  ),
  Image3: () => (
    <div className="w-full h-full ">
      <img src="/telefonIcon.png" alt="Ikona komputera " className="w-full h-full object-contain"/>
    </div>
  ),
};

// === DANE SKLEPU ===
export const shopTemplates = [
  {
    id: 1,
    title: "Mono Portfolio",
    price: "1500 PLN",
    color: "#1c1c1c",
  },
  {
    id: 2,
    title: "E-Commerce Pro",
    price: "2500 PLN",
    color: "#2563eb",
  },
  {
    id: 3,
    title: "Restaurant Vibe",
    price: "1800 PLN",
    color: "#059669",
  },
];

// === DANE PORTFOLIO ===
export const projects = [
  {
    id: 1,
    title: "Yelonmedia",
    category: "Strona WWW",
    
    image: '/filmYelonMedia.mp4',
    poster: '/YelonMedia.webp', // Dodaj miniaturkę do folderu public!
    color: "#1a1a1a"
  },
  {
    id: 2,
    title: "Dawid Duda",
    category: "Strona WWW",
    
    image: 'dawidDudaFilm.mp4',
    poster: '/dawidDudaStrona.webp',
    color: "#475569",
  },
  {
    id: 3,
    title: "Bistro Miarki 8",
    category: "kompletny projekt strony WWW",
   
    image: './bistroMiarki8.mp4',
    poster: '/bistroMiarki8.png',
    color: "#64748b",
  },
  {
    id: 4,
    title: "Social AI",
    category: "Mobile",
    tags: ["React Native", "OpenAI"],
    image: '', // Możesz tu dodać link do zdjęcia/filmu
    color: "#94a3b8",
  },
  {
    id: 5,
    title: "Neon City",
    category: "Concept",
    tags: ["UE5", "Blender"],
    image: '',
    color: "#cbd5e1",
  },
];

// ... reszta Twoich danych bez zmian
// === DANE WHY US ===
export const features = [
  {
    id: 1,
    type: "text",
    content: "Dostarczamy dedykowane rozwiązania oparte na kreatywności i precyzji. Gwarantujemy najwyższą jakość kodu oraz płynną komunikację na każdym etapie projektu.",
  },
  {
    id: 2,
    type: "stat-92",
    value: "98", // Podniosłem nieco dla lepszego efektu wizualnego
    suffix: "%",
    label: "Zadowolonych klientów, którzy polecają nasze usługi i wracają z nowymi pomysłami.",
  },
  {
    id: 3,
    type: "stat-100",
    value: "100",
    suffix: "%",
    label: "Responsywności i optymalizacji pod kątem SEO w każdym wdrożonym projekcie.",
  },
  {
    id: 4,
    type: "stat-30k",
    value: "24",
    suffix: "h", // Czas reakcji wsparcia technicznego lub szybkość wyceny
    label: "Maksymalny czas reakcji na zapytania, zapewniający pełne wsparcie Twojego biznesu.",
  },
  {
    id: 5,
    type: "last-card",
    content: "Tworzymy skuteczne rozwiązania cyfrowe, które realnie zwiększają Twoje zyski i budują przewagę rynkową.",
  },
];

// === DANE TESTIMONIALS ===
export const testimonials = [
  {
    id: 1,
    name: "Bistro Miarki 8",
    imgColor: "bg-yellow-400",
    rating: "5/5",
    headline: "Super",
    quote: "Bardzo dobra współpraca, super kontakt, szybka realizacja projektu.",
  },
  {
    id: 2,
    name: "Synetiq",
   
    imgColor: "bg-green-500",
    rating: "5/5",
    headline: "Super",
    quote: "Professional, detail-oriented, and genuinely invested in our success. We couldn't have asked for a better partner.",
  },
  {
    id: 3,
    name: "YelonMedia",
    role: "Fotograf",
    imgColor: "bg-blue-500",
    rating: "5/5",
    headline: "Super",
    quote: "The visual impact of the new site is incredible. Conversions are up by 40% in just the first month.",
  },
  {
    id: 4,
    name: "Dawid Duda",
    role: "Trener Personalny",
    imgColor: "bg-orange-500",
    rating: "5/5",
    headline: "Top",
    quote: "Simply the best agency we've worked with. Their creativity and technical skills are unmatched in the industry.",
  },
];

// === TEKSTY ===
export const heroText = {
  main: "Strony",
  matterText: "które mają znaczenia",
};
