import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  LayoutGrid,
  DoorOpen,
  Layers,
  Bath,
  Hammer,
  ArrowLeftRight,
  Thermometer,
  Square,
  MessageCircle,
  Check,
  Phone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ==========================================
   Types
   ========================================== */
interface ServiceTab {
  id: string
  label: string
  icon: React.ReactNode
  title: string
  description: string
  image: string
  bullets: string[]
  brands?: string
  ctaLink: string
}

interface AdditionalService {
  title: string
  icon: React.ReactNode
  description: string
}

/* ==========================================
   Data
   ========================================== */
const mainServices: ServiceTab[] = [
  {
    id: 'trockenbau',
    label: 'Trockenbau',
    icon: <LayoutGrid size={48} style={{ color: '#39FF14' }} />,
    title: 'Trockenbau',
    description:
      'Trockenbau ist die moderne Art des Raumbaus — schnell, sauber und flexibel. Wir errichten raumbegrenzende, nichttragende Bauteile ohne wasserhaltige Baustoffe wie Mörtel, Lehm, Beton oder Putz. Ob neue Trennwände, abgehängte Decken oder komplette Raumkonzepte — mit Trockenbau verwandeln wir Ihre Räume effizient und staubarm.',
    image: '/trockenbau.jpg',
    bullets: [
      'Trennwände & Raumteiler',
      'Abgehängte Decken & Lichtkonstruktionen',
      'Dämmung & Dampfbremsfolie',
      'Wanddurchbrüche & Sanierung',
      'Schnelle, saubere Montage',
    ],
    ctaLink: '/projekte?trockenbau',
  },
  {
    id: 'innentueren',
    label: 'Innentüren',
    icon: <DoorOpen size={48} style={{ color: '#39FF14' }} />,
    title: 'Innentüren & Schiebetüren',
    description:
      'Wir beraten, planen, bestellen, liefern und montieren fachgerecht Ihre neuen Innentüren. Von klassischen Drehtüren bis hin zu modernen Schiebetürsystemen — wir finden die perfekte Lösung für Ihren Raum.',
    image: '/innentueren.jpg',
    brands: 'Führende Hersteller: Prüm · Dana · Westag · Jeld Wen · Könlein',
    bullets: [
      'Beratung & Planung',
      'Lieferung & Montage',
      'Schiebetürsysteme',
      'Glastüren & Designertüren',
      'Zargen & Beschläge',
    ],
    ctaLink: '/projekte?tueren',
  },
  {
    id: 'bodenbelaege',
    label: 'Bodenbeläge',
    icon: <Layers size={48} style={{ color: '#39FF14' }} />,
    title: 'Panele & Bodenbeläge',
    description:
      'Wir verlegen und verarbeiten für Sie Vinyl, Laminat und Design-Paneele in höchster Qualität. Ob modernes Wohnambiente oder strapazierfähiger Objektbereich — wir haben den richtigen Boden für jeden Raum.',
    image: '/bodenbelege.jpg',
    bullets: [
      'Vinylböden (Klick & Klebe)',
      'Laminat in allen Dekoren',
      'Design-Paneele',
      'Fußbodenheizung geeignet',
      'Fachgerechte Verlegung',
    ],
    ctaLink: '/projekte?boden',
  },
]

const additionalServices: AdditionalService[] = [
  {
    title: 'Badezimmer',
    icon: <Bath size={40} style={{ color: '#39FF14' }} />,
    description: 'Moderne Badezimmer aus einer Hand — von der Planung bis zur Fertigstellung.',
  },
  {
    title: 'Holzarbeiten',
    icon: <Hammer size={40} style={{ color: '#39FF14' }} />,
    description: 'Individuelle Möbel, Regale, Einbauten und mehr — maßgefertigt aus Holz.',
  },
  {
    title: 'Wanddurchbrüche',
    icon: <ArrowLeftRight size={40} style={{ color: '#39FF14' }} />,
    description: 'Professionelle Wandöffnungen für offene Wohnkonzepte.',
  },
  {
    title: 'Dämmung',
    icon: <Thermometer size={40} style={{ color: '#39FF14' }} />,
    description: 'Wärmedämmung und Dampfbremsfolie für Energieeffizienz.',
  },
  {
    title: 'Haustüren & Fenster',
    icon: <Square size={40} style={{ color: '#39FF14' }} />,
    description: 'Einbau von Haustüren und Fenstern inklusive Beratung.',
  },
  {
    title: 'Beratung',
    icon: <MessageCircle size={40} style={{ color: '#39FF14' }} />,
    description: 'Kostenlose Erstberatung vor Ort — wir kommen zu Ihnen.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Beratung',
    description: 'Wir besichtigen Ihre Räume vor Ort und besprechen Ihre Wünsche.',
  },
  {
    number: '02',
    title: 'Planung',
    description: 'Wir erstellen ein detailliertes Konzept mit Materialvorschlägen.',
  },
  {
    number: '03',
    title: 'Umsetzung',
    description: 'Unser qualifiziertes Team führt die Arbeiten fachgerecht aus.',
  },
  {
    number: '04',
    title: 'Übergabe',
    description: 'Sie erhalten Ihren fertigen Raum — sauber und zur vollsten Zufriedenheit.',
  },
]

