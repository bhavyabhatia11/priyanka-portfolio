"use client"

import { motion } from "framer-motion"
import type { StudioContent, SkillGroup } from "@/lib/types"
import SlideUp from "@/components/ui/SlideUp"
import FadeIn from "@/components/ui/FadeIn"

export default function StudioClient({ studio, skills = [] }: { studio: StudioContent; skills?: SkillGroup[] }) {
  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 sm:mb-24">
          <SlideUp className="mb-6">
            <p
              className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              Studio
            </p>
            <h1
              className="font-serif leading-tight"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 400,
              }}
            >
              {studio.headline}
            </h1>
          </SlideUp>
          <SlideUp delay={0.15} className="max-w-xl">
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {studio.subheadline}
            </p>
          </SlideUp>
        </div>

        {/* Stats */}
        <FadeIn className="mb-16 sm:mb-24">
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-12 border-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            {studio.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3 sm:block">
                <p
                  className="font-serif sm:mb-1"
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 400,
                    color: "var(--color-fg)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-mono tracking-wider uppercase" style={{ color: "var(--color-muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn className="mb-16 sm:mb-24 max-w-2xl">
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-muted)", opacity: 0.85 }}>
            {studio.description}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)", opacity: 0.85 }}>
            {studio.body}
          </p>
        </FadeIn>

        {/* Services */}
        <div>
          <SlideUp className="mb-8">
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>
              Services
            </p>
          </SlideUp>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "var(--color-border)" }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {studio.services.map((service) => (
              <motion.div
                key={service.title}
                className="p-6"
                style={{ backgroundColor: "var(--color-bg)" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.4 } },
                }}
              >
                <p className="text-sm font-medium mb-2" style={{ color: "var(--color-fg)" }}>
                  {service.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <SlideUp className="mb-8">
              <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>
                Skills & Expertise
              </p>
            </SlideUp>
            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-10">
                {skills.map((group) => (
                  <div key={group.label}>
                    <p
                      className="text-xs font-mono tracking-wider uppercase mb-4"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1.5 rounded-full border"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-fg)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  )
}
