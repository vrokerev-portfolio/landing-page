import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {
    label: 'Experience',
    value: 'Software Engineer',
    color: 'text-cyan',
    sub: '@ Cuevatech since Aug 2025',
  },
  {
    label: 'Education',
    value: 'Software Engineering',
    color: 'text-primary',
    sub: 'Universitat Politecnica de Catalunya',
  },
  {
    label: 'Certifications',
    value: '3 Active',
    color: 'text-green',
    sub: 'eJPT + SCRUM',
  },
]

function AnimatedCounter({ target, color }: { target: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // For text values, just animate opacity
    gsap.from(el, {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }, [])

  return (
    <div ref={ref} className={`font-h3 ${color}`}>
      {target}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Bio Panel - Left */}
          <ScrollReveal className="lg:col-span-3" direction="left">
            <div className="bg-surface border border-[#232D3F] rounded-lg p-8 lg:p-10 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#232D3F]">
                <User size={16} className="text-cyan" />
                <span className="font-mono text-secondary">about.md</span>
              </div>

              {/* Content */}
              <h2 className="font-h2 text-primary mb-5">
                Software Engineer | Cybersecurity | UPC Student
              </h2>

              <p className="font-body text-secondary mb-5">
                I am a Software Engineering student at UPC, currently growing through academic work, real professional experience, certifications, and continuous learning.
              </p>

              <div className="border-t border-[#232D3F] my-5" />

              <p className="font-body text-secondary mb-6">
                I am proactive, curious, and always looking to improve my technical and professional profile. I have taught cybersecurity classes at UPC, combining technical knowledge with communication skills.
              </p>

              {/* Footer metadata */}
              <div className="font-mono-sm text-tertiary pt-4 border-t border-[#232D3F]">
                Location: Barcelona, Spain | Timezone: CET (UTC+1)
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Stats - Right */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.15} direction="right">
                <div className="bg-surface border border-[#232D3F] rounded-lg p-6">
                  <div className="font-mono-sm text-tertiary mb-2">{stat.label}</div>
                  <AnimatedCounter target={stat.value} color={stat.color} />
                  <div className="font-mono-sm text-secondary mt-1">{stat.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
