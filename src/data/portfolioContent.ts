import { useEffect, useState } from 'react'
import type { IconName } from '../lib/iconMap'

export interface HeroLine {
  text: string
  type: 'command' | 'comment' | 'output'
  highlight?: string
}

export interface HeroContent {
  srTitle: string
  statusBadge: string
  terminalTitle: string
  terminalLines: HeroLine[]
  primaryCta: string
  primaryTarget: string
  secondaryCta: string
  secondaryTarget: string
}

export interface AboutStat {
  label: string
  value: string
  color: string
  sub: string
  icon: IconName
}

export interface AboutNote {
  label: string
  value: string
  icon: IconName
}

export interface AboutContent {
  fileLabel: string
  status: string
  pill: string
  name: string
  title: string
  paragraphs: string[]
  command: string
  profileImages: string[]
  imageAlt: string
  notes: AboutNote[]
  stats: AboutStat[]
}

export interface ExperienceItem {
  label: string
  title: string
  period: string
  description: string
  stack: string[]
  color: string
  metric: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  stack: string[]
  color: string
  image: string | null
  images?: string[]
  previewOrientation?: 'landscape' | 'portrait'
  status?: string
  gallery?: string
  terminal?: string[]
  link?: string | null
  linkLabel?: string
}

export interface SkillCluster {
  name: string
  color: string
  center: [number, number]
  skills: Array<{ name: string; proficiency: number }>
}

export interface CertificateItem {
  id: string
  icon: IconName
  color: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  skills?: string
  badge: string
  link: string | null
  footer?: string
  image: string
}

export interface ContactLink {
  label: string
  value: string
  icon: IconName
  href: string | null
  color: string
}

export interface ContactContent {
  title: string
  number: string
  subtitle: string
  terminalTitle: string
  terminalLines: string[]
  channelNames: string[]
  links: ContactLink[]
  statusBadge: string
  responseText: string
}

export interface SectionIntro {
  title: string
  number: string
  subtitle: string
}

export interface PortfolioContent {
  hero: HeroContent
  about: AboutContent
  experience: SectionIntro & { items: ExperienceItem[] }
  projects: SectionIntro & { items: ProjectItem[] }
  skills: SectionIntro & { clusters: SkillCluster[] }
  certificates: SectionIntro & { items: CertificateItem[] }
  contact: ContactContent
}

