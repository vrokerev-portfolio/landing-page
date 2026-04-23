import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`bg-surface border border-[#232D3F] rounded-lg shadow-glow overflow-hidden ${className}`}>
      {/* Window chrome */}
      <div className="flex items-center px-4 h-10 border-b border-[#232D3F]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red" />
          <div className="w-3 h-3 rounded-full bg-amber" />
          <div className="w-3 h-3 rounded-full bg-green" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 font-mono-sm text-tertiary">
          {title}
        </div>
      </div>
      {/* Terminal body */}
      <div className="p-7">
        {children}
      </div>
    </div>
  )
}
