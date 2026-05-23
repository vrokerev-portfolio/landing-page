import { useRef, useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

interface SkillNode {
  text: string
  x: number
  y: number
  baseX: number
  baseY: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  radius: number
  color: string
  proficiency: number
  phase: number
  speed: number
  hover: boolean
  glitch: boolean
  cluster: string
  type: 'skill' | 'cluster' | 'core'
}

interface SkillEdge {
  from: number
  to: number
  color: string
  alpha: number
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

function createSkillNodes(width: number, height: number) {
  const nodes: SkillNode[] = []
  const edges: SkillEdge[] = []

  const coreNode: SkillNode = {
    text: 'Core',
    x: width * 0.5,
    y: height * 0.45,
    baseX: width * 0.5,
    baseY: height * 0.45,
    originX: width * 0.5,
    originY: height * 0.45,
    vx: 0,
    vy: 0,
    size: 18,
    radius: 36,
    color: '#8B95A5',
    proficiency: 0,
    phase: Math.random() * Math.PI * 2,
    speed: 0.2,
    hover: false,
    glitch: false,
    cluster: 'Core',
    type: 'core',
  }

  nodes.push(coreNode)

  SKILL_CLUSTERS.forEach(cluster => {
    const [xMin, xMax] = cluster.xRange
    const [yMin, yMax] = cluster.yRange
    const xRange = xMax - xMin
    const yRange = yMax - yMin
    const count = cluster.skills.length
    const cols = Math.ceil(Math.sqrt(count))

    const clusterX = (xMin + xMax) / 2
    const clusterY = (yMin + yMax) / 2
    const clusterNode: SkillNode = {
      text: cluster.name,
      x: clusterX * width,
      y: clusterY * height,
      baseX: clusterX * width,
      baseY: clusterY * height,
      originX: clusterX * width,
      originY: clusterY * height,
      vx: 0,
      vy: 0,
      size: 16,
      radius: 26,
      color: cluster.color,
      proficiency: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3,
      hover: false,
      glitch: false,
      cluster: cluster.name,
      type: 'cluster',
    }

    const clusterIndex = nodes.length
    nodes.push(clusterNode)
    edges.push({
      from: 0,
      to: clusterIndex,
      color: cluster.color,
      alpha: 0.35,
    })

    cluster.skills.forEach((skill, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const baseX = xMin + (xRange / (cols - 1 || 1)) * col
      const baseY = yMin + (yRange / (Math.ceil(count / cols) - 1 || 1)) * row
      const jitter = 0.03
      const jitterX = (Math.random() - 0.5) * jitter
      const jitterY = (Math.random() - 0.5) * jitter

      const skillNode: SkillNode = {
        text: skill.name,
        x: (baseX + jitterX) * width,
        y: (baseY + jitterY) * height,
        baseX: (baseX + jitterX) * width,
        baseY: (baseY + jitterY) * height,
        originX: (baseX + jitterX) * width,
        originY: (baseY + jitterY) * height,
        vx: 0,
        vy: 0,
        size: 13 + skill.proficiency * 4,
        radius: 14 + skill.proficiency * 4,
        color: cluster.color,
        proficiency: skill.proficiency,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        hover: false,
        glitch: false,
        cluster: cluster.name,
        type: 'skill',
      }

      const skillIndex = nodes.length
      nodes.push(skillNode)
      edges.push({
        from: clusterIndex,
        to: skillIndex,
        color: cluster.color,
        alpha: 0.25,
      })
    })
  })

  // Sparse cross-cluster links to keep the field cohesive
  const clusterNodes = nodes.filter(node => node.type === 'cluster')
  for (let i = 0; i < clusterNodes.length; i++) {
    const aIndex = nodes.indexOf(clusterNodes[i])
    const bIndex = nodes.indexOf(clusterNodes[(i + 1) % clusterNodes.length])
    edges.push({
      from: aIndex,
      to: bIndex,
      color: '#4A5568',
      alpha: 0.18,
    })
  }

  return { nodes, edges }
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
    let edges: SkillEdge[] = []
    let animationFrameId: number
    let time = 0
    const mouseOffset = { x: 0, y: 0 }
    let draggingIndex: number | null = null
    const dragOffset = { x: 0, y: 0 }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = cnt.getBoundingClientRect()
      width = rect.width
      height = rect.height
      cvs.width = width * dpr
      cvs.height = height * dpr
      cvs.style.width = `${width}px`
      cvs.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const layout = createSkillNodes(width, height)
      nodes = layout.nodes
      edges = layout.edges
    }

    function getNodeAt(x: number, y: number) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i]
        const dx = x - node.x
        const dy = y - node.y
        const hitRadius = node.radius + 10
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) return i
      }
      return null
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      time += 0.016

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (draggingIndex === i) {
          node.vx = 0
          node.vy = 0
          continue
        }
        const spring = node.type === 'core' ? 0.017 : 0.021
        const driftX = Math.sin(time * 0.55 + node.phase) * (node.type === 'core' ? 6 : 10)
        const driftY = Math.cos(time * 0.42 + node.phase) * (node.type === 'core' ? 4 : 8)
        const targetX = node.baseX + driftX
        const targetY = node.baseY + driftY
        const dx = targetX - node.x
        const dy = targetY - node.y
        node.vx += dx * spring
        node.vy += dy * spring
        node.vx *= 0.86
        node.vy *= 0.86
        node.x += node.vx
        node.y += node.vy
      }

      const resolved = nodes.map(node => {
        const nx = node.x + mouseOffset.x * (node.size / 28) * 0.2
        const ny = node.y + mouseOffset.y * (node.size / 28) * 0.2
        return { node, nx, ny }
      })

      for (const edge of edges) {
        const from = resolved[edge.from]
        const to = resolved[edge.to]
        if (!from || !to) continue
        const gradient = ctx.createLinearGradient(from.nx, from.ny, to.nx, to.ny)
        gradient.addColorStop(0, `rgba(99, 102, 241, ${edge.alpha})`)
        gradient.addColorStop(1, `rgba(56, 189, 248, ${edge.alpha * 0.7})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(from.nx, from.ny)
        ctx.lineTo(to.nx, to.ny)
        ctx.stroke()
      }

      for (const item of resolved) {
        const skill = item.node
        const nx = item.nx
        const ny = item.ny
        const baseRadius = skill.radius
        const glow = skill.hover ? 18 : 10
        const ringOuter = baseRadius + (skill.hover ? 5 : 2)
        const ringInner = baseRadius - 6

        ctx.save()
        ctx.shadowColor = skill.color
        ctx.shadowBlur = glow

        const gradient = ctx.createRadialGradient(nx - 4, ny - 6, 2, nx, ny, ringOuter)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)')
        gradient.addColorStop(0.4, 'rgba(17, 24, 39, 0.6)')
        gradient.addColorStop(1, 'rgba(11, 15, 23, 0.9)')
        ctx.beginPath()
        ctx.arc(nx, ny, ringOuter - 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, ringOuter, 0, Math.PI * 2)
        ctx.strokeStyle = skill.color
        ctx.lineWidth = skill.type === 'cluster' ? 2.5 : 2
        if (skill.type === 'cluster') ctx.setLineDash([6, 4])
        ctx.stroke()
        ctx.setLineDash([])

        ctx.beginPath()
        ctx.arc(nx, ny, ringInner, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(35, 45, 63, 0.9)'
        ctx.lineWidth = 1.4
        ctx.stroke()

        // Proficiency arcs
        const ringRadius = baseRadius + 6
        if (skill.type === 'skill') {
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            ctx.strokeStyle = i < skill.proficiency ? skill.color : 'rgba(35, 45, 63, 0.7)'
            ctx.lineWidth = 1.5
            const start = (-Math.PI / 2) + (i * (Math.PI * 2)) / 3
            const end = start + (Math.PI * 2) / 3 - 0.18
            ctx.arc(nx, ny, ringRadius, start, end)
            ctx.stroke()
          }
        }

        const tickAngle = time * 0.8 + skill.phase
        const tickX = nx + Math.cos(tickAngle) * (ringOuter + 4)
        const tickY = ny + Math.sin(tickAngle) * (ringOuter + 4)
        ctx.beginPath()
        ctx.arc(tickX, tickY, 2, 0, Math.PI * 2)
        ctx.fillStyle = skill.color
        ctx.fill()
        ctx.restore()

        // Text label (always visible)
        const fontSize = skill.size * (skill.hover ? 1.05 : 1)
        ctx.font = `${fontSize}px "JetBrains Mono"`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
        ctx.fillText(skill.text, nx + 1, ny + 1)

        if (skill.glitch) {
          ctx.shadowOffsetX = (Math.random() - 0.5) * 10
          ctx.shadowColor = skill.color
        } else {
          ctx.shadowOffsetX = 0
        }
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = skill.hover ? 16 : 8
        ctx.fillStyle = skill.color
        ctx.fillText(skill.text, nx, ny)
        ctx.shadowBlur = 0

        // Hover detection
        const dx = mousePos.x - nx
        const dy = mousePos.y - ny
        const hitRadius = baseRadius + 10
        skill.hover = Math.sqrt(dx * dx + dy * dy) < hitRadius
      }

      // Scanlines
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1)
      }

      // Noise grain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      for (let i = 0; i < 3500; i++) {
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

      if (draggingIndex !== null) {
        const node = nodes[draggingIndex]
        node.x = x + dragOffset.x
        node.y = y + dragOffset.y
        node.baseX = node.originX + (node.x - node.originX) * 0.2
        node.baseY = node.originY + (node.y - node.originY) * 0.2
      }

      // Find hovered skill for tooltip
      let hovered: SkillNode | null = null
      for (const skill of nodes) {
        const nx = skill.x + mouseOffset.x * (skill.size / 28) * 0.2
        const ny = skill.y + mouseOffset.y * (skill.size / 28) * 0.2
        const dx = x - nx
        const dy = y - ny
        const hitRadius = skill.radius + 10
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) {
          hovered = skill.type === 'skill' ? skill : null
          break
        }
      }
      setHoveredSkill(hovered)
    }

    function handleMouseDown(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const index = getNodeAt(x, y)
      if (index === null) return
      draggingIndex = index
      dragOffset.x = nodes[index].x - x
      dragOffset.y = nodes[index].y - y
    }

    function handleMouseUp() {
      draggingIndex = null
    }

    function handleMouseLeave() {
      draggingIndex = null
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
    cvs.addEventListener('mousedown', handleMouseDown)
    cvs.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(glitchInterval)
      cvs.removeEventListener('mousemove', handleMouseMove)
      cvs.removeEventListener('mousedown', handleMouseDown)
      cvs.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseup', handleMouseUp)
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
