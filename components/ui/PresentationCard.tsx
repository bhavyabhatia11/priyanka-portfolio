"use client"

import { useState } from "react"
import Image from "next/image"
import type { Project } from "@/lib/types"

const aspectRatioMap = {
  tall: "3/4",
  standard: "4/3",
  short: "16/9",
}

export default function PresentationCard({
  project,
  onClick,
}: {
  project: Project
  onClick: (project: Project) => void
}) {
  const [hovered, setHovered] = useState(false)
  const aspectRatio = aspectRatioMap[project.cardHeight] || "4/3"

  return (
    <button
      className="group block w-full text-left"
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio }}
      >
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
            className="w-full h-full"
            style={{ backgroundColor: project.accentColor || "#EDE8E0" }}
          />
        )}

        {/* "Presentation" badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(249,248,246,0.85)",
              backdropFilter: "blur(8px)",
              color: "var(--color-fg)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M3 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M5 7v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Deck
          </span>
        </div>

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            backgroundColor: "rgba(17,17,16,0.5)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(249,248,246,0.95)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 5l8 5-8 5V5z" fill="var(--color-fg)" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient + title */}
        <div className="absolute inset-x-0 bottom-0 h-28">
          <div
            className="absolute inset-0 rounded-b-xl"
            style={{
              background: "linear-gradient(to top, rgba(17,17,16,0.7) 0%, transparent 100%)",
            }}
          />
          <div className="relative h-full flex items-end p-5">
            <h3
              className="font-serif leading-tight"
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
      </div>

      <div className="pt-3 px-0.5">
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {project.summary}
        </p>
      </div>
    </button>
  )
}
