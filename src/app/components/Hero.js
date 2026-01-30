"use client";

import { useRef, useState } from "react";
import { graphicElements } from "../data/siteData";
import HeroSection from "./sections/HeroSection";
import ServicesTransitionSection from "./sections/ServicesTransitionSection";
import PortfolioSection from "./sections/PortfolioSection";
import ShopSection from "./sections/ShopSection";
import WhyUsSection from "./sections/WhyUsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FooterSection from "./sections/FooterSection";

const { Image1, Image2, Image3 } = graphicElements;

export default function Hero() {
  const [servicesVisible, setServicesVisible] = useState(false);

  // Wspólne refy dla floating images
  const scrollContainerRef = useRef(null);
  const floatingImg1Ref = useRef(null);
  const floatingImg2Ref = useRef(null);
  const floatingImg3Ref = useRef(null);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        scrollContainerRef={scrollContainerRef}
        floatingImg1Ref={floatingImg1Ref}
        floatingImg2Ref={floatingImg2Ref}
        floatingImg3Ref={floatingImg3Ref}
      />

      {/* Floating Images Container */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        <div
          ref={floatingImg1Ref}
          className="absolute w-[100px] h-[120px] sm:w-[130px] sm:h-[160px] md:w-[150px] md:h-[180px] lg:w-[180px] lg:h-[220px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl invisible"
          style={{ left: "8%", top: "15%" }}
        >
          <Image1 />
        </div>
        <div
          ref={floatingImg2Ref}
          className="absolute w-[110px] h-[140px] sm:w-[140px] sm:h-[180px] md:w-[160px] md:h-[200px] lg:w-[200px] lg:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl invisible"
          style={{ left: "35%", top: "22%" }}
        >
          <Image2 />
        </div>
        <div
          ref={floatingImg3Ref}
          className="absolute w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl invisible"
          style={{ right: "12%", top: "30%" }}
        >
          <Image3 />
        </div>
      </div>

      {/* Services Transition Section */}
      <ServicesTransitionSection
        servicesVisible={servicesVisible}
        setServicesVisible={setServicesVisible}
        floatingImg1Ref={floatingImg1Ref}
        floatingImg2Ref={floatingImg2Ref}
        floatingImg3Ref={floatingImg3Ref}
      />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Shop Section */}
      <ShopSection />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer Section */}
      <FooterSection />
    </>
  );
}
