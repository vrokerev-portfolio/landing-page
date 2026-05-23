import type { CSSProperties, ReactNode } from 'react'

interface BorderGlowCardProps {
  children: ReactNode
  color: string
  className?: string
}

export default function BorderGlowCard({ children, color, className = '' }: BorderGlowCardProps) {
  return (
    <div
      className={`glow-card ${className}`}
      style={{ '--glow-color': color } as CSSProperties}
    >
      <div className="glow-card-inner">
        {children}
      </div>
    </div>
  )
}
