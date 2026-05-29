import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const NODE_COUNT = prefersReducedMotion ? 0 : isMobile ? 20 : 58;
    const CONNECTION_DISTANCE = isMobile ? 105 : 135;
    const MOUSE_DISTANCE = isMobile ? 0 : 140;
    const TARGET_FRAME_MS = isMobile ? 1000 / 24 : 1000 / 42;
    const CONNECTION_FRAME_INTERVAL = isMobile ? 4 : 2;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrameId = 0;
    let lastFrame = 0;
    let isVisible = true;
    let isTabVisible = true;
    let frameCount = 0;
    let cachedConnections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];
    const mousePos = { x: -1000, y: -1000 };

    const cvs = canvas;
    const cnt = container;
    const c = ctx;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      const rect = cnt.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cvs.width = Math.floor(width * dpr);
      cvs.height = Math.floor(height * dpr);
      cvs.style.width = `${width}px`;
      cvs.style.height = `${height}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.32 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.32 : 0.5),
          radius: Math.random() * 1.6 + 1.1,
          opacity: Math.random() * 0.26 + 0.18,
        });
      }
      cachedConnections = [];
    }

    function rebuildConnections() {
      cachedConnections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * (isMobile ? 0.32 : 0.48);
            cachedConnections.push({
              x1: nodes[i].x,
              y1: nodes[i].y,
              x2: nodes[j].x,
              y2: nodes[j].y,
              opacity,
            });
          }
        }
      }
    }

    function draw(now = 0) {
      if (!isVisible || !isTabVisible) {
        animationFrameId = 0;
        return;
      }

      if (now - lastFrame < TARGET_FRAME_MS) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      frameCount += 1;
      c.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;

        if (!isMobile) {
          const mdx = mousePos.x - node.x;
          const mdy = mousePos.y - node.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MOUSE_DISTANCE && md > 0) {
            const mf = (MOUSE_DISTANCE - md) / MOUSE_DISTANCE;
            node.x -= (mdx / md) * mf * 1.6;
            node.y -= (mdy / md) * mf * 1.6;
          }
        }

        c.beginPath();
        c.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(240, 244, 248, ${node.opacity})`;
        c.fill();
      }

      if (frameCount % CONNECTION_FRAME_INTERVAL === 0 || cachedConnections.length === 0) {
        rebuildConnections();
      }

      for (const link of cachedConnections) {
        c.strokeStyle = `rgba(56, 189, 248, ${link.opacity})`;
        c.lineWidth = 0.5;
        c.beginPath();
        c.moveTo(link.x1, link.y1);
        c.lineTo(link.x2, link.y2);
        c.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    function start() {
      if (!animationFrameId && !prefersReducedMotion && isTabVisible) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    function stop() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    }

    function handleVisibilityChange() {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible && isVisible) start();
      if (!isTabVisible) stop();
    }

    resize();
    initNodes();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(cnt);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible) start();
      else stop();
    }, { threshold: 0.02 });
    io.observe(cnt);

    if (!isMobile) cvs.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      cvs.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
