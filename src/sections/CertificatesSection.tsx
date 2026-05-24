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
    image: '/images/certifications/ine-cca.avif',
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
    image: '/images/certifications/ine-ejpt.avif',
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
    image: '/images/certifications/ibm-cybersecurity-analyst.avif',
  },
  {
    id: 'ibm-generative-ai',
    icon: Award,
    color: '#A78BFA',
    name: 'Generative AI: Business Transformation and Career Growth',
    issuer: 'IBM',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Inteligencia artificial generativa, transformacion digital',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/ibm_generative-ai-business-transformation-and-career-growth.avif',
  },
  {
    id: 'sql',
    icon: Award,
    color: '#60A5FA',
    name: '70-461, 761: Querying Microsoft SQL Server with Transact-SQL',
    issuer: 'Microsoft',
    date: 'Expedicion: ago. 2024',
    credentialId: 'ID de la credencial: UC-14f7f2a8-8b95-4cea-96ab-a70596dff4e5',
    skills: 'Aptitudes: Microsoft SQL Server, Transact-SQL (T-SQL) y 3 aptitudes mas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/microsoft-70-461.avif',
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
    image: '/images/certifications/mongodb-Introduction%20to%20MongoDB.avif',
  },
  {
    id: 'scrum',
    icon: Award,
    color: '#F97316',
    name: 'Scrum Fundamentals Certified (SFC™)',
    issuer: 'SCRUMstudy',
    date: 'Expedicion: may. 2023',
    credentialId: 'ID de la credencial: 981563',
    badge: 'VERIFIED',
    link: null,
    footer: 'Mas certificaciones en progreso...',
    image: '/images/certifications/scrumstudy-scrum-fundamentals-certified.avif',
  },
  {
    id: 'ai-business',
    icon: Award,
    color: '#38BDF8',
    name: 'Business Implications of AI',
    issuer: '28 Digital',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Inteligencia artificial, estrategia de negocio',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/28digital-business-implications-of-ai.avif',
  },
  {
    id: 'marketing-analytics',
    icon: Award,
    color: '#F59E0B',
    name: 'Analiticas y metricas de marketing',
    issuer: 'Tecnologico de Monterrey',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Analitica, metricas, marketing digital',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/tecnologico-de-monterrey_analiticas-y-metricas-de-marketing.avif',
  },
  {
    id: 'blockchain-disruption',
    icon: Lock,
    color: '#22D3EE',
    name: 'La disrupcion del blockchain',
    issuer: 'Universidad Austral',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Blockchain, transformacion digital',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/universidad-austral_la-disrupcion-del-blockchain.avif',
  },
  {
    id: 'blockchain-platforms',
    icon: Lock,
    color: '#60A5FA',
    name: 'Blockchain Platforms',
    issuer: 'University at Buffalo',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Blockchain, plataformas descentralizadas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/university-at-buffalo_blockchain-platforms.avif',
  },
  {
    id: 'database-data-scientists',
    icon: Award,
    color: '#34D399',
    name: 'Database for Data Scientists',
    issuer: 'University of Colorado Boulder',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Bases de datos, ciencia de datos',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/university-of-colorado-boulder_database-for-data-scientists.avif',
  },
  {
    id: 'virtual-reality',
    icon: Award,
    color: '#EC4899',
    name: 'Virtual Reality',
    issuer: 'University of London',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Realidad virtual, experiencias inmersivas',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/university-of-london_virtual-reality.avif',
  },
  {
    id: 'data-science-ethics',
    icon: Shield,
    color: '#A3E635',
    name: 'Data Science Ethics',
    issuer: 'University of Michigan',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Etica de datos, ciencia de datos',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/university-of-michigan_data-science-ethics.avif',
  },
  {
    id: 'ai-marketing',
    icon: Award,
    color: '#F97316',
    name: 'Artificial Intelligence in Marketing',
    issuer: 'University of Virginia',
    date: 'Credencial agregada',
    skills: 'Aptitudes: Inteligencia artificial, marketing',
    badge: 'VERIFIED',
    link: '#',
    image: '/images/certifications/university-of-virginia_artificial-intelligence-in-marketing.avif',
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
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
