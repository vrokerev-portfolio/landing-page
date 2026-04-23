import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useFontsLoaded } from '../hooks/useFontsLoaded'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ConstellationCanvas from './ConstellationCanvas'
import StatusBadge from '../components/StatusBadge'

const TERMINAL_LINES = [
  { text: 'load_profile --verbose', type: 'command' as const },
  { text: '// Initializing identity module...', type: 'comment' as const },
  { text: 'Name:        [YOUR NAME]', type: 'output' as const, highlight: '[YOUR NAME]' },
  { text: 'Role:        Software Engineer @ Cuevatech', type: 'output' as const, highlight: 'Software Engineer' },
  { text: 'Education:   Software Engineering — UPC', type: 'output' as const },
  { text: 'Cert:        eJPT Certified', type: 'output' as const, highlight: 'eJPT' },
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
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  const [currentLineText, setCurrentLineText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)

  // Terminal entrance animation
  useEffect(() => {
    if (!terminalRef.current || !fontsLoaded) return

    if (reducedMotion) {
      setDisplayedLines(TERMINAL_LINES.length)
      setTypingDone(true)
      return
    }

    gsap.from(terminalRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [fontsLoaded, reducedMotion])

  // Typing animation
  useEffect(() => {
    if (!fontsLoaded || reducedMotion) return

    if (currentLineIndex >= TERMINAL_LINES.length) {
      setTypingDone(true)
      return
    }

    const line = TERMINAL_LINES[currentLineIndex]
    const fullText = line.text

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(fullText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 30)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines(currentLineIndex + 1)
        setCurrentLineIndex(currentLineIndex + 1)
        setCharIndex(0)
        setCurrentLineText('')
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [fontsLoaded, reducedMotion, currentLineIndex, charIndex])

  // CTA fade in
  useEffect(() => {
    if (!typingDone || !ctaRef.current || reducedMotion) return

    gsap.from(ctaRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [typingDone, reducedMotion])

  // Cursor blink
  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [reducedMotion])

  const renderLine = (line: typeof TERMINAL_LINES[0], index: number) => {
    const isCurrentLine = index === currentLineIndex && !typingDone
    const isDisplayed = index < displayedLines
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
      <div key={index} className="font-mono leading-5 whitespace-pre-wrap">
        {lineType === 'command' && <span className="text-tertiary mr-2">$</span>}
        {parts.length > 0 ? parts : <span className={lineType === 'comment' ? 'text-tertiary' : 'text-primary'}>{text}</span>}
        {isCurrentLine && <span className={`text-cyan ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>}
      </div>
    )
  }

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ConstellationCanvas />

      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 py-20 flex flex-col items-center">
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
          <div ref={linesRef} className="p-7 space-y-1">
            {TERMINAL_LINES.map((line, i) => renderLine(line, i))}
            {typingDone && (
              <div className="font-mono leading-5">
                <span className="text-tertiary mr-2">$</span>
                <span className={`text-cyan ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
          style={{ opacity: typingDone ? 1 : 0 }}
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
