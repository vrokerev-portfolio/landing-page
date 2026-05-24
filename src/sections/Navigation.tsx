import { useRef, useEffect, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About me', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_THEMES = [
  { id: 'hero', color: '#38BDF8', rgb: '56, 189, 248', secondaryRgb: '52, 211, 153', tertiaryRgb: '129, 140, 248', hue: '0deg', navBg: 'rgba(56, 189, 248, 0.1)' },
  { id: 'about', color: '#38BDF8', rgb: '56, 189, 248', secondaryRgb: '52, 211, 153', tertiaryRgb: '129, 140, 248', hue: '0deg', navBg: 'rgba(56, 189, 248, 0.12)' },
  { id: 'experience', color: '#34D399', rgb: '52, 211, 153', secondaryRgb: '34, 211, 238', tertiaryRgb: '132, 204, 22', hue: '0deg', navBg: 'rgba(52, 211, 153, 0.1)' },
  { id: 'projects', color: '#6366F1', rgb: '99, 102, 241', secondaryRgb: '129, 140, 248', tertiaryRgb: '56, 189, 248', hue: '0deg', navBg: 'rgba(99, 102, 241, 0.12)' },
  { id: 'skills', color: '#EC4899', rgb: '236, 72, 153', secondaryRgb: '168, 85, 247', tertiaryRgb: '56, 189, 248', hue: '0deg', navBg: 'rgba(236, 72, 153, 0.1)' },
  { id: 'certificates', color: '#F59E0B', rgb: '245, 158, 11', secondaryRgb: '251, 113, 133', tertiaryRgb: '56, 189, 248', hue: '0deg', navBg: 'rgba(245, 158, 11, 0.11)' },
  { id: 'contact', color: '#EF4444', rgb: '239, 68, 68', secondaryRgb: '244, 63, 94', tertiaryRgb: '245, 158, 11', hue: '0deg', navBg: 'rgba(239, 68, 68, 0.1)' },
]

const DEFAULT_THEME = SECTION_THEMES[0]

function parseRgb(rgb: string) {
  return rgb.split(',').map(value => Number(value.trim()))
}

function formatRgb(rgb: number[]) {
  return rgb.map(value => Math.round(value)).join(', ')
}

