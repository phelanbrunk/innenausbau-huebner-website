import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Leistungen', path: '/leistungen' },
  { label: 'Projekte', path: '/projekte' },
  { label: 'Team', path: '/team' },
  { label: 'Kontakt', path: '/kontakt' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-[72px] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(3,5,4,0.95)' : 'rgba(3,5,4,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(57,255,20,0.1)' : '1px solid transparent',
        }}
      >
        <div className="container-max mx-auto h-full flex items-center justify-between px-6 md:px-12 lg:px-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src="/logo-huebner.png" alt="Hübner" className="h-10 w-auto object-contain" />
            <span className="font-display font-bold text-[1.25rem] tracking-tight" style={{ color: '#39FF14' }}>
              HÜBNER
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] transition-colors duration-300 group"
                style={{
                  color: location.pathname === link.path ? '#39FF14' : 'rgba(245,245,240,0.8)',
                }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-full transition-transform duration-300 origin-left"
                  style={{
                    backgroundColor: '#39FF14',
                    transform: location.pathname === link.path ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#39FF14] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} style={{ color: '#39FF14' }} />
            ) : (
              <Menu size={24} style={{ color: '#F5F5F0' }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500"
        style={{
          backgroundColor: 'rgba(3,5,4,0.98)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          backdropFilter: 'blur(20px)',
        }}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-display text-[2rem] font-medium uppercase tracking-[0.02em] transition-all duration-300"
            style={{
              color: location.pathname === link.path ? '#39FF14' : '#F5F5F0',
              transform: isOpen ? 'translateX(0)' : 'translateX(40px)',
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? `${index * 0.08}s` : '0s',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
