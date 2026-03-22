"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Project, SkillGroup } from "@/lib/types"
import WorkCard from "@/components/ui/WorkCard"
import SkillCard from "@/components/ui/SkillCard"
import PresentationCard from "@/components/ui/PresentationCard"
import SlideshowModal from "@/components/ui/SlideshowModal"

type GridItem =
  | { itemType: "work"; project: Project }
  | { itemType: "presentation"; project: Project }
  | { itemType: "skill"; group: SkillGroup }

/**
 * Interleave projects and skill groups into a single grid array.
 * Skill cards appear after every 2 work/presentation items.
 */
function buildGrid(projects: Project[], skillGroups: SkillGroup[]): GridItem[] {
  const items: GridItem[] = []
  let skillIndex = 0

  projects.forEach((project, i) => {
    // Insert a skill card before every 3rd project (0-indexed: positions 2, 5, 8...)
    if (i > 0 && i % 2 === 0 && skillIndex < skillGroups.length) {
      items.push({ itemType: "skill", group: skillGroups[skillIndex++] })
    }
    items.push(
      project.type === "presentation"
        ? { itemType: "presentation", project }
        : { itemType: "work", project }
    )
  })

  // Append remaining skill groups at the end
  while (skillIndex < skillGroups.length) {
    items.push({ itemType: "skill", group: skillGroups[skillIndex++] })
  }

  return items
}

function getColSpan(item: GridItem): string {
  if (item.itemType === "skill") return "col-span-1"
  const w = item.project.cardWidth
  if (w === "full") return "md:col-span-3"
  if (w === "wide") return "md:col-span-2"
  return "col-span-1"
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function WorkGrid({
  projects,
  skillGroups,
}: {
  projects: Project[]
  skillGroups: SkillGroup[]
}) {
  const [activeModal, setActiveModal] = useState<Project | null>(null)
  const grid = buildGrid(projects, skillGroups)
  const workCount = projects.filter((p) => p.type !== "presentation").length

  return (
    <section className="pb-24 sm:pb-36">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="flex items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b"
          style={{ borderColor: "var(--color-border)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-serif"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--color-fg)",
            }}
          >
            Work
          </h2>
          <span
            className="text-xs font-mono tracking-wider"
            style={{ color: "var(--color-muted)" }}
          >
            {workCount} projects
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {grid.map((item, i) => (
            <motion.div
              key={i}
              variants={itemAnim}
              className={getColSpan(item)}
            >
              {item.itemType === "work" && (
                <WorkCard project={item.project} />
              )}
              {item.itemType === "presentation" && (
                <PresentationCard
                  project={item.project}
                  onClick={setActiveModal}
                />
              )}
              {item.itemType === "skill" && (
                <SkillCard group={item.group} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="mt-16 text-sm text-center"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          That&apos;s all folks! Hope to connect with you soon :)
        </motion.p>
      </div>

      {/* Presentation slideshow modal */}
      <SlideshowModal project={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  )
}
