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

export default function WorkPageClient({ projects }: { projects: Project[] }) {
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  return (
    <div className="flex flex-col gap-8 pb-16">
      <PageBanner
        topLabel="Priyanka Datwani"
        headline="Selected"
        headlineItalic="Work."
        subtitle="GTM launches, content programs, and brand campaigns across edtech, crowdfunding, F&B, and more — every one with numbers attached."
      />

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

      <SlideshowModal project={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  )
}
