import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ExperienceSection from './sections/ExperienceSection'
import TeachingSection from './sections/TeachingSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import CertificatesSection from './sections/CertificatesSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="min-h-screen bg-page text-primary">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TeachingSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
