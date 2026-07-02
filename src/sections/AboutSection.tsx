import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import BorderGlowCard from '../components/BorderGlowCard'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsMobile } from '../hooks/use-mobile'
import { usePortfolioContent } from '../data/portfolioContent'
import { getIcon } from '../lib/iconMap'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ target, color }: { target: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion || isMobile) return

    gsap.from(el, {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }, [reducedMotion, isMobile])

  return (
    <div ref={ref} className="font-h3" style={{ color }}>
      {target}
    </div>
  )
}

export default function AboutSection() {
  const { about } = usePortfolioContent()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const nameTriggerRef = useRef<HTMLDivElement>(null)
  const [profileImageIndex, setProfileImageIndex] = useState(0)
  const [nameVisible, setNameVisible] = useState(false)
  const [typedName, setTypedName] = useState('')
  const profileImages = about.profileImages.length ? about.profileImages : ['/images/personal-photos/yo-portafolio.avif']

  useEffect(() => {
    if (reducedMotion || isMobile || profileImages.length <= 1) return

    const interval = window.setInterval(() => {
      setProfileImageIndex(index => (index + 1) % profileImages.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [reducedMotion, isMobile, profileImages.length])

  useEffect(() => {
    if (reducedMotion || isMobile) return

    const el = nameTriggerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setNameVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion, isMobile])

  useEffect(() => {
    if (!nameVisible || reducedMotion || isMobile) return
    const fullName = about.name
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTypedName(fullName.slice(0, index))
      if (index >= fullName.length) {
        window.clearInterval(interval)
      }
    }, 48)
    return () => window.clearInterval(interval)
  }, [nameVisible, reducedMotion, isMobile, about.name])

  const profileImage = profileImages[profileImageIndex] ?? profileImages[0]
  const visibleName = reducedMotion || isMobile ? about.name : typedName

  return (
    <section id="about" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <ScrollReveal className="lg:col-span-7" direction="left">
            <div ref={nameTriggerRef} className="about-bio-panel bg-surface border border-[#232D3F] rounded-lg p-8 lg:p-10 h-full">
              <div className="about-scanline" aria-hidden="true" />

              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#232D3F]">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-cyan" aria-hidden="true" />
                  <span className="font-mono text-secondary">{about.fileLabel}</span>
                </div>
                <span className="font-mono-sm text-tertiary hidden sm:inline">{about.status}</span>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 font-mono-sm text-cyan mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  {about.pill}
                </div>

                <div className="about-name-line mb-4">
                  <span className="about-name-text">{visibleName}</span>
                  <span className="about-name-cursor" aria-hidden="true">_</span>
                </div>

                <h2 className="font-h2 text-primary mb-5 about-title">
                  {about.title}
                </h2>

                {about.paragraphs.map(paragraph => (
                  <p key={paragraph} className="font-body text-secondary mb-5">
                    {paragraph}
                  </p>
                ))}

                <div className="border-t border-[#232D3F] my-5" />

                <div className="about-command-line font-mono-sm text-tertiary pt-4 border-t border-[#232D3F]">
                  {about.command.startsWith('$') ? (
                    <>
                      <span className="text-cyan">$</span>
                      {about.command.slice(1)}
                    </>
                  ) : (
                    about.command
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" direction="right" delay={0.1}>
            <div className="profile-visual-card h-full rounded-lg border border-[#232D3F] bg-surface overflow-hidden">
              <div className="profile-grid-bg" aria-hidden="true" />
              <div className="profile-orbit profile-orbit-one" aria-hidden="true" />
              <div className="profile-orbit profile-orbit-two" aria-hidden="true" />

              <div className="profile-photo-frame">
                <img
                  key={profileImage}
                  src={profileImage}
                  alt={about.imageAlt}
                  className="profile-photo"
                  width={390}
                  height={535}
                  loading="lazy"
                />
              </div>

              <div className="profile-note-stack">
                {about.notes.map((note, index) => {
                  const Icon = getIcon(note.icon, 'sparkles')
                  return (
                    <div key={note.label} className="profile-note" style={{ animationDelay: `${index * 0.18}s` }}>
                      <Icon size={14} className="text-cyan" aria-hidden="true" />
                      <div>
                        <div className="font-mono-sm text-tertiary">{note.label}</div>
                        <div className="font-mono-sm text-primary">{note.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {about.stats.map((stat, i) => {
              const Icon = getIcon(stat.icon, 'award')
              return (
                <ScrollReveal key={stat.label} delay={i * 0.12} direction="up">
                  <BorderGlowCard color={stat.color} hoverOnly className="about-stat-glow-card h-full">
                    <div className="about-stat-card p-6 h-full">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="font-mono-sm text-tertiary">{stat.label}</div>
                        <Icon size={17} style={{ color: stat.color }} aria-hidden="true" />
                      </div>
                      <AnimatedCounter target={stat.value} color={stat.color} />
                      <div className="font-mono-sm text-secondary mt-2">{stat.sub}</div>
                    </div>
                  </BorderGlowCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
