import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ExperienceSection from './sections/ExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import CertificatesSection from './sections/CertificatesSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const shouldUseNativeScroll = window.matchMedia(
      '(max-width: 767px), (prefers-reduced-motion: reduce)'
    ).matches

    // Lenis looks nice on desktop, but on phones it can fight native scrolling
    // and make canvas-heavy sections feel laggy. Mobile keeps native scroll.
    if (shouldUseNativeScroll) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-shell min-h-screen bg-page text-primary">
      <Navigation />
      <div className="global-aurora" aria-hidden="true" />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
