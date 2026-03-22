"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Project } from "@/lib/types"
import Tag from "./Tag"

interface ProjectCardProps {
  project: Project
  index: number
  variant?: "list" | "grid"
}

export default function ProjectCard({ project, index, variant = "list" }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  if (variant === "grid") {
    const hasImage = !!(project.coverImage && project.coverImage !== "/images/projects/" + project.slug + "/cover.jpg")

    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            aspectRatio: "1/1",
            backgroundColor: project.accentColor || "var(--color-border)",
          }}
        >
          {/* Background image: always sharp */}
          {hasImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out"
              style={{
                transform: hovered ? "scale(1.05)" : "scale(1.0)",
              }}
            />
          )}

          {/* Gradient overlay: fades to black at bottom for text legibility */}
          {hasImage && (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)" }}
            />
          )}

          {/* Default state: large serif title only */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 transition-opacity duration-300"
            style={{ opacity: hovered ? 0 : 1 }}
          >
            <h3
              className="font-serif leading-none"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: hasImage ? "#F9F8F6" : "var(--color-fg)",
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Hover state: title as label + summary */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 transition-all duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: hasImage ? "rgba(255,255,255,0.6)" : "var(--color-muted)" }}
            >
              {project.title}
            </span>
            {project.summary && (
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: hasImage ? "#F9F8F6" : "var(--color-fg)",
                  opacity: 0.85,
                }}
              >
                {project.summary}
              </p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // List variant
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center py-6 border-b gap-6 transition-opacity"
      style={{ borderColor: "var(--color-border)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-xs font-mono w-6 shrink-0"
        style={{ color: "var(--color-muted)" }}
      >
        0{index + 1}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1.5">
          <h3
            className="text-base font-medium transition-colors"
            style={{ color: hovered ? "var(--color-accent)" : "var(--color-fg)" }}
          >
            {project.title}
          </h3>
          <span className="text-xs" style={{ color: "var(--color-muted)" }}>
            {project.industry}
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {project.summary}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <Tag label={project.impact} />
        <span
          className="text-sm transition-transform duration-300"
          style={{
            color: "var(--color-muted)",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          →
        </span>
      </div>
    </Link>
  )
}
