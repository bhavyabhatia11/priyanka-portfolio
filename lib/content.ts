import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project, SiteConfig, StudioContent, InstagramFeed, Experiment, ExternalLink, SkillGroup } from "./types"

const contentDir = path.join(process.cwd(), "content")
const projectsDir = path.join(contentDir, "projects")

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a project folder name like "1-Milaap-Social-Media-Marketing"
 * into { priority, name, category }
 */
function parseFolderName(folderName: string) {
  const match = folderName.match(/^(\d+)-([^-]+)-?(.*)$/)
  if (!match) return null

  const priority = parseInt(match[1], 10)
  const name = match[2]
  const category = match[3] ? match[3].replace(/-/g, " ") : ""

  return { priority, name, category }
}

// ---------------------------------------------------------------------------
// Site & Studio
// ---------------------------------------------------------------------------

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(contentDir, "site.json"), "utf-8")
  return JSON.parse(raw) as SiteConfig
}

export function getStudioContent(): StudioContent {
  const raw = fs.readFileSync(path.join(contentDir, "studio.json"), "utf-8")
  return JSON.parse(raw) as StudioContent
}

export function getInstagramFeed(): InstagramFeed {
  const raw = fs.readFileSync(path.join(contentDir, "instagram.json"), "utf-8")
  return JSON.parse(raw) as InstagramFeed
}

// ---------------------------------------------------------------------------
// Projects (folder-based)
// ---------------------------------------------------------------------------

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return []

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true })
  const projects: Project[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const parsed = parseFolderName(entry.name)
    if (!parsed) continue

    const folderPath = path.join(projectsDir, entry.name)
    const briefPath = path.join(folderPath, "brief.md")

    if (!fs.existsSync(briefPath)) continue

    const raw = fs.readFileSync(briefPath, "utf-8")
    const { data, content } = matter(raw)

    if (data.published === false) continue

    // Optional meta.json overrides
    let metaOverrides: Record<string, unknown> = {}
    const metaPath = path.join(folderPath, "meta.json")
    if (fs.existsSync(metaPath)) {
      metaOverrides = JSON.parse(fs.readFileSync(metaPath, "utf-8"))
    }

    const project: Project = {
      slug: (metaOverrides.slug as string) || (data.slug as string) || parsed.name.toLowerCase(),
      title: (metaOverrides.title as string) || (data.title as string) || parsed.name.replace(/-/g, " "),
      summary: (data.summary as string) || "",
      category: (data.category as string) || parsed.category || "",
      industry: (data.industry as string) || "",
      year: (data.year as string) || "",
      impact: (data.impact as string) || "",
      tags: (data.tags as string[]) || [],
      coverImage: (data.coverImage as string) || "",
      coverVideo: data.coverVideo as string | undefined,
      coverFit: (data.coverFit as Project["coverFit"]) || "cover",
      published: data.published !== false,
      priority: parsed.priority,
      cardHeight: (data.cardHeight as Project["cardHeight"]) || "standard",
      cardWidth: (data.cardWidth as Project["cardWidth"]) || "wide",
      folderPath: entry.name,
      type: (data.type as Project["type"]) || "work",
      presentationUrl: data.presentationUrl as string | undefined,
      accentColor: data.accentColor as string | undefined,
      client: data.client as string | undefined,
      role: data.role as string | undefined,
      clientUrl: data.clientUrl as string | undefined,
      images: (data.images as string[]) || [],
      videoLinks: (data.videoLinks as string[]) || [],
      content: content || "",
    }

    projects.push(project)
  }

  return projects.sort((a, b) => a.priority - b.priority)
}

export function getProjectBySlug(slug: string): Project | null {
  const all = getAllProjects()
  const meta = all.find((p) => p.slug === slug)
  if (!meta) return null

  const briefPath = path.join(projectsDir, meta.folderPath, "brief.md")
  if (!fs.existsSync(briefPath)) return meta

  const raw = fs.readFileSync(briefPath, "utf-8")
  const { data, content } = matter(raw)

  return {
    ...meta,
    ...data,
    slug,
    content,
    folderPath: meta.folderPath,
    priority: meta.priority,
    cardHeight: meta.cardHeight,
    cardWidth: meta.cardWidth,
  } as Project
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug)
}

/** Professional work experience only (type: "work") */
export function getWorkItems(): Project[] {
  return getAllProjects().filter((p) => p.type === "work" || !p.type)
}

/** Independent projects and presentation decks (type: "project" | "presentation") */
export function getProjectItems(): Project[] {
  return getAllProjects().filter((p) => p.type === "project" || p.type === "presentation")
}

// ---------------------------------------------------------------------------
// Experiments (folder-based, same pattern as projects)
// ---------------------------------------------------------------------------

export function getAllExperiments(): Experiment[] {
  const experimentsDir = path.join(contentDir, "experiments")
  if (!fs.existsSync(experimentsDir)) return []

  const entries = fs.readdirSync(experimentsDir, { withFileTypes: true })
  const experiments: Experiment[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const parsed = parseFolderName(entry.name)
    if (!parsed) continue

    const folderPath = path.join(experimentsDir, entry.name)
    const briefPath = path.join(folderPath, "brief.md")

    if (!fs.existsSync(briefPath)) continue

    const raw = fs.readFileSync(briefPath, "utf-8")
    const { data } = matter(raw)

    if (data.published === false) continue

    experiments.push({
      slug: (data.slug as string) || parsed.name.toLowerCase(),
      title: (data.title as string) || parsed.name.replace(/-/g, " "),
      summary: (data.summary as string) || "",
      tags: (data.tags as string[]) || [],
      coverImage: (data.coverImage as string) || "",
      date: (data.date as string) || "",
      published: data.published !== false,
      folderPath: entry.name,
    })
  }

  return experiments.sort((a, b) => {
    const pA = parseFolderName(a.folderPath)?.priority ?? 999
    const pB = parseFolderName(b.folderPath)?.priority ?? 999
    return pA - pB
  })
}

// ---------------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------------

export function getLinks(): ExternalLink[] {
  const linksPath = path.join(contentDir, "links.json")
  if (!fs.existsSync(linksPath)) return []
  const raw = fs.readFileSync(linksPath, "utf-8")
  return JSON.parse(raw) as ExternalLink[]
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export function getSkills(): SkillGroup[] {
  const skillsPath = path.join(contentDir, "skills.json")
  if (!fs.existsSync(skillsPath)) return []
  const raw = fs.readFileSync(skillsPath, "utf-8")
  const parsed = JSON.parse(raw) as { skillGroups: SkillGroup[] }
  return parsed.skillGroups
}
