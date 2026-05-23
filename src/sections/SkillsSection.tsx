import { useRef, useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

interface SkillNode {
  id: string
  text: string
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  radius: number
  color: string
  proficiency: number
  phase: number
  hover: boolean
  cluster: string
  type: 'skill' | 'cluster' | 'core'
}

interface SkillEdge {
  from: number
  to: number
  color: string
  alpha: number
  phase: number
  speed: number
}

interface SkillCluster {
  name: string
  color: string
  center: [number, number]
  skills: Array<{ name: string; proficiency: number }>
}

interface StaticStar {
  x: number
  y: number
  radius: number
  alpha: number
  phase: number
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    name: 'Languages',
    color: '#38BDF8',
    center: [0.16, 0.28],
    skills: [
      { name: 'TypeScript', proficiency: 3 },
      { name: 'JavaScript', proficiency: 3 },
      { name: 'Python', proficiency: 3 },
      { name: 'SQL', proficiency: 2 },
      { name: 'Java', proficiency: 2 },
      { name: 'C', proficiency: 2 },
    ],
  },
  {
    name: 'Frontend',
    color: '#6366F1',
    center: [0.5, 0.17],
    skills: [
      { name: 'React', proficiency: 3 },
      { name: 'Next.js', proficiency: 3 },
      { name: 'Tailwind', proficiency: 3 },
      { name: 'Sanity', proficiency: 2 },
      { name: 'Vite', proficiency: 2 },
      { name: 'PWA', proficiency: 2 },
    ],
  },
  {
    name: 'Backend / APIs',
    color: '#22D3EE',
    center: [0.84, 0.5],
    skills: [
      { name: 'Node.js', proficiency: 3 },
      { name: 'Express', proficiency: 3 },
      { name: 'REST APIs', proficiency: 3 },
      { name: 'Postman', proficiency: 3 },
      { name: 'JWT', proficiency: 2 },
      { name: 'MongoDB', proficiency: 2 },
      { name: 'PostgreSQL', proficiency: 2 },
      { name: 'API Testing', proficiency: 2 },
    ],
  },
  {
    name: 'Security',
    color: '#34D399',
    center: [0.84, 0.18],
    skills: [
      { name: 'eJPT', proficiency: 2 },
      { name: 'OWASP', proficiency: 3 },
      { name: 'Linux', proficiency: 3 },
      { name: 'Kali', proficiency: 2 },
      { name: 'Pentesting', proficiency: 2 },
      { name: 'Burp Suite', proficiency: 2 },
      { name: 'Nmap', proficiency: 2 },
    ],
  },
  {
    name: 'AI / Automation',
    color: '#EC4899',
    center: [0.18, 0.76],
    skills: [
      { name: 'n8n', proficiency: 2 },
      { name: 'AI Agents', proficiency: 2 },
      { name: 'Prompting', proficiency: 3 },
      { name: 'LLM APIs', proficiency: 2 },
      { name: 'Workflows', proficiency: 2 },
      { name: 'OpenAI API', proficiency: 2 },
    ],
  },
  {
    name: 'Delivery / Tools',
    color: '#F59E0B',
    center: [0.64, 0.8],
    skills: [
      { name: 'Git', proficiency: 3 },
      { name: 'Vercel', proficiency: 3 },
      { name: 'Docker', proficiency: 2 },
      { name: 'Scrum', proficiency: 3 },
      { name: 'Excel', proficiency: 3 },
      { name: 'Domain Driven Design', proficiency: 2 },
      { name: 'Lighthouse', proficiency: 2 },
      { name: 'GitHub', proficiency: 3 },
      { name: 'VS Code', proficiency: 3 },
    ],
  },
]

