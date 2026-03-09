"use client";

import ServicesSection from "../ServicesSection";

export default function ServicesTransitionSection() {
  return (
    <section
      className="relative w-full bg-white"
      style={{ zIndex: 40 }}
    >
      <ServicesSection isVisible={true} />
    </section>
  );
}
