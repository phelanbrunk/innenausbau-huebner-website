import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ==========================================
   Types
   ========================================== */
interface GalleryCategory {
  id: string
  title: string
  images: string[]
}

interface LightboxState {
  isOpen: boolean
  images: string[]
  currentIndex: number
}

/* ==========================================
   Gallery Data
   ========================================== */
const categories: GalleryCategory[] = [
  {
    id: 'trockenbau',
    title: 'TROCKENBAU',
    images: [
      '/referenz1.jpg',
      '/referenz2.jpg',
      '/referenz3.jpg',
      '/referenz4.jpg',
      '/referenz5.jpg',
      '/referenz6.jpg',
      '/referenz7.jpg',
      '/referenz8.jpg',
    ],
  },
  {
    id: 'schiebetueren',
    title: 'SCHIEBETÜREN',
    images: [
      '/schiebetueren1.png',
      '/schiebetueren2.jpg',
      '/schiebetueren3.jpg',
      '/schiebetueren4.jpg',
      '/schiebetueren5.jpg',
      '/schiebetueren6.jpg',
      '/schiebetueren7.jpg',
      '/schiebetueren8.png',
      '/schiebetueren9.jpg',
      '/schiebetueren10.jpg',
      '/schiebetueren11.jpg',
      '/schiebetueren12.jpg',
    ],
  },
  {
    id: 'holz',
    title: 'VERSCHIEDENES AUS HOLZ',
    images: [
      '/holz1.jpg',
      '/holz2.jpg',
      '/holz3.jpg',
      '/holz4.jpg',
      '/holz5.jpg',
      '/holz6.jpg',
      '/holz7.jpg',
      '/holz8.jpg',
      '/holz9.jpg',
      '/holz10.jpg',
      '/holz11.jpg',
      '/holz12.jpg',
      '/holz13.jpg',
      '/holz14.jpg',
    ],
  },
  {
    id: 'badezimmer',
    title: 'BADEZIMMER',
    images: [
      '/referenz1.jpg',
      '/referenz3.jpg',
      '/referenz5.jpg',
      '/referenz7.jpg',
    ],
  },
]

const filterButtons = [
  { label: 'Alle', value: 'all' },
  { label: 'Trockenbau', value: 'trockenbau' },
  { label: 'Innentüren', value: 'tueren' },
  { label: 'Bodenbeläge', value: 'boden' },
  { label: 'Schiebetüren', value: 'schiebetueren' },
  { label: 'Holzarbeiten', value: 'holz' },
]

/* ==========================================
   Lightbox Component
   ========================================== */
