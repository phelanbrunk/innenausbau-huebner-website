import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface LegalSection {
  heading: string
  content: React.ReactNode
}

const legalSections: LegalSection[] = [
  {
    heading: 'Angaben gemäß \u00A7 5 TMG',
    content: (
      <>
        <p>
          <strong style={{ color: '#F5F5F0' }}>Firmenname:</strong>
          <br />
          Innenausbau Christoph Hübner
        </p>
        <p className="mt-2">
          <strong style={{ color: '#F5F5F0' }}>Inhaber:</strong>
          <br />
          Christoph Hübner
        </p>
        <p className="mt-2">
          <strong style={{ color: '#F5F5F0' }}>Adresse:</strong>
          <br />
          Rudolf-Breitscheid-Str. 14
          <br />
          38871 Ilsenburg (Harz)
        </p>
      </>
    ),
  },
  {
    heading: 'Kontakt',
    content: (
      <>
        <p>
          <strong style={{ color: '#F5F5F0' }}>Telefon:</strong>
          <br />
          <a
            href="tel:01712182983"
            className="transition-colors duration-300 hover:text-[#39FF14]"
            style={{ color: 'rgba(245,245,240,0.8)' }}
          >
            0171 / 21 82 983
          </a>
        </p>
        <p className="mt-2">
          <strong style={{ color: '#F5F5F0' }}>E-Mail:</strong>
          <br />
          <a
            href="mailto:info@innenausbau-huebner.de"
            className="transition-colors duration-300 hover:text-[#39FF14]"
            style={{ color: 'rgba(245,245,240,0.8)' }}
          >
            info@innenausbau-huebner.de
          </a>
        </p>
      </>
    ),
  },
  {
    heading: 'Umsatzsteuer-ID',
    content: (
      <>
        <p>
          <strong style={{ color: '#F5F5F0' }}>USt-IdNr.:</strong>
          <br />
          72 416 138 097
        </p>
        <p className="mt-2">
          <strong style={{ color: '#F5F5F0' }}>
            Wirtschafts-Identifikationsnummer:
          </strong>
          <br />
          117/234/00653
        </p>
      </>
    ),
  },
  {
    heading: 'Verantwortlich für den Inhalt nach \u00A7 55 Abs. 2 RStV',
    content: (
      <>
        <p>Christoph Hübner</p>
        <p className="mt-1">Rudolf-Breitscheid-Str. 14</p>
        <p>38871 Ilsenburg (Harz)</p>
      </>
    ),
  },
  {
    heading: 'Haftungsausschluss',
    content: (
      <>
        <p>
          <strong style={{ color: '#F5F5F0' }}>Haftung für Inhalte</strong>
        </p>
        <p className="mt-2">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p className="mt-3">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
        <p className="mt-3">
          <strong style={{ color: '#F5F5F0' }}>Haftung für Links</strong>
        </p>
        <p className="mt-2">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p className="mt-3">
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    heading: 'Streitschlichtung',
    content: (
      <>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors duration-300 hover:text-[#39FF14]"
            style={{ color: '#39FF14' }}
          >
            https://ec.europa.eu/consumers/odr
          </a>
        </p>
        <p className="mt-2">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </>
    ),
  },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Impressum() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useGSAP(
    () => {
      /* --- Header text reveal --- */
      gsap.from('.impressum-header-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('.impressum-header-headline', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.4,
      })

      /* --- Legal card fade up --- */
      gsap.from('.legal-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.legal-card',
          start: 'top 85%',
        },
      })

      /* --- Content sections stagger --- */
      gsap.from('.legal-section', {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.legal-sections-container',
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
          minHeight: '30vh',
          backgroundColor: '#030504',
        }}
      >
        <div className="text-center max-w-[900px]">
          <span
            className="impressum-header-eyebrow inline-block font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
            style={{ color: '#39FF14' }}
          >
            RECHTLICHES
          </span>
          <h1
            className="impressum-header-headline font-display font-bold uppercase leading-[0.95]"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
            }}
          >
            Impressum
          </h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Legal Content                                     */}
      {/* ============================================================ */}
      <section
        className="px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#030504',
          padding: '60px 0 120px',
        }}
      >
        <div className="max-w-[800px] mx-auto px-0 md:px-0">
          <div
            className="legal-card"
            style={{
              backgroundColor: '#0A0F0C',
              border: '1px solid rgba(57,255,20,0.08)',
              borderRadius: '12px',
              padding: '48px',
            }}
          >
            <div className="legal-sections-container">
              {legalSections.map((section, index) => (
                <div
                  key={section.heading}
                  className="legal-section"
                  style={{
                    borderBottom:
                      index < legalSections.length - 1
                        ? '1px solid rgba(57,255,20,0.06)'
                        : 'none',
                    paddingBottom: '24px',
                    marginBottom: '24px',
                  }}
                >
                  <h2
                    className="font-body font-medium mb-4"
                    style={{
                      fontSize: '1.125rem',
                      color: '#F5F5F0',
                      marginTop: index === 0 ? 0 : undefined,
                    }}
                  >
                    {section.heading}
                  </h2>
                  <div
                    className="font-body"
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(245,245,240,0.8)',
                      lineHeight: 1.7,
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