function createSkillNodes(width: number, height: number) {
  const nodes: SkillNode[] = []
  const edges: SkillEdge[] = []
  const minDimension = Math.min(width, height)

  const coreNode: SkillNode = {
    id: 'core',
    text: 'Victor Stack',
    x: width * 0.5,
    y: height * 0.5,
    baseX: width * 0.5,
    baseY: height * 0.5,
    vx: 0,
    vy: 0,
    size: 13.5,
    radius: 28,
    color: '#F0F4F8',
    proficiency: 0,
    phase: 0,
    hover: false,
    cluster: 'Core',
    type: 'core',
  }

  nodes.push(coreNode)

  SKILL_CLUSTERS.forEach((cluster, clusterOrder) => {
    const clusterX = cluster.center[0] * width
    const clusterY = cluster.center[1] * height
    const clusterNode: SkillNode = {
      id: `cluster-${cluster.name}`,
      text: cluster.name,
      x: clusterX,
      y: clusterY,
      baseX: clusterX,
      baseY: clusterY,
      vx: 0,
      vy: 0,
      size: 11.8,
      radius: 19,
      color: cluster.color,
      proficiency: 0,
      phase: clusterOrder * 1.7,
      hover: false,
      cluster: cluster.name,
      type: 'cluster',
    }

    const clusterIndex = nodes.length
    nodes.push(clusterNode)
    edges.push({
      from: 0,
      to: clusterIndex,
      color: cluster.color,
      alpha: 0.32,
      phase: Math.random(),
      speed: 0.24 + Math.random() * 0.14,
    })

    const skillCount = cluster.skills.length
    const ringRadius = Math.max(56, Math.min(86, minDimension * 0.12))
    cluster.skills.forEach((skill, i) => {
      const angle = (Math.PI * 2 * i) / skillCount - Math.PI / 2 + (clusterOrder % 2) * 0.18
      const radiusOffset = (i % 2 === 0 ? -10 : 12)
      const baseX = clusterX + Math.cos(angle) * (ringRadius + radiusOffset)
      const baseY = clusterY + Math.sin(angle) * (ringRadius * 0.76 + radiusOffset * 0.4)

      const skillNode: SkillNode = {
        id: `skill-${cluster.name}-${skill.name}`,
        text: skill.name,
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        size: 8.3 + skill.proficiency * 1.45,
        radius: 7.8 + skill.proficiency * 1.7,
        color: cluster.color,
        proficiency: skill.proficiency,
        phase: Math.random() * Math.PI * 2,
        hover: false,
        cluster: cluster.name,
        type: 'skill',
      }

      const skillIndex = nodes.length
      nodes.push(skillNode)
      edges.push({
        from: clusterIndex,
        to: skillIndex,
        color: cluster.color,
        alpha: 0.2,
        phase: Math.random(),
        speed: 0.32 + Math.random() * 0.16,
      })
    })
  })

  return { nodes, edges }
}

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mousePosRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const activeNodeIdRef = useRef<string | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    const cvs = canvasRef.current
    const cnt = containerRef.current
    const context = cvs.getContext('2d')
    if (!context) return
    const ctx = context

    let width = 0
    let height = 0
    let nodes: SkillNode[] = []
    let edges: SkillEdge[] = []
    let staticStars: StaticStar[] = []
    let animationFrameId = 0
    let time = 0
    let lastFrame = 0
    let frame = 0
    let isVisible = true
    const targetFrameMs = isMobile ? 1000 / 12 : 1000 / 22
    const mouseOffset = { x: 0, y: 0 }
    let draggingIndex: number | null = null
    const dragOffset = { x: 0, y: 0 }
    let lastHoveredId: string | null = null
    let tooltipFrame = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.35)
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
      staticStars = Array.from({ length: isMobile ? 28 : 70 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.7 + Math.random() * 1.5,
        alpha: 0.12 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function getNodeAt(x: number, y: number) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i]
        const dx = x - node.x
        const dy = y - node.y
        const hitRadius = node.radius + 12
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) return i
      }
      return null
    }

    function applyRepulsion() {
      const core = nodes[0]
      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i]
        const dx = node.x - core.x
        const dy = node.y - core.y
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
        const minDistance = node.type === 'cluster' ? 92 : 72
        if (distance < minDistance) {
          const push = (minDistance - distance) * (node.type === 'cluster' ? 0.038 : 0.026)
          node.vx += (dx / distance) * push
          node.vy += (dy / distance) * push
        }
      }

      for (let a = 0; a < nodes.length; a++) {
        const first = nodes[a]
        if (first.type === 'skill') continue

        for (let b = a + 1; b < nodes.length; b++) {
          const second = nodes[b]
          const dx = second.x - first.x
          const dy = second.y - first.y
          const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
          const involvesCore = first.type === 'core' || second.type === 'core'
          const involvesCluster = first.type === 'cluster' || second.type === 'cluster'
          const sameCluster = first.cluster === second.cluster
          const minDistance = first.radius + second.radius + (involvesCore ? 42 : involvesCluster ? 24 : sameCluster ? 8 : 18)
          if (distance >= minDistance) continue

          const strength = (minDistance - distance) * (involvesCore ? 0.03 : 0.018)
          const nx = dx / distance
          const ny = dy / distance

          if (first.type !== 'core' && draggingIndex !== a) {
            first.vx -= nx * strength
            first.vy -= ny * strength
          }
          if (second.type !== 'core' && draggingIndex !== b) {
            second.vx += nx * strength
            second.vy += ny * strength
          }
        }
      }
    }

    function drawNode(node: SkillNode, nx: number, ny: number) {
      const baseRadius = node.radius
      const isCore = node.type === 'core'
      const isCluster = node.type === 'cluster'
      const ringOuter = baseRadius + (node.hover ? 4 : isCore ? 8 : isCluster ? 5 : 1.5)
      const glow = isMobile ? 2 : node.hover ? 15 : isCore ? 18 : isCluster ? 11 : 6

      ctx.save()
      ctx.shadowColor = node.color
      ctx.shadowBlur = glow

      const gradient = ctx.createRadialGradient(nx - 3, ny - 5, 2, nx, ny, ringOuter)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.12)')
      gradient.addColorStop(0.35, 'rgba(17, 24, 39, 0.66)')
      gradient.addColorStop(1, 'rgba(11, 15, 23, 0.94)')
      ctx.beginPath()
      ctx.arc(nx, ny, ringOuter - 1.5, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(nx, ny, ringOuter, 0, Math.PI * 2)
      ctx.strokeStyle = node.color
      ctx.lineWidth = isCore ? 2.6 : isCluster ? 2.2 : 1.35
      if (isCluster) ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      if (isCore || isCluster) {
        const haloRadius = ringOuter + (isCore ? 14 : 8)
        ctx.beginPath()
        ctx.arc(nx, ny, haloRadius, 0, Math.PI * 2)
        ctx.strokeStyle = hexToRgba(node.color, isCore ? 0.26 : 0.18)
        ctx.lineWidth = 1
        ctx.stroke()

        const rays = isCore ? 8 : 6
        const innerRay = ringOuter + 4
        const outerRay = ringOuter + (isCore ? 17 : 11)
        ctx.beginPath()
        for (let ray = 0; ray < rays; ray++) {
          const angle = time * (isCore ? 0.22 : 0.16) + node.phase + (Math.PI * 2 * ray) / rays
          ctx.moveTo(nx + Math.cos(angle) * innerRay, ny + Math.sin(angle) * innerRay)
          ctx.lineTo(nx + Math.cos(angle) * outerRay, ny + Math.sin(angle) * outerRay)
        }
        ctx.strokeStyle = hexToRgba(node.color, isCore ? 0.42 : 0.28)
        ctx.lineWidth = isCore ? 1.4 : 1
        ctx.stroke()
      }

      if (node.type === 'skill') {
        const ringRadius = baseRadius + 5
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.strokeStyle = i < node.proficiency ? node.color : 'rgba(35, 45, 63, 0.62)'
          ctx.lineWidth = 1.25
          const start = (-Math.PI / 2) + (i * (Math.PI * 2)) / 3
          const end = start + (Math.PI * 2) / 3 - 0.2
          ctx.arc(nx, ny, ringRadius, start, end)
          ctx.stroke()
        }
      }

      const tickAngle = time * (isCore ? 0.58 : isCluster ? 0.48 : 0.72) + node.phase
      ctx.beginPath()
      ctx.arc(nx + Math.cos(tickAngle) * (ringOuter + 4), ny + Math.sin(tickAngle) * (ringOuter + 4), isCore ? 2.2 : 1.6, 0, Math.PI * 2)
      ctx.fillStyle = node.color
      ctx.fill()
      ctx.restore()

      const showLabel = !isMobile || isCore || isCluster || activeNodeIdRef.current === node.id
      if (showLabel) {
        const fontSize = node.size * (node.hover ? 1.04 : 1)
        ctx.save()
        ctx.font = `${fontSize}px "JetBrains Mono"`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        ctx.fillText(node.text, nx + 1, ny + 1)
        ctx.shadowBlur = isMobile ? 0 : node.hover ? 14 : isCore ? 10 : 6
        ctx.shadowColor = node.color
        ctx.fillStyle = isCore ? '#F0F4F8' : node.color
        ctx.fillText(node.text, nx, ny)
        ctx.restore()
      }
    }

    function draw(now = 0) {
      if (!isVisible) {
        animationFrameId = 0
        return
      }
      if (now - lastFrame < targetFrameMs) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }
      lastFrame = now
      frame += 1
      time += 0.016
      ctx.clearRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'source-over'
      for (const star of staticStars) {
        const alpha = star.alpha + Math.sin(time * 0.9 + star.phase) * 0.06
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.04, alpha)})`
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (draggingIndex === i) {
          node.vx = 0
          node.vy = 0
          continue
        }

        const spring = node.type === 'core' ? 0.018 : node.type === 'cluster' ? 0.042 : 0.052
        const drift = node.type === 'core' ? 2.5 : node.type === 'cluster' ? 5 : 6
        const targetX = node.baseX + Math.sin(time * 0.26 + node.phase) * drift
        const targetY = node.baseY + Math.cos(time * 0.22 + node.phase) * drift
        node.vx += (targetX - node.x) * spring
        node.vy += (targetY - node.y) * spring
        node.vx *= 0.82
        node.vy *= 0.82
        node.x += node.vx
        node.y += node.vy
      }

      if (frame % (isMobile ? 6 : 4) === 0) {
        applyRepulsion()
      }

      const resolved = nodes.map(node => ({
        node,
        nx: node.x + mouseOffset.x * (node.size / 28) * 0.12,
        ny: node.y + mouseOffset.y * (node.size / 28) * 0.12,
      }))

      ctx.globalCompositeOperation = 'lighter'
      for (const edge of edges) {
        const from = resolved[edge.from]
        const to = resolved[edge.to]
        if (!from || !to) continue
        ctx.save()
        ctx.strokeStyle = hexToRgba(edge.color, edge.alpha)
        ctx.shadowColor = hexToRgba(edge.color, edge.alpha * 0.8)
        ctx.shadowBlur = isMobile ? 0 : 4
        ctx.lineWidth = edge.from === 0 ? 1.2 : 0.9
        ctx.beginPath()
        ctx.moveTo(from.nx, from.ny)
        ctx.lineTo(to.nx, to.ny)
        ctx.stroke()
        ctx.restore()

        const packetT = (time * edge.speed + edge.phase) % 1
        ctx.beginPath()
        ctx.arc(from.nx + (to.nx - from.nx) * packetT, from.ny + (to.ny - from.ny) * packetT, isMobile ? 1.2 : 1.7, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(edge.color, 0.72)
        ctx.fill()
      }

      for (const type of ['skill', 'cluster', 'core'] as const) {
        for (const item of resolved) {
          if (item.node.type !== type) continue
          drawNode(item.node, item.nx, item.ny)
          const dx = mousePosRef.current.x - item.nx
          const dy = mousePosRef.current.y - item.ny
          item.node.hover = Math.sqrt(dx * dx + dy * dy) < item.node.radius + 12
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseOffset.x = (x - width / 2) * 0.045
      mouseOffset.y = (y - height / 2) * 0.045
      mousePosRef.current = { x, y }

      if (draggingIndex !== null) {
        const node = nodes[draggingIndex]
        node.x = x + dragOffset.x
        node.y = y + dragOffset.y
      }

      if (!isMobile) {
        let hovered: SkillNode | null = null
        for (const skill of nodes) {
          const dx = x - skill.x
          const dy = y - skill.y
          if (Math.sqrt(dx * dx + dy * dy) < skill.radius + 12) {
            hovered = skill.type === 'skill' ? skill : null
            break
          }
        }
        const nextHoveredId = hovered?.id ?? null
        if (nextHoveredId !== lastHoveredId) {
          lastHoveredId = nextHoveredId
          setHoveredSkill(hovered)
        }
        if (hovered && !tooltipFrame) {
          tooltipFrame = requestAnimationFrame(() => {
            setMousePos({ x, y })
            tooltipFrame = 0
          })
        }
      } else {
        if (lastHoveredId !== null) {
          lastHoveredId = null
          setHoveredSkill(null)
        }
      }
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

    function handlePointerDown(e: PointerEvent) {
      if (e.pointerType !== 'touch') return
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const index = getNodeAt(x, y)
      if (index === null) return
      const node = nodes[index]
      activeNodeIdRef.current = activeNodeIdRef.current === node.id ? null : node.id
    }

    function handleTap(e: MouseEvent) {
      if (!isMobile) return
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const index = getNodeAt(x, y)
      if (index === null) return
      const node = nodes[index]
      activeNodeIdRef.current = activeNodeIdRef.current === node.id ? null : node.id
    }

    function handleMouseUp() {
      draggingIndex = null
    }

    function handleMouseLeave() {
      draggingIndex = null
      setHoveredSkill(null)
    }

    resize()
    animationFrameId = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => resize())
    ro.observe(cnt)

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(draw)
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = 0
      }
    }, { threshold: 0.02 })
    io.observe(cnt)

    cvs.addEventListener('mousemove', handleMouseMove, { passive: true })
    cvs.addEventListener('mousedown', handleMouseDown)
    cvs.addEventListener('mouseleave', handleMouseLeave)
    cvs.addEventListener('pointerdown', handlePointerDown)
    cvs.addEventListener('click', handleTap)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (tooltipFrame) cancelAnimationFrame(tooltipFrame)
      cvs.removeEventListener('mousemove', handleMouseMove)
      cvs.removeEventListener('mousedown', handleMouseDown)
      cvs.removeEventListener('mouseleave', handleMouseLeave)
      cvs.removeEventListener('pointerdown', handlePointerDown)
      cvs.removeEventListener('click', handleTap)
      window.removeEventListener('mouseup', handleMouseUp)
      ro.disconnect()
      io.disconnect()
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
        <SectionHeader
          title="Technical Skills"
          number="04"
          centered
          subtitle="Frontend, cybersecurity, automation, and the tools I use to ship polished work."
        />

        <div className="skills-legend-grid mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SKILL_CLUSTERS.map(cluster => (
            <div key={cluster.name} className="skills-legend-card rounded-lg border border-[#232D3F] bg-surface/70 px-3 py-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cluster.color, boxShadow: `0 0 12px ${cluster.color}` }} />
                <span className="font-mono-sm text-primary">{cluster.name}</span>
              </div>
              <div className="font-mono-sm text-tertiary mt-2">{cluster.skills.length} nodes</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="skills-canvas-field relative w-full h-[660px] md:h-[620px]">
        <canvas ref={canvasRef} className="absolute inset-0 touch-manipulation" />

        {!isMobile && hoveredSkill && (
          <div
            className="absolute pointer-events-none bg-surface-elevated border border-[#232D3F] rounded-lg p-3 z-10"
            style={{ left: mousePos.x + 15, top: mousePos.y - 60 }}
          >
            <div className="font-mono text-primary mb-1">{hoveredSkill.text}</div>
            <div className="flex items-center gap-2">
              <div className="w-[100px] h-1 bg-[#232D3F] rounded overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{ width: `${(hoveredSkill.proficiency / 3) * 100}%`, backgroundColor: hoveredSkill.color }}
                />
              </div>
              <span className="font-mono-sm text-tertiary">
                {proficiencyLabel(hoveredSkill.proficiency)}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace('#', '')
  const value = cleaned.length === 3
    ? cleaned.split('').map(char => char + char).join('')
    : cleaned
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
