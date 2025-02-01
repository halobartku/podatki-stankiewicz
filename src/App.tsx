import { useEffect, useRef, useState } from 'react'
import { 
  Briefcase,
  Star,
  Home,
  ShieldCheck,
  Phone
} from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SEO } from './components/shared/SEO'
import { Navigation } from './components/Navigation'
import { ContactCard } from './components/ContactCard'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { PrivacyPolicy } from './components/PrivacyPolicy'
import ProductFeatures from './components/animata/hero/product-features'
import { Solutions } from './components/Solutions'
import { Expertise } from './components/Expertise'
import Analytics from './components/Analytics'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BackgroundGradient } from './components/BackgroundGradient'
import { cn } from './lib/utils'

const navigationSections: NavItem[] = [
  { id: 'home', title: 'Strona Główna', label: 'Strona Główna', href: '#home', icon: Home },
  { id: 'services', title: 'Rozwiązania', label: 'Rozwiązania Biznesowe', href: '#services', icon: Briefcase },
  { id: 'expertise', title: 'Usługi', label: 'Specjalizacje', href: '#expertise', icon: Star },
  { id: 'team', title: 'Weryfikacja Kontrahenta', label: 'Weryfikacja Kontrahenta', href: '#team', icon: ShieldCheck },
  { id: 'contact', title: 'Kontakt', label: 'Kontakt', href: '#contact', icon: Phone },
]

function MainContent() {
  const [currentSection, setCurrentSection] = useState('home')
  const sectionsRef = useRef<Array<HTMLElement | null>>([])
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDelta = useRef(0)
  const SCROLL_THRESHOLD = 100
  const SCROLL_COOLDOWN = 500
  const ACCUMULATOR_RESET_DELAY = 300
  const lastAccumulatorReset = useRef(Date.now())
  const touchpadMultiplier = 0.2
  const isMobile = window.innerWidth < 1024

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    setShowCookieConsent(!consent)
  }, [])

  const handleNavigate = (id: string) => {
    const section = sectionsRef.current[navigationSections.findIndex(section => section.id === id)]
    if (section) {
      if (!isMobile) {
        const container = containerRef.current;
        if (container) {
          const sectionIndex = navigationSections.findIndex(section => section.id === id);
          const scrollLeft = sectionIndex * window.innerWidth;
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
        setCurrentSection(id)
      } else {
        // Basic anchor navigation for mobile
        window.location.hash = id;
      }
    }
  }

  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const currentIndex = navigationSections.findIndex(section => section.id === currentSection)
      let nextSection: string | null = null

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          if (currentIndex > 0) {
            nextSection = navigationSections[currentIndex - 1].id
          }
          break
        case 'ArrowDown':
        case 'ArrowRight':
          if (currentIndex < navigationSections.length - 1) {
            nextSection = navigationSections[currentIndex + 1].id
          }
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          const index = parseInt(e.key) - 1
          if (index >= 0 && index < navigationSections.length) {
            nextSection = navigationSections[index].id
          }
          break
      }

      if (nextSection && !isScrolling) {
        e.preventDefault()
        handleNavigate(nextSection)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isScrolling])

  // Desktop-only wheel event handling
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.target instanceof Element) {
        const targetElement = e.target as Element
        if (
          targetElement.tagName === 'SELECT' ||
          targetElement.closest('select') ||
          targetElement.closest('.dropdown-content')
        ) {
          return
        }
      }
      
      e.preventDefault()
      
      if (isScrolling || !containerRef.current) return

      const now = Date.now()
      
      if (now - lastAccumulatorReset.current > ACCUMULATOR_RESET_DELAY) {
        scrollAccumulator.current = 0
        lastAccumulatorReset.current = now
      }

      if (now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return
      }

      const isTouchpad = Math.abs(e.deltaY) < 50
      
      let normalizedDelta = e.deltaY
      if (isTouchpad) {
        normalizedDelta *= touchpadMultiplier
      } else if (e.deltaMode === 1) {
        normalizedDelta *= 8
      } else if (e.deltaMode === 2) {
        normalizedDelta *= window.innerHeight
      }

      if (Math.sign(normalizedDelta) !== Math.sign(lastDelta.current)) {
        scrollAccumulator.current = 0
      }
      lastDelta.current = normalizedDelta

      scrollAccumulator.current += normalizedDelta

      if (Math.abs(scrollAccumulator.current) < SCROLL_THRESHOLD) {
        return
      }

      setIsScrolling(true)
      lastScrollTime.current = now
      
      const currentIndex = navigationSections.findIndex(section => section.id === currentSection)
      let nextSection = currentSection
      
      if (scrollAccumulator.current < 0 && currentIndex > 0) {
        nextSection = navigationSections[currentIndex - 1].id
      } else if (scrollAccumulator.current > 0 && currentIndex < navigationSections.length - 1) {
        nextSection = navigationSections[currentIndex + 1].id
      }
      
      scrollAccumulator.current = 0
      lastAccumulatorReset.current = now
      
      handleNavigate(nextSection)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, SCROLL_COOLDOWN)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSection, isScrolling])

  // Desktop-only intersection observer
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0 && !isScrolling) {
          const id = visibleEntries[0].target.getAttribute('id');
          if (id) setCurrentSection(id);
        }
      },
      {
        root: null,
        rootMargin: '-45% 0px',
        threshold: 0.5
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  return (
    <BackgroundGradient className="min-h-screen" currentSection={currentSection}>
      <div className="flex flex-col min-h-screen">
        <Navigation 
          sections={navigationSections}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />
        
        <main 
          ref={containerRef}
          className={cn(
            "relative z-10 flex-1 w-full touch-manipulation touch-scroll-momentum",
            isMobile ? "block" : "overscroll-none flex snap-x snap-mandatory"
          )}
        >
          {navigationSections.map((section, index) => (
            <section 
              key={section.id}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              id={section.id}
              className={cn(
                "relative w-full min-h-screen",
                !isMobile && "overscroll-none snap-start min-w-full w-screen h-screen flex-shrink-0",
                index === navigationSections.length - 1 ? 'pb-safe' : ''
              )}
            >
              <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex-1">
                  {section.id === 'home' && <ProductFeatures />}
                  {section.id === 'services' && <Solutions />}
                  {section.id === 'expertise' && <Expertise />}
                  {section.id === 'team' && <Analytics />}
                  {section.id === 'contact' && <ContactCard />}
                </div>
              </div>
            </section>
          ))}
        </main>
        <Footer />
      </div>
      
      <CookieConsent show={showCookieConsent} onAccept={() => setShowCookieConsent(false)} />
      <SpeedInsights />
    </BackgroundGradient>
  )
}

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HelmetProvider>
  )
}

export default App
