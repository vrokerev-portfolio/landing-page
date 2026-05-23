import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { X } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'

interface NodeData {
  id: string
  label: string
  group: string
  radius: number
  description: string
  metric: string
}

interface LinkData {
  source: string
  target: string
}

const teachingData: { nodes: NodeData[]; links: LinkData[] } = {
  nodes: [
    { id: 'upc', label: 'UPC Teaching', group: 'hub', radius: 30, description: 'Teaching cybersecurity at Universitat Politecnica de Catalunya', metric: '2+ Semesters' },
    { id: 'cyber-labs', label: 'Cybersecurity Labs', group: 'security', radius: 20, description: 'Practical hands-on cybersecurity laboratory sessions', metric: '40+ Students' },
    { id: 'vuln-assess', label: 'Vulnerability Assessment', group: 'security', radius: 18, description: 'Teaching vulnerability scanning and assessment techniques', metric: '20+ Labs' },
    { id: 'defense', label: 'Defense Techniques', group: 'security', radius: 18, description: 'Defensive security strategies and implementation', metric: '15+ Modules' },
    { id: 'mentoring', label: 'Student Mentoring', group: 'process', radius: 16, description: 'One-on-one mentoring and guidance for students', metric: '30+ Hours' },
    { id: 'lab-design', label: 'Lab Design', group: 'process', radius: 16, description: 'Designing practical lab exercises and challenges', metric: '10+ Labs' },
  ],
  links: [
    { source: 'upc', target: 'cyber-labs' },
    { source: 'upc', target: 'vuln-assess' },
    { source: 'upc', target: 'defense' },
    { source: 'upc', target: 'mentoring' },
    { source: 'upc', target: 'lab-design' },
    { source: 'cyber-labs', target: 'vuln-assess' },
    { source: 'cyber-labs', target: 'defense' },
    { source: 'mentoring', target: 'lab-design' },
  ],
}

const nodeColors = d3.scaleOrdinal<string, string>()
  .domain(['hub', 'security', 'process'])
  .range(['#38BDF8', '#34D399', '#6366F1'])

export default function TeachingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [detailNode, setDetailNode] = useState<NodeData | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.offsetWidth
    const height = 500

    // Clear previous
    container.innerHTML = ''

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)

    // Prepare data
    const nodes = teachingData.nodes.map(d => ({ ...d })) as NodeData[]
    const links = teachingData.links.map(d => ({ ...d })) as LinkData[]

    // Force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 10))

    // Draw links
    const linkGroup = svg.append('g')
    const linkElements = linkGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#232D3F')
      .attr('stroke-width', 1)

    // Animated packets
    const packetGroup = svg.append('g')
    const packets = links.map(() => {
      return packetGroup.append('circle')
        .attr('r', 3)
        .attr('fill', '#38BDF8')
        .attr('opacity', 0.8)
    })

    // Draw nodes
    const nodeGroup = svg.append('g')

    const nodeElements = nodeGroup.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
      )

    // Node circles
    nodeElements.append('circle')
      .attr('r', (d: any) => d.radius)
      .attr('fill', (d: any) => nodeColors(d.group))
      .attr('stroke', '#0B0F17')
      .attr('stroke-width', 2)

    // Labels
    nodeElements.append('text')
      .text((d: any) => d.label)
      .attr('font-family', '"JetBrains Mono", monospace')
      .attr('font-size', 11)
      .attr('fill', '#F0F4F8')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => d.radius + 16)

    // Hover effects
    nodeElements
      .on('mouseenter', function(_event, d: any) {
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('r', d.radius * 1.3)
          .attr('filter', `drop-shadow(0 0 10px ${nodeColors(d.group)})`)

        // Highlight connected links
        linkElements
          .attr('stroke', (l: any) =>
            (l.source.id === d.id || l.target.id === d.id) ? '#38BDF8' : '#232D3F'
          )
          .attr('stroke-width', (l: any) =>
            (l.source.id === d.id || l.target.id === d.id) ? 2 : 1
          )

        // Dim other nodes
        nodeElements.style('opacity', (n: any) => {
          const connected = links.some((l: any) =>
            (l.source.id === d.id && l.target.id === n.id) ||
            (l.target.id === d.id && l.source.id === n.id)
          )
          return n.id === d.id || connected ? 1 : 0.3
        })
      })
      .on('mouseleave', function() {
        nodeElements.style('opacity', 1)
        linkElements.attr('stroke', '#232D3F').attr('stroke-width', 1)
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('r', (d: any) => d.radius)
          .attr('filter', null)
      })
      .on('click', (_event, d: any) => {
        setDetailNode(d)
      })

    // Update positions
    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      nodeElements.attr('transform', (d: any) => `translate(${d.x},${d.y})`)

      // Animate packets
      links.forEach((l: any, i: number) => {
        const t = (Date.now() / 2000 + i * 0.3) % 1
        const sx = l.source.x
        const sy = l.source.y
        const tx = l.target.x
        const ty = l.target.y
        const px = sx + (tx - sx) * t
        const py = sy + (ty - sy) * t
        packets[i]?.attr('cx', px).attr('cy', py)
      })
    })

    // Continuous packet animation
    const packetInterval = setInterval(() => {
      links.forEach((l: any, i: number) => {
        const t = (Date.now() / 2000 + i * 0.3) % 1
        const sx = l.source.x
        const sy = l.source.y
        const tx = l.target.x
        const ty = l.target.y
        const px = sx + (tx - sx) * t
        const py = sy + (ty - sy) * t
        packets[i]?.attr('cx', px).attr('cy', py)
      })
    }, 16)

    return () => {
      simulation.stop()
      clearInterval(packetInterval)
    }
  }, [])

  return (
    <section id="teaching" className="pt-[120px]">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            title="Teaching & Academic Contribution"
            number="03"
            subtitle="Knowledge sharing strengthens understanding"
            centered
          />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="relative bg-surface w-full" style={{ height: detailNode ? 700 : 500 }}>
          <div ref={containerRef} className="w-full h-[500px]" />

          {/* Detail Panel */}
          {detailNode && (
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-surface-elevated border-t border-[#232D3F] backdrop-blur-xl p-6 animate-in slide-in-from-bottom duration-400">
              <button
                onClick={() => setDetailNode(null)}
                className="absolute top-4 right-4 text-tertiary hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="font-h3 text-primary mb-2">{detailNode.label}</h3>
              <p className="font-body text-secondary mb-4 max-w-2xl">{detailNode.description}</p>
              <div className="font-mono text-cyan">{detailNode.metric}</div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}
