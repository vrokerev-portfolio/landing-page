import { useRef, useEffect, useState } from 'react'
import { useScrollDirection } from '../hooks/useScrollDirection'

const NAV_ITEMS = [
  { label: 'Experience.ts', href: '#experience' },
  { label: 'Projects.rs', href: '#projects' },
  { label: 'Skills.json', href: '#skills' },
  { label: 'Certs.crt', href: '#certificates' },
  { label: 'Contact.sh', href: '#contact' },
]

export default function Navigation() {
  const directionRef = useScrollDirection()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const nav = navRef.current
      const progress = progressRef.current
      if (!nav || !progress) return

      if (directionRef.current === 'down') {
        nav.style.transform = 'translateY(-100%)'
      } else {
        nav.style.transform = 'translateY(0)'
      }

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      progress.style.width = `${pct}%`
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [directionRef])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
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
        <div ref={progressRef} className="h-full bg-cyan transition-none" style={{ width: '0%' }} />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-1 left-0 right-0 z-50 h-12 bg-page/80 backdrop-blur-xl border-b border-[#232D3F] transition-transform duration-300"
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
                    ${isActive ? 'text-primary bg-surface border-b-2 border-cyan' : 'text-secondary hover:text-primary hover:bg-surface'}`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green" />}
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
          <div className="md:hidden bg-surface border-b border-[#232D3F] px-4 py-4">
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