function mixRgb(from: number[], to: number[], progress: number) {
  return from.map((value, index) => value + ((to[index] ?? value) - value) * progress)
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const lastAuroraOpacityRef = useRef('')
  const auroraFrameRef = useRef<number | null>(null)
  const auroraColorRef = useRef({
    rgb: parseRgb(DEFAULT_THEME.rgb),
    secondaryRgb: parseRgb(DEFAULT_THEME.secondaryRgb),
    tertiaryRgb: parseRgb(DEFAULT_THEME.tertiaryRgb),
  })
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('')
  const activeTheme = SECTION_THEMES.find(section => section.id === activeSection) ?? DEFAULT_THEME

  useEffect(() => {
    const root = document.documentElement
    const start = {
      rgb: auroraColorRef.current.rgb,
      secondaryRgb: auroraColorRef.current.secondaryRgb,
      tertiaryRgb: auroraColorRef.current.tertiaryRgb,
    }
    const target = {
      rgb: parseRgb(activeTheme.rgb),
      secondaryRgb: parseRgb(activeTheme.secondaryRgb),
      tertiaryRgb: parseRgb(activeTheme.tertiaryRgb),
    }
    const duration = 1800
    const startedAt = performance.now()

    if (auroraFrameRef.current) {
      cancelAnimationFrame(auroraFrameRef.current)
    }

    const animateAuroraColor = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = easeInOutCubic(progress)
      const next = {
        rgb: mixRgb(start.rgb, target.rgb, eased),
        secondaryRgb: mixRgb(start.secondaryRgb, target.secondaryRgb, eased),
        tertiaryRgb: mixRgb(start.tertiaryRgb, target.tertiaryRgb, eased),
      }

      root.style.setProperty('--active-aurora-rgb', formatRgb(next.rgb))
      root.style.setProperty('--active-aurora-secondary-rgb', formatRgb(next.secondaryRgb))
      root.style.setProperty('--active-aurora-tertiary-rgb', formatRgb(next.tertiaryRgb))
      auroraColorRef.current = next

      if (progress < 1) {
        auroraFrameRef.current = requestAnimationFrame(animateAuroraColor)
      } else {
        auroraFrameRef.current = null
      }
    }

    auroraFrameRef.current = requestAnimationFrame(animateAuroraColor)
    root.style.setProperty('--active-aurora-hue', activeTheme.hue)

    return () => {
      if (auroraFrameRef.current) {
        cancelAnimationFrame(auroraFrameRef.current)
        auroraFrameRef.current = null
      }
    }
  }, [activeTheme])

  useEffect(() => {
    const themedSections = SECTION_THEMES.map(section => ({
      ...section,
      element: document.getElementById(section.id),
    }))
    const auroraStartSection = document.getElementById('about')

    const update = () => {
      const progress = progressRef.current
      const root = document.documentElement

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      if (progress) progress.style.width = `${pct}%`

      if (auroraStartSection) {
        const rect = auroraStartSection.getBoundingClientRect()
        const fadeStart = window.innerHeight * 1.08
        const fadeEnd = window.innerHeight * 0.34
        const rawOpacity = (fadeStart - rect.top) / (fadeStart - fadeEnd)
        const opacity = Math.max(0, Math.min(1, rawOpacity))
        const nextOpacity = opacity.toFixed(2)
        if (nextOpacity !== lastAuroraOpacityRef.current) {
          root.style.setProperty('--aurora-opacity', nextOpacity)
          lastAuroraOpacityRef.current = nextOpacity
        }
      }

      const probeY = window.innerHeight * 0.42
      const nextSection = themedSections.find(section => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= probeY && rect.bottom >= probeY
      })

      if (nextSection) {
        setActiveSection(current => current === nextSection.id ? current : nextSection.id)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNav = (href: string, event?: ReactMouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const hamburgerLineStyle = {
    backgroundColor: activeTheme.color,
    boxShadow: `0 0 12px rgba(${activeTheme.rgb}, 0.62)`,
  }

  return (
    <header>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent" aria-hidden="true">
        <div
          ref={progressRef}
          className="site-progress-bar h-full"
          style={{
            width: '0%',
            backgroundColor: activeTheme.color,
            boxShadow: `0 0 18px rgba(${activeTheme.rgb}, 0.78)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="site-nav fixed top-1 left-0 right-0 z-50 h-12 backdrop-blur-xl border-b"
        aria-label="Primary navigation"
        style={{
          backgroundColor: activeTheme.navBg,
          borderColor: `rgba(${activeTheme.rgb}, 0.32)`,
          boxShadow: `0 14px 38px rgba(0, 0, 0, 0.28), 0 0 34px rgba(${activeTheme.rgb}, 0.08)`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Desktop tabs */}
          <div className="hidden md:flex items-center h-full">
            {NAV_ITEMS.map(item => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNav(item.href, event)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative h-full px-3 lg:px-4 font-nav transition-colors duration-200 flex items-center gap-2
                    ${isActive ? 'text-primary bg-surface/80 border-b-2' : 'text-secondary hover:text-primary hover:bg-surface/70'}`}
                  style={isActive ? { borderBottomColor: activeTheme.color } : undefined}
                >
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: activeTheme.color,
                        boxShadow: `0 0 10px rgba(${activeTheme.rgb}, 0.85)`,
                      }}
                    />
                  )}
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className={`w-5 h-0.5 transition-all duration-700 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} style={hamburgerLineStyle} />
            <span className={`w-5 h-0.5 transition-all duration-700 ${mobileOpen ? 'opacity-0' : ''}`} style={hamburgerLineStyle} />
            <span className={`w-5 h-0.5 transition-all duration-700 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} style={hamburgerLineStyle} />
          </button>

          {/* Status bar */}
          <div className="flex items-center gap-4">
            <span
              className="hidden sm:flex items-center gap-2 font-mono-sm transition-colors duration-700"
              style={{ color: activeTheme.color }}
            >
              <span
                className="site-status-dot w-2 h-2 rounded-full transition-colors duration-700"
                style={{
                  '--status-rgb': activeTheme.rgb,
                  backgroundColor: activeTheme.color,
                } as CSSProperties}
              />
              Online
            </span>
            <span className="hidden sm:block w-px h-4 bg-[#232D3F]" />
            <span className="font-mono-sm text-tertiary">{time}</span>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-navigation-menu"
            className="md:hidden bg-surface border-b px-4 py-4"
            style={{ borderColor: `rgba(${activeTheme.rgb}, 0.3)` }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNav(item.href, event)}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                className="block w-full text-left py-3 font-nav text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
