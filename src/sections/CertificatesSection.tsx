import { useEffect, useState, type CSSProperties } from 'react'
import { Check } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import { usePortfolioContent, type CertificateItem } from '../data/portfolioContent'
import { getIcon } from '../lib/iconMap'

export default function CertificatesSection() {
  const { certificates } = usePortfolioContent()
  const [flippedId, setFlippedId] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setFlippedId(current => (current === id ? null : id))
  }

  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title={certificates.title} number={certificates.number} subtitle={certificates.subtitle || undefined} />

        <div className="md:hidden">
          <MobileCertificatesSelector certificates={certificates.items} />
        </div>

        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.items.map((cert, i) => {
            const Icon = getIcon(cert.icon, 'award')
            const isFlipped = flippedId === cert.id

            return (
              <ScrollReveal key={cert.id} delay={i * 0.045}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`cert-flip w-full bg-transparent p-0 border-0 text-left ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleCard(cert.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleCard(cert.id)
                    }
                  }}
                  aria-expanded={isFlipped}
                  aria-label={`${isFlipped ? 'Hide' : 'Show'} credential preview for ${cert.name}`}
                >
                  <div className="cert-flip-inner">
                    <div className="cert-flip-face cert-flip-front bg-surface border border-[#232D3F] rounded-xl overflow-hidden h-full flex flex-col">
                      <div
                        className="h-[60px] flex items-center justify-between px-6"
                        style={{ backgroundColor: `${cert.color}15` }}
                      >
                        <Icon size={24} style={{ color: cert.color }} aria-hidden="true" />
                        <span className="flex items-center gap-1.5 font-mono-sm text-green">
                          <Check size={12} aria-hidden="true" />
                          {cert.badge}
                        </span>
                      </div>

                      <div className="p-7 flex-1 flex flex-col">
                        <h3 className="font-h3 text-primary mb-2">{cert.name}</h3>
                        <p className="font-body text-secondary mb-1">{cert.issuer}</p>
                        <p className="font-mono-sm text-tertiary">{cert.date}</p>
                        {cert.credentialId && <p className="font-mono-sm text-tertiary mt-2">{cert.credentialId}</p>}
                        {cert.skills && <p className="font-mono-sm text-tertiary mt-2">{cert.skills}</p>}
                      </div>

                      <div className="px-7 py-4 border-t border-[#232D3F] flex items-center justify-between gap-4">
                        {cert.link ? (
                          <a
                            href={cert.link}
                            target={cert.link.startsWith('http') ? '_blank' : undefined}
                            rel={cert.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="font-mono-sm inline-flex items-center gap-1 transition-all duration-200 hover:underline"
                            style={{ color: cert.color }}
                            onClick={event => event.stopPropagation()}
                          >
                            Mostrar credencial →
                          </a>
                        ) : (
                          <span className="font-mono-sm text-tertiary">{cert.footer}</span>
                        )}
                        <span className="font-mono-sm text-tertiary">
                          hover / click
                        </span>
                      </div>
                    </div>

                    <div className="cert-flip-face cert-flip-back">
                      <div className="cert-image-frame" style={{ borderColor: `${cert.color}66` }}>
                        <img
                          src={cert.image}
                          alt={`${cert.name} credential preview from ${cert.issuer}`}
                          className="cert-image"
                          width={1200}
                          height={850}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="cert-back-label" style={{ color: cert.color }}>
                        {cert.name}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MobileCertificatesSelector({ certificates }: { certificates: CertificateItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])

  useEffect(() => {
    setActiveIndex(0)
    setAnimatedOptions([])
  }, [certificates])

  useEffect(() => {
    const timers = certificates.map((_, i) =>
      window.setTimeout(() => {
        setAnimatedOptions(current => (current.includes(i) ? current : [...current, i]))
      }, 90 * i),
    )

    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [certificates])

  return (
    <div className="mobile-cert-selector" aria-label="Certificate selector">
      {certificates.map((cert, index) => {
        const Icon = getIcon(cert.icon, 'award')
        const isActive = activeIndex === index
        const isAnimated = animatedOptions.includes(index)

        return (
          <button
            key={cert.id}
            type="button"
            className={`mobile-cert-option ${isActive ? 'is-active' : ''}`}
            style={{
              '--cert-color': cert.color,
              backgroundImage: `linear-gradient(180deg, rgba(11, 15, 23, 0.1), rgba(11, 15, 23, 0.88)), url("${cert.image}")`,
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated ? 'translateX(0)' : 'translateX(-34px)',
            } as CSSProperties}
            onClick={() => setActiveIndex(index)}
            aria-expanded={isActive}
          >
            <span className="mobile-cert-scrim" aria-hidden="true" />
            <span className="mobile-cert-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="mobile-cert-copy">
              <span className="mobile-cert-name">{cert.name}</span>
              <span className="mobile-cert-meta">
                {cert.issuer} | {cert.badge}
              </span>
              <span className="mobile-cert-detail">{cert.date}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
