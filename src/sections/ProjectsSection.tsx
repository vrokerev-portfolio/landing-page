import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import {
  ChevronDown,
  ChevronRight,
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  TerminalSquare,
  X,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

interface ProjectItem {
  id: string
  title: string
  description: string
  stack: string[]
  color: string
  image: string | null
  status?: string
  gallery?: string
  terminal?: string[]
}

interface FileItem {
  id: string
  name: string
  icon: 'image' | 'text'
  color: string
}

interface FolderItem {
  id: string
  name: string
  files: FileItem[]
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'comercial-victor',
    title: 'Comercial Victor',
    description: 'Sitio para un bazar en Pueblo Libre, pensado para mostrar su catalogo, redes sociales y ubicacion.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#38BDF8',
    image: '/images/projects/webpage-comercial-victor.png',
    status: 'active',
    gallery: 'cyan',
    terminal: [
      'preview: ecommerce_landing',
      'focus: catalog + social proof + conversion',
      'note: optimized for visual merchandising',
    ],
  },
  {
    id: 'karin-bodas-catering',
    title: 'Karin Bodas & Catering',
    description: 'Landing para servicios de bodas y catering con portafolio, redes y presentacion de servicios.',
    stack: ['Vite', 'React', 'Tailwind'],
    color: '#6366F1',
    image: '/images/projects/webpage-karin.png',
    status: 'active',
    gallery: 'violet',
    terminal: [
      'preview: event_brand_site',
      'focus: premium presentation + trust',
      'note: cms-friendly visual structure',
    ],
  },
  {
    id: 'mi-upc-app',
    title: 'Mi UPC (App)',
    description: 'App que simula el ingreso a la universidad para evitar cierres de sesion del app oficial.',
    stack: ['React', 'TypeScript', 'PWA'],
    color: '#34D399',
    image: '/images/projects/app-mi-upc.png',
    status: 'active',
    gallery: 'green',
    terminal: [
      'preview: app_experience',
      'focus: persistence + convenience',
      'note: built around student workflow',
    ],
  },
  {
    id: 'erykan-solutions',
    title: 'Erykan Solutions',
    description: 'Emprendimiento con Harold Mayta para consultoria y desarrollo de software.',
    stack: ['Branding', 'Web', 'Consultoria'],
    color: '#F59E0B',
    image: null,
    status: 'active',
    gallery: 'amber',
    terminal: [
      'preview: startup_concept',
      'focus: consultancy + product delivery',
      'note: identity and offer still evolving',
    ],
  },
  {
    id: 'causa-efecto',
    title: 'Causa & Efecto',
    description: 'Canal de entrevistas en la calle y contenido de humor con Alejandro Barturen.',
    stack: ['Contenido', 'Redes', 'Produccion'],
    color: '#EC4899',
    image: null,
    status: 'active',
    gallery: 'pink',
    terminal: [
      'preview: media_content_project',
      'focus: interviews + short-form social content',
      'note: personality-driven production',
    ],
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

function hexToRgb(hex: string) {
  const cleaned = hex.replace('#', '')
  const value = cleaned.length === 3
    ? cleaned.split('').map(char => char + char).join('')
    : cleaned
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

function FileIcon({ type, color, size = 14 }: { type: string; color: string; size?: number }) {
  if (type === 'image') return <FileImage size={size} style={{ color }} />
  return <FileText size={size} style={{ color }} />
}

export default function ProjectsSection() {
  const rotationTimeoutRef = useRef<number | null>(null)
  const [selectedFile, setSelectedFile] = useState(PROJECTS[0].id)
  const [openTabs, setOpenTabs] = useState([PROJECTS[0].id])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['projects', ...PROJECTS.map(project => project.id)]))

  const currentProject = useMemo(
    () => PROJECTS.find(project => project.id === selectedFile) ?? PROJECTS[0],
    [selectedFile]
  )

  const scheduleRotation = useCallback((fromId?: string) => {
    if (rotationTimeoutRef.current) {
      window.clearTimeout(rotationTimeoutRef.current)
    }

    rotationTimeoutRef.current = window.setTimeout(() => {
      const currentId = fromId ?? selectedFile
      const currentIndex = PROJECTS.findIndex(project => project.id === currentId)
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % PROJECTS.length : 0
      const nextId = PROJECTS[nextIndex].id
      setSelectedFile(nextId)
      setOpenTabs(prev => (prev.includes(nextId) ? prev : [...prev, nextId]))
      scheduleRotation(nextId)
    }, 5200)
  }, [])

  useEffect(() => {
    scheduleRotation(PROJECTS[0].id)
    return () => {
      if (rotationTimeoutRef.current) {
        window.clearTimeout(rotationTimeoutRef.current)
      }
    }
  }, [scheduleRotation])

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
    setOpenTabs(prev => (prev.includes(id) ? prev : [...prev, id]))
    scheduleRotation(id)
  }

  const closeTab = (id: string) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t !== id)
      if (selectedFile === id) {
        const fallback = next[next.length - 1] ?? PROJECTS[0].id
        setSelectedFile(fallback)
        scheduleRotation(fallback)
      }
      return next.length > 0 ? next : [PROJECTS[0].id]
    })
  }

  const renderContent = (project: ProjectItem) => (
    <div className="space-y-6">
      <div>
        <div className="font-mono-sm text-tertiary">{project.id}</div>
        <h3 className="font-h3 text-primary mt-2">{project.title}</h3>
        <p className="font-body text-secondary mt-3">{project.description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
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

        <div className="rounded-lg border border-[#232D3F] bg-page/40 p-4 flex flex-col justify-between gap-6 project-meta-panel">
          <div>
            <div className="font-mono-sm text-tertiary mb-3">stack</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded border font-mono-sm"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}33`,
                    backgroundColor: `${project.color}10`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-sm text-tertiary">status</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color, boxShadow: `0 0 12px ${project.color}` }} />
              <span className="font-mono-sm text-secondary">{project.status}</span>
            </div>
          </div>

          <div>
            <div className="font-mono-sm text-tertiary mb-2">gallery_color</div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono-sm"
              style={{
                color: project.color,
                borderColor: `${project.color}33`,
                backgroundColor: `${project.color}10`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              {project.gallery}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader
          title="Projects"
          number="03"
          subtitle="University projects and professional work"
        />

        <ScrollReveal>
          <div
            className="editor-shell bg-surface border border-[#232D3F] rounded-lg overflow-hidden"
            style={{
              '--project-color': currentProject.color,
              '--project-rgb': hexToRgb(currentProject.color),
            } as CSSProperties}
            onClick={() => scheduleRotation(selectedFile)}
          >
            <div className="flex flex-col lg:flex-row min-h-[620px]">
              <div className="editor-sidebar w-full lg:w-[280px] border-b lg:border-b-0 lg:border-r border-[#232D3F] flex-shrink-0">
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
                          <div className="ml-8 pl-3 border-l border-[#232D3F]/70">
                            {folder.files.map(file => (
                              <button
                                key={file.id}
                                onClick={() => selectFile(file.id)}
                                className={`project-file-row grid grid-cols-[14px_minmax(0,1fr)] items-start gap-2 w-full px-2 py-1.5 rounded font-mono-sm transition-colors ${
                                  selectedFile === file.id
                                    ? 'text-primary border-l-2'
                                    : 'text-secondary hover:bg-white/[0.03] border-l-2 border-transparent'
                                }`}
                                style={selectedFile === file.id ? { borderLeftColor: file.color, backgroundColor: `${file.color}10` } : undefined}
                              >
                                <span className="translate-y-[2px]">
                                  <FileIcon type={file.icon} color={file.color} />
                                </span>
                                <span className="text-left leading-5 break-words">{file.name}</span>
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
                <div className="editor-tabs-scroll flex border-b border-[#232D3F] overflow-x-auto">
                  {openTabs.map(tab => {
                    const tabProject = PROJECTS.find(project => project.id === tab) ?? PROJECTS[0]
                    const isActive = selectedFile === tab

                    return (
                      <button
                        key={tab}
                        onClick={() => selectFile(tab)}
                        className={`editor-tab-button flex items-center gap-2 px-4 py-2.5 font-mono-sm whitespace-nowrap border-r border-[#232D3F] transition-colors ${
                          isActive ? 'bg-surface-elevated text-primary border-b-2' : 'text-secondary hover:text-primary'
                        }`}
                        style={isActive ? { borderBottomColor: tabProject.color } : undefined}
                      >
                        <span className="truncate">{tab}.md</span>
                        <X
                          size={12}
                          className="text-tertiary hover:text-primary"
                          onClick={(e: ReactMouseEvent<SVGSVGElement>) => {
                            e.stopPropagation()
                            closeTab(tab)
                          }}
                        />
                      </button>
                    )
                  })}
                </div>

                <div className="editor-scroll flex-1 p-6 lg:p-8 overflow-auto">
                  <div className="animate-in fade-in duration-150">
                    {renderContent(currentProject)}
                  </div>
                </div>

                <div className="project-console border-t border-[#232D3F] bg-page/70 px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TerminalSquare size={16} style={{ color: currentProject.color }} />
                    <span className="font-mono-sm text-primary">project-console</span>
                    <span className="font-mono-sm text-tertiary ml-auto">rotation resets on interaction</span>
                  </div>

                  <div className="space-y-1.5 font-mono-sm text-secondary">
                    <div><span style={{ color: currentProject.color }}>$</span> open /projects/{currentProject.id}/{currentProject.id}.md</div>
                    {currentProject.terminal?.map(line => (
                      <div key={line}><span className="text-tertiary">&gt;</span> {line}</div>
                    ))}
                    <div><span style={{ color: currentProject.color }}>$</span> status --active --accent={currentProject.gallery}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
