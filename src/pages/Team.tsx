import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  { name: 'Christoph Hübner', role: 'Inhaber', image: '/logo.jpg' },
  { name: 'Thomas Konstabel', role: 'Trockenbaumonteur', image: '/logo.jpg' },
  { name: 'Martin Künzel', role: 'Tischler', image: '/logo.jpg' },
]

interface CompanyValue {
  num: string
  title: string
  description: string
}

const companyValues: CompanyValue[] = [
  {
    num: '01',
    title: 'Handwerkskunst',
    description:
      'Wir setzen auf traditionelles Handwerk gepaart mit modernsten Techniken',
  },
  {
    num: '02',
    title: 'Zuverlässigkeit',
    description:
      'Termintreue und transparente Kommunikation sind unsere Grundsätze',
  },
  {
    num: '03',
    title: 'Qualität',
    description: 'Nur hochwertige Materialien und präzise Verarbeitung',
  },
  {
    num: '04',
    title: 'Kundennähe',
    description:
      'Persönliche Beratung und Betreuung vom ersten Kontakt bis zur Übergabe',
  },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useGSAP(
    () => {
      /* --- Header text reveal --- */
      gsap.from('.team-header-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('.team-header-headline', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      })
      gsap.from('.team-header-subline', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.7,
      })

      /* --- Team cards stagger --- */
      gsap.from('.team-card', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%',
        },
      })

      /* --- Section titles --- */
      gsap.utils.toArray<HTMLElement>('.team-section-eyebrow').forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('.team-section-title').forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      /* --- Value items --- */
      gsap.from('.value-item', {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-list',
          start: 'top 80%',
        },
      })

      /* --- CTA banner --- */
      gsap.from('.team-cta-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-cta',
          start: 'top 85%',
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                       */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center px-6 md:px-12 lg:px-20"
        style={{
          minHeight: '50vh',
          backgroundColor: '#030504',
        }}
      >
        <div className="text-center max-w-[1200px]">
          <span
            className="team-header-eyebrow inline-block font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
            style={{ color: '#39FF14' }}
          >
            UNSERE MANNSCHAFT
          </span>
          <h1
            className="team-header-headline font-display font-bold uppercase leading-[1.1] mb-5"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.01em',
            }}
          >
            Das Team hinter der Qualität
          </h1>
          <p
            className="team-header-subline font-body text-[1.125rem] max-w-[600px] mx-auto"
            style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.65 }}
          >
            Qualifiziertes Personal, das zuverlässig und kompetent für Sie im
            Einsatz ist.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Team Members                                      */}
      {/* ============================================================ */}
      <section
        className="px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#0A0F0C',
          padding: 'clamp(80px, 10vh, 120px) 0',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <span
            className="team-section-eyebrow block font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-3"
            style={{ color: '#39FF14' }}
          >
            KENNENLERNEN
          </span>
          <h2
            className="team-section-title font-display font-medium uppercase mb-12"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Ihre Spezialisten im Harz
          </h2>

          <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="team-card group rounded-xl overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: '#0A0F0C',
                  border: '1px solid rgba(57,255,20,0.08)',
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div className="absolute inset-0" style={{ top: 0, height: '70%' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                      style={{
                        filter: 'grayscale(100%)',
                        borderRadius: '12px 12px 0 0',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLImageElement).style.filter = 'grayscale(0%)'
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLImageElement).style.filter = 'grayscale(100%)'
                      }}
                    />
                  </div>
                </div>

                {/* Info panel */}
                <div
                  className="transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]"
                  style={{
                    backgroundColor: '#141916',
                    padding: '24px',
                    borderRadius: '0 0 12px 12px',
                    borderTop: '1px solid rgba(57,255,20,0.08)',
                  }}
                >
                  <h3
                    className="font-body text-[1.25rem] font-medium"
                    style={{ color: '#F5F5F0' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] mt-1"
                    style={{ color: '#39FF14' }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Company Values                                    */}
      {/* ============================================================ */}
      <section
        className="px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#030504',
          padding: 'clamp(80px, 10vh, 120px) 0',
        }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20">
          <span
            className="team-section-eyebrow block font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-3"
            style={{ color: '#39FF14' }}
          >
            WAS UNS AUSZEICHNET
          </span>
          <h2
            className="team-section-title font-display font-medium uppercase mb-12"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Unsere Werte
          </h2>

          <div className="values-list">
            {companyValues.map((value, index) => (
              <div
                key={value.num}
                className="value-item flex flex-col md:flex-row gap-6 md:gap-10"
                style={{
                  borderBottom:
                    index < companyValues.length - 1
                      ? '1px solid rgba(57,255,20,0.08)'
                      : 'none',
                  paddingBottom: '40px',
                  marginBottom: '40px',
                }}
              >
                {/* Number */}
                <div className="md:w-[30%] flex-shrink-0">
                  <span
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                      color: 'rgba(57,255,20,0.3)',
                      lineHeight: 1,
                    }}
                  >
                    {value.num}
                  </span>
                </div>

                {/* Text */}
                <div className="md:w-[70%]">
                  <h3
                    className="font-body text-[1.25rem] font-medium mb-2"
                    style={{ color: '#F5F5F0' }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="font-body text-[1rem]"
                    style={{
                      color: 'rgba(245,245,240,0.6)',
                      lineHeight: 1.7,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — CTA Banner                                        */}
      {/* ============================================================ */}
      <section
        className="team-cta relative px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#0A0F0C',
          padding: 'clamp(80px, 10vh, 120px) 0',
        }}
      >
        {/* Subtle glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(57,255,20,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="team-cta-content relative text-center max-w-[700px] mx-auto">
          <h2
            className="font-display font-bold uppercase mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Lernen Sie uns persönlich kennen
          </h2>
          <p
            className="font-body text-[1.125rem] mb-8"
            style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.65 }}
          >
            Wir beraten Sie gerne vor Ort — kostenlos und unverbindlich.
          </p>
          <Link
            to="/kontakt"
            className="inline-block font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: '#39FF14',
              color: '#030504',
              padding: '14px 32px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(57,255,20,0.3)',
            }}
          >
            Termin vereinbaren
          </Link>
        </div>
      </section>
    </div>
  )
}
