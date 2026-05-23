import type { CSSProperties } from 'react'
import { ExternalLink, Mail, Download, Github, Linkedin, Instagram } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import StatusBadge from '../components/StatusBadge'
import BorderGlowCard from '../components/BorderGlowCard'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    value: 'vrokerev',
    icon: Github,
    href: 'https://github.com/vrokerev',
    color: '#38BDF8',
  },
  {
    label: 'LinkedIn',
    value: 'victor-mma',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/victor-mma',
    color: '#6366F1',
  },
  {
    label: 'Instagram',
    value: '@victhor.ma',
    icon: Instagram,
    href: 'https://www.instagram.com/victhor.ma/',
    color: '#EC4899',
  },
  {
    label: 'Email',
    value: 'victormanuelmeneses@hotmail.com',
    icon: Mail,
    href: 'mailto:victormanuelmeneses@hotmail.com',
    color: '#34D399',
  },
  {
    label: 'CV',
    value: 'download.pdf',
    icon: Download,
    href: '#',
    color: '#F59E0B',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-[940px] mx-auto px-4">
        <ScrollReveal>
          <SectionHeader title="Contact" number="06" centered subtitle="Let’s connect for projects, work opportunities, or creative ideas." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-surface border border-[#232D3F] rounded-lg shadow-glow overflow-hidden mb-8 contact-terminal-shell">
            <div className="relative flex items-center px-4 h-10 border-b border-[#232D3F]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red" />
                <div className="w-3 h-3 rounded-full bg-amber" />
                <div className="w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 font-mono-sm text-tertiary">
                contact
              </div>
            </div>

            <div className="p-7">
              <div className="font-mono text-primary mb-1">
                <span className="text-tertiary mr-2">$</span>
                connect --channels
              </div>
              <div className="h-4" />
              <div className="font-mono text-secondary mb-1">Available channels:</div>
              <div className="font-mono text-secondary pl-4 space-y-1">
                <div><span className="text-cyan">github</span>&nbsp;&nbsp;&nbsp;&nbsp; Code, repos and dev activity</div>
                <div><span className="text-cyan">linkedin</span>&nbsp;&nbsp; Professional profile</div>
                <div><span className="text-cyan">instagram</span>&nbsp; Personal / social updates</div>
                <div><span className="text-cyan">email</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Direct contact</div>
                <div><span className="text-cyan">cv</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resume file</div>
              </div>
              <div className="h-4" />
              <div className="font-mono text-primary">
                <span className="text-tertiary mr-2">$</span>
                ready --status online
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <ScrollReveal key={link.label} delay={i * 0.08}>
                <BorderGlowCard color={link.color} hoverOnly className="h-full">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-card flex items-center gap-4 px-5 py-4 h-full group"
                  >
                    <div className="contact-link-icon-wrap" style={{ '--contact-color': link.color } as CSSProperties}>
                      <Icon size={20} className="contact-link-icon" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-primary group-hover:opacity-100 transition-colors duration-200 contact-link-label">
                        {link.label}
                      </div>
                      <div className="font-mono-sm text-secondary truncate">{link.value}</div>
                    </div>
                    <ExternalLink size={14} className="text-tertiary group-hover:translate-x-1 transition-transform ml-auto" />
                  </a>
                </BorderGlowCard>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <StatusBadge text="Available for opportunities" />
            <span className="font-mono-sm text-tertiary">
              ● Typically responds within 24h
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
