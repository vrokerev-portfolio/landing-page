import { useRef, useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

interface SkillNode {
  text: string
  x: number
  y: number
  size: number
  color: string
  proficiency: number
  phase: number
  speed: number
  hover: boolean
  glitch: boolean
  cluster: string
}

const SKILL_CLUSTERS = [
  {
    name: 'Languages',
    color: '#38BDF8',
    skills: [
      { name: 'C', proficiency: 3 },
      { name: 'Python', proficiency: 3 },
      { name: 'JavaScript', proficiency: 3 },
      { name: 'TypeScript', proficiency: 3 },
      { name: 'Java', proficiency: 2 },
      { name: 'SQL', proficiency: 2 },
    ],
    xRange: [0.08, 0.28],
    yRange: [0.2, 0.5],
  },
  {
    name: 'Web',
    color: '#6366F1',
    skills: [
      { name: 'React', proficiency: 3 },
      { name: 'Node.js', proficiency: 3 },
      { name: 'Next.js', proficiency: 2 },
      { name: 'HTML/CSS', proficiency: 3 },
      { name: 'REST APIs', proficiency: 3 },
      { name: 'GraphQL', proficiency: 1 },
    ],
    xRange: [0.35, 0.65],
    yRange: [0.15, 0.55],
  },
  {
    name: 'Security',
    color: '#34D399',
    skills: [
      { name: 'Pen Testing', proficiency: 2 },
      { name: 'OWASP', proficiency: 3 },
      { name: 'eJPT', proficiency: 2 },
      { name: 'Net Security', proficiency: 2 },
      { name: 'Linux', proficiency: 3 },
      { name: 'Kali', proficiency: 2 },
    ],
    xRange: [0.72, 0.92],
    yRange: [0.2, 0.5],
  },
  {
    name: 'Tools',
    color: '#F59E0B',
    skills: [
      { name: 'Git', proficiency: 3 },
      { name: 'Docker', proficiency: 2 },
      { name: 'VS Code', proficiency: 3 },
      { name: 'Scrum', proficiency: 3 },
      { name: 'Agile', proficiency: 3 },
      { name: 'Jira', proficiency: 2 },
    ],
    xRange: [0.2, 0.8],
    yRange: [0.6, 0.88],
  },
]

function createSkillNodes(width: number, height: number): SkillNode[] {
  const nodes: SkillNode[] = []

  SKILL_CLUSTERS.forEach(cluster => {
    const [xMin, xMax] = cluster.xRange
    const [yMin, yMax] = cluster.yRange
    const xRange = xMax - xMin
    const yRange = yMax - yMin
    const count = cluster.skills.length
    const cols = Math.ceil(Math.sqrt(count))

    cluster.skills.forEach((skill, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const baseX = xMin + (xRange / (cols - 1 || 1)) * col
      const baseY = yMin + (yRange / (Math.ceil(count / cols) - 1 || 1)) * row
      const jitter = 0.03

      nodes.push({
        text: skill.name,
        x: (baseX + (Math.random() - 0.5) * jitter) * width,
        y: (baseY + (Math.random() - 0.5) * jitter) * height,
        size: 14 + skill.proficiency * 4,
        color: cluster.color,
        proficiency: skill.proficiency,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        hover: false,
        glitch: false,
        cluster: cluster.name,
      })
    })
  })

  return nodes
}

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    if (!canvasRef.current || !containerRef.current) return
    const cvs: HTMLCanvasElement = canvasRef.current
    const cnt: HTMLDivElement = containerRef.current

    const context = cvs.getContext('2d')
    if (!context) return
    const ctx: CanvasRenderingContext2D = context

    let width = 0
    let height = 0
    let nodes: SkillNode[] = []
    let animationFrameId: number
    let time = 0
    const mouseOffset = { x: 0, y: 0 }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = cnt.getBoundingClientRect()
      width = rect.width
      height = rect.height
      cvs.width = width * dpr
      cvs.height = height * dpr
      cvs.style.width = `${width}px`
      cvs.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      nodes = createSkillNodes(width, height)
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      time += 0.016

      for (const skill of nodes) {
        const nx = skill.x + Math.sin(time * skill.speed + skill.phase) * 15 + mouseOffset.x * (skill.size / 28) * 0.3
        const ny = skill.y + Math.cos(time * skill.speed * 0.7 + skill.phase) * 10 + mouseOffset.y * (skill.size / 28) * 0.3

        const fontSize = skill.size * (skill.hover ? 1.2 : 1)

        // Shadow layers
        ctx.font = `${fontSize}px "JetBrains Mono"`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Cyan shadow
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)'
        ctx.fillText(skill.text, nx + 2, ny + 2)

        // Blue shadow
        ctx.fillStyle = 'rgba(99, 102, 241, 0.25)'
        ctx.fillText(skill.text, nx - 1, ny - 1)

        // Green shadow
        ctx.fillStyle = 'rgba(52, 211, 153, 0.2)'
        ctx.fillText(skill.text, nx + 1, ny - 2)

        // Main text with glitch
        if (skill.glitch) {
          ctx.shadowOffsetX = (Math.random() - 0.5) * 10
          ctx.shadowColor = skill.color
        } else {
          ctx.shadowOffsetX = 0
        }
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = skill.hover ? 20 : 8
        ctx.fillStyle = skill.color
        ctx.fillText(skill.text, nx, ny)
        ctx.shadowBlur = 0

        // Hover detection
        const dx = mousePos.x - nx
        const dy = mousePos.y - ny
        skill.hover = Math.sqrt(dx * dx + dy * dy) < 40
      }

      // Scanlines
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1)
      }

      // Noise grain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const w = Math.random() * 2
        const h = Math.random() * 2
        ctx.fillRect(x, y, w, h)
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseOffset.x = (x - width / 2) * 0.05
      mouseOffset.y = (y - height / 2) * 0.05
      setMousePos({ x, y })

      // Find hovered skill for tooltip
      let hovered: SkillNode | null = null
      for (const skill of nodes) {
        const nx = skill.x + Math.sin(time * skill.speed + skill.phase) * 15 + mouseOffset.x * (skill.size / 28) * 0.3
        const ny = skill.y + Math.cos(time * skill.speed * 0.7 + skill.phase) * 10 + mouseOffset.y * (skill.size / 28) * 0.3
        const dx = x - nx
        const dy = y - ny
        if (Math.sqrt(dx * dx + dy * dy) < 40) {
          hovered = skill
          break
        }
      }
      setHoveredSkill(hovered)
    }

    resize()
    draw()

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
        randomNode.glitch = true
        setTimeout(() => { randomNode.glitch = false }, 50)
      }
    }, 3000 + Math.random() * 2000)

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(cnt)

    cvs.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(glitchInterval)
      cvs.removeEventListener('mousemove', handleMouseMove)
      ro.disconnect()
    }
  }, [isMobile])

  const proficiencyLabel = (level: number) => {
    if (level >= 3) return 'Advanced'
    if (level >= 2) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-4">
        <SectionHeader title="Technical Skills" number="05" centered />
      </div>

      {/* Desktop: Canvas visualization */}
      {!isMobile && (
        <div ref={containerRef} className="relative w-full" style={{ height: 600 }}>
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Proficiency tooltip */}
          {hoveredSkill && (
            <div
              className="absolute pointer-events-none bg-surface-elevated border border-[#232D3F] rounded-lg p-3 z-10"
              style={{
                left: mousePos.x + 15,
                top: mousePos.y - 60,
              }}
            >
              <div className="font-mono text-primary mb-1">{hoveredSkill.text}</div>
              <div className="flex items-center gap-2">
                <div className="w-[100px] h-1 bg-[#232D3F] rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${(hoveredSkill.proficiency / 3) * 100}%`,
                      backgroundColor: hoveredSkill.color,
                    }}
                  />
                </div>
                <span className="font-mono-sm text-tertiary">
                  {proficiencyLabel(hoveredSkill.proficiency)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile: Static grid fallback */}
      {isMobile && (
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_CLUSTERS.map(cluster => (
              <div key={cluster.name} className="bg-surface border border-[#232D3F] rounded-lg p-6">
                <h3 className="font-h3 mb-4" style={{ color: cluster.color }}>{cluster.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cluster.skills.map(skill => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 bg-white/5 border border-[#232D3F] rounded font-mono-sm text-secondary flex items-center gap-2"
                    >
                      {skill.name}
                      <span className="flex gap-0.5">
                        {[1, 2, 3].map(dot => (
                          <span
                            key={dot}
                            className="w-1 h-1 rounded-full"
                            style={{
                              backgroundColor: dot <= skill.proficiency ? cluster.color : '#232D3F',
                            }}
                          />
                        ))}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
