import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

interface BorderGlowCardProps {
  children: ReactNode
  color: string
  className?: string
}

export default function BorderGlowCard({ children, color, className = '' }: BorderGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Check for @property support
    const supportsProperty = CSS.supports('property', '--angle')
    if (supportsProperty) return // CSS animation handles it

    // JS fallback for Firefox and older browsers
    let angle = 0
    let raf: number

    const animate = () => {
      angle += 1
      if (card) {
        card.style.setProperty('--angle', `${angle}deg`)
      }
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      style={{ '--glow-color': color } as React.CSSProperties}
    >
      <div className="glow-card-inner">
        {children}
      </div>
    </div>
  )
}
