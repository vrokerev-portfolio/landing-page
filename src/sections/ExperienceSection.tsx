import type { CSSProperties } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import BorderGlowCard from '../components/BorderGlowCard'

const EXPERIENCES = [
  {
    label: 'current_role',
    title: 'Software Engineer @ Cuevatech',
    period: 'Aug 2025 — Present',
    description: 'Building production-ready web interfaces with a focus on performance, maintainability, responsive UI, and clean frontend architecture.',
    stack: ['React', 'Next.js', 'TypeScript', 'Vercel'],
    color: '#34D399',
    featured: true,
    metric: 'production_work',
  },
  {
    label: 'teaching_node',
    title: 'Cybersecurity Teaching @ UPC',
    period: 'Academic experience',
    description: 'Delivered cybersecurity sessions, translating technical topics into clear explanations and practical learning experiences.',
    stack: ['Cybersecurity', 'Communication', 'Labs'],
    color: '#38BDF8',
    featured: true,
    metric: 'security_mindset',
  },
  {
    label: 'client_projects',
    title: 'Freelance Web Projects',
    period: 'Selected work',
    description: 'Designing and developing polished landing pages and business sites with visual detail, CMS workflows, and mobile-first optimization.',
    stack: ['Sanity CMS', 'Tailwind', 'GSAP'],
    color: '#6366F1',
    featured: false,
    metric: 'ui_engineering',
  },
  {
    label: 'builder_mode',
    title: 'Product & Automation Builder',
    period: 'Ongoing',
    description: 'Exploring tools, automations, and practical software ideas that connect business needs with fast, useful technical execution.',
    stack: ['Automation', 'AI Tools', 'Product'],
    color: '#F59E0B',
    featured: false,
    metric: 'continuous_learning',
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader
          title="Professional Experience"
          number="02"
          subtitle="Roles, practical work, and the technical profile behind the portfolio"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {EXPERIENCES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <BorderGlowCard color={item.color} hoverOnly className="experience-glow-card h-full">
                <article className="experience-card-content h-full p-6 sm:p-7 flex flex-col">
                  <div className="experience-card-header">
                    <div className="experience-title-cluster">
                      <span
                        className="experience-dot"
                        style={{ backgroundColor: item.color, boxShadow: `0 0 18px ${item.color}` }}
                      />
                      <div>
                        <span className="experience-label font-mono-sm">{item.label}</span>
                        <h3 className="font-h3 text-primary mt-2">{item.title}</h3>
                      </div>
                    </div>
                    <span className="experience-index font-mono-sm" style={{ color: item.color }}>
                      0{i + 1}
                    </span>
                  </div>

                  <div className="experience-period-row">
                    <span className="font-mono-sm text-tertiary">period</span>
                    <span className="experience-period font-mono-sm" style={{ color: item.color }}>
                      {item.period}
                    </span>
                  </div>

                  <p className="font-body text-secondary mt-5 mb-6 flex-1">{item.description}</p>

                  <div className="experience-metric mb-5" style={{ '--metric-color': item.color } as CSSProperties}>
                    <span className="font-mono-sm text-tertiary">signal</span>
                    <span className="font-mono-sm text-primary">{item.metric}</span>
                  </div>

                  <div className="experience-stack">
                    {item.stack.map(tech => (
                      <span key={tech} className="experience-chip font-mono-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </BorderGlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
