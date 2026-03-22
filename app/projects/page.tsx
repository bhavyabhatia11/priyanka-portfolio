import { getProjectItems } from "@/lib/content"
import ProjectsPageClient from "./ProjectsClient"

export const metadata = {
  title: "Projects — Priyanka Datwani",
  description: "Independent projects, community work, and creative experiments.",
}

export default function ProjectsPage() {
  const projects = getProjectItems()
  return <ProjectsPageClient projects={projects} />
}