interface LightboxProps {
  lightbox: LightboxState
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ lightbox, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (!lightbox.isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightbox.isOpen, onClose, onPrev, onNext])

  if (!lightbox.isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(3,5,4,0.95)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10"
        style={{ border: '1px solid rgba(57,255,20,0.3)' }}
        onClick={onClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#39FF14'
          e.currentTarget.style.backgroundColor = 'rgba(57,255,20,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <X size={20} style={{ color: '#39FF14' }} />
      </button>

      {/* Prev button */}
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10"
        style={{ border: '1px solid rgba(57,255,20,0.3)' }}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#39FF14'
          e.currentTarget.style.backgroundColor = 'rgba(57,255,20,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <ChevronLeft size={20} style={{ color: '#39FF14' }} />
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10"
        style={{ border: '1px solid rgba(57,255,20,0.3)' }}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#39FF14'
          e.currentTarget.style.backgroundColor = 'rgba(57,255,20,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <ChevronRight size={20} style={{ color: '#39FF14' }} />
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightbox.images[lightbox.currentIndex]}
          alt={`Bild ${lightbox.currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          style={{
            animation: 'lightboxIn 0.3s ease-out',
          }}
        />
      </div>

      {/* Counter */}
      <p
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[0.75rem] font-medium uppercase tracking-[0.08em]"
        style={{ color: 'rgba(245,245,240,0.6)' }}
      >
        {lightbox.currentIndex + 1} / {lightbox.images.length}
      </p>

      <style>{`
        @keyframes lightboxIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ==========================================
   Main Projects Page
   ========================================== */
export default function Projekte() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('all')
  const pageRef = useRef<HTMLDivElement>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)

  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* Sync filter from URL query param */
  useEffect(() => {
    const filter = searchParams.get('filter')
    if (filter && filterButtons.some((b) => b.value === filter)) {
      setActiveFilter(filter)
    } else {
      const category = searchParams.get('trockenbau') !== null ? 'trockenbau'
        : searchParams.get('tueren') !== null ? 'tueren'
        : searchParams.get('boden') !== null ? 'boden'
        : searchParams.get('schiebetueren') !== null ? 'schiebetueren'
        : searchParams.get('holz') !== null ? 'holz'
        : searchParams.get('badezimmer') !== null ? 'badezimmer'
        : 'all'
      setActiveFilter(category)
    }
  }, [searchParams])

  /* Scroll to section when filter changes */
  const handleFilterClick = useCallback(
    (value: string) => {
      setActiveFilter(value)

      if (value === 'all') {
        setSearchParams({})
        return
      }

      // Map filter values to category IDs
      const filterToCategory: Record<string, string> = {
        trockenbau: 'trockenbau',
        tueren: 'schiebetueren',
        boden: 'trockenbau',
        schiebetueren: 'schiebetueren',
        holz: 'holz',
        badezimmer: 'badezimmer',
      }

      const categoryId = filterToCategory[value] || value
      const el = document.getElementById(categoryId)
      if (el) {
        const navOffset = 72 + (filterBarRef.current?.offsetHeight || 48)
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }

      setSearchParams({ filter: value })
    },
    [setSearchParams]
  )

  /* Lightbox handlers */
  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const prevImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1,
    }))
  }, [])

  const nextImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1,
    }))
  }, [])

  /* GSAP ScrollTrigger animations */
  useGSAP(
    () => {
      /* Header text reveal */
      gsap.fromTo(
        '.projekte-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.projekte-headline span',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.03, duration: 1, ease: 'power4.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.projekte-subline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.9 }
      )

      /* Gallery sections */
      categories.forEach((cat) => {
        const sectionEl = document.getElementById(cat.id)
        if (sectionEl) {
          gsap.fromTo(
            sectionEl.querySelectorAll('.gallery-image'),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: { trigger: sectionEl, start: 'top 85%', once: true },
            }
          )

          gsap.fromTo(
            sectionEl.querySelector('.gallery-title'),
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: sectionEl, start: 'top 85%', once: true },
            }
          )
        }
      })

      /* CTA banner */
      gsap.fromTo(
        '.projekte-cta > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.projekte-cta', start: 'top 85%', once: true },
        }
      )
    },
    { scope: pageRef }
  )

  /* Masonry column distribution helper */
  const getMasonryColumns = (images: string[], colCount: number): string[][] => {
    const cols: string[][] = Array.from({ length: colCount }, () => [])
    images.forEach((img, i) => {
      cols[i % colCount].push(img)
    })
    return cols
  }

  return (
    <div ref={pageRef}>
      {/* ==========================================
          Section 1: Page Header
          ========================================== */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '50vh', backgroundColor: '#030504' }}
      >
        {/* Background collage */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div
            className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1"
            style={{ animation: 'kenBurns 20s linear infinite' }}
          >
            <img src="/referenz1.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/schiebetueren1.png" alt="" className="w-full h-full object-cover" />
            <img src="/holz1.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/referenz3.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/holz5.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/referenz5.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/schiebetueren5.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/holz8.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(3,5,4,0.6), rgba(3,5,4,0.95))' }}
        />

        <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
          <p
            className="projekte-eyebrow font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-4"
            style={{ color: '#39FF14' }}
          >
            UNSERE PROJEKTE
          </p>
          <h1
            className="projekte-headline font-display font-bold uppercase mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Referenzen, die überzeugen
          </h1>
          <p
            className="projekte-subline font-body text-[1.125rem] mx-auto"
            style={{ color: 'rgba(245,245,240,0.5)', maxWidth: 600 }}
          >
            Vorher-Nachher-Vergleiche und Projektgalerien aus über 20 Jahren Erfahrung.
          </p>
        </div>

        <style>{`
          @keyframes kenBurns {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
      </section>

      {/* ==========================================
          Section 2: Sticky Filter Bar
          ========================================== */}
      <div
        ref={filterBarRef}
        className="sticky z-40"
        style={{ top: 72, backgroundColor: 'rgba(10,15,12,0.9)', backdropFilter: 'blur(8px)' }}
      >
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide justify-start md:justify-center">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilterClick(btn.value)}
                className="flex-shrink-0 font-body text-[0.75rem] font-medium uppercase tracking-[0.05em] px-5 py-2 rounded-full transition-all duration-200"
                style={{
                  border: activeFilter === btn.value ? 'none' : '1px solid rgba(57,255,20,0.2)',
                  backgroundColor: activeFilter === btn.value ? '#39FF14' : 'transparent',
                  color: activeFilter === btn.value ? '#030504' : 'rgba(245,245,240,0.5)',
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== btn.value) {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)'
                    e.currentTarget.style.color = '#F5F5F0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== btn.value) {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.2)'
                    e.currentTarget.style.color = 'rgba(245,245,240,0.5)'
                  }
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          Section 3: Category Galleries
          ========================================== */}
      <section style={{ backgroundColor: '#030504', padding: '80px 0' }}>
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20">
          {categories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="mb-16 last:mb-0 scroll-mt-[140px]"
            >
              {/* Category title with neon-green left border */}
              <div
                className="gallery-title flex items-center gap-4 mb-8"
                style={{ borderLeft: '4px solid #39FF14', paddingLeft: 16 }}
              >
                <h3
                  className="font-display font-medium uppercase"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#F5F5F0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Masonry Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getMasonryColumns(category.images, 3).map((col, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-4">
                    {col.map((img, imgIndex) => {
                      const globalIndex = colIndex + imgIndex * 3
                      return (
                        <div
                          key={globalIndex}
                          className="gallery-image group relative overflow-hidden rounded-lg cursor-pointer"
                          style={{ border: '1px solid rgba(57,255,20,0.08)' }}
                          onClick={() => openLightbox(category.images, globalIndex)}
                        >
                          <img
                            src={img}
                            alt={`${category.title} ${globalIndex + 1}`}
                            className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              border: '1px solid rgba(57,255,20,0.3)',
                              borderRadius: 8,
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Mobile: single column */}
              <div className="md:hidden grid grid-cols-1 gap-4">
                {category.images.map((img, index) => (
                  <div
                    key={index}
                    className="gallery-image group relative overflow-hidden rounded-lg cursor-pointer"
                    style={{ border: '1px solid rgba(57,255,20,0.08)' }}
                    onClick={() => openLightbox(category.images, index)}
                  >
                    <img
                      src={img}
                      alt={`${category.title} ${index + 1}`}
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        border: '1px solid rgba(57,255,20,0.3)',
                        borderRadius: 8,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          Section 5: CTA Banner
          ========================================== */}
      <section style={{ backgroundColor: '#030504', padding: 'clamp(80px, 10vh, 120px) 0' }}>
        {/* Top gradient border */}
        <div
          className="h-[1px] w-full mb-[clamp(80px,10vh,120px)]"
          style={{ background: 'linear-gradient(90deg, transparent, #39FF14, #FF5722, transparent)' }}
        />

        <div className="projekte-cta container-max mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2
            className="font-display font-medium uppercase mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
            }}
          >
            Bereit für Ihre Transformation?
          </h2>
          <p
            className="font-body text-[1.125rem] mb-8"
            style={{ color: 'rgba(245,245,240,0.5)' }}
          >
            Kontaktieren Sie uns — wir beraten Sie gerne kostenlos.
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
              Jetzt anfragen
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

      {/* ==========================================
          Lightbox
          ========================================== */}
      <Lightbox
        lightbox={lightbox}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  )
}
