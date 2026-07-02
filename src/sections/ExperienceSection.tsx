import type { CSSProperties } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import BorderGlowCard from '../components/BorderGlowCard'
import { usePortfolioContent } from '../data/portfolioContent'

export default function ExperienceSection() {
  const { experience } = usePortfolioContent()

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader
          title={experience.title}
          number={experience.number}
          subtitle={experience.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {experience.items.map((item, i) => (
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
