import { useState } from 'react'
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  ChevronRight,
  ChevronDown,
  X,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

interface FileItem {
  id: string
  name: string
  ext: string
  icon: 'code' | 'text' | 'json'
  color: string
}

interface FolderItem {
  id: string
  name: string
  files: FileItem[]
}

const DIRECTORY: FolderItem[] = [
  {
    id: 'roles',
    name: 'roles',
    files: [
      { id: 'software-engineer.ts', name: 'software-engineer.ts', ext: '.ts', icon: 'code', color: '#38BDF8' },
      { id: 'teaching-assistant.md', name: 'teaching-assistant.md', ext: '.md', icon: 'text', color: '#F0F4F8' },
    ],
  },
  {
    id: 'certs',
    name: 'certs',
    files: [
      { id: 'ejpt.pdf', name: 'ejpt.pdf', ext: '.pdf', icon: 'text', color: '#EF4444' },
      { id: 'scrum.json', name: 'scrum.json', ext: '.json', icon: 'json', color: '#F59E0B' },
    ],
  },
]

const EXTRA_FILES: FileItem[] = [
  { id: 'README.md', name: 'README.md', ext: '.md', icon: 'text', color: '#F0F4F8' },
]

const FILE_CONTENTS: Record<string, { language: string; content: React.ReactNode }> = {
  'software-engineer.ts': {
    language: 'typescript',
    content: (
      <div className="font-mono text-sm leading-6">
        <div className="text-tertiary">{'//'} Cuevatech — Software Engineer</div>
        <div className="text-tertiary">{'//'} Since August 2025</div>
        <div className="h-4" />
        <div><span className="text-cyan">export</span> <span className="text-cyan">interface</span> <span className="text-amber">Role</span> {'{'}</div>
        <div className="pl-4"><span className="text-blue">company</span>: <span className="text-green">string</span>;</div>
        <div className="pl-4"><span className="text-blue">position</span>: <span className="text-green">string</span>;</div>
        <div className="pl-4"><span className="text-blue">type</span>: <span className="text-green">&quot;full-time&quot;</span> | <span className="text-green">&quot;part-time&quot;</span>;</div>
        <div className="pl-4"><span className="text-blue">startDate</span>: <span className="text-green">string</span>;</div>
        <div className="pl-4"><span className="text-blue">current</span>: <span className="text-green">boolean</span>;</div>
        <div>{'}'}</div>
        <div className="h-4" />
        <div><span className="text-cyan">const</span> <span className="text-blue">currentRole</span>: <span className="text-amber">Role</span> = {'{'}</div>
        <div className="pl-4"><span className="text-blue">company</span>: <span className="text-green">&quot;Cuevatech&quot;</span>,</div>
        <div className="pl-4"><span className="text-blue">position</span>: <span className="text-green">&quot;Software Engineer&quot;</span>,</div>
        <div className="pl-4"><span className="text-blue">type</span>: <span className="text-green">&quot;full-time&quot;</span>,</div>
        <div className="pl-4"><span className="text-blue">startDate</span>: <span className="text-green">&quot;2025-08&quot;</span>,</div>
        <div className="pl-4"><span className="text-blue">current</span>: <span className="text-green">true</span></div>
        <div>{'};'}</div>
        <div className="h-4" />
        <div className="text-tertiary">{'//'} Growing through real professional</div>
        <div className="text-tertiary">{'//'} experience in software development.</div>
      </div>
    ),
  },
  'teaching-assistant.md': {
    language: 'markdown',
    content: (
      <div className="font-body">
        <h3 className="font-h3 text-primary mb-4">Cybersecurity Teaching Assistant</h3>
        <p className="text-secondary mb-4">
          Taught cybersecurity classes at UPC. Responsible for guiding students through practical security exercises, vulnerability assessment labs, and defensive techniques. Combined technical expertise with communication skills to make complex security concepts accessible.
        </p>
        <div className="flex gap-2 mt-6">
          <span className="font-mono-sm text-tertiary">{'#teaching'}</span>
          <span className="font-mono-sm text-tertiary">{'#cybersecurity'}</span>
          <span className="font-mono-sm text-tertiary">{'#UPC'}</span>
        </div>
      </div>
    ),
  },
  'README.md': {
    language: 'markdown',
    content: (
      <div className="font-body">
        <h3 className="font-h3 text-primary mb-4">Professional Overview</h3>
        <p className="text-secondary mb-4">
          Professional experience combining software engineering at Cuevatech with academic teaching contributions at UPC. Building expertise across software development, cybersecurity, and agile methodologies.
        </p>
        <div className="mt-6 p-4 bg-page rounded border border-[#232D3F]">
          <div className="font-mono-sm text-tertiary mb-2">{'>'} Quick Stats</div>
          <div className="font-mono text-primary">• Current Role: Software Engineer @ Cuevatech</div>
          <div className="font-mono text-primary">• Teaching: Cybersecurity @ UPC</div>
          <div className="font-mono text-primary">• Since: August 2025</div>
        </div>
      </div>
    ),
  },
  'ejpt.pdf': {
    language: 'pdf',
    content: (
      <div className="font-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center">
            <FileText size={24} className="text-red" />
          </div>
          <div>
            <h3 className="font-h3 text-primary">eJPT Certificate</h3>
            <p className="font-mono-sm text-tertiary">INE Security (eLearnSecurity)</p>
          </div>
        </div>
        <div className="p-4 bg-page rounded border border-[#232D3F]">
          <div className="font-mono-sm text-tertiary mb-1">Credential Status</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse-glow" />
            <span className="font-mono text-green">Active</span>
          </div>
        </div>
      </div>
    ),
  },
  'scrum.json': {
    language: 'json',
    content: (
      <div className="font-mono text-sm leading-6">
        <div>{'{'}</div>
        <div className="pl-4"><span className="text-blue">&quot;certifications&quot;</span>: [{'{'}</div>
        <div className="pl-8"><span className="text-blue">&quot;name&quot;</span>: <span className="text-green">&quot;SCRUM Fundamentals&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;issuer&quot;</span>: <span className="text-green">&quot;SCRUM Study&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;status&quot;</span>: <span className="text-green">&quot;verified&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;year&quot;</span>: <span className="text-amber">2025</span></div>
        <div className="pl-4">{'}, {'}</div>
        <div className="pl-8"><span className="text-blue">&quot;name&quot;</span>: <span className="text-green">&quot;SCRUM Developer&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;issuer&quot;</span>: <span className="text-green">&quot;SCRUM Study&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;status&quot;</span>: <span className="text-green">&quot;verified&quot;</span>,</div>
        <div className="pl-8"><span className="text-blue">&quot;year&quot;</span>: <span className="text-amber">2025</span></div>
        <div className="pl-4">{'}]'}</div>
        <div>{'}'}</div>
      </div>
    ),
  },
}

function FileIcon({ type, color, size = 14 }: { type: string; color: string; size?: number }) {
  if (type === 'code') return <FileCode size={size} style={{ color }} />
  if (type === 'json') return <FileJson size={size} style={{ color }} />
  return <FileText size={size} style={{ color }} />
}

export default function ExperienceSection() {
  const [selectedFile, setSelectedFile] = useState('software-engineer.ts')
  const [openTabs, setOpenTabs] = useState(['software-engineer.ts'])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['roles', 'certs']))

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
    <section id="experience" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Professional Experience" number="02" />

        <ScrollReveal>
          <div className="bg-surface border border-[#232D3F] rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Sidebar */}
              <div className="w-full lg:w-[280px] border-b lg:border-b-0 lg:border-r border-[#232D3F] flex-shrink-0">
                <div className="px-5 py-4 border-b border-[#232D3F]">
                  <span className="font-mono-sm text-tertiary">WORKSPACE</span>
                </div>
                <div className="p-3">
                  {/* Root folder */}
                  <div className="mb-1">
                    <button
                      onClick={() => toggleFolder('experience')}
                      className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded text-primary hover:bg-white/[0.03] transition-colors"
                    >
                      <FolderOpen size={14} className="text-cyan" />
                      <span className="font-mono-sm">experience/</span>
                    </button>

                    {/* Subfolders */}
                    {DIRECTORY.map(folder => (
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

                        {/* Files */}
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

                    {/* Extra files at root */}
                    {EXTRA_FILES.map(file => (
                      <div key={file.id} className="ml-4">
                        <button
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Tabs */}
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
                      {tab}
                      <X
                        size={12}
                        className="text-tertiary hover:text-primary"
                        onClick={(e) => { e.stopPropagation(); closeTab(tab) }}
                      />
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8 overflow-auto">
                  {currentContent && (
                    <div className="animate-in fade-in duration-150">
                      {currentContent.content}
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
