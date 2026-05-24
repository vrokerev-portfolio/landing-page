interface StatusBadgeProps {
  text: string
  className?: string
}

export default function StatusBadge({ text, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono-sm text-green px-3 py-1.5 rounded border border-green/20 bg-green/5 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" aria-hidden="true" />
      {text}
    </span>
  )
}
