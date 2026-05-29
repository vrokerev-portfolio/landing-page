import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useFontsLoaded } from '../hooks/useFontsLoaded'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsMobile } from '../hooks/use-mobile'
import ConstellationCanvas from './ConstellationCanvas'
import StatusBadge from '../components/StatusBadge'

const HERO_TYPE_SPEED_MS = 7
const HERO_LINE_PAUSE_MS = 60

const TERMINAL_LINES = [
  { text: 'load_profile --verbose', type: 'command' as const },
  { text: '// Initializing identity module...', type: 'comment' as const },
  { text: 'Name:        Victor Meneses', type: 'output' as const, highlight: 'Victor Meneses' },
  { text: 'Role:        Software Engineer @ Cuevatech', type: 'output' as const, highlight: 'Software Engineer' },
  { text: 'Education:   Software Engineering — UPC', type: 'output' as const },
  { text: 'English:     B2 (Professional working proficiency)', type: 'output' as const },
  { text: 'Status:      Available for opportunities', type: 'output' as const, highlight: 'Available' },
  { text: '// Profile loaded successfully.', type: 'comment' as const },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const fontsLoaded = useFontsLoaded()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  const [currentLineText, setCurrentLineText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const shouldAnimate = !reducedMotion && !isMobile
  const terminalFinished = !shouldAnimate || currentLineIndex >= TERMINAL_LINES.length
  const visibleDisplayedLines = shouldAnimate ? displayedLines : TERMINAL_LINES.length
  const visibleCurrentLineIndex = shouldAnimate ? currentLineIndex : TERMINAL_LINES.length

  // Terminal entrance animation
  useEffect(() => {
    if (!terminalRef.current || !fontsLoaded) return

    if (!shouldAnimate) return

    gsap.from(terminalRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [fontsLoaded, shouldAnimate])

  // Typing animation
  useEffect(() => {
    if (!fontsLoaded || !shouldAnimate) return

    if (currentLineIndex >= TERMINAL_LINES.length) return

    const line = TERMINAL_LINES[currentLineIndex]
    const fullText = line.text

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(fullText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, HERO_TYPE_SPEED_MS)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines(currentLineIndex + 1)
        setCurrentLineIndex(currentLineIndex + 1)
        setCharIndex(0)
        setCurrentLineText('')
      }, HERO_LINE_PAUSE_MS)
      return () => clearTimeout(timer)
    }
  }, [fontsLoaded, shouldAnimate, currentLineIndex, charIndex])

  // CTA fade in
  useEffect(() => {
    if (!terminalFinished || !ctaRef.current || !shouldAnimate) return

    gsap.from(ctaRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [terminalFinished, shouldAnimate])

  // Cursor blink
  useEffect(() => {
    if (!shouldAnimate) return
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [shouldAnimate])

  const renderLine = (line: typeof TERMINAL_LINES[0], index: number) => {
    const isCurrentLine = index === visibleCurrentLineIndex && !terminalFinished
    const isDisplayed = index < visibleDisplayedLines
    const text = isCurrentLine ? currentLineText : line.text

    if (!isDisplayed && !isCurrentLine) return null

    const highlightColor = !line.highlight
      ? 'text-tertiary'
      : line.highlight === 'eJPT' || line.highlight === 'Available'
        ? 'text-green'
        : 'text-cyan'

    const parts: React.ReactNode[] = []
    let remaining = text

    const isComment = line.type === 'comment'

    if (line.highlight && remaining.includes(line.highlight)) {
      const idx = remaining.indexOf(line.highlight)
      if (idx > 0) parts.push(<span key="pre" className={isComment ? 'text-tertiary' : 'text-primary'}>{remaining.slice(0, idx)}</span>)
      parts.push(<span key="hl" className={highlightColor}>{line.highlight}</span>)
      remaining = remaining.slice(idx + line.highlight.length)
    }

    if (remaining) {
      parts.push(<span key="post" className={isComment ? 'text-tertiary' : 'text-primary'}>{remaining}</span>)
    }

    const lineType = line.type
    return (
      <div key={index} className="font-mono hero-terminal-line whitespace-pre-wrap">
        {lineType === 'command' && <span className="text-tertiary mr-2">$</span>}
        {parts.length > 0 ? parts : <span className={lineType === 'comment' ? 'text-tertiary' : 'text-primary'}>{text}</span>}
        {isCurrentLine && <span className={`text-cyan ${showCursor ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">_</span>}
      </div>
    )
  }

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {!isMobile && <ConstellationCanvas />}

      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 py-20 flex flex-col items-center">
        <h1 className="sr-only">
          Victor Meneses, Software Engineer focused on modern web experiences and cybersecurity
        </h1>

        {/* Status badge */}
        <StatusBadge text="SYSTEM INITIALIZED" className="mb-8" />

        {/* Terminal Window */}
        <div
          ref={terminalRef}
          className="w-full max-w-[680px] bg-surface border border-[#232D3F] rounded-lg shadow-glow overflow-hidden"
          style={{ opacity: fontsLoaded ? 1 : 0 }}
        >
          {/* Window chrome */}
          <div className="relative flex items-center px-4 h-10 border-b border-[#232D3F]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red" />
              <div className="w-3 h-3 rounded-full bg-amber" />
              <div className="w-3 h-3 rounded-full bg-green" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 font-mono-sm text-tertiary">
              profile_load.exe
            </div>
          </div>

          {/* Terminal body */}
          <div ref={linesRef} className="hero-terminal-body p-7 sm:p-8 space-y-1.5">
            {TERMINAL_LINES.map((line, i) => renderLine(line, i))}
            {terminalFinished && (
              <div className="font-mono hero-terminal-line">
                <span className="text-tertiary mr-2">$</span>
                <span className={`text-cyan ${showCursor ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">_</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
          style={{ opacity: terminalFinished ? 1 : 0 }}
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="px-6 py-3 bg-cyan text-page font-nav rounded hover:brightness-110 transition-all duration-200"
          >
            View Projects →
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3 border border-[#232D3F] text-primary font-nav rounded hover:border-cyan hover:text-cyan transition-all duration-200"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}
