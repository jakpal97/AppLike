'use client'

import { useRef, useState } from 'react'
import { graphicElements } from '../data/siteData'
import HeroSection from './sections/HeroSection'
import ServicesTransitionSection from './sections/ServicesTransitionSection'
import PortfolioSection from './sections/PortfolioSection'
import ShopSection from './sections/ShopSection'
import WhyUsSection from './sections/WhyUsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import FooterSection from './sections/FooterSection'

const { Image1, Image2, Image3 } = graphicElements

export default function Hero() {
	const [servicesVisible, setServicesVisible] = useState(false)

	// Wspólne refy dla floating images
	const scrollContainerRef = useRef(null)
	const floatingImg1Ref = useRef(null)
	const floatingImg2Ref = useRef(null)
	const floatingImg3Ref = useRef(null)

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
				{/* Używamy jednostek vw/vh dla lepszej responsywności */}
				<div
					ref={floatingImg1Ref}
					className="absolute w-[18vw] h-[22vw] max-w-[160px] max-h-[200px] min-w-[70px] min-h-[90px] rounded-xl md:rounded-3xl overflow-hidden invisible shadow-2xl"
					style={{ left: '10%', top: '20%' }}>
					<Image1 />
				</div>
				<div
					ref={floatingImg2Ref}
					className="absolute w-[20vw] h-[24vw] max-w-[180px] max-h-[220px] min-w-[80px] min-h-[100px] rounded-xl md:rounded-3xl overflow-hidden invisible shadow-2xl"
					style={{ left: '40%', top: '25%' }}>
					<Image2 />
				</div>
				<div
					ref={floatingImg3Ref}
					className="absolute w-[18vw] h-[18vw] max-w-[150px] max-h-[150px] min-w-[70px] min-h-[70px] rounded-xl md:rounded-3xl overflow-hidden invisible shadow-2xl"
					style={{ right: '15%', top: '35%' }}>
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
	)
}
