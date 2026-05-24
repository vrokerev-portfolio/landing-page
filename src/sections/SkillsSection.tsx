import { useRef, useEffect, useState, type CSSProperties } from 'react'
import SectionHeader from '../components/SectionHeader'
import { useReducedMotion } from '../hooks/useReducedMotion'

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
  active?: boolean
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
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    name: 'Programming',
    color: '#38BDF8',
    center: [0.18, 0.31],
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
      { name: 'Content UI', proficiency: 2 },
      { name: 'Vite', proficiency: 2 },
      { name: 'PWA', proficiency: 2 },
    ],
  },
  {
    name: 'Backend APIs',
    color: '#22D3EE',
    center: [0.8, 0.62],
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
    name: 'Cybersecurity',
    color: '#34D399',
    center: [0.82, 0.29],
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
    name: 'Automation & AI',
    color: '#EC4899',
    center: [0.22, 0.72],
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
    name: 'Dev Workflow',
    color: '#F59E0B',
    center: [0.58, 0.82],
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

function clampNumber(value: number, min: number, max: number) {
  if (min > max) return (min + max) / 2
  return Math.min(Math.max(value, min), max)
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function getActiveClusterCenter(width: number, height: number, cluster: SkillCluster, ringRadius: number) {
  const horizontalMargin = Math.min(width * 0.42, ringRadius + 112)
  const verticalMargin = Math.min(height * 0.36, ringRadius * 0.82 + 76)

  return {
    x: clampNumber(cluster.center[0] * width, horizontalMargin, width - horizontalMargin),
    y: clampNumber(cluster.center[1] * height, verticalMargin, height - verticalMargin),
  }
}

function createSkillNodes(width: number, height: number, activeClusterName: string | null) {
  const nodes: SkillNode[] = []
  const edges: SkillEdge[] = []
  const minDimension = Math.min(width, height)
  const activeCluster = SKILL_CLUSTERS.find(cluster => cluster.name === activeClusterName)
  const activeRingRadius = Math.max(96, Math.min(136, minDimension * 0.18))
  const activeCenter = activeCluster ? getActiveClusterCenter(width, height, activeCluster, activeRingRadius) : null
  const baseCore = { x: width * 0.5, y: height * 0.5 }

  if (activeCenter) {
    const dx = activeCenter.x - baseCore.x
    const dy = activeCenter.y - baseCore.y
    const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
    const coreShift = Math.min(minDimension * 0.28, 118)
    baseCore.x = clampNumber(baseCore.x - (dx / distance) * coreShift, 92, width - 92)
    baseCore.y = clampNumber(baseCore.y - (dy / distance) * coreShift, 72, height - 72)
  }

  const coreStart = activeCenter ? { x: width * 0.5, y: height * 0.5 } : baseCore

  const coreNode: SkillNode = {
    id: 'core',
    text: 'Victor Stack',
    x: coreStart.x,
    y: coreStart.y,
    baseX: baseCore.x,
    baseY: baseCore.y,
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
    const isActiveCluster = cluster.name === activeClusterName
    const skillCount = cluster.skills.length
    const ringRadius = isActiveCluster
      ? activeRingRadius
      : Math.max(82, Math.min(122, minDimension * 0.15))

    if (!isActiveCluster) {
      const clusterNode: SkillNode = {
        id: `cluster-${cluster.name}`,
        text: cluster.name,
        x: clusterX,
        y: clusterY,
        baseX: clusterX,
        baseY: clusterY,
        vx: 0,
        vy: 0,
        size: 11.6,
        radius: 22,
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
      return
    }

    const skillCenter = activeCenter ?? { x: clusterX, y: clusterY }
    cluster.skills.forEach((skill, i) => {
      const angle = (Math.PI * 2 * i) / skillCount - Math.PI / 2 + (clusterOrder % 2) * 0.18
      const radiusOffset = i % 2 === 0 ? -14 : 18
      const labelMargin = Math.max(58, skill.name.length * 4.8 + 28)
      const baseX = clampNumber(
        skillCenter.x + Math.cos(angle) * (ringRadius + radiusOffset),
        labelMargin,
        width - labelMargin
      )
      const baseY = clampNumber(
        skillCenter.y + Math.sin(angle) * (ringRadius * 0.78 + radiusOffset * 0.4),
        38,
        height - 38
      )
      const startX = skillCenter.x + Math.cos(angle) * 24
      const startY = skillCenter.y + Math.sin(angle) * 18

      const skillNode: SkillNode = {
        id: `skill-${cluster.name}-${skill.name}`,
        text: skill.name,
        x: startX,
        y: startY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        size: 9 + skill.proficiency * 1.2,
        radius: 12 + skill.proficiency * 1.2,
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
        from: 0,
        to: skillIndex,
        color: cluster.color,
        alpha: 0.16,
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
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()

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
    const starLayer = document.createElement('canvas')
    const starCtx = starLayer.getContext('2d')

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
    const targetFrameMs = reducedMotion ? 1000 / 4 : isMobile ? 1000 / 12 : 1000 / 22
    const mouseOffset = { x: 0, y: 0 }
    let draggingIndex: number | null = null
    const dragOffset = { x: 0, y: 0 }
    let lastHoveredId: string | null = null
    let tooltipFrame = 0
    const transitionStartedAt = performance.now()

    function paintStaticStars(dpr: number) {
      if (!starCtx) return
      starLayer.width = Math.max(1, Math.floor(width * dpr))
      starLayer.height = Math.max(1, Math.floor(height * dpr))
      starCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      starCtx.clearRect(0, 0, width, height)
      starCtx.globalCompositeOperation = 'source-over'

      for (const star of staticStars) {
        starCtx.beginPath()
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        starCtx.fill()
      }
    }

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
      const layout = createSkillNodes(width, height, selectedCluster)
      nodes = layout.nodes
      edges = layout.edges
      staticStars = Array.from({ length: isMobile ? 22 : 56 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.7 + Math.random() * 1.5,
        alpha: 0.12 + Math.random() * 0.28,
      }))
      paintStaticStars(dpr)
    }

    function getNodeAt(x: number, y: number) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i]
        const dx = x - node.x
        const dy = y - node.y
        const hitRadius = nodeSpacingRadius(node)
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) return i
      }
      return null
    }

    function nodeSpacingRadius(node: SkillNode) {
      const textRadius = node.text.length * (node.type === 'skill' ? 5.1 : 5.8)
      return Math.max(node.radius + 16, textRadius)
    }

    function clampNodeToCanvas(node: SkillNode) {
      const marginX = Math.max(50, nodeSpacingRadius(node) + 22)
      const marginY = node.type === 'core' ? 44 : 34
      node.x = clampNumber(node.x, marginX, width - marginX)
      node.y = clampNumber(node.y, marginY, height - marginY)
    }

    function applyRepulsion() {
      const core = nodes[0]
      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i]
        const dx = node.x - core.x
        const dy = node.y - core.y
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
        const minDistance = node.type === 'cluster' ? 112 : 104
        if (distance < minDistance) {
          const push = (minDistance - distance) * (node.type === 'cluster' ? 0.04 : 0.048)
          node.vx += (dx / distance) * push
          node.vy += (dy / distance) * push
        }
      }

      for (let a = 0; a < nodes.length; a++) {
        const first = nodes[a]

        for (let b = a + 1; b < nodes.length; b++) {
          const second = nodes[b]
          const dx = second.x - first.x
          const dy = second.y - first.y
          const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
          const involvesCore = first.type === 'core' || second.type === 'core'
          const involvesCluster = first.type === 'cluster' || second.type === 'cluster'
          const bothSkills = first.type === 'skill' && second.type === 'skill'
          const sameCluster = first.cluster === second.cluster
          const minDistance = nodeSpacingRadius(first) + nodeSpacingRadius(second) + (involvesCore ? 42 : involvesCluster ? 20 : bothSkills ? 18 : sameCluster ? 10 : 16)
          if (distance >= minDistance) continue

          const strength = (minDistance - distance) * (involvesCore ? 0.04 : bothSkills ? 0.032 : 0.022)
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

      for (const node of nodes) {
        if (draggingIndex !== nodes.indexOf(node)) {
          clampNodeToCanvas(node)
        }
      }
    }

    function roundedRect(x: number, y: number, w: number, h: number, r: number) {
      const radius = Math.min(r, w / 2, h / 2)
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + w - radius, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
      ctx.lineTo(x + w, y + h - radius)
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
      ctx.lineTo(x + radius, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
    }

    function getNodeVisualSize(node: SkillNode, scale = 1) {
      const isCore = node.type === 'core'
      const isCluster = node.type === 'cluster'
      const isSkill = node.type === 'skill'
      const fontSize = node.size * (node.hover ? 1.03 : 1) * scale
      const minWidth = (isCore ? 126 : isCluster ? 106 : 74) * scale
      const height = (isCore ? 42 : isCluster ? 36 : 28) * scale

      ctx.save()
      ctx.font = `${fontSize}px "JetBrains Mono"`
      const width = Math.max(minWidth, ctx.measureText(node.text).width + (isSkill ? 30 : 38) * scale)
      ctx.restore()

      return { width, height, fontSize }
    }

    function getLineAnchor(node: SkillNode, x: number, y: number, towardX: number, towardY: number, padding = 10) {
      const { width, height } = getNodeVisualSize(node)
      const dx = towardX - x
      const dy = towardY - y
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)
      if (absX < 0.001 && absY < 0.001) return { x, y }

      const tx = absX > 0.001 ? (width / 2 + padding) / absX : Number.POSITIVE_INFINITY
      const ty = absY > 0.001 ? (height / 2 + padding) / absY : Number.POSITIVE_INFINITY
      const t = Math.min(tx, ty)

      return {
        x: x + dx * t,
        y: y + dy * t,
      }
    }

    function drawNode(node: SkillNode, nx: number, ny: number, appearance = 1) {
      if (appearance <= 0.02) return
      const isCore = node.type === 'core'
      const isCluster = node.type === 'cluster'
      const isSkill = node.type === 'skill'
      const isActive = Boolean(node.active)
      const scale = isSkill ? 0.88 + appearance * 0.12 : 1
      const { width, height, fontSize } = getNodeVisualSize(node, scale)
      const labelColor = isCore ? '#F0F4F8' : node.color

      ctx.save()
      ctx.globalAlpha = appearance
      ctx.font = `${fontSize}px "JetBrains Mono"`
      const x = nx - width / 2
      const y = ny - height / 2
      const borderAlpha = node.hover || isActive ? 0.9 : isSkill ? 0.48 : 0.56
      const fillAlpha = isCore ? 0.1 : isActive ? 0.18 : isSkill ? 0.12 : 0.09

      if ((isCore || isCluster) && (isActive || node.hover)) {
        roundedRect(x - 7, y - 7, width + 14, height + 14, 16)
        ctx.fillStyle = hexToRgba(node.color, isActive ? 0.08 : 0.05)
        ctx.fill()
        ctx.strokeStyle = hexToRgba(node.color, isActive ? 0.24 : 0.16)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      roundedRect(x, y, width, height, 12)
      ctx.fillStyle = isCore ? 'rgba(11, 15, 23, 0.96)' : 'rgba(11, 15, 23, 0.88)'
      ctx.fill()

      roundedRect(x, y, width, height, 12)
      ctx.fillStyle = isCore ? 'rgba(240, 244, 248, 0.08)' : hexToRgba(node.color, fillAlpha)
      ctx.fill()

      ctx.strokeStyle = isCore ? 'rgba(240, 244, 248, 0.7)' : hexToRgba(node.color, borderAlpha)
      ctx.lineWidth = isCore ? 1.6 : isActive ? 1.8 : 1.2
      ctx.stroke()

      if (isSkill) {
        ctx.beginPath()
        ctx.arc(x + 13, ny, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      }

      const showLabel = !isMobile || isCore || isCluster || node.cluster === selectedCluster
      if (showLabel) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = labelColor
        ctx.fillText(node.text, nx, ny)
      }

      ctx.restore()
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
      const enterProgress = easeOutCubic(Math.min(1, (now - transitionStartedAt) / 620))
      ctx.clearRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'source-over'
      if (starLayer.width && starLayer.height) {
        ctx.drawImage(starLayer, 0, 0, width, height)
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (draggingIndex === i) {
          node.vx = 0
          node.vy = 0
          continue
        }

        const spring = node.type === 'core' ? 0.018 : node.type === 'cluster' ? 0.042 : 0.052
        const drift = reducedMotion ? 0 : node.type === 'core' ? 1.6 : node.type === 'cluster' ? 3.4 : 4.6
        const targetX = node.baseX + Math.sin(time * 0.26 + node.phase) * drift
        const targetY = node.baseY + Math.cos(time * 0.22 + node.phase) * drift
        node.vx += (targetX - node.x) * spring
        node.vy += (targetY - node.y) * spring
        node.vx *= 0.82
        node.vy *= 0.82
        node.x += node.vx
        node.y += node.vy
        clampNodeToCanvas(node)
      }

      if (frame % (isMobile ? 6 : 4) === 0) {
        applyRepulsion()
      }

      const resolved = nodes.map(node => ({
        node,
        nx: node.x + mouseOffset.x * (node.size / 28) * 0.12,
        ny: node.y + mouseOffset.y * (node.size / 28) * 0.12,
      }))

      ctx.globalCompositeOperation = 'source-over'
      for (const edge of edges) {
        const from = resolved[edge.from]
        const to = resolved[edge.to]
        if (!from || !to) continue
        const isCoreEdge = from.node.type === 'core'
        const isActiveCoreEdge = isCoreEdge && to.node.cluster === selectedCluster
        const edgeAppearance = to.node.type === 'skill' ? enterProgress : 1
        if (edgeAppearance <= 0.03) continue
        const start = getLineAnchor(from.node, from.nx, from.ny, to.nx, to.ny)
        const end = getLineAnchor(to.node, to.nx, to.ny, from.nx, from.ny)
        ctx.save()
        ctx.strokeStyle = hexToRgba(edge.color, (isCoreEdge ? (isActiveCoreEdge ? 0.2 : 0.12) : edge.alpha) * edgeAppearance)
        ctx.shadowBlur = 0
        ctx.lineWidth = isCoreEdge ? (isActiveCoreEdge ? 1 : 0.75) : 0.8
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        ctx.restore()

        if (!isMobile && !reducedMotion && !isCoreEdge) {
          const packetT = (time * edge.speed + edge.phase) % 1
          ctx.beginPath()
          ctx.arc(from.nx + (to.nx - from.nx) * packetT, from.ny + (to.ny - from.ny) * packetT, 1.35, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(edge.color, 0.58)
          ctx.fill()
        }
      }

      for (const type of ['cluster', 'core', 'skill'] as const) {
        for (const item of resolved) {
          if (item.node.type !== type) continue
          drawNode(item.node, item.nx, item.ny, item.node.type === 'skill' ? enterProgress : 1)
          const dx = mousePosRef.current.x - item.nx
          const dy = mousePosRef.current.y - item.ny
          item.node.hover = Math.sqrt(dx * dx + dy * dy) < nodeSpacingRadius(item.node)
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
          if (Math.sqrt(dx * dx + dy * dy) < nodeSpacingRadius(skill)) {
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

    function handleCanvasClick(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const index = getNodeAt(x, y)
      if (index === null) return
      const node = nodes[index]
      if (node.type === 'cluster') {
        setSelectedCluster(current => (current === node.cluster ? null : node.cluster))
      } else if (node.type === 'core') {
        setSelectedCluster(null)
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
    cvs.addEventListener('click', handleCanvasClick)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (tooltipFrame) cancelAnimationFrame(tooltipFrame)
      cvs.removeEventListener('mousemove', handleMouseMove)
      cvs.removeEventListener('mousedown', handleMouseDown)
      cvs.removeEventListener('mouseleave', handleMouseLeave)
      cvs.removeEventListener('click', handleCanvasClick)
      window.removeEventListener('mouseup', handleMouseUp)
      ro.disconnect()
      io.disconnect()
    }
  }, [isMobile, selectedCluster, reducedMotion])

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
            <button
              key={cluster.name}
              type="button"
              aria-pressed={selectedCluster === cluster.name}
              className={`skills-legend-card rounded-lg border border-[#232D3F] bg-surface/70 px-3 py-3 text-left transition-colors ${selectedCluster === cluster.name ? 'is-active' : ''}`}
              style={{ '--skill-color': cluster.color } as CSSProperties}
              onClick={() => setSelectedCluster(current => (current === cluster.name ? null : cluster.name))}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cluster.color, boxShadow: `0 0 12px ${cluster.color}` }} />
                <span className="font-mono-sm text-primary">{cluster.name}</span>
              </div>
              <div className="font-mono-sm text-tertiary mt-2">{cluster.skills.length} skills</div>
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="skills-canvas-field relative w-full h-[660px] md:h-[620px]">
        <canvas ref={canvasRef} className="absolute inset-0 touch-manipulation" aria-hidden="true" />

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
