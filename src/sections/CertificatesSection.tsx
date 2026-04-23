import { Shield, Award, Lock, Check } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

const CERTIFICATES = [
  {
    icon: Shield,
    color: '#34D399',
    name: 'eJPT (Junior Penetration Tester)',
    issuer: 'INE Security (eLearnSecurity)',
    date: '2025',
    badge: 'ACTIVE',
    link: '#',
  },
  {
    icon: Award,
    color: '#38BDF8',
    name: 'SCRUM Fundamentals',
    issuer: 'SCRUM Study / Scrum.org',
    date: '2025',
    badge: 'VERIFIED',
    link: '#',
  },
  {
    icon: Lock,
    color: '#F59E0B',
    name: 'SCRUM Developer',
    issuer: 'SCRUM Study',
    date: '2025',
    badge: 'VERIFIED',
    link: null,
    footer: 'More certifications in progress...',
  },
]

export default function CertificatesSection() {
  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Certificates" number="06" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => {
            const Icon = cert.icon
            return (
              <ScrollReveal key={cert.name} delay={i * 0.12}>
                <div className="bg-surface border border-[#232D3F] rounded-xl overflow-hidden h-full flex flex-col">
                  {/* Header band */}
                  <div
                    className="h-[60px] flex items-center justify-between px-6"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <Icon size={24} style={{ color: cert.color }} />
                    <span className="flex items-center gap-1.5 font-mono-sm text-green">
                      <Check size={12} />
                      {cert.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-h3 text-primary mb-2">{cert.name}</h3>
                    <p className="font-body text-secondary mb-1">{cert.issuer}</p>
                    <p className="font-mono-sm text-tertiary">{cert.date}</p>
                  </div>

                  {/* Footer */}
                  <div className="px-7 py-4 border-t border-[#232D3F]">
                    {cert.link ? (
                      <span
                        className="font-mono-sm inline-flex items-center gap-1 transition-all duration-200 hover:underline"
                        style={{ color: cert.color }}
                      >
                        View Credential →
                      </span>
                    ) : (
                      <span className="font-mono-sm text-tertiary">{cert.footer}</span>
                    )}
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