const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    srTitle: 'Victor Meneses, Software Engineer focused on modern web experiences and cybersecurity',
    statusBadge: 'SYSTEM INITIALIZED',
    terminalTitle: 'profile_load.exe',
    terminalLines: [
      { text: 'load_profile --verbose', type: 'command' },
      { text: '// Initializing identity module...', type: 'comment' },
      { text: 'Name:        Victor Meneses', type: 'output', highlight: 'Victor Meneses' },
      { text: 'Role:        Software Engineer @ Cuevatech', type: 'output', highlight: 'Software Engineer' },
      { text: 'Education:   Software Engineering - UPC', type: 'output' },
      { text: 'English:     B2 (Professional working proficiency)', type: 'output' },
      { text: 'Status:      Available for opportunities', type: 'output', highlight: 'Available' },
      { text: '// Profile loaded successfully.', type: 'comment' },
    ],
    primaryCta: 'View Projects ->',
    primaryTarget: '#projects',
    secondaryCta: 'Contact Me',
    secondaryTarget: '#contact',
  },
  about: {
    fileLabel: 'about.md',
    status: 'status: compiling_profile',
    pill: 'personal_overview',
    name: 'Victor Meneses',
    title: 'Software Engineer focused on modern web experiences and cybersecurity',
    paragraphs: [
      'I am a Software Engineering student at UPC, building real projects while improving my technical profile through professional work, certifications, and continuous learning.',
      'My current focus is creating fast, polished, and maintainable interfaces with React/Next.js, while keeping a security mindset from my cybersecurity background.',
    ],
    command: '$ whoami --location Lima, Peru --english B2',
    profileImages: ['/images/personal-photos/yo-portafolio.avif'],
    imageAlt: 'Victor Meneses portrait',
    notes: [
      { label: 'profile.image', value: 'rotating_gallery', icon: 'sparkles' },
      { label: 'focus.stack', value: 'react_next_api', icon: 'code' },
      { label: 'security.mode', value: 'enabled', icon: 'shieldCheck' },
    ],
    stats: [
      { label: 'Experience', value: 'Backend Developer', color: '#38BDF8', sub: '@ Cuevatech', icon: 'code' },
      { label: 'Education', value: 'Software Engineering', color: '#6366f1', sub: 'Universidad Peruana de Ciencias Aplicadas', icon: 'graduation' },
      { label: 'Certifications', value: 'Cybersecurity + Scrum', color: '#34D399', sub: 'eJPT, CCA, IBM, SCRUM', icon: 'shieldCheck' },
    ],
  },
  experience: {
    title: 'Professional Experience',
    number: '02',
    subtitle: 'Roles, practical work, and the technical profile behind the portfolio',
    items: [
      {
        label: 'current_role',
        title: 'Software Engineer @ Cuevatech',
        period: 'Aug 2025 - Present',
        description: 'Building production-ready web interfaces with a focus on performance, maintainability, responsive UI, and clean frontend architecture.',
        stack: ['React', 'Next.js', 'TypeScript', 'Vercel'],
        color: '#34D399',
        metric: 'production_work',
      },
      {
        label: 'teaching_node',
        title: 'Cybersecurity Teaching @ UPC',
        period: 'Academic experience',
        description: 'Delivered cybersecurity sessions, translating technical topics into clear explanations and practical learning experiences.',
        stack: ['Cybersecurity', 'Communication', 'Labs'],
        color: '#38BDF8',
        metric: 'security_mindset',
      },
      {
        label: 'client_projects',
        title: 'Freelance Web Projects',
        period: 'Selected work',
        description: 'Designing and developing polished landing pages and business sites with visual detail, content workflows, and mobile-first optimization.',
        stack: ['Content Systems', 'Tailwind', 'GSAP'],
        color: '#6366F1',
        metric: 'ui_engineering',
      },
      {
        label: 'builder_mode',
        title: 'Product & Automation Builder',
        period: 'Ongoing',
        description: 'Exploring tools, automations, and practical software ideas that connect business needs with fast, useful technical execution.',
        stack: ['Automation', 'AI Tools', 'Product'],
        color: '#F59E0B',
        metric: 'continuous_learning',
      },
    ],
  },
  projects: {
    title: 'Projects',
    number: '03',
    subtitle: 'University projects and professional work',
    items: [
      {
        id: 'comercial-victor',
        title: 'Comercial Victor',
        description: 'Sitio para un bazar en Pueblo Libre, pensado para mostrar su catalogo, redes sociales y ubicacion.',
        stack: ['Vite', 'React', 'Tailwind'],
        color: '#38BDF8',
        image: '/images/projects/webpage-comercial-victor.avif',
        status: 'active',
        gallery: 'cyan',
        link: null,
        linkLabel: 'Open project',
        terminal: ['preview: ecommerce_landing', 'focus: catalog + social proof + conversion', 'note: optimized for visual merchandising'],
      },
      {
        id: 'karin-bodas-catering',
        title: 'Karin Bodas & Catering',
        description: 'Landing para servicios de bodas y catering con portafolio, redes y presentacion de servicios.',
        stack: ['Vite', 'React', 'Tailwind'],
        color: '#6366F1',
        image: '/images/projects/webpage-karin.avif',
        status: 'active',
        gallery: 'violet',
        link: null,
        linkLabel: 'Open project',
        terminal: ['preview: event_brand_site', 'focus: premium presentation + trust', 'note: component-friendly visual structure'],
      },
      {
        id: 'mi-upc-app',
        title: 'Mi UPC (App)',
        description: 'App que simula el ingreso a la universidad para evitar cierres de sesion del app oficial.',
        stack: ['React', 'TypeScript', 'PWA'],
        color: '#34D399',
        image: '/images/projects/app-mi-upc.avif',
        previewOrientation: 'portrait',
        status: 'active',
        gallery: 'green',
        link: null,
        linkLabel: 'Open project',
        terminal: ['preview: app_experience', 'focus: persistence + convenience', 'note: built around student workflow'],
      },
      {
        id: 'erykan-solutions',
        title: 'Erykan Solutions',
        description: 'Emprendimiento con Harold Mayta para consultoria y desarrollo de software.',
        stack: ['Branding', 'Web', 'Consultoria'],
        color: '#F59E0B',
        image: '/images/projects/erykan.avif',
        status: 'active',
        gallery: 'amber',
        link: null,
        linkLabel: 'Open project',
        terminal: ['preview: startup_concept', 'focus: consultancy + product delivery', 'note: identity and offer still evolving'],
      },
      {
        id: 'causa-efecto',
        title: 'Causa & Efecto',
        description: 'Canal de entrevistas en la calle y contenido de humor con Alejandro Barturen.',
        stack: ['Contenido', 'Redes', 'Produccion'],
        color: '#EC4899',
        image: '/images/projects/causa-y-efecto.avif',
        status: 'active',
        gallery: 'pink',
        link: null,
        linkLabel: 'Open project',
        terminal: ['preview: media_content_project', 'focus: interviews + short-form social content', 'note: personality-driven production'],
      },
    ],
  },
  skills: {
    title: 'Technical Skills',
    number: '04',
    subtitle: 'Frontend, cybersecurity, automation, and the tools I use to ship polished work.',
    clusters: [
      { name: 'Programming', color: '#38BDF8', center: [0.18, 0.31], skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Java', 'C'].map(name => ({ name, proficiency: name.length > 1 ? 3 : 2 })) },
      { name: 'Frontend', color: '#6366F1', center: [0.5, 0.17], skills: ['React', 'Next.js', 'Tailwind', 'Content UI', 'Vite', 'PWA'].map(name => ({ name, proficiency: name === 'Content UI' || name === 'Vite' || name === 'PWA' ? 2 : 3 })) },
      { name: 'Backend APIs', color: '#22D3EE', center: [0.8, 0.62], skills: ['Node.js', 'Express', 'REST APIs', 'Postman', 'JWT', 'MongoDB', 'PostgreSQL', 'API Testing'].map(name => ({ name, proficiency: ['JWT', 'MongoDB', 'PostgreSQL', 'API Testing'].includes(name) ? 2 : 3 })) },
      { name: 'Cybersecurity', color: '#34D399', center: [0.82, 0.29], skills: ['eJPT', 'OWASP', 'Linux', 'Kali', 'Pentesting', 'Burp Suite', 'Nmap'].map(name => ({ name, proficiency: ['OWASP', 'Linux'].includes(name) ? 3 : 2 })) },
      { name: 'Automation & AI', color: '#EC4899', center: [0.22, 0.72], skills: ['n8n', 'AI Agents', 'Prompting', 'LLM APIs', 'Workflows', 'OpenAI API'].map(name => ({ name, proficiency: name === 'Prompting' ? 3 : 2 })) },
      { name: 'Dev Workflow', color: '#F59E0B', center: [0.58, 0.82], skills: ['Git', 'Vercel', 'Docker', 'Scrum', 'Excel', 'Domain Driven Design', 'Lighthouse', 'GitHub', 'VS Code'].map(name => ({ name, proficiency: ['Docker', 'Domain Driven Design', 'Lighthouse'].includes(name) ? 2 : 3 })) },
    ],
  },
  certificates: {
    title: 'Certificates',
    number: '05',
    subtitle: '',
    items: [
      { id: 'cca', icon: 'shield', color: '#34D399', name: 'Certified Cybersecurity Analyst', issuer: 'INE', date: 'Expedicion: jul. 2025', credentialId: 'ID de la credencial: 156185381', skills: 'Aptitudes: Hacking etico, Ciberseguridad y 2 aptitudes mas', badge: 'VERIFIED', link: '#', image: '/images/certifications/ine-cca.avif' },
      { id: 'ejpt', icon: 'lock', color: '#38BDF8', name: 'Junior Penetration Tester', issuer: 'INE', date: 'Expedicion: jul. 2025', credentialId: 'ID de la credencial: 156416723', skills: 'Aptitudes: Hacking etico, Ciberseguridad', badge: 'VERIFIED', link: '#', image: '/images/certifications/ine-ejpt.avif' },
      { id: 'ibm', icon: 'lock', color: '#F59E0B', name: 'IBM Cybersecurity Analyst', issuer: 'IBM', date: 'Expedicion: nov. 2024', skills: 'Aptitudes: Ciberseguridad, Respuesta a incidentes de ciberseguridad y 2 aptitudes mas', badge: 'VERIFIED', link: '#', image: '/images/certifications/ibm-cybersecurity-analyst.avif' },
      { id: 'ibm-generative-ai', icon: 'award', color: '#A78BFA', name: 'Generative AI: Business Transformation and Career Growth', issuer: 'IBM', date: 'Credencial agregada', skills: 'Aptitudes: Inteligencia artificial generativa, transformacion digital', badge: 'VERIFIED', link: '#', image: '/images/certifications/ibm_generative-ai-business-transformation-and-career-growth.avif' },
      { id: 'sql', icon: 'award', color: '#60A5FA', name: '70-461, 761: Querying Microsoft SQL Server with Transact-SQL', issuer: 'Microsoft', date: 'Expedicion: ago. 2024', credentialId: 'ID de la credencial: UC-14f7f2a8-8b95-4cea-96ab-a70596dff4e5', skills: 'Aptitudes: Microsoft SQL Server, Transact-SQL (T-SQL) y 3 aptitudes mas', badge: 'VERIFIED', link: '#', image: '/images/certifications/microsoft-70-461.avif' },
      { id: 'mongodb', icon: 'lock', color: '#22D3EE', name: 'Introduction to MongoDB', issuer: 'MongoDB', date: 'Expedicion: sept. 2023', credentialId: 'ID de la credencial: MDBa16dly5gq9', badge: 'VERIFIED', link: '#', image: '/images/certifications/mongodb-Introduction%20to%20MongoDB.avif' },
      { id: 'scrum', icon: 'award', color: '#F97316', name: 'Scrum Fundamentals Certified (SFC)', issuer: 'SCRUMstudy', date: 'Expedicion: may. 2023', credentialId: 'ID de la credencial: 981563', badge: 'VERIFIED', link: null, footer: 'Mas certificaciones en progreso...', image: '/images/certifications/scrumstudy-scrum-fundamentals-certified.avif' },
      { id: 'ai-business', icon: 'award', color: '#38BDF8', name: 'Business Implications of AI', issuer: '28 Digital', date: 'Credencial agregada', skills: 'Aptitudes: Inteligencia artificial, estrategia de negocio', badge: 'VERIFIED', link: '#', image: '/images/certifications/28digital-business-implications-of-ai.avif' },
      { id: 'marketing-analytics', icon: 'award', color: '#F59E0B', name: 'Analiticas y metricas de marketing', issuer: 'Tecnologico de Monterrey', date: 'Credencial agregada', skills: 'Aptitudes: Analitica, metricas, marketing digital', badge: 'VERIFIED', link: '#', image: '/images/certifications/tecnologico-de-monterrey_analiticas-y-metricas-de-marketing.avif' },
      { id: 'blockchain-disruption', icon: 'lock', color: '#22D3EE', name: 'La disrupcion del blockchain', issuer: 'Universidad Austral', date: 'Credencial agregada', skills: 'Aptitudes: Blockchain, transformacion digital', badge: 'VERIFIED', link: '#', image: '/images/certifications/universidad-austral_la-disrupcion-del-blockchain.avif' },
      { id: 'blockchain-platforms', icon: 'lock', color: '#60A5FA', name: 'Blockchain Platforms', issuer: 'University at Buffalo', date: 'Credencial agregada', skills: 'Aptitudes: Blockchain, plataformas descentralizadas', badge: 'VERIFIED', link: '#', image: '/images/certifications/university-at-buffalo_blockchain-platforms.avif' },
      { id: 'database-data-scientists', icon: 'award', color: '#34D399', name: 'Database for Data Scientists', issuer: 'University of Colorado Boulder', date: 'Credencial agregada', skills: 'Aptitudes: Bases de datos, ciencia de datos', badge: 'VERIFIED', link: '#', image: '/images/certifications/university-of-colorado-boulder_database-for-data-scientists.avif' },
      { id: 'virtual-reality', icon: 'award', color: '#EC4899', name: 'Virtual Reality', issuer: 'University of London', date: 'Credencial agregada', skills: 'Aptitudes: Realidad virtual, experiencias inmersivas', badge: 'VERIFIED', link: '#', image: '/images/certifications/university-of-london_virtual-reality.avif' },
      { id: 'data-science-ethics', icon: 'shield', color: '#A3E635', name: 'Data Science Ethics', issuer: 'University of Michigan', date: 'Credencial agregada', skills: 'Aptitudes: Etica de datos, ciencia de datos', badge: 'VERIFIED', link: '#', image: '/images/certifications/university-of-michigan_data-science-ethics.avif' },
      { id: 'ai-marketing', icon: 'award', color: '#F97316', name: 'Artificial Intelligence in Marketing', issuer: 'University of Virginia', date: 'Credencial agregada', skills: 'Aptitudes: Inteligencia artificial, marketing', badge: 'VERIFIED', link: '#', image: '/images/certifications/university-of-virginia_artificial-intelligence-in-marketing.avif' },
    ],
  },
  contact: {
    title: 'Contact',
    number: '06',
    subtitle: "Let's connect for projects, work opportunities, or creative ideas.",
    terminalTitle: 'contact',
    terminalLines: ['$ connect --channels', '', 'Available channels:', 'github     Code, repos and dev activity', 'linkedin   Professional profile', 'instagram  Personal / social updates', 'email      Direct contact', 'cv         Resume file', '', '$ ready --status online'],
    channelNames: ['github', 'linkedin', 'instagram', 'email', 'cv'],
    statusBadge: 'Available for opportunities',
    responseText: 'Typically responds within 24h',
    links: [
      { label: 'GitHub', value: 'vrokerev', icon: 'github', href: 'https://github.com/vrokerev', color: '#38BDF8' },
      { label: 'LinkedIn', value: 'victor-mma', icon: 'linkedin', href: 'https://www.linkedin.com/in/victor-mma', color: '#6366F1' },
      { label: 'Instagram', value: '@victhor.ma', icon: 'instagram', href: 'https://www.instagram.com/victhor.ma/', color: '#EC4899' },
      { label: 'Email', value: 'victormanuelmeneses@hotmail.com', icon: 'mail', href: 'mailto:victormanuelmeneses@hotmail.com', color: '#34D399' },
      { label: 'CV', value: 'download.pdf', icon: 'download', href: null, color: '#F59E0B' },
    ],
  },
}

