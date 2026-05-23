import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import BorderGlowCard from '../components/BorderGlowCard'

const PROJECTS = [
  {
    title: 'Comercial Victor',
    description: 'Sitio para un bazar en Pueblo Libre, pensado para mostrar su catalogo, redes sociales y ubicacion.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#38BDF8',
    glowClass: 'glow-cyan',
    featured: true,
    image: '/images/projects/webpage-comercial-victor.png',
  },
  {
    title: 'Karin Bodas & Catering',
    description: 'Landing para servicios de bodas y catering con portafolio, redes y presentacion de servicios.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#6366F1',
    glowClass: 'glow-blue',
    featured: true,
    image: '/images/projects/webpage-karin.png',
  },
  {
    title: 'Mi UPC (App)',
    description: 'App que simula el ingreso a la universidad para evitar cierres de sesion del app oficial.',
    stack: ['React', 'TypeScript', 'PWA'],
    color: '#34D399',
    glowClass: 'glow-green',
    featured: false,
    image: '/images/projects/app-mi-upc.png',
  },
  {
    title: 'Erykan Solutions',
    description: 'Emprendimiento con Harold Mayta para consultoria y desarrollo de software.',
    stack: ['Branding', 'Web', 'Consultoria'],
    color: '#F59E0B',
    glowClass: 'glow-amber',
    featured: false,
    image: null,
  },
  {
    title: 'Causa & Efecto',
    description: 'Canal de entrevistas en la calle y contenido de humor con Alejandro Barturen.',
    stack: ['Contenido', 'Redes', 'Produccion'],
    color: '#38BDF8',
    glowClass: 'glow-cyan',
    featured: false,
    image: null,
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Professional Experience" number="02" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {PROJECTS.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.1}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <BorderGlowCard
                color={project.color}
                className={`${project.glowClass} project-glow h-full`}
              >
                <div className="flex flex-col h-full overflow-hidden">
                  {project.image && (
                    <div className={`project-image-wrap ${project.featured ? 'project-image-featured' : ''}`}>
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="project-image"
                        loading="lazy"
                      />
                      <div className="project-image-overlay" />
                    </div>
                  )}

                  <div className="p-7 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="font-mono-sm text-tertiary">
                        {project.featured ? 'featured_project' : 'project'}
                      </span>
                    </div>

                    <h3 className="font-h3 text-primary mb-3">{project.title}</h3>
                    <p className="font-body text-secondary mb-6 flex-1">{project.description}</p>

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

                    <span
                      className="font-mono-sm inline-flex items-center gap-1 transition-all duration-200 hover:underline"
                      style={{ color: project.color }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </BorderGlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}