import { Shield, Award, Lock, Check } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

const CERTIFICATES = [
  {
    icon: Shield,
    color: '#34D399',
    name: 'ICCA',
    issuer: 'INE',
    date: 'Expedicion: sept. 2025',
    credentialId: 'ID de la credencial: 160982534',
    skills: 'Aptitudes: Google Cloud, Amazon Web Services (AWS) y 2 aptitudes mas',
    badge: 'ACTIVE',
    link: '#',
    image: '/images/certifications/ine-cca.png',
  },
  {
    icon: Shield,
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
  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Certificates" number="06" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => {
            const Icon = cert.icon
            return (
              <ScrollReveal key={cert.name} delay={i * 0.12}>
                <div className="cert-flip">
                  <div className="cert-flip-inner">
                    <div className="cert-flip-face cert-flip-front bg-surface border border-[#232D3F] rounded-xl overflow-hidden h-full flex flex-col">
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
                        {cert.credentialId && <p className="font-mono-sm text-tertiary mt-2">{cert.credentialId}</p>}
                        {cert.skills && <p className="font-mono-sm text-tertiary mt-2">{cert.skills}</p>}
                      </div>

                      {/* Footer */}
                      <div className="px-7 py-4 border-t border-[#232D3F]">
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
                      </div>
                    </div>

                    <div className="cert-flip-face cert-flip-back">
                      <div className="cert-image-frame" style={{ borderColor: `${cert.color}66` }}>
                        <img
                          src={cert.image}
                          alt={`${cert.name} certificate`}
                          className="cert-image"
                          loading="lazy"
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
