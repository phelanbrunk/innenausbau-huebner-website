import { Link } from 'react-router'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

const serviceLinks = [
  { label: 'Trockenbau', path: '/leistungen' },
  { label: 'Innentüren', path: '/leistungen' },
  { label: 'Bodenbeläge', path: '/leistungen' },
  { label: 'Schiebetüren', path: '/leistungen' },
  { label: 'Holzarbeiten', path: '/leistungen' },
]

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projekte', path: '/projekte' },
  { label: 'Team', path: '/team' },
  { label: 'Kontakt', path: '/kontakt' },
  { label: 'Impressum', path: '/impressum' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#030504' }}>
      {/* Top gradient border */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, #FF5722, transparent)' }} />

      <div className="container-max mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-huebner.png" alt="Hübner" className="h-10 w-auto object-contain" />
              <span className="font-display font-bold text-[1.25rem]" style={{ color: '#39FF14' }}>
                HÜBNER
              </span>
            </Link>
            <p className="font-body text-[0.875rem] mb-2" style={{ color: 'rgba(245,245,240,0.5)' }}>
              Innenausbau im Harz
            </p>
            <p className="font-body text-[0.75rem] leading-relaxed" style={{ color: 'rgba(245,245,240,0.4)' }}>
              Ihr Fachbetrieb für Trockenbau, Innentüren und Bodenbeläge seit über 20 Jahren.
            </p>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h4 className="font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] mb-4" style={{ color: '#F5F5F0' }}>
              Leistungen
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-[0.875rem] transition-colors duration-300 hover:text-[#39FF14]"
                    style={{ color: 'rgba(245,245,240,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Pages */}
          <div>
            <h4 className="font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] mb-4" style={{ color: '#F5F5F0' }}>
              Seiten
            </h4>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-[0.875rem] transition-colors duration-300 hover:text-[#39FF14]"
                    style={{ color: 'rgba(245,245,240,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-body text-[0.875rem] font-medium uppercase tracking-[0.05em] mb-4" style={{ color: '#F5F5F0' }}>
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#39FF14' }} />
                <span className="font-body text-[0.875rem]" style={{ color: 'rgba(245,245,240,0.5)' }}>
                  Rudolf-Breitscheid-Str. 14<br />38871 Ilsenburg (Harz)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#39FF14' }} />
                <a
                  href="tel:01712182983"
                  className="font-body text-[0.875rem] transition-colors duration-300 hover:text-[#39FF14]"
                  style={{ color: 'rgba(245,245,240,0.5)' }}
                >
                  0171 / 21 82 983
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#39FF14' }} />
                <a
                  href="mailto:info@innenausbau-huebner.de"
                  className="font-body text-[0.875rem] transition-colors duration-300 hover:text-[#39FF14]"
                  style={{ color: 'rgba(245,245,240,0.5)' }}
                >
                  info@innenausbau-huebner.de
                </a>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/innenausbau.huebner/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-115"
                aria-label="Instagram"
              >
                <Instagram size={20} style={{ color: '#39FF14' }} />
              </a>
              <a
                href="https://wa.me/491712182983"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-115"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[rgba(57,255,20,0.08)]">
        <div className="container-max mx-auto px-6 md:px-12 lg:px-20 py-5">
          <p className="font-body text-[0.75rem] text-center" style={{ color: 'rgba(245,245,240,0.4)' }}>
            &copy; 2025 Innenausbau Christoph Hübner. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
