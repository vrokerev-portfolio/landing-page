import { useRef, useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Experience.ts', href: '#experience' },
  { label: 'Projects.rs', href: '#projects' },
  { label: 'Skills.json', href: '#skills' },
  { label: 'Certs.crt', href: '#certificates' },
  { label: 'Contact.sh', href: '#contact' },
]

const SECTION_THEMES = [
  { id: 'hero', color: '#38BDF8', rgb: '56, 189, 248', secondaryRgb: '52, 211, 153', tertiaryRgb: '99, 102, 241', hue: '0deg', navBg: 'rgba(56, 189, 248, 0.1)' },
  { id: 'about', color: '#38BDF8', rgb: '56, 189, 248', secondaryRgb: '52, 211, 153', tertiaryRgb: '99, 102, 241', hue: '0deg', navBg: 'rgba(56, 189, 248, 0.12)' },
  { id: 'experience', color: '#6366F1', rgb: '99, 102, 241', secondaryRgb: '56, 189, 248', tertiaryRgb: '236, 72, 153', hue: '34deg', navBg: 'rgba(99, 102, 241, 0.12)' },
  { id: 'teaching', color: '#34D399', rgb: '52, 211, 153', secondaryRgb: '34, 211, 238', tertiaryRgb: '99, 102, 241', hue: '82deg', navBg: 'rgba(52, 211, 153, 0.1)' },
  { id: 'projects', color: '#F59E0B', rgb: '245, 158, 11', secondaryRgb: '236, 72, 153', tertiaryRgb: '56, 189, 248', hue: '148deg', navBg: 'rgba(245, 158, 11, 0.11)' },
  { id: 'skills', color: '#22D3EE', rgb: '34, 211, 238', secondaryRgb: '99, 102, 241', tertiaryRgb: '52, 211, 153', hue: '-12deg', navBg: 'rgba(34, 211, 238, 0.1)' },
  { id: 'certificates', color: '#34D399', rgb: '52, 211, 153', secondaryRgb: '245, 158, 11', tertiaryRgb: '96, 165, 250', hue: '82deg', navBg: 'rgba(52, 211, 153, 0.1)' },
  { id: 'contact', color: '#EC4899', rgb: '236, 72, 153', secondaryRgb: '56, 189, 248', tertiaryRgb: '245, 158, 11', hue: '222deg', navBg: 'rgba(236, 72, 153, 0.1)' },
]

const DEFAULT_THEME = SECTION_THEMES[0]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('')
  const activeTheme = SECTION_THEMES.find(section => section.id === activeSection) ?? DEFAULT_THEME

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--active-aurora-rgb', activeTheme.rgb)
    root.style.setProperty('--active-aurora-secondary-rgb', activeTheme.secondaryRgb)
    root.style.setProperty('--active-aurora-tertiary-rgb', activeTheme.tertiaryRgb)
    root.style.setProperty('--active-aurora-hue', activeTheme.hue)
  }, [activeTheme])

  useEffect(() => {
    const update = () => {
      const progress = progressRef.current
      const root = document.documentElement

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      if (progress) progress.style.width = `${pct}%`

      const experience = document.getElementById('experience')
      if (experience) {
        const rect = experience.getBoundingClientRect()
        const fadeStart = window.innerHeight * 1.18
        const fadeEnd = window.innerHeight * 0.58
        const rawOpacity = (fadeStart - rect.top) / (fadeStart - fadeEnd)
        const opacity = Math.max(0, Math.min(1, rawOpacity))
        root.style.setProperty('--aurora-opacity', opacity.toFixed(3))
      }

      const probeY = window.innerHeight * 0.42
      const nextSection = SECTION_THEMES.find(section => {
        const el = document.getElementById(section.id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
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

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
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
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className={`relative h-full px-5 font-nav transition-colors duration-200 flex items-center gap-2
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
                </button>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`w-5 h-0.5 bg-primary transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-primary transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-primary transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Status bar */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 font-mono-sm text-green">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-glow" />
              Online
            </span>
            <span className="hidden sm:block w-px h-4 bg-[#232D3F]" />
            <span className="font-mono-sm text-tertiary">{time}</span>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden bg-surface border-b px-4 py-4"
            style={{ borderColor: `rgba(${activeTheme.rgb}, 0.3)` }}
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="block w-full text-left py-3 font-nav text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
