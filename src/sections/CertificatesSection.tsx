import { useEffect, useState } from 'react'
import { Shield, Lock, Award, Check } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

const CERTIFICATES = [
  {
    id: 'cca',
    icon: Shield,
    color: '#34D399',
    name: 'Certified Cybersecurity Analyst',
    issuer: 'INE',
    date: 'Expedicion: jul. 2025',
    credentialId: 'ID de la credencial: 156185381',
    skills: 'Aptitudes: Hacking etico, Ciberseguridad y 2 aptitudes mas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/ine-cca.png',
  },
  {
    id: 'ejpt',
    icon: Lock,
    color: '#38BDF8',
    name: 'Junior Penetration Tester',
    issuer: 'INE',
    date: 'Expedicion: jul. 2025',
    credentialId: 'ID de la credencial: 156416723',
    skills: 'Aptitudes: Hacking etico, Ciberseguridad',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/ine-ejpt.png',
  },
  {
    id: 'ibm',
    icon: Lock,
    color: '#F59E0B',
    name: 'IBM Cybersecurity Analyst',
    issuer: 'IBM',
    date: 'Expedicion: nov. 2024',
    skills: 'Aptitudes: Ciberseguridad, Respuesta a incidentes de ciberseguridad y 2 aptitudes mas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/ibm-cybersecurity-analyst.png',
  },
  {
    id: 'sql',
    icon: Award,
    color: '#60A5FA',
    name: '70-461, 761: Querying Microsoft SQL Server with Transact-SQL',
    issuer: 'Udemy',
    date: 'Expedicion: ago. 2024',
    credentialId: 'ID de la credencial: UC-14f7f2a8-8b95-4cea-96ab-a70596dff4e5',
    skills: 'Aptitudes: Microsoft SQL Server, Transact-SQL (T-SQL) y 3 aptitudes mas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/microsoft-70-461.png',
  },
  {
    id: 'mongodb',
    icon: Lock,
    color: '#22D3EE',
    name: 'Introduction to MongoDB',
    issuer: 'MongoDB',
    date: 'Expedicion: sept. 2023',
    credentialId: 'ID de la credencial: MDBa16dly5gq9',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/mongodb-Introduction%20to%20MongoDB.png',
  },
  {
    id: 'scrum',
    icon: Award,
    color: '#F97316',
    name: 'Scrum Fundamentals Certified (SFC™)',
    issuer: 'Vabro.ai and VMEdu.com',
    date: 'Expedicion: may. 2023',
    credentialId: 'ID de la credencial: 981563',
    badge: 'VERIFIED',
    link: null,
    footer: 'Mas certificaciones en progreso...',
    image: '/images/certifications/scrumstudy-scrum-fundamentals-certified.png',
  },
]

export default function CertificatesSection() {
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const toggleCard = (id: string) => {
    setFlippedId(current => (current === id ? null : id))
  }

  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Certificates" number="05" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => {
            const Icon = cert.icon
            const isFlipped = flippedId === cert.id

            return (
              <ScrollReveal key={cert.name} delay={i * 0.12}>
                <button
                  type="button"
                  className={`cert-flip w-full bg-transparent p-0 border-0 text-left ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleCard(cert.id)}
                >
                  <div className="cert-flip-inner">
                    <div className="cert-flip-face cert-flip-front bg-surface border border-[#232D3F] rounded-xl overflow-hidden h-full flex flex-col">
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

                      <div className="p-7 flex-1 flex flex-col">
                        <h3 className="font-h3 text-primary mb-2">{cert.name}</h3>
                        <p className="font-body text-secondary mb-1">{cert.issuer}</p>
                        <p className="font-mono-sm text-tertiary">{cert.date}</p>
                        {cert.credentialId && <p className="font-mono-sm text-tertiary mt-2">{cert.credentialId}</p>}
                        {cert.skills && <p className="font-mono-sm text-tertiary mt-2">{cert.skills}</p>}
                      </div>

                      <div className="px-7 py-4 border-t border-[#232D3F] flex items-center justify-between gap-4">
                        {cert.link ? (
                          <span
                            className="font-mono-sm inline-flex items-center gap-1 transition-all duration-200 hover:underline"
                            style={{ color: cert.color }}
                          >
                            Mostrar credencial →
                          </span>
                        ) : (
                          <span className="font-mono-sm text-tertiary">{cert.footer}</span>
                        )}
                        <span className="font-mono-sm text-tertiary">
                          {isMobile ? 'tap to flip' : 'hover / click'}
                        </span>
                      </div>
                    </div>

                    <div className="cert-flip-face cert-flip-back">
                      <div className="cert-image-frame" style={{ borderColor: `${cert.color}66` }}>
                        <img
                          src={cert.image}
                          alt={`${cert.name} certificate`}
                          className="cert-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="cert-back-label" style={{ color: cert.color }}>
                        {cert.name}
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
