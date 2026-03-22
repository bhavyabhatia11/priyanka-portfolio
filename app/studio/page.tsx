import { getStudioContent, getSkills } from "@/lib/content"
import StudioClient from "./StudioClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Studio — Priyanka Datwani",
}

export default function StudioPage() {
  const studio = getStudioContent()
  const skills = getSkills()
  return <StudioClient studio={studio} skills={skills} />
}
