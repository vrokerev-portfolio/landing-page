import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  duration?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out',
    }

    if (direction === 'up') fromVars.y = 30
    else if (direction === 'left') fromVars.x = -30
    else if (direction === 'right') fromVars.x = 30

    gsap.from(el, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }, [delay, direction, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
