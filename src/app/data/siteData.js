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
    category: "Website",
    tags: ["Next.js", "WebGL"],
    color: "#334155",
  },
  {
    id: 2,
    title: "Dawid Duda",
    category: "Web App",
    tags: ["React", "Node.js"],
    color: "#475569",
  },
  {
    id: 3,
    title: "FinTech Dash",
    category: "SaaS",
    tags: ["Vue", "D3.js"],
    color: "#64748b",
  },
  {
    id: 4,
    title: "Social AI",
    category: "Mobile",
    tags: ["React Native", "OpenAI"],
    color: "#94a3b8",
  },
  {
    id: 5,
    title: "Neon City",
    category: "Concept",
    tags: ["UE5", "Blender"],
    color: "#cbd5e1",
  },
];

// === DANE WHY US ===
export const features = [
  {
    id: 1,
    type: "text",
    content: "We provide tailored solutions built on creativity, precision, and trust—ensuring quality results and a smooth experience every step of the way.",
  },
  {
    id: 2,
    type: "stat-92",
    value: "92",
    suffix: "%",
    label: "Client satisfaction rate, fostering long-term relationships and repeat business",
  },
  {
    id: 3,
    type: "stat-100",
    value: "100",
    suffix: "+",
    label: "Active users experiencing our design every day via products we made",
  },
  {
    id: 4,
    type: "stat-30k",
    value: "30",
    suffix: "K",
    label: "Delivered a high-quality project with exceptional attention to detail",
  },
  {
    id: 5,
    type: "last-card",
    content: "We deliver creative solutions with quality results that make an impact.",
  },
];

// === DANE TESTIMONIALS ===
export const testimonials = [
  {
    id: 1,
    name: "Bistro Miarki 8",
    imgColor: "bg-yellow-400",
    rating: "5/5",
    headline: "Great design",
    quote: "Bardzo dobra współpraca, super kontakt, szybka realizacja projektu.",
  },
  {
    id: 2,
    name: "Andrew Smith",
    role: "Owner of Ajay.",
    imgColor: "bg-green-500",
    rating: "5/5",
    headline: "Awesome Work",
    quote: "Professional, detail-oriented, and genuinely invested in our success. We couldn't have asked for a better partner.",
  },
  {
    id: 3,
    name: "Sarah Jones",
    role: "CTO at TechFlow",
    imgColor: "bg-blue-500",
    rating: "5/5",
    headline: "Incredible",
    quote: "The visual impact of the new site is incredible. Conversions are up by 40% in just the first month.",
  },
  {
    id: 4,
    name: "Michael Ross",
    role: "Founder at NextLevel",
    imgColor: "bg-orange-500",
    rating: "5/5",
    headline: "Top Class",
    quote: "Simply the best agency we've worked with. Their creativity and technical skills are unmatched in the industry.",
  },
  {
    id: 5,
    name: "Emma Watson",
    role: "Director at Creative",
    imgColor: "bg-purple-500",
    rating: "4.8/5",
    headline: "Visionary",
    quote: "They took our rough ideas and turned them into a digital masterpiece. The process was smooth and transparent.",
  },
  {
    id: 6,
    name: "James Lee",
    role: "CEO of Horizon",
    imgColor: "bg-teal-500",
    rating: "5/5",
    headline: "Game Changer",
    quote: "Our new platform is faster, sleeker, and more user-friendly than ever. This team truly delivers results.",
  },
];

// === TEKSTY ===
export const heroText = {
  main: "Strony",
  matterText: "które mają znaczenia",
};
