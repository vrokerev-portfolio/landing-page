import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ExternalLink, Mail, Download, Github, Linkedin, Instagram } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import StatusBadge from '../components/StatusBadge'
import BorderGlowCard from '../components/BorderGlowCard'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    value: 'vrokerev',
    icon: Github,
    href: 'https://github.com/vrokerev',
    color: '#38BDF8',
  },
  {
    label: 'LinkedIn',
    value: 'victor-mma',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/victor-mma',
    color: '#6366F1',
  },
  {
    label: 'Instagram',
    value: '@victhor.ma',
    icon: Instagram,
    href: 'https://www.instagram.com/victhor.ma/',
    color: '#EC4899',
  },
  {
    label: 'Email',
    value: 'victormanuelmeneses@hotmail.com',
    icon: Mail,
    href: 'mailto:victormanuelmeneses@hotmail.com',
    color: '#34D399',
  },
  {
    label: 'CV',
    value: 'download.pdf',
    icon: Download,
    href: null,
    color: '#F59E0B',
  },
]

const TERMINAL_LINES = [
  '$ connect --channels',
  '',
  'Available channels:',
  'github     Code, repos and dev activity',
  'linkedin   Professional profile',
  'instagram  Personal / social updates',
  'email      Direct contact',
  'cv         Resume file',
  '',
  '$ ready --status online',
]

const CHANNEL_NAMES = ['github', 'linkedin', 'instagram', 'email', 'cv']

function TerminalTypedLine({
  text,
  active,
}: {
  text: string
  active: boolean
}) {
  if (text === '') return <div className="h-4" />

  const channel = CHANNEL_NAMES.find(name => text.startsWith(name))

  if (text.startsWith('$ ')) {
    return (
      <div className="font-mono text-primary contact-terminal-line">
        <span className="text-tertiary mr-2">$</span>
        <span>{text.slice(2)}</span>
        {active && <span className="contact-type-cursor" aria-hidden="true">_</span>}
      </div>
    )
  }

  if (channel) {
    return (
      <div className="font-mono text-secondary pl-4 contact-terminal-line">
        <span className="text-cyan">{text.slice(0, channel.length)}</span>
        <span>{text.slice(channel.length)}</span>
        {active && <span className="contact-type-cursor" aria-hidden="true">_</span>}
      </div>
    )
  }

  return (
    <div className="font-mono text-secondary contact-terminal-line">
      <span>{text}</span>
      {active && <span className="contact-type-cursor" aria-hidden="true">_</span>}
    </div>
  )
}

export default function ContactSection() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [terminalStarted, setTerminalStarted] = useState(false)
  const [typedLines, setTypedLines] = useState(() => TERMINAL_LINES.map(() => ''))
  const [activeLine, setActiveLine] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    const terminal = terminalRef.current
    if (!terminal) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTerminalStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.38 }
    )

    observer.observe(terminal)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!terminalStarted || reducedMotion) return

    let lineIndex = 0
    let charIndex = 0
    let timer: number | null = null

    const typeNext = () => {
      if (lineIndex >= TERMINAL_LINES.length) {
        setActiveLine(TERMINAL_LINES.length - 1)
        return
      }

      const fullLine = TERMINAL_LINES[lineIndex]
      setActiveLine(lineIndex)

      if (fullLine === '') {
        lineIndex += 1
        charIndex = 0
        timer = window.setTimeout(typeNext, 120)
        return
      }

      charIndex += 1
      setTypedLines(previous => {
        const next = [...previous]
        next[lineIndex] = fullLine.slice(0, charIndex)
        return next
      })

      if (charIndex >= fullLine.length) {
        lineIndex += 1
        charIndex = 0
        timer = window.setTimeout(typeNext, fullLine.startsWith('$ ') ? 180 : 70)
        return
      }

      timer = window.setTimeout(typeNext, fullLine.startsWith('$ ') ? 26 : 14)
    }

    timer = window.setTimeout(typeNext, 220)

    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [terminalStarted, reducedMotion])

  const visibleTypedLines = reducedMotion ? TERMINAL_LINES : typedLines
  const visibleActiveLine = reducedMotion ? TERMINAL_LINES.length - 1 : activeLine
  const terminalIsStarted = reducedMotion || terminalStarted

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-[940px] mx-auto px-4">
        <ScrollReveal>
          <SectionHeader title="Contact" number="06" centered subtitle="Let’s connect for projects, work opportunities, or creative ideas." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-surface border border-[#232D3F] rounded-lg shadow-glow overflow-hidden mb-8 contact-terminal-shell">
            <div className="relative flex items-center px-4 h-10 border-b border-[#232D3F]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red" />
                <div className="w-3 h-3 rounded-full bg-amber" />
                <div className="w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 font-mono-sm text-tertiary">
                contact
              </div>
            </div>

            <div
              ref={terminalRef}
              className="p-7 contact-terminal-body"
              aria-label="Contact channels terminal"
              aria-live="polite"
            >
              {visibleTypedLines.map((line, index) => (
                <TerminalTypedLine
                  key={`${TERMINAL_LINES[index]}-${index}`}
                  text={line}
                  active={terminalIsStarted && visibleActiveLine === index}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_LINKS.map((link, i) => {
            const Icon = link.icon
            const isExternal = link.href?.startsWith('http')
            const cardContent = (
              <>
                <div className="contact-link-icon-wrap" style={{ '--contact-color': link.color } as CSSProperties}>
                  <Icon size={20} className="contact-link-icon" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-primary group-hover:opacity-100 transition-colors duration-200 contact-link-label">
                    {link.label}
                  </div>
                  <div className="font-mono-sm text-secondary truncate">{link.value}</div>
                </div>
                {link.href ? (
                  <ExternalLink size={14} className="text-tertiary group-hover:translate-x-1 transition-transform ml-auto" aria-hidden="true" />
                ) : (
                  <span className="font-mono-sm text-tertiary ml-auto">soon</span>
                )}
              </>
            )

            return (
              <ScrollReveal key={link.label} delay={i * 0.08}>
                <BorderGlowCard color={link.color} hoverOnly className="h-full">
                  {link.href ? (
                    <a
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={`${link.label}: ${link.value}`}
                      className="contact-link-card flex items-center gap-4 px-5 py-4 h-full group"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div
                      className="contact-link-card flex items-center gap-4 px-5 py-4 h-full group"
                      aria-disabled="true"
                    >
                      {cardContent}
                    </div>
                  )}
                </BorderGlowCard>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <StatusBadge text="Available for opportunities" />
            <span className="font-mono-sm text-tertiary">
              ● Typically responds within 24h
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
