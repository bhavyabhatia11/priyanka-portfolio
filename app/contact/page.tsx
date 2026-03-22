import { getSiteConfig } from "@/lib/content"
import ContactClient from "./ContactClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Priyanka Datwani",
}

export default function ContactPage() {
  const site = getSiteConfig()
  return <ContactClient site={site} />
}
