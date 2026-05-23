import { useEffect, useState } from 'react'
import {
  Folder,
  FolderOpen,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  X,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

interface FileItem {
  id: string
  name: string
  icon: 'text' | 'image'
  color: string
}

interface FolderItem {
  id: string
  name: string
  files: FileItem[]
}

const PROJECTS = [
  {
    id: 'comercial-victor',
    title: 'Comercial Victor',
    description: 'Sitio para un bazar en Pueblo Libre, pensado para mostrar su catalogo, redes sociales y ubicacion.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#38BDF8',
    image: '/images/projects/webpage-comercial-victor.png',
  },
  {
    id: 'karin-bodas-catering',
    title: 'Karin Bodas & Catering',
    description: 'Landing para servicios de bodas y catering con portafolio, redes y presentacion de servicios.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#6366F1',
    image: '/images/projects/webpage-karin.png',
  },
  {
    id: 'mi-upc-app',
    title: 'Mi UPC (App)',
    description: 'App que simula el ingreso a la universidad para evitar cierres de sesion del app oficial.',
    stack: ['React', 'TypeScript', 'PWA'],
    color: '#34D399',
    image: '/images/projects/app-mi-upc.png',
  },
  {
    id: 'erykan-solutions',
    title: 'Erykan Solutions',
    description: 'Emprendimiento con Harold Mayta para consultoria y desarrollo de software.',
    stack: ['Branding', 'Web', 'Consultoria'],
    color: '#F59E0B',
    image: null,
  },
  {
    id: 'causa-efecto',
    title: 'Causa & Efecto',
    description: 'Canal de entrevistas en la calle y contenido de humor con Alejandro Barturen.',
    stack: ['Contenido', 'Redes', 'Produccion'],
    color: '#EC4899',
    image: null,
  },
]

const DIRECTORY: FolderItem[] = PROJECTS.map(project => ({
  id: project.id,
  name: project.id,
  files: [
    {
      id: project.id,
      name: `${project.id}.md`,
      icon: project.image ? 'image' : 'text',
      color: project.color,
    },
  ],
}))

const FILE_CONTENTS: Record<string, React.ReactNode> = PROJECTS.reduce((acc, project) => {
  acc[project.id] = (
    <div className="space-y-6">
      <div>
        <div className="font-mono-sm text-tertiary">{project.id}</div>
        <h3 className="font-h3 text-primary mt-2">{project.title}</h3>
        <p className="font-body text-secondary mt-3">{project.description}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-lg border border-[#232D3F] bg-page/40 p-4">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-[220px] object-cover rounded-md"
              loading="lazy"
            />
          ) : (
            <div className="h-[220px] rounded-md border border-dashed border-[#232D3F] bg-surface/60 flex items-center justify-center text-tertiary font-mono-sm">
              Preview pending
            </div>
          )}
        </div>
        <div className="rounded-lg border border-[#232D3F] bg-page/40 p-4">
          <div className="font-mono-sm text-tertiary mb-3">stack</div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-white/5 border border-[#232D3F] rounded font-mono-sm text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 font-mono-sm text-tertiary">status</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
            <span className="font-mono-sm text-secondary">active</span>
          </div>
        </div>
      </div>
    </div>
  )
  return acc
}, {} as Record<string, React.ReactNode>)

function FileIcon({ type, color, size = 14 }: { type: string; color: string; size?: number }) {
  if (type === 'image') return <ImageIcon size={size} style={{ color }} />
  return <FileText size={size} style={{ color }} />
}

export default function ProjectsSection() {
  const [selectedFile, setSelectedFile] = useState(PROJECTS[0].id)
  const [openTabs, setOpenTabs] = useState([PROJECTS[0].id])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['projects', ...PROJECTS.map(project => project.id)]))

  useEffect(() => {
    let index = 0
    const interval = window.setInterval(() => {
      index = (index + 1) % PROJECTS.length
      const nextId = PROJECTS[index].id
      setSelectedFile(nextId)
      setOpenTabs(prev => prev.includes(nextId) ? prev : [...prev, nextId])
    }, 3600)
    return () => window.clearInterval(interval)
  }, [])

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectFile = (id: string) => {
    setSelectedFile(id)
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
  }

  const closeTab = (id: string) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t !== id)
      if (selectedFile === id && next.length > 0) {
        setSelectedFile(next[next.length - 1])
      }
      return next
    })
  }

  const currentContent = FILE_CONTENTS[selectedFile]

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader
          title="Projects"
          number="04"
          subtitle="University projects and professional work"
        />

        <ScrollReveal>
          <div className="bg-surface border border-[#232D3F] rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[520px]">
              <div className="w-full lg:w-[280px] border-b lg:border-b-0 lg:border-r border-[#232D3F] flex-shrink-0">
                <div className="px-5 py-4 border-b border-[#232D3F]">
                  <span className="font-mono-sm text-tertiary">WORKSPACE</span>
                </div>
                <div className="p-3">
                  <div className="mb-1">
                    <button
                      onClick={() => toggleFolder('projects')}
                      className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded text-primary hover:bg-white/[0.03] transition-colors"
                    >
                      <FolderOpen size={14} className="text-cyan" />
                      <span className="font-mono-sm">projects/</span>
                    </button>

                    {expandedFolders.has('projects') && DIRECTORY.map(folder => (
                      <div key={folder.id} className="ml-4">
                        <button
                          onClick={() => toggleFolder(folder.id)}
                          className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded text-secondary hover:bg-white/[0.03] transition-colors"
                        >
                          {expandedFolders.has(folder.id) ? (
                            <ChevronDown size={12} className="text-tertiary" />
                          ) : (
                            <ChevronRight size={12} className="text-tertiary" />
                          )}
                          {expandedFolders.has(folder.id) ? (
                            <FolderOpen size={14} className="text-amber" />
                          ) : (
                            <Folder size={14} className="text-amber" />
                          )}
                          <span className="font-mono-sm">{folder.name}/</span>
                        </button>

                        {expandedFolders.has(folder.id) && (
                          <div className="ml-4">
                            {folder.files.map(file => (
                              <button
                                key={file.id}
                                onClick={() => selectFile(file.id)}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded font-mono-sm transition-colors
                                  ${selectedFile === file.id
                                    ? 'bg-cyan/5 text-primary border-l-2 border-cyan'
                                    : 'text-secondary hover:bg-white/[0.03] border-l-2 border-transparent'
                                  }`}
                              >
                                <FileIcon type={file.icon} color={file.color} />
                                {file.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex border-b border-[#232D3F] overflow-x-auto">
                  {openTabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSelectedFile(tab)}
                      className={`flex items-center gap-2 px-4 py-2.5 font-mono-sm whitespace-nowrap border-r border-[#232D3F] transition-colors
                        ${selectedFile === tab
                          ? 'bg-surface-elevated text-primary border-b-2 border-b-cyan'
                          : 'text-secondary hover:text-primary'
                        }`}
                    >
                      {tab}.md
                      <X
                        size={12}
                        className="text-tertiary hover:text-primary"
                        onClick={(e) => { e.stopPropagation(); closeTab(tab) }}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-6 lg:p-8 overflow-auto">
                  {currentContent && (
                    <div className="animate-in fade-in duration-150">
                      {currentContent}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
