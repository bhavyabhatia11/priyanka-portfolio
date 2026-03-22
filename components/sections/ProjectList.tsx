"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Project, SiteConfig } from "@/lib/types"
import ProjectCard from "@/components/ui/ProjectCard"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ProjectList({
  projects,
  site,
}: {
  projects: Project[]
  site: SiteConfig
}) {
  return (
    <section className="pb-20 sm:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="flex items-baseline justify-between mb-2 pb-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "var(--color-muted)" }}
          >
            Selected Work
          </h2>
          <span className="text-xs font-mono" style={{ color: "var(--color-muted)" }}>
            {projects.length} projects
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, i) => (
            <motion.div key={project.slug} variants={item}>
              <ProjectCard project={project} index={i} variant="list" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {site.closingLine}
          </p>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="transition-all hover:opacity-85 hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2.5 rounded-full"
            style={{
              backgroundColor: "var(--color-fg)",
              color: "var(--color-bg)",
              padding: "12px 28px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Let&apos;s connect
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
