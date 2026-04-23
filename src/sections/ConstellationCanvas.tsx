import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  radius: number;
  opacity: number;
}

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NODE_COUNT = 90;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_DISTANCE = 150;
    // const DRIFT_SPEED = 0.2;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrameId: number;
    const mousePos = { x: -1000, y: -1000 };
    // let pulseOffset = 0
    // let pulseLines: Array<{ i: number; j: number }> = []

    const cvs = canvas;
    const cnt = container;
    const c = ctx;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = cnt.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cvs.width = width * dpr;
      cvs.height = height * dpr;
      cvs.style.width = `${width}px`;
      cvs.style.height = `${height}px`;
      c.scale(dpr, dpr);
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6, // Velocidad constante X
          vy: (Math.random() - 0.5) * 0.6, // Velocidad constante Y
          ox: 0,
          oy: 0,
          radius: Math.random() * 2 + 1.5,
          opacity: Math.random() * 0.3 + 0.2,
        });
      }
    }

    function draw() {
      c.clearRect(0, 0, width, height);

// Update nodes
      for (const node of nodes) {
        // 1. Movimiento lineal constante
        node.x += node.vx
        node.y += node.vy

        // 2. Rebote en los bordes (evita las líneas locas que cruzan la pantalla)
        if (node.x <= 0 || node.x >= width) node.vx *= -1
        if (node.y <= 0 || node.y >= height) node.vy *= -1

        // 3. Interacción con el mouse (Repulsión)
        const mdx = mousePos.x - node.x
        const mdy = mousePos.y - node.y
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        
        if (md < MOUSE_DISTANCE && md > 0) {
          const mf = (MOUSE_DISTANCE - md) / MOUSE_DISTANCE
          // Empuja levemente el nodo sin alterar su velocidad base
          node.x -= (mdx / md) * mf * 2
          node.y -= (mdy / md) * mf * 2
        }

        // Draw node
        c.beginPath()
        c.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        c.fillStyle = `rgba(240, 244, 248, ${node.opacity})`
        c.fill()
      }

      // Draw connections
      const visibleConnections: Array<{ i: number; j: number }> = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            visibleConnections.push({ i, j });
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.6;
            const gradient = c.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, `rgba(56, 189, 248, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(56, 189, 248, ${opacity})`);
            c.strokeStyle = gradient;
            c.lineWidth = 0.5;
            c.beginPath();
            c.moveTo(nodes[i].x, nodes[i].y);
            c.lineTo(nodes[j].x, nodes[j].y);
            c.stroke();
          }
        }
      }

      // // Pulse animation
      // pulseOffset += 0.05
      // pulseLines = visibleConnections.slice(0, Math.floor(visibleConnections.length * 0.2))
      // if (pulseLines.length > 0) {
      //   const pulseIndex = Math.floor(pulseOffset % pulseLines.length)
      //   const line = pulseLines[pulseIndex]
      //   if (line && nodes[line.i] && nodes[line.j]) {
      //     c.beginPath()
      //     c.moveTo(nodes[line.i].x, nodes[line.i].y)
      //     c.lineTo(nodes[line.j].x, nodes[line.j].y)
      //     c.strokeStyle = 'rgba(56, 189, 248, 0.6)'
      //     c.lineWidth = 1.5
      //     c.stroke()
      //   }
      // }

      animationFrameId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    }

    resize();
    initNodes();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(cnt);

    cvs.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cvs.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
