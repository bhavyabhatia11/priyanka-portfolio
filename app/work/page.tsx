import { getWorkItems } from "@/lib/content"
import WorkPageClient from "./WorkClient"

export const metadata = {
  title: "Work — Priyanka Datwani",
  description: "Professional roles across edtech, crowdfunding, F&B, events, and more.",
}

export default function WorkPage() {
  const projects = getWorkItems()
  return <WorkPageClient projects={projects} />
}
