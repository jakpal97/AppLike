'use client'

import { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

	// Uruchamia się PO wszystkich dzieciach — odświeża pozycje wszystkich triggerów
	// gdy spacery Services i Portfolio są już w DOM
	useEffect(() => {
		const id = setTimeout(() => {
			ScrollTrigger.refresh()
		}, 100)
		return () => clearTimeout(id)
	}, [])

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
