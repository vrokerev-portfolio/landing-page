export default function Footer() {
  return (
    <footer className="py-6 border-t border-[#232D3F] bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="font-mono-sm text-tertiary">
          © 2025 Victor Meneses. All systems operational.
        </div>

        {/* Center */}
        <div className="flex items-center gap-3 font-mono-sm">
          <span className="flex items-center gap-1.5 text-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            Online
          </span>
          <span className="text-tertiary">·</span>
          <span className="flex items-center gap-1.5 text-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            Certs Verified
          </span>
          <span className="text-tertiary">·</span>
          <span className="flex items-center gap-1.5 text-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Profile Synced
          </span>
        </div>

        {/* Right */}
        <div className="font-mono-sm text-tertiary">
          Built with React + TypeScript
        </div>
      </div>
    </footer>
  )
}