const query = encodeURIComponent(`*[_type == "siteContent"][0]{
  hero,
  about{..., "profileImages": profileImages[].asset->url},
  experience,
  projects{
    ...,
    items[]{..., "id": coalesce(id.current, id), "image": coalesce(image.asset->url, imageUrl), "images": images[].asset->url}
  },
  skills{..., clusters[]{..., "center": [center.x, center.y]}},
  certificates{
    ...,
    items[]{..., "id": coalesce(id.current, id), "image": coalesce(image.asset->url, imageUrl)}
  },
  contact
}`)

function mergeContent(remote: Partial<PortfolioContent> | null): PortfolioContent {
  if (!remote) return DEFAULT_CONTENT
  const about = { ...DEFAULT_CONTENT.about, ...remote.about }
  const clusters = remote.skills?.clusters?.length
    ? remote.skills.clusters.map((cluster, index) => ({
        ...cluster,
        center: Array.isArray(cluster.center) ? cluster.center : DEFAULT_CONTENT.skills.clusters[index]?.center ?? [0.5, 0.5],
        skills: cluster.skills?.length ? cluster.skills : [],
      }))
    : DEFAULT_CONTENT.skills.clusters

  return {
    hero: { ...DEFAULT_CONTENT.hero, ...remote.hero },
    about: {
      ...about,
      paragraphs: about.paragraphs?.length ? about.paragraphs : DEFAULT_CONTENT.about.paragraphs,
      profileImages: about.profileImages?.length ? about.profileImages : DEFAULT_CONTENT.about.profileImages,
      notes: about.notes?.length ? about.notes : DEFAULT_CONTENT.about.notes,
      stats: about.stats?.length ? about.stats : DEFAULT_CONTENT.about.stats,
    },
    experience: { ...DEFAULT_CONTENT.experience, ...remote.experience, items: remote.experience?.items?.length ? remote.experience.items : DEFAULT_CONTENT.experience.items },
    projects: { ...DEFAULT_CONTENT.projects, ...remote.projects, items: remote.projects?.items?.length ? remote.projects.items : DEFAULT_CONTENT.projects.items },
    skills: { ...DEFAULT_CONTENT.skills, ...remote.skills, clusters },
    certificates: { ...DEFAULT_CONTENT.certificates, ...remote.certificates, items: remote.certificates?.items?.length ? remote.certificates.items : DEFAULT_CONTENT.certificates.items },
    contact: { ...DEFAULT_CONTENT.contact, ...remote.contact, links: remote.contact?.links?.length ? remote.contact.links : DEFAULT_CONTENT.contact.links },
  }
}

export function usePortfolioContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    const dataset = import.meta.env.VITE_SANITY_DATASET
    const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-02-19'
    const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

    if (!projectId || !dataset) return

    const controller = new AbortController()
    const host = useCdn ? 'apicdn' : 'api'
    const url = `https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`

    fetch(url, { signal: controller.signal })
      .then(response => (response.ok ? response.json() : Promise.reject(new Error(response.statusText))))
      .then(data => setContent(mergeContent(data.result)))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.warn('Sanity content unavailable, using local fallback.', error)
        }
      })

    return () => controller.abort()
  }, [])

  return content
}

export { DEFAULT_CONTENT }
