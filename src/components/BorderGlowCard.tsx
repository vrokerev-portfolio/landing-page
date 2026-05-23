import type { CSSProperties, ReactNode } from 'react'

interface BorderGlowCardProps {
  children: ReactNode
  color: string
  className?: string
  hoverOnly?: boolean
}

export default function BorderGlowCard({
  children,
  color,
  className = '',
  hoverOnly = false,
}: BorderGlowCardProps) {
  return (
    <div
      className={`glow-card ${hoverOnly ? 'glow-card-hover-only' : ''} ${className}`.trim()}
      style={{ '--glow-color': color } as CSSProperties}
    >
      <div className="glow-card-inner">
        {children}
      </div>
    </div>
  )
}
