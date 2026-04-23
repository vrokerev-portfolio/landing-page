import { useRef, useEffect } from 'react'

export function useScrollDirection() {
  const directionRef = useRef<'up' | 'down'>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 80) {
        directionRef.current = 'down'
      } else {
        directionRef.current = 'up'
      }
      lastScrollY.current = currentY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return directionRef
}
