import { useEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Truck,
  Shield,
  Heart,
  Instagram,
  Check,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  'Trockenbau',
  'Innentüren',
  'Bodenbeläge',
  'Schiebetüren',
  'Badezimmer',
  'Holzarbeiten',
  'Sonstiges',
]

const contactDetails = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Rudolf-Breitscheid-Str. 14, 38871 Ilsenburg (Harz)',
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '0171 / 21 82 983',
    href: 'tel:01712182983',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'info@innenausbau-huebner.de',
    href: 'mailto:info@innenausbau-huebner.de',
  },
  {
    icon: Clock,
    label: 'Erreichbarkeit',
    value: 'Mo–Fr: 08:00–17:00 Uhr',
    href: undefined,
  },
]

const quickInfoBlocks = [
  {
    icon: Truck,
    title: 'Anfahrt',
    detail: 'Ilsenburg im Harz — wir sind für Sie da',
  },
  {
    icon: Shield,
    title: 'Qualität',
    detail: 'Handwerklich versiert & zuverlässig',
  },
  {
    icon: Heart,
    title: 'Kundennähe',
    detail: 'Ihre Zufriedenheit ist unser Antrieb',
  },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Kontakt() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formState !== 'idle') return
    setFormState('sending')
    // Simulate form submission
    setTimeout(() => {
      setFormState('sent')
    }, 1500)
  }

  useGSAP(
    () => {
      /* --- Header text reveal --- */
      gsap.from('.kontakt-header-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('.kontakt-header-headline', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      })
      gsap.from('.kontakt-header-subline', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.7,
      })

      /* --- Form card slide in from left --- */
      gsap.from('.kontakt-form-card', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.kontakt-two-col',
          start: 'top 80%',
        },
      })

      /* --- Info card slide in from right --- */
      gsap.from('.kontakt-info-card', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.kontakt-two-col',
          start: 'top 80%',
        },
      })

      /* --- Form fields stagger --- */
      gsap.from('.form-field', {
        y: 15,
        opacity: 0,
        stagger: 0.06,
        delay: 0.4,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.kontakt-form-card',
          start: 'top 80%',
        },
      })

      /* --- Contact detail rows stagger --- */
      gsap.from('.contact-detail-row', {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.kontakt-info-card',
          start: 'top 80%',
        },
      })

      /* --- Map placeholder --- */
      gsap.from('.map-placeholder', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.map-placeholder',
          start: 'top 85%',
        },
      })

      /* --- Social links --- */
      gsap.from('.social-links-row', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.social-links-row',
          start: 'top 90%',
        },
      })

      /* --- Quick info blocks --- */
      gsap.from('.quick-info-block', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quick-info-strip',
          start: 'top 85%',
        },
      })
    },
    { scope: containerRef },
  )

  const inputBaseStyle: React.CSSProperties = {
    backgroundColor: '#0A0F0C',
    border: '1px solid rgba(57,255,20,0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#F5F5F0',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#F5F5F0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                       */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center px-6 md:px-12 lg:px-20"
        style={{
          minHeight: '40vh',
          backgroundColor: '#030504',
        }}
      >
        <div className="text-center max-w-[1200px]">
          <span
            className="kontakt-header-eyebrow inline-block font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] mb-4"
            style={{ color: '#39FF14' }}
          >
            KONTAKTIEREN SIE UNS
          </span>
          <h1
            className="kontakt-header-headline font-display font-bold uppercase leading-[1.1] mb-5"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.01em',
            }}
          >
            Wir freuen uns auf Ihr Projekt
          </h1>
          <p
            className="kontakt-header-subline font-body text-[1.125rem] max-w-[600px] mx-auto"
            style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.65 }}
          >
            Haben Sie Fragen, Wünsche oder Anregungen? Nehmen Sie Kontakt mit
            uns auf.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Contact Content (Two-Column)                      */}
      {/* ============================================================ */}
      <section
        className="kontakt-two-col px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#0A0F0C',
          padding: '80px 0',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ---- Left Column — Contact Form ---- */}
          <div
            className="kontakt-form-card"
            style={{
              backgroundColor: '#141916',
              border: '1px solid rgba(57,255,20,0.1)',
              borderRadius: '12px',
              padding: '40px',
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-field mb-5">
                <label style={labelStyle}>
                  Name <span style={{ color: '#39FF14' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ihr Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={inputBaseStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14'
                    e.target.style.boxShadow = '0 0 0 2px rgba(57,255,20,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(57,255,20,0.15)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Email */}
              <div className="form-field mb-5">
                <label style={labelStyle}>
                  E-Mail <span style={{ color: '#39FF14' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ihre@email.de"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={inputBaseStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14'
                    e.target.style.boxShadow = '0 0 0 2px rgba(57,255,20,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(57,255,20,0.15)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Phone */}
              <div className="form-field mb-5">
                <label style={labelStyle}>Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Ihre Telefonnummer"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputBaseStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14'
                    e.target.style.boxShadow = '0 0 0 2px rgba(57,255,20,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(57,255,20,0.15)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Subject Select */}
              <div className="form-field mb-5">
                <label style={labelStyle}>
                  Betreff <span style={{ color: '#39FF14' }}>*</span>
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2339FF14' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    paddingRight: '40px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14'
                    e.target.style.boxShadow = '0 0 0 2px rgba(57,255,20,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(57,255,20,0.15)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="" disabled>
                    Bitte wählen...
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="form-field mb-6">
                <label style={labelStyle}>
                  Nachricht <span style={{ color: '#39FF14' }}>*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Beschreiben Sie Ihr Projekt..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    minHeight: '120px',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14'
                    e.target.style.boxShadow = '0 0 0 2px rgba(57,255,20,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(57,255,20,0.15)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="form-field w-full font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    formState === 'sent' ? '#2d8a3e' : '#39FF14',
                  color: '#030504',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  boxShadow: '0 0 20px rgba(57,255,20,0.3)',
                  opacity: formState === 'sending' ? 0.7 : 1,
                }}
              >
                {formState === 'idle' && (
                  <>
                    Anfrage senden
                    <Send size={16} />
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    Wird gesendet...
                    <span
                      className="inline-block w-4 h-4 border-2 border-[#030504] border-t-transparent rounded-full animate-spin"
                    />
                  </>
                )}
                {formState === 'sent' && (
                  <>
                    Gesendet!
                    <Check size={16} />
                  </>
                )}
              </button>

              {/* Privacy note */}
              <p
                className="form-field mt-4 font-body text-[0.75rem] text-center"
                style={{ color: 'rgba(245,245,240,0.4)' }}
              >
                Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
              </p>
            </form>
          </div>

          {/* ---- Right Column — Contact Info ---- */}
          <div
            className="kontakt-info-card"
            style={{
              backgroundColor: '#141916',
              border: '1px solid rgba(57,255,20,0.1)',
              borderRadius: '12px',
              padding: '40px',
            }}
          >
            {/* Contact Details */}
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="contact-detail-row flex items-start gap-4 mb-6"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(57,255,20,0.15)',
                  }}
                >
                  <detail.icon size={20} style={{ color: '#39FF14' }} />
                </div>
                <div>
                  <p
                    className="font-body text-[0.75rem] font-medium uppercase tracking-[0.05em] mb-0.5"
                    style={{ color: 'rgba(245,245,240,0.5)' }}
                  >
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="font-body text-[1rem] transition-colors duration-300 hover:text-[#39FF14]"
                      style={{ color: '#F5F5F0' }}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p
                      className="font-body text-[1rem]"
                      style={{ color: '#F5F5F0' }}
                    >
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <a
              href="https://www.google.com/maps/search/Rudolf-Breitscheid-Str.+14,+38871+Ilsenburg+(Harz)"
              target="_blank"
              rel="noopener noreferrer"
              className="map-placeholder block relative overflow-hidden group mt-4"
              style={{
                aspectRatio: '16/9',
                borderRadius: '12px',
                border: '1px solid rgba(57,255,20,0.1)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#0A0F0C',
                }}
              >
                {/* Fake map visual - abstract grid pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(57,255,20,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.3) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Center marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: '#39FF14',
                        boxShadow: '0 0 10px rgba(57,255,20,0.5)',
                      }}
                    />
                    <div
                      className="absolute -inset-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: 'rgba(57,255,20,0.2)',
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Overlay text */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-70"
                style={{ backgroundColor: 'rgba(3,5,4,0.55)' }}
              >
                <span
                  className="font-body text-[0.875rem] font-medium"
                  style={{ color: '#F5F5F0' }}
                >
                  In Google Maps öffnen
                </span>
              </div>
            </a>

            {/* Social Links */}
            <div className="social-links-row flex items-center gap-4 mt-6">
              <span
                className="font-body text-[0.875rem] font-medium"
                style={{ color: '#F5F5F0' }}
              >
                Folgen Sie uns:
              </span>
              <a
                href="https://www.instagram.com/innenausbau.huebner/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: '1px solid rgba(57,255,20,0.15)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'rgba(57,255,20,0.1)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'transparent'
                }}
                aria-label="Instagram"
              >
                <Instagram size={20} style={{ color: '#39FF14' }} />
              </a>
              <a
                href="https://wa.me/491712182983"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: '1px solid rgba(57,255,20,0.15)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'rgba(57,255,20,0.1)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'transparent'
                }}
                aria-label="WhatsApp"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#39FF14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Quick Info Strip                                  */}
      {/* ============================================================ */}
      <section
        className="quick-info-strip px-6 md:px-12 lg:px-20"
        style={{
          backgroundColor: '#030504',
          padding: '60px 0',
        }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickInfoBlocks.map((block) => (
            <div
              key={block.title}
              className="quick-info-block text-center"
            >
              <block.icon
                size={32}
                className="mx-auto mb-3"
                style={{ color: '#39FF14' }}
              />
              <h4
                className="font-body text-[1rem] font-medium mb-1"
                style={{ color: '#F5F5F0' }}
              >
                {block.title}
              </h4>
              <p
                className="font-body text-[0.875rem]"
                style={{ color: 'rgba(245,245,240,0.5)' }}
              >
                {block.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
