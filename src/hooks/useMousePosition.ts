import { useRef, useEffect } from 'react'

interface MousePos {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition() {
  const posRef = useRef<MousePos>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return posRef
}
