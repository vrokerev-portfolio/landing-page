interface SectionHeaderProps {
  title: string
  number: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({ title, number, subtitle, centered = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`relative mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <span className="absolute -top-8 right-0 font-display text-tertiary/30 select-none pointer-events-none">
        {number}
      </span>
      <h2 className="font-h1 text-primary">{title}</h2>
      {subtitle && (
        <p className="font-body text-secondary mt-4 max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}
