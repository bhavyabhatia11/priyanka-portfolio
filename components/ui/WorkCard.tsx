"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/lib/types"

const aspectRatioMap = {
  tall: "3/4",
  standard: "4/3",
  short: "16/9",
}

export default function WorkCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const aspectRatio = aspectRatioMap[project.cardHeight] || "4/3"

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio }}
      >
        {/* Image cover */}
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: project.accentColor || "#EDE8E0",
            }}
          >
            <span
              className="font-serif italic"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 5rem)",
                color: "var(--color-muted)",
                opacity: 0.5,
              }}
            >
              {project.title[0]}
            </span>
          </div>
        )}

        {/* Always-visible industry tag (top-left) */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-mono tracking-wider uppercase px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(249,248,246,0.85)",
              backdropFilter: "blur(8px)",
              color: "var(--color-fg)",
            }}
          >
            {project.industry}
          </span>
        </div>

        {/* Hover overlay: gradient + info */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: "linear-gradient(to top, rgba(17,17,16,0.85) 0%, rgba(17,17,16,0.2) 50%, transparent 100%)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Bottom info — slides in on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-400"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <p
            className="text-xs font-mono tracking-wider uppercase mb-1"
            style={{ color: "rgba(249,248,246,0.6)" }}
          >
            {project.impact}
          </p>
          <div className="flex items-end justify-between gap-2">
            <h3
              className="font-serif leading-tight"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                color: "#F9F8F6",
              }}
            >
              {project.title}
            </h3>
            <span
              className="text-lg shrink-0 mb-1 transition-transform duration-300"
              style={{
                color: "rgba(249,248,246,0.7)",
                transform: hovered ? "translateX(3px)" : "none",
              }}
            >
              →
            </span>
          </div>
        </div>

        {/* Title visible always when not hovered (bottom-left, subtle) */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-24 rounded-b-xl"
            style={{
              background: "linear-gradient(to top, rgba(17,17,16,0.55) 0%, transparent 100%)",
            }}
          />
          <h3
            className="relative font-serif leading-tight"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 400,
              color: "#F9F8F6",
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Below-card summary */}
      <div className="pt-4 px-1">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          {project.summary}
        </p>
      </div>
    </Link>
  )
}