/* ==========================================
   Main Services Page
   ========================================== */
export default function Leistungen() {
  const [activeTab, setActiveTab] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)
  const tabContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* GSAP ScrollTrigger animations */
  useGSAP(
    () => {
      /* Header text reveal */
      gsap.fromTo(
        '.leistungen-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.leistungen-headline span',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.03, duration: 1, ease: 'power4.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.leistungen-subline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.9 }
      )

      /* Main services section heading */
      gsap.fromTo(
        '.main-services-heading > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.main-services-heading', start: 'top 85%', once: true },
        }
      )

      /* Additional services cards */
      gsap.fromTo(
        '.additional-service-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.additional-services-grid', start: 'top 85%', once: true },
        }
      )

      /* Process steps */
      gsap.fromTo(
        '.process-heading > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-heading', start: 'top 85%', once: true },
        }
      )

      gsap.fromTo(
        '.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-steps', start: 'top 85%', once: true },
        }
      )

      /* Timeline line draw */
      gsap.fromTo(
        '.timeline-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-steps', start: 'top 80%', once: true },
        }
      )

      /* CTA banner */
      gsap.fromTo(
        '.cta-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-banner', start: 'top 85%', once: true },
        }
      )
    },
    { scope: pageRef }
  )

  /* Tab switch animation */
  const handleTabSwitch = useCallback(
    (index: number) => {
      if (index === activeTab) return

      if (tabContentRef.current) {
        gsap.to(tabContentRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            setActiveTab(index)
            gsap.fromTo(
              tabContentRef.current,
              { opacity: 0, x: 20 },
              { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', delay: 0.05 }
            )
          },
        })
      } else {
        setActiveTab(index)
      }
    },
    [activeTab]
  )

  const currentService = mainServices[activeTab]

  return (
    <div ref={pageRef}>
      {/* ==========================================
          Section 1: Page Header
          ========================================== */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '60vh', backgroundColor: '#030504' }}
      >
        {/* Animated diagonal lines background */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 20px, #39FF14 20px, #39FF14 21px)',
            animation: 'diagonalDrift 20s linear infinite',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
          <p
            className="leistungen-eyebrow font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-4"
            style={{ color: '#39FF14' }}
          >
            UNSERE LEISTUNGEN
          </p>
          <h1
            className="leistungen-headline font-display font-bold uppercase mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Alles aus einer Hand
          </h1>
          <p
            className="leistungen-subline font-body text-[1.125rem] mx-auto"
            style={{ color: 'rgba(245,245,240,0.5)', maxWidth: 600 }}
          >
            Von der ersten Idee bis zum fertigen Raum — wir begleiten Sie bei jedem Schritt.
          </p>
        </div>

        <style>{`
          @keyframes diagonalDrift {
            0% { transform: translateX(0); }
            100% { transform: translateX(100px); }
          }
        `}</style>
      </section>

      {/* ==========================================
          Section 2: Main Services (Tabbed)
          ========================================== */}
      <section style={{ backgroundColor: '#0A0F0C', padding: '80px 0' }}>
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20">
          {/* Tab Navigation */}
          <div className="main-services-heading flex flex-wrap justify-center gap-2 md:gap-0 mb-12">
            {mainServices.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(index)}
                className="relative px-6 py-3 font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] transition-colors duration-300"
                style={{
                  color: activeTab === index ? '#39FF14' : 'rgba(245,245,240,0.5)',
                  borderBottom: activeTab === index ? '2px solid #39FF14' : '2px solid transparent',
                }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-300 origin-left"
                  style={{
                    backgroundColor: '#39FF14',
                    transform: activeTab === index ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div ref={tabContentRef}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left — Image */}
              <div className="relative overflow-hidden rounded-xl" style={{ borderLeft: '3px solid #39FF14' }}>
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ maxHeight: 500, minHeight: 350 }}
                />
              </div>

              {/* Right — Content */}
              <div className="flex flex-col">
                <div className="mb-4">{currentService.icon}</div>
                <h2
                  className="font-display font-medium uppercase mb-4"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: '#F5F5F0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {currentService.title}
                </h2>
                <p
                  className="font-body text-[1rem] leading-relaxed mb-6"
                  style={{ color: 'rgba(245,245,240,0.6)' }}
                >
                  {currentService.description}
                </p>

                {currentService.brands && (
                  <p
                    className="font-body text-[0.875rem] mb-4"
                    style={{ color: 'rgba(245,245,240,0.4)' }}
                  >
                    {currentService.brands}
                  </p>
                )}

                <ul className="space-y-3 mb-8">
                  {currentService.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check size={18} style={{ color: '#39FF14', flexShrink: 0 }} />
                      <span className="font-body text-[0.9375rem]" style={{ color: '#F5F5F0' }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={currentService.ctaLink}
                  className="inline-flex items-center self-start font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-8 py-[14px] rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: '1px solid #39FF14',
                    color: '#39FF14',
                    backgroundColor: 'transparent',
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
                  Projekte ansehen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 3: Additional Services
          ========================================== */}
      <section style={{ backgroundColor: '#030504', padding: 'clamp(80px, 10vh, 120px) 0' }}>
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <p
              className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-4"
              style={{ color: '#39FF14' }}
            >
              WEITERE LEISTUNGEN
            </p>
            <h2
              className="font-display font-medium uppercase mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#F5F5F0',
                letterSpacing: '-0.02em',
              }}
            >
              Maßgeschneiderte Lösungen
            </h2>
            <p
              className="font-body text-[1rem]"
              style={{ color: 'rgba(245,245,240,0.5)' }}
            >
              Neben unseren Kernkompetenzen bieten wir weitere Spezialleistungen für Ihr Zuhause.
            </p>
          </div>

          <div className="additional-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="additional-service-card rounded-xl p-8 transition-all duration-300"
                style={{
                  backgroundColor: '#0A0F0C',
                  border: '1px solid rgba(57,255,20,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(57,255,20,0.25)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(57,255,20,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ border: '1px solid rgba(57,255,20,0.2)' }}
                >
                  {service.icon}
                </div>

                <h3
                  className="font-body text-[1.125rem] font-medium mb-3"
                  style={{ color: '#F5F5F0' }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-body text-[0.875rem] leading-relaxed"
                  style={{ color: 'rgba(245,245,240,0.4)' }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 4: Process
          ========================================== */}
      <section style={{ backgroundColor: '#0A0F0C', padding: 'clamp(80px, 10vh, 120px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="process-heading text-center mb-16">
            <p
              className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-4"
              style={{ color: '#39FF14' }}
            >
              UNSER PROZESS
            </p>
            <h2
              className="font-display font-medium uppercase"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#F5F5F0',
                letterSpacing: '-0.02em',
              }}
            >
              So arbeiten wir
            </h2>
          </div>

          {/* Timeline */}
          <div className="process-steps relative">
            {/* Horizontal connecting line (desktop) */}
            <div
              className="timeline-line hidden lg:block absolute top-8 left-0 right-0 h-[1px] origin-left"
              style={{ backgroundColor: 'rgba(57,255,20,0.2)' }}
            />

            {/* Vertical connecting line (mobile) */}
            <div
              className="lg:hidden absolute left-8 top-0 bottom-0 w-[1px]"
              style={{ backgroundColor: 'rgba(57,255,20,0.2)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                  {/* Number circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: '2px solid #39FF14' }}
                  >
                    <span
                      className="font-display font-bold"
                      style={{
                        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                        color: '#39FF14',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="font-body text-[1.125rem] font-medium mb-2"
                      style={{ color: '#F5F5F0' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-[0.875rem] leading-relaxed"
                      style={{ color: 'rgba(245,245,240,0.4)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Section 5: CTA Banner
          ========================================== */}
      <section
        className="cta-banner"
        style={{ backgroundColor: '#030504', padding: 'clamp(80px, 10vh, 120px) 0' }}
      >
        {/* Top gradient border */}
        <div
          className="h-[1px] w-full mb-[clamp(80px,10vh,120px)]"
          style={{ background: 'linear-gradient(90deg, transparent, #39FF14, #FF5722, transparent)' }}
        />

        <div className="cta-content container-max mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2
            className="font-display font-medium uppercase mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
            }}
          >
            Lassen Sie uns Ihr Projekt besprechen
          </h2>
          <p
            className="font-body text-[1.125rem] mb-8"
            style={{ color: 'rgba(245,245,240,0.5)' }}
          >
            Kostenlose Beratung vor Ort — wir kommen zu Ihnen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] px-8 py-[14px] rounded-lg transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: '#39FF14',
                color: '#030504',
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
              Termin vereinbaren
            </Link>
            <a
              href="tel:01712182983"
              className="inline-flex items-center gap-2 font-body text-[0.875rem] font-medium transition-colors duration-300"
              style={{ color: '#39FF14' }}
            >
              <Phone size={16} />
              Anrufen: 0171 / 21 82 983
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
