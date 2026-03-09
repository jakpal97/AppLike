'use client'

import { useRef } from 'react'
import HeroSection from './sections/HeroSection'
import AboutSlide from './AboutSlide'
import About from './About'
import ServicesTransitionSection from './sections/ServicesTransitionSection'
import PortfolioSection from './sections/PortfolioSection'
import ShopSection from './sections/ShopSection'
import WhyUsSection from './sections/WhyUsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import FooterSection from './sections/FooterSection'

export default function Hero() {
	const scrollContainerRef = useRef(null)

	return (
		<>
			{/* Hero Section — animacja tekstu */}
			<HeroSection scrollContainerRef={scrollContainerRef} />

		{/* About Slide — wjeżdża od dołu gdy animacja hero kończy się */}
		<AboutSlide />

		{/* About — tekst i statystyki */}
		<About />

		{/* Services — sekcja usług */}
		<ServicesTransitionSection />

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
	)
}
