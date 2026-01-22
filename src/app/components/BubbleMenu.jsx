"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

const MENU_ITEMS = [
  {
    label: 'Strona główna',
    href: '/',
    rotation: -5,
    hoverStyles: { bgColor: '#000000', textColor: '#ffffff' }
  },
  {
    label: 'Usługi',
    href: '/#services', 
    rotation: 5,
    hoverStyles: { bgColor: '#2563eb', textColor: '#ffffff' }
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    rotation: -3,
    hoverStyles: { bgColor: '#000000', textColor: '#ffffff' }
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
    rotation: 4,
    hoverStyles: { bgColor: '#2563eb', textColor: '#ffffff' }
  }
];

export default function BubbleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);
  const navRef = useRef(null); // Ref do animacji chowania paska
  const menuItems = MENU_ITEMS;

  const animationDuration = 0.5;
  const staggerDelay = 0.1;

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- 1. LOGIKA UKRYWANIA NAVBARA NA SCROLL ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;

      // Nie ukrywaj jeśli menu jest otwarte lub brak referencji
      if (isMenuOpen || !nav) return;

      // Jeśli scrollujemy w dół i minęliśmy górę strony (np. 50px)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        gsap.to(nav, { 
            yPercent: -150, // Chowa nawigację do góry
            duration: 0.3, 
            ease: "power3.out" 
        });
      } 
      // Jeśli scrollujemy w górę
      else {
        gsap.to(nav, { 
            yPercent: 0, // Pokazuje nawigację
            duration: 0.3, 
            ease: "power3.out" 
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // --- 2. ANIMACJE OTWIERANIA/ZAMYKANIA MENU ---
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      // Otwieranie
      gsap.set(overlay, { display: 'flex', autoAlpha: 1 });
      gsap.killTweensOf([...bubbles, ...labels]);
      
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 40, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        
        gsap.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: "back.out(1.7)",
          delay: delay
        });

        if (labels[i]) {
          gsap.to(labels[i], {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration * 0.8,
            ease: "power3.out",
            delay: delay + 0.1
          });
        }
      });

    } else {
      // Zamykanie
      // Sprawdzamy czy overlay jest w ogóle widoczny, żeby nie animować na starcie
      if (overlay.style.display !== 'none') {
          gsap.killTweensOf([...bubbles, ...labels]);
          
          gsap.to(labels, {
            y: 40,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power3.in"
          });

          gsap.to(bubbles, {
            scale: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.in",
            onComplete: () => {
              gsap.set(overlay, { display: 'none' });
              // USUNIĘTO BŁĘDNE WYWOŁANIE: setShowOverlay(false);
            }
          });
      }
    }
  }, [isMenuOpen]);

  // Responsive Rotation Logic
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <style>{`
        .bubble-menu-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(255,255,255,0.98);
            z-index: 999;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .bubble-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            max-width: 1200px;
            width: 100%;
            padding: 20px;
        }

        .bubble-item {
            flex: 1 1 300px;
            display: flex;
            justify-content: center;
        }

        .bubble-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 400px;
            height: 180px;
            border-radius: 100px;
            background: #fff;
            color: #000;
            text-decoration: none;
            font-size: 3rem;
            font-weight: 700;
            text-transform: uppercase;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s, background 0.3s, color 0.3s;
            cursor: pointer;
            border: 1px solid #eee;
        }
        
        @media (max-width: 768px) {
            .bubble-link {
                height: 100px;
                font-size: 2rem;
            }
        }
      `}</style>

      {/* --- NAVBAR HEADER (Fixed Top) --- */}
      <nav 
        ref={navRef} // Dodany REF dla animacji chowania
        className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-[1000] pointer-events-none transition-transform will-change-transform"
      >
        
        {/* LOGO (Left) */}
        <Link href="/" className="pointer-events-auto block relative transition-opacity hover:opacity-80">
            <Image 
              src="/logo2.png" 
              alt="AppLike Logo" 
              width={300} 
              height={80} 
              className="w-auto h-10 md:h-12 object-contain" // Bez invert, bo logo jest czarne
              priority
            />
        </Link>

        {/* TOGGLE BUTTON (Right) */}
        <button
          onClick={handleToggle}
          // Powiększony przycisk: w-16 h-16 (mobile), w-20 h-20 (desktop)
          className="pointer-events-auto bg-white text-black w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg flex flex-col items-center justify-center gap-1.5 hover:scale-105 transition-transform cursor-pointer border-none outline-none z-[1001]"
          aria-label="Toggle menu"
        >
          {/* Powiększone paski hamburgera */}
          <span 
            className="block w-8 md:w-10 h-0.5 bg-black transition-transform duration-300"
            style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} 
          />
          <span 
            className="block w-8 md:w-10 h-0.5 bg-black transition-opacity duration-300"
            style={{ opacity: isMenuOpen ? 0 : 1 }} 
          />
          <span 
            className="block w-8 md:w-10 h-0.5 bg-black transition-transform duration-300"
            style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} 
          />
        </button>
      </nav>

      {/* --- FULLSCREEN OVERLAY MENU --- */}
      <div ref={overlayRef} className="bubble-menu-overlay text-center">
        <div className="bubble-grid">
            {menuItems.map((item, idx) => (
                <div key={idx} className="bubble-item">
                    <Link
                        href={item.href}
                        onClick={() => handleToggle()} 
                        className="bubble-link"
                        ref={el => bubblesRef.current[idx] = el}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = item.hoverStyles.bgColor;
                            e.currentTarget.style.color = item.hoverStyles.textColor;
                            e.currentTarget.style.transform = `scale(1.05) rotate(${item.rotation}deg)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.transform = `scale(1) rotate(0deg)`;
                        }}
                    >
                        <span ref={el => labelRefs.current[idx] = el}>
                            {item.label}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}