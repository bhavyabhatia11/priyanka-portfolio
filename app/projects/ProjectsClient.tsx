"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Project } from "@/lib/types"
import PageBanner from "@/components/sections/PageBanner"
import GridProjectCard from "@/components/ui/GridProjectCard"
import SlideshowModal from "@/components/ui/SlideshowModal"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  return (
    <div className="flex flex-col gap-8 pb-16">
      <PageBanner
        topLabel="Priyanka Datwani"
        headline="Side"
        headlineItalic="Quests."
        subtitle="Community projects, spec work, and marketing decks — where the creative demons run free."
      />

      {projects.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          More coming soon.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <GridProjectCard
              key={project.slug}
              project={project}
              onPresent={setActiveModal}
            />
          ))}
        </motion.div>
      )}

      <SlideshowModal project={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  )
}
