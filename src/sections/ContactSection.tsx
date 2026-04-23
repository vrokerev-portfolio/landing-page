import { ExternalLink, Mail, Download, Github, Linkedin, Instagram } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import StatusBadge from '../components/StatusBadge'

const SOCIAL_LINKS = [
  {
    label: 'github',
    value: 'vrokerev',
    icon: Github,
    href: 'https://github.com/vrokerev',
    color: 'text-primary',
  },
  {
    label: 'linkedin',
    value: 'victor-mma',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/victor-mma',
    color: 'text-primary',
  },
  {
    label: 'instagram',
    value: '@victhor.ma',
    icon: Instagram,
    href: 'https://www.instagram.com/victhor.ma/',
    color: 'text-primary',
  },
  {
    label: 'email',
    value: 'victormanuelmeneses@hotmail.com',
    icon: Mail,
    href: 'mailto:victormanuelmeneses@hotmail.com',
    color: 'text-primary',
  },
  {
    label: 'cv',
    value: 'download.pdf',
    icon: Download,
    href: '#',
    color: 'text-primary',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-[680px] mx-auto px-4">
        <ScrollReveal>
          <SectionHeader title="Contact" number="07" centered />
        </ScrollReveal>

        {/* Contact Terminal */}
        <ScrollReveal>
          <div className="bg-surface border border-[#232D3F] rounded-lg shadow-glow overflow-hidden mb-8">
            {/* Window chrome */}
            <div className="relative flex items-center px-4 h-10 border-b border-[#232D3F]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red" />
                <div className="w-3 h-3 rounded-full bg-amber" />
                <div className="w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 font-mono-sm text-tertiary">
                contact.sh
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-7">
              <div className="font-mono text-primary mb-1">
                <span className="text-tertiary mr-2">$</span>
                ./contact.sh --list
              </div>
              <div className="h-4" />
              <div className="font-mono text-secondary mb-1">Available commands:</div>
              <div className="font-mono text-secondary pl-4">
                <div><span className="text-cyan">github</span>&nbsp;&nbsp;&nbsp;&nbsp; Open GitHub profile</div>
                <div><span className="text-cyan">linkedin</span>&nbsp;&nbsp; Open LinkedIn profile</div>
                <div><span className="text-cyan">instagram</span>&nbsp; Open Instagram profile</div>
                <div><span className="text-cyan">email</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Send email</div>
                <div><span className="text-cyan">cv</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Download CV</div>
              </div>
              <div className="h-4" />
              <div className="font-mono text-primary">
                <span className="text-tertiary mr-2">$</span>
                ./contact.sh --execute
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Social Links */}
        <div className="space-y-3">
          {SOCIAL_LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <ScrollReveal key={link.label} delay={i * 0.08}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-surface border border-[#232D3F] rounded-lg px-5 py-4 group hover:bg-surface-elevated hover:border-cyan transition-all duration-200"
                >
                  <Icon size={20} className="text-secondary group-hover:text-cyan transition-colors" />
                  <span className="font-mono text-primary">{link.label}</span>
                  <span className="font-mono text-secondary ml-auto hidden sm:block">{link.value}</span>
                  <ExternalLink
                    size={14}
                    className="text-tertiary group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Availability */}
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
