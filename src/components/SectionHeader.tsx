import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SectionHeaderProps {
  title: string
  number: string
  subtitle?: string
  centered?: boolean
  className?: string
  animateTitle?: boolean
}

export default function SectionHeader({
  title,
  number,
  subtitle,
  centered = false,
  className = '',
  animateTitle = true,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayIndex, setDisplayIndex] = useState(animateTitle ? 0 : title.length)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!animateTitle || reducedMotion) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animateTitle, reducedMotion])

  useEffect(() => {
    if (!animateTitle || reducedMotion) {
      setDisplayIndex(title.length)
      return
    }
    if (!isInView || hasAnimated) return
    setDisplayIndex(0)
    let index = 0
    const typingDelay = title.length >= 18 ? 22 : 42
    const interval = window.setInterval(() => {
      index += 1
      setDisplayIndex(index)
      if (index >= title.length) {
        window.clearInterval(interval)
        setHasAnimated(true)
      }
    }, typingDelay)
    return () => window.clearInterval(interval)
  }, [animateTitle, reducedMotion, isInView, hasAnimated, title])

  const isTyping = animateTitle && !reducedMotion && displayIndex < title.length
  const typed = title.slice(0, displayIndex)
  const currentChar = isTyping ? title[displayIndex] : ''

  return (
    <div ref={containerRef} className={`relative mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <span className="section-title-number absolute -top-8 right-0 font-display select-none pointer-events-none">
        {number}
      </span>
      <h2 className="font-h1 text-primary section-title">
        <span className="section-title-text">
          <span className="section-title-static">{typed}</span>
          {currentChar && <span className="section-title-active">{currentChar}</span>}
        </span>
        {animateTitle && !reducedMotion && <span className="section-title-cursor">_</span>}
      </h2>
      {subtitle && (
        <p className={`font-body text-secondary mt-4 max-w-xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </div>
  )
}
