import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import BorderGlowCard from '../components/BorderGlowCard'

const PROJECTS = [
  {
    title: 'SecureChat',
    description: 'End-to-end encrypted messaging application with vulnerability testing and security audit capabilities.',
    stack: ['React', 'Node.js', 'Socket.io', 'JWT'],
    color: '#38BDF8',
    glowClass: 'glow-cyan',
    featured: true,
  },
  {
    title: 'VulnScanner',
    description: 'Automated vulnerability assessment tool for web applications.',
    stack: ['Python', 'OWASP ZAP', 'Docker'],
    color: '#6366F1',
    glowClass: 'glow-blue',
    featured: false,
  },
  {
    title: 'UPC Grades API',
    description: 'REST API for academic grade management system.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL'],
    color: '#34D399',
    glowClass: 'glow-green',
    featured: false,
  },
  {
    title: 'NetMonitor',
    description: 'Network traffic monitoring dashboard with real-time alerts.',
    stack: ['Go', 'InfluxDB', 'Grafana'],
    color: '#F59E0B',
    glowClass: 'glow-amber',
    featured: false,
  },
  {
    title: 'CryptoWallet',
    description: 'Educational cryptocurrency wallet with security analysis.',
    stack: ['TypeScript', 'Ethereum', 'Web3.js'],
    color: '#38BDF8',
    glowClass: 'glow-cyan',
    featured: false,
  },
  {
    title: 'CTF Platform',
    description: 'Capture The Flag competition platform for cybersecurity training with challenge rooms and scoreboard.',
    stack: ['Next.js', 'MongoDB', 'Docker'],
    color: '#6366F1',
    glowClass: 'glow-blue',
    featured: true,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader
          title="Projects"
          number="04"
          subtitle="University projects and professional work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {PROJECTS.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.1}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <BorderGlowCard
                color={project.color}
                className={`${project.glowClass} h-full`}
              >
                <div className="glow-card-inner p-8 flex flex-col h-full">
                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-mono-sm text-tertiary">
                      {project.featured ? 'featured_project' : 'project'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-h3 text-primary mb-3">{project.title}</h3>

                  {/* Description */}
                  <p className="font-body text-secondary mb-6 flex-1">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/5 border border-[#232D3F] rounded font-mono-sm text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <span
                    className="font-mono-sm inline-flex items-center gap-1 transition-all duration-200 hover:underline"
                    style={{ color: project.color }}
                  >
                    View →
                  </span>
                </div>
              </BorderGlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
