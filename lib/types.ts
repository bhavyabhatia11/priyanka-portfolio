export interface Project {
  slug: string
  title: string
  summary: string
  category: string
  industry: string
  year: string
  impact: string
  tags: string[]
  coverImage: string
  coverVideo?: string
  coverFit?: "cover" | "contain"
  published: boolean
  priority: number
  cardHeight: "tall" | "standard" | "short"
  cardWidth: "wide" | "narrow" | "full"
  folderPath: string
  type?: "work" | "project" | "presentation"
  presentationUrl?: string
  accentColor?: string
  // From frontmatter (detail page)
  client?: string
  role?: string
  clientUrl?: string
  images?: string[]
  videoLinks?: string[]
  content?: string
}

export interface Experiment {
  slug: string
  title: string
  summary: string
  tags: string[]
  coverImage: string
  date: string
  published: boolean
  folderPath: string
  content?: string
}

export interface ExternalLink {
  title: string
  url: string
  description: string
  tags: string[]
}

export interface SkillAppliedAt {
  project: string
  note: string
}

export interface SkillGroup {
  label: string
  skills: string[]
  color?: string
  description?: string
  appliedAt?: SkillAppliedAt[]
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLinks {
  linkedin: string
  instagram: string
}

export interface SiteConfig {
  name: string
  title: string
  tagline: string
  heroLine1: string
  heroLine2: string
  heroImage?: string
  closingLine: string
  email: string
  social: SocialLinks
  nav: NavItem[]
  resume: string
  availableForWork: boolean
}

export interface Service {
  title: string
  description: string
}

export interface Stat {
  value: string
  label: string
}

export interface StudioContent {
  headline: string
  subheadline: string
  description: string
  body: string
  services: Service[]
  stats: Stat[]
}

export interface InstagramPost {
  id: string
  type: "image" | "reel"
  src: string
  thumbnail?: string
  alt: string
  caption?: string
}

export interface InstagramFeed {
  handle: string
  profileUrl: string
  posts: InstagramPost[]
}
