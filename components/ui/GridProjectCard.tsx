"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/lib/types"
import { industryPill } from "@/lib/industryPill"

function useTitleSize() {
  const [fontSize, setFontSize] = useState("2.4rem")
  useEffect(() => {
    function update() {
      const vw = window.innerWidth
      if (vw < 640) setFontSize("1.5rem")
      else if (vw < 1100) setFontSize("1.8rem")
      else if (vw < 1380) setFontSize("2rem")
      else setFontSize("2.4rem")
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return fontSize
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function GridProjectCard({
  project,
  onPresent,
}: {
  project: Project
  onPresent: (p: Project) => void
}) {
  const [hovered, setHovered] = useState(false)
  const titleSize = useTitleSize()
  const pill = industryPill(project.industry)
  const isWork = !project.type || project.type === "work" || project.type === "project"
  const isPresentation = project.type === "presentation"
  const inner = (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        aspectRatio: "3/2",
        backgroundColor: project.accentColor || "var(--color-border)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transformOrigin: "center center",
        transition: "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease",
        boxShadow: hovered ? "0 24px 64px rgba(17,17,16,0.18)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className={project.coverFit === "contain" ? "object-contain" : "object-cover"}
          style={{
            transition: "transform 700ms ease-out",
            transform: hovered ? "scale(1.05)" : "scale(1.0)",
            padding: project.coverFit === "contain" ? "16px" : 0,
          }}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: project.accentColor || "#EDE8E0" }}
        >
          <span
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "5rem",
              fontStyle: "italic",
              color: "var(--color-muted)",
              opacity: 0.3,
            }}
          >
            {project.title[0]}
          </span>
        </div>
      )}

      {/* Industry pill — color-coded like carousel */}
      <div className="absolute top-5 left-5">
        <span
          className="text-xs font-mono tracking-wider uppercase rounded-full"
          style={{
            backgroundColor: pill.bg,
            color: pill.text,
            padding: "5px 12px",
            display: "inline-block",
            lineHeight: "1.4",
          }}
        >
          {project.industry}
        </span>
      </div>

      {/* Gradient — always visible */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(17,17,16,0.9) 0%, rgba(17,17,16,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Content — full height flex column, anchored to bottom (mirrors SkillCard) */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ padding: 20, textAlign: "left" }}
      >
        <h3
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: titleSize,
            fontWeight: 400,
            color: "#F9F8F6",
            lineHeight: 1.1,
            textAlign: "left",
            transition: "transform 350ms ease",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? 120 : 0,
            opacity: hovered ? 1 : 0,
            transition: "max-height 350ms ease, opacity 300ms ease",
          }}
        >
          {project.summary && (
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.55,
                color: "rgba(249,248,246,0.7)",
                marginTop: 8,
              }}
            >
              {project.summary}
            </p>
          )}
        </div>
      </div>

      {/* View indicator — top right on hover */}
      <div
        className="absolute top-5 right-5 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(249,248,246,0.9)" }}
        >
          {isPresentation ? (
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path d="M6 4l9 5-9 5V4z" fill="#111110" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path d="M5 3l10 6-10 6V3z" fill="#111110" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )

  if (isWork) {
    return (
      <motion.div variants={item}>
        <Link href={`/projects/${project.slug}`} className="block">
          {inner}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      variants={item}
      onClick={() => onPresent(project)}
      className="block w-full text-left"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {inner}
    </motion.button>
  )
}
