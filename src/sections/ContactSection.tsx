import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import StatusBadge from '../components/StatusBadge'
import BorderGlowCard from '../components/BorderGlowCard'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePortfolioContent } from '../data/portfolioContent'
import { getIcon } from '../lib/iconMap'

function TerminalTypedLine({
  text,
  active,
  channelNames,
}: {
  text: string
  active: boolean
  channelNames: string[]
}) {
  if (text === '') return <div className="h-4" />

  const channel = channelNames.find(name => text.startsWith(name))

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
  const { contact } = usePortfolioContent()
  const terminalRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [terminalStarted, setTerminalStarted] = useState(false)
  const [typedLines, setTypedLines] = useState(() => contact.terminalLines.map(() => ''))
  const [activeLine, setActiveLine] = useState(0)

  useEffect(() => {
    setTypedLines(contact.terminalLines.map(() => ''))
    setActiveLine(0)
  }, [contact.terminalLines])

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
      if (lineIndex >= contact.terminalLines.length) {
        setActiveLine(contact.terminalLines.length - 1)
        return
      }

      const fullLine = contact.terminalLines[lineIndex]
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
  }, [terminalStarted, reducedMotion, contact.terminalLines])

  const visibleTypedLines = reducedMotion ? contact.terminalLines : typedLines
  const visibleActiveLine = reducedMotion ? contact.terminalLines.length - 1 : activeLine
  const terminalIsStarted = reducedMotion || terminalStarted

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-[940px] mx-auto px-4">
        <ScrollReveal>
          <SectionHeader title={contact.title} number={contact.number} centered subtitle={contact.subtitle} />
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
                {contact.terminalTitle}
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
                  key={`${contact.terminalLines[index]}-${index}`}
                  text={line}
                  active={terminalIsStarted && visibleActiveLine === index}
                  channelNames={contact.channelNames}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contact.links.map((link, i) => {
            const Icon = getIcon(link.icon, 'mail')
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
            <StatusBadge text={contact.statusBadge} />
            <span className="font-mono-sm text-tertiary">
              * {contact.responseText}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
