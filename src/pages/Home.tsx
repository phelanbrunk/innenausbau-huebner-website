import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ChevronDown, Quote, Phone, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ==========================================
   3D Architectural Grid (Three.js)
   ========================================== */
const ArchitecturalGrid = lazy(() => import('./ArchitecturalGrid'))

/* ==========================================
   Counter Component
   ========================================== */
interface CounterProps {
  target: number
  suffix?: string
  duration?: number
  inView: boolean
}

function Counter({ target, suffix = '', duration = 2, inView }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    if (!inView) return

    const tween = gsap.to(countRef.current, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.round(countRef.current.value))
      },
    })

    return () => { tween.kill() }
  }, [inView, target, duration])

  return (
    <span className="font-display font-bold" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#39FF14' }}>
      {count}{suffix}
    </span>
  )
}

/* ==========================================
   Main Home Page
   ========================================== */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [countersInView, setCountersInView] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* Mouse parallax for hero */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2

      if (videoWrapRef.current) {
        const x = mouseRef.current.x * 15
        const y = mouseRef.current.y * 15
        videoWrapRef.current.style.transform = `translate(${x}px, ${y}px) scale(1)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  /* GSAP animations */
  useGSAP(() => {
    /* Hero entrance animations */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-grid', { opacity: 0 }, { opacity: 1, duration: 2 })
      .fromTo('.hero-video-wrap', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, 0.3)
      .fromTo('.hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.8)
      .fromTo('.hero-char', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.03, duration: 1, ease: 'power4.out' }, 1)
      .fromTo('.hero-subline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.8)
      .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, 2.2)
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 3)

    /* Counter trigger */
    if (counterRef.current) {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => setCountersInView(true),
      })
    }

    /* Counter labels stagger */
    gsap.fromTo(
      '.counter-label',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    /* About section */
    gsap.fromTo(
      '.about-text',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%', once: true },
      }
    )

    gsap.fromTo(
      '.about-image',
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%', once: true },
      }
    )

    /* Services heading */
    gsap.fromTo(
      '.services-heading > *',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 80%', once: true },
      }
    )

    /* Testimonials */
    gsap.fromTo(
      '.testimonial-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%', once: true },
      }
    )

    /* CTA */
    gsap.fromTo(
      '.cta-headline',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
      }
    )

    gsap.fromTo(
      '.cta-rest > *',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: heroRef })

  /* Split headline into characters */
  const headlineText = 'Wir bauen Ihre Vision.'

  return (
    <div style={{ backgroundColor: '#030504' }}>
      {/* ==========================================
          Section 1: Hero
      ========================================== */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* 3D Grid Background */}
        <div className="hero-grid absolute inset-0 z-0" style={{ opacity: 0 }}>
          <Suspense fallback={null}>
            <ArchitecturalGrid />
          </Suspense>
        </div>

        {/* Video / Image Background with parallax */}
        <div
          ref={videoWrapRef}
          className="hero-video-wrap absolute inset-0 z-[1]"
          style={{ opacity: 0 }}
        >
          <img
            src="/hero-dachboden.jpg"
            alt="Innenausbau Hübner - Fertiger Dachboden"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(3,5,4,0.3), rgba(3,5,4,0.85))' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-max mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p
              className="hero-eyebrow font-body text-[0.75rem] font-medium uppercase mb-6"
              style={{ color: '#39FF14', letterSpacing: '0.15em', opacity: 0 }}
            >
              INNENAUSBAU &middot; TROCKENBAU &middot; BODENLEGE
            </p>

            {/* Headline with character animation */}
            <h1
              className="font-display font-bold uppercase mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#F5F5F0',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              {headlineText.split('').map((char, i) => (
                <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Subline */}
            <p
              className="hero-subline font-body text-[1.125rem] mb-8 max-w-[500px]"
              style={{ color: 'rgba(245,245,240,0.7)', lineHeight: 1.65, opacity: 0 }}
            >
              Innenausbau Hübner — Ihr Fachbetrieb für Trockenbau, Innentüren und Bodenbeläge im Harz.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projekte"
                className="hero-cta inline-flex items-center font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#39FF14',
                  color: '#030504',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#45FF20'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(57,255,20,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#39FF14'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Projekte ansehen
              </a>
              <Link
                to="/kontakt"
                className="hero-cta inline-flex items-center font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg transition-all duration-300"
                style={{
                  color: '#39FF14',
                  border: '1px solid #39FF14',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#39FF14'
                  e.currentTarget.style.color = '#030504'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#39FF14'
                }}
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-subtle"
          style={{ opacity: 0 }}
        >
          <span className="font-body text-[0.625rem] uppercase tracking-[0.15em]" style={{ color: 'rgba(245,245,240,0.5)' }}>
            Scroll
          </span>
          <ChevronDown size={20} style={{ color: '#39FF14' }} />
        </div>
      </section>

      {/* ==========================================
          Section 2: Counter Strip
      ========================================== */}
      <section
        ref={counterRef}
        style={{
          backgroundColor: '#0A0F0C',
          borderTop: '1px solid rgba(57,255,20,0.1)',
          borderBottom: '1px solid rgba(57,255,20,0.1)',
        }}
      >
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { target: 500, suffix: '+', label: 'Abgeschlossene Projekte' },
              { target: 20, suffix: '+', label: 'Jahre Erfahrung' },
              { target: 6, suffix: '', label: 'Spezialisten im Team' },
              { target: 100, suffix: '%', label: 'Kundenzufriedenheit' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <Counter target={item.target} suffix={item.suffix} inView={countersInView} />
                <span
                  className="counter-label font-body text-[0.875rem] font-medium uppercase mt-2"
                  style={{ color: 'rgba(245,245,240,0.6)', letterSpacing: '0.05em' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 3: About
      ========================================== */}
      <section ref={aboutRef} className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="about-text" style={{ opacity: 0 }}>
              <p
                className="font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
                style={{ color: '#39FF14' }}
              >
                ÜBER UNS
              </p>
              <h2
                className="font-display font-medium uppercase mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: '#F5F5F0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Handwerk mit Leidenschaft
              </h2>
              <p
                className="font-body text-[1rem] mb-8"
                style={{
                  color: 'rgba(245,245,240,0.8)',
                  lineHeight: 1.7,
                  maxWidth: '540px',
                }}
              >
                Seit über 20 Jahren ist Innenausbau Christoph Hübner Ihr zuverlässiger Partner für hochwertigen Innenausbau im Harz und der Region. Von der ersten Beratung bis zur fertigen Montage — wir begleiten Sie auf dem Weg zu Ihrem Traumraum.
              </p>
              <Link
                to="/team"
                className="inline-flex items-center font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg transition-all duration-300"
                style={{
                  color: '#39FF14',
                  border: '1px solid #39FF14',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#39FF14'
                  e.currentTarget.style.color = '#030504'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#39FF14'
                }}
              >
                Mehr erfahren
              </Link>
            </div>

            {/* Image Column */}
            <div className="about-image relative" style={{ opacity: 0 }}>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ borderLeft: '3px solid #39FF14' }}
              >
                <img
                  src="/logo-huebner.png"
                  alt="Innenausbau Hübner - Ihr zuverlässiger Partner"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 4: Services Carousel (3D)
      ========================================== */}
      <ServicesSection />

      {/* ==========================================
          Section 4b: Service Cards (3 pillars)
      ========================================== */}
      <ServiceCardsSection />

      {/* ==========================================
          Section 5: Testimonials
      ========================================== */}
      <section
        ref={testimonialsRef}
        className="section-padding"
        style={{ backgroundColor: '#0A0F0C' }}
      >
        <div className="container-max mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p
              className="font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
              style={{ color: '#39FF14' }}
            >
              DAS SAGEN UNSERE KUNDEN
            </p>
            <h2
              className="font-display font-medium uppercase"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#F5F5F0',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Zufriedene Kunden, überzeugende Ergebnisse
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Herr Hübner und sein Team haben unsere komplette Wohnung saniert. Absolute Profis — pünktlich, sauber und das Ergebnis ist top!',
                author: 'Familie Schäfer',
                location: 'Wernigerode',
              },
              {
                quote: 'Die Schiebetüren sind perfekt eingebaut. Die Beratung war ausgezeichnet und die Montage lief reibungslos.',
                author: 'Peter K.',
                location: 'Ilsenburg',
              },
              {
                quote: 'Vom Boden bis zur Decke — alles perfekt. Wir empfehlen Innenausbau Hübner jedem weiter.',
                author: 'Maria L.',
                location: 'Blankenburg',
              },
            ].map((t) => (
              <div
                key={t.author}
                className="testimonial-card relative rounded-xl p-8"
                style={{
                  backgroundColor: '#141916',
                  border: '1px solid rgba(57,255,20,0.08)',
                  opacity: 0,
                }}
              >
                {/* Quote icon */}
                <Quote
                  size={40}
                  className="absolute top-6 left-6"
                  style={{ color: 'rgba(57,255,20,0.2)' }}
                />
                <div className="relative z-10 mt-8">
                  <p
                    className="font-body text-[1rem] italic mb-6"
                    style={{ color: '#F5F5F0', lineHeight: 1.7 }}
                  >
                    "{t.quote}"
                  </p>
                  <p className="font-body text-[0.875rem] font-medium" style={{ color: '#39FF14' }}>
                    {t.author}
                  </p>
                  <p className="font-body text-[0.75rem]" style={{ color: 'rgba(245,245,240,0.5)' }}>
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 7: CTA Banner
      ========================================== */}
      <section
        ref={ctaRef}
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.08) 0%, transparent 60%)',
          backgroundColor: '#030504',
        }}
      >
        {/* Pulsing background glow */}
        <div
          className="absolute inset-0 pointer-events-none animate-glow-pulse"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 container-max mx-auto text-center">
          <h2
            className="cta-headline font-display font-medium mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              lineHeight: 1.1,
            }}
          >
            Bereit für Ihr neues Zuhause?
          </h2>
          <div className="cta-rest">
            <p
              className="font-body text-[1rem] mb-8"
              style={{ color: 'rgba(245,245,240,0.6)' }}
            >
              Kontaktieren Sie uns für eine unverbindliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-10 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-neon-pulse"
                style={{
                  backgroundColor: '#39FF14',
                  color: '#030504',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#45FF20'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#39FF14'
                }}
              >
                Jetzt anfragen
              </Link>
            </div>
            <a
              href="tel:01712182983"
              className="inline-flex items-center gap-2 mt-6 font-body text-[1rem] transition-colors duration-300 hover:opacity-80"
              style={{ color: '#39FF14' }}
            >
              <Phone size={18} />
              Oder anrufen: 0171 / 21 82 983
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ==========================================
   Services Section (3D Carousel)
   ========================================== */
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(rotationRef, {
        current: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (carouselRef.current) {
              const rot = self.progress * 360
              carouselRef.current.style.transform = `rotateY(${rot}deg)`
            }
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const services = [
    {
      image: '/trockenbau.jpg',
      title: 'Trockenbau',
      desc: 'Trennwände, Decken, Dämmung — schnell, sauber, flexibel',
    },
    {
      image: '/innentueren.jpg',
      title: 'Innentüren & Schiebetüren',
      desc: 'Beratung, Planung, fachgerechte Montage',
    },
    {
      image: '/bodenbelege.jpg',
      title: 'Panele & Bodenbeläge',
      desc: 'Vinyl, Laminat, Designböden in Profiqualität',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="section-padding overflow-hidden"
      style={{ backgroundColor: '#0A0F0C' }}
    >
      <div className="container-max mx-auto">
        {/* Heading */}
        <div className="services-heading text-center mb-16">
          <p
            className="font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
            style={{ color: '#39FF14' }}
          >
            UNSERE LEISTUNGEN
          </p>
          <h2
            className="font-display font-medium uppercase mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Alles aus einer Hand
          </h2>
          <p
            className="font-body text-[1rem]"
            style={{ color: 'rgba(245,245,240,0.6)' }}
          >
            Von der Planung bis zur perfekten Ausführung — wir übernehmen jeden Schritt.
          </p>
        </div>

        {/* 3D Carousel - Desktop */}
        <div
          className="hidden md:block relative h-[500px]"
          style={{ perspective: '2000px' }}
        >
          <div
            ref={carouselRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
            }}
          >
            {services.map((service, i) => {
              const angle = (360 / services.length) * i
              return (
                <div
                  key={service.title}
                  className="absolute w-[350px] lg:w-[400px] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(400px)`,
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#141916',
                    border: '1px solid rgba(57,255,20,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(57,255,20,0.1)'
                    e.currentTarget.style.transform = `rotateY(${angle}deg) translateZ(400px) scale(1.03)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = `rotateY(${angle}deg) translateZ(400px) scale(1)`
                  }}
                >
                  <div className="h-[250px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-600"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="font-display font-medium text-[1.5rem] mb-2"
                      style={{ color: '#F5F5F0', letterSpacing: '-0.01em' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-body text-[0.875rem]"
                      style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.65 }}
                    >
                      {service.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Fallback - Stacked Cards */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#141916',
                border: '1px solid rgba(57,255,20,0.1)',
              }}
            >
              <div className="h-[200px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-display font-medium text-[1.25rem] mb-2"
                  style={{ color: '#F5F5F0' }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-body text-[0.875rem]"
                  style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.65 }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   Service Cards Section (3 Pillars)
   ========================================== */
function ServiceCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.servicecards-heading > *',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
    gsap.fromTo(
      '.service-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.service-cards-grid', start: 'top 85%', once: true },
      }
    )
  }, { scope: sectionRef })

  const cards = [
    {
      image: '/trockenbau.jpg',
      title: 'Trockenbau',
      desc: 'Trockenbau ist eine Form des Herstellens von raumbegrenzten nichtragenden Bauteilen. Ohne wasserhaltige Baustoffe wie Mörtel, Lehm, Beton oder Putz.',
      cta: 'Trockenbau',
      link: '/leistungen',
    },
    {
      image: '/innentueren.jpg',
      title: 'Innentüren',
      desc: 'Wir beraten, planen, bestellen, liefern und montieren fachgerecht Ihre neuen Innentüren von Prüm, Dana, Westag, Jeld Wen und Könlein.',
      brands: ['Prüm', 'Dana', 'Westag', 'Jeld Wen', 'Könlein'],
      link: '/leistungen',
    },
    {
      image: '/bodenbelege.jpg',
      title: 'Panele und Bodenbelege',
      desc: 'Wir verlegen und verarbeiten für Sie: Vinyl, Laminat und Panele in Profiqualität.',
      items: ['Vinyl', 'Laminat', 'Panele'],
      cta: 'Boden Montage',
      link: '/leistungen',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: '#030504',
        borderTop: '1px solid rgba(57,255,20,0.1)',
      }}
    >
      <div className="container-max mx-auto">
        <div className="servicecards-heading text-center mb-16">
          <p
            className="font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
            style={{ color: '#39FF14' }}
          >
            UNSERE KERNKOMPETENZEN
          </p>
          <h2
            className="font-display font-medium uppercase mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Willkommen bei Innenausbau Hübner
          </h2>
          <p
            className="font-body text-[1rem]"
            style={{ color: 'rgba(245,245,240,0.6)' }}
          >
            Drei Säulen. Ein Ansprechpartner. Ihre Vision, unsere Leidenschaft.
          </p>
        </div>

        <div className="service-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="service-card group relative rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#0A0F0C',
                border: '1px solid rgba(57,255,20,0.1)',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(57,255,20,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(57,255,20,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20"
                  style={{ background: 'linear-gradient(to top, #0A0F0C, transparent)' }}
                />
              </div>

              <div className="p-6">
                <h3
                  className="font-display font-medium text-[1.5rem] mb-3"
                  style={{ color: '#F5F5F0', letterSpacing: '-0.01em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-body text-[0.875rem] mb-4"
                  style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.7 }}
                >
                  {card.desc}
                </p>

                {card.brands && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.brands.map((brand) => (
                      <span
                        key={brand}
                        className="font-body text-[0.75rem] font-medium uppercase tracking-[0.05em] px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(57,255,20,0.08)',
                          color: '#39FF14',
                          border: '1px solid rgba(57,255,20,0.15)',
                        }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                )}

                {card.items && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className="font-body text-[0.75rem] font-medium uppercase tracking-[0.05em] px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(57,255,20,0.08)',
                          color: '#39FF14',
                          border: '1px solid rgba(57,255,20,0.15)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {card.cta && (
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-2 font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: '#FF5722',
                      color: '#F5F5F0',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF7043'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(255,87,34,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF5722'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {card.cta}
                    <ArrowRight size={16} />
                  </Link>
                )}

                {!card.cta && (
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-2 font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] transition-colors duration-300"
                    style={{ color: '#39FF14' }}
                  >
                    Mehr erfahren
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
