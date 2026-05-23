interface GeminiPrismProps {
  className?: string
}

export default function GeminiPrism({ className = '' }: GeminiPrismProps) {
  return (
    <div className={`gemini-prism ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gemini-prism-gradient" x1="0" y1="0" x2="1200" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="34%" stopColor="#6366F1" />
            <stop offset="68%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <filter id="gemini-prism-glow" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.75 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          className="gemini-prism__path gemini-prism__path--wide"
          d="M-90 438 C 165 258, 314 510, 515 326 S 890 70, 1290 258"
          stroke="url(#gemini-prism-gradient)"
          filter="url(#gemini-prism-glow)"
        />
        <path
          className="gemini-prism__path gemini-prism__path--fine"
          d="M-70 474 C 190 300, 330 540, 540 358 S 906 112, 1270 292"
          stroke="url(#gemini-prism-gradient)"
        />
        <path
          className="gemini-prism__path gemini-prism__path--pulse"
          d="M-120 388 C 135 230, 310 448, 500 292 S 860 40, 1320 230"
          stroke="url(#gemini-prism-gradient)"
        />

        <g className="gemini-prism__sparks">
          <path d="M946 115 l8 20 l20 8 l-20 8 l-8 20 l-8 -20 l-20 -8 l20 -8 z" />
          <path d="M273 287 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 z" />
          <path d="M707 391 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" />
        </g>
      </svg>
    </div>
  )
}
