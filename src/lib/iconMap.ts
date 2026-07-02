import {
  Award,
  Code2,
  Download,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react'

export const ICONS = {
  award: Award,
  code: Code2,
  download: Download,
  github: Github,
  graduation: GraduationCap,
  instagram: Instagram,
  linkedin: Linkedin,
  lock: Lock,
  mail: Mail,
  shield: Shield,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  user: User,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

export function getIcon(name: string | null | undefined, fallback: IconName = 'award') {
  return ICONS[(name as IconName) || fallback] ?? ICONS[fallback]
}
