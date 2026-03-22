import { getSiteConfig, getAllProjects, getSkills } from "@/lib/content"
import Hero from "@/components/sections/Hero"
import WorkCarousel from "@/components/sections/WorkCarousel"

export default function Home() {
  const site = getSiteConfig()
  const projects = getAllProjects()
  const skillGroups = getSkills()

  return (
    <div className="flex flex-col gap-8">
      <Hero site={site} />
      <WorkCarousel projects={projects} skillGroups={skillGroups} />
    </div>
  )
}
