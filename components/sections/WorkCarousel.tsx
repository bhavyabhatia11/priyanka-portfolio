"use client"

import { useRef, useLayoutEffect, useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Project, SkillGroup } from "@/lib/types"
import { industryPill } from "@/lib/industryPill"
import SlideshowModal from "@/components/ui/SlideshowModal"
import SkillModal from "@/components/ui/SkillModal"

const GAP = 40

type CardSizes = { rowH: number; projW: number; skillW: number }

function useCardSizes(): CardSizes {
  const [sizes, setSizes] = useState<CardSizes>({ rowH: 456, projW: 672, skillW: 305 })
  useEffect(() => {
    function update() {
      const vw = window.innerWidth
      if (vw < 1100) {
        setSizes({ rowH: 320, projW: 460, skillW: 210 })
      } else if (vw < 1380) {
        setSizes({ rowH: 380, projW: 560, skillW: 255 })
      } else {
        setSizes({ rowH: 456, projW: 672, skillW: 305 })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return sizes
}

// ── Project card — work type navigates to page, project/presentation opens modal ──
function ProjectCard({
  project,
  onPresent,
  sizes,
}: {
  project: Project
  onPresent: (p: Project) => void
  sizes: CardSizes
}) {
  const [hovered, setHovered] = useState(false)
  const pill = industryPill(project.industry)
  const isWork = !project.type || project.type === "work" || project.type === "project"

  const wrapperStyle = {
    flexShrink: 0 as const,
    display: "block",
    width: sizes.projW,
    height: sizes.rowH,
    position: "relative" as const,
    cursor: "pointer",
  }

  const inner = (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl"
      style={{
        backgroundColor: project.accentColor || "var(--color-border)",
        transform: hovered ? "scale(1.16)" : "scale(1)",
        transformOrigin: "center center",
        transition: "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease",
        boxShadow: hovered ? "0 24px 64px rgba(17,17,16,0.18)" : "none",
        zIndex: hovered ? 10 : 1,
      }}
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            transition: "transform 700ms ease-out",
            transform: hovered ? "scale(1.05)" : "scale(1.0)",
          }}
          sizes="480px"
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

      {/* Industry pill */}
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

      {/* Gradient */}
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
            fontSize: sizes.rowH < 400 ? "1.8rem" : "2.4rem",
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
                fontSize: sizes.rowH < 400 ? "0.82rem" : "0.95rem",
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

      {/* View indicator */}
      <div
        className="absolute top-5 right-5 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(249,248,246,0.9)" }}
        >
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
            <path d="M6 4l9 5-9 5V4z" fill="#111110" />
          </svg>
        </div>
      </div>
    </div>
  )

  if (isWork) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={wrapperStyle}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      onClick={() => onPresent(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...wrapperStyle, background: "none", border: "none", padding: 0 }}
    >
      {inner}
    </button>
  )
}

// ── Skill card — same size as project card ───────────────────
function SkillCard({ group, onClick, sizes }: { group: SkillGroup; onClick: (g: SkillGroup) => void; sizes: CardSizes }) {
  const [hovered, setHovered] = useState(false)
  const bg = group.color || "#EDE8E0"
  const isDark = ["#2A2A28", "#111110", "#3D3D3B", "#1a1a18"].includes(bg)
  const fg = isDark ? "#F9F8F6" : "#111110"
  const muted = isDark ? "rgba(249,248,246,0.55)" : "rgba(17,17,16,0.5)"
  const pillBg = isDark ? "rgba(249,248,246,0.13)" : "rgba(17,17,16,0.09)"

  return (
    // Outer wrapper holds layout space — never changes size
    <div
      style={{ width: sizes.skillW, height: sizes.rowH, flexShrink: 0, position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Inner visual card — scales up on hover into the carousel padding */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          backgroundColor: bg,
          cursor: "pointer",
          transform: hovered ? "scale(1.16)" : "scale(1)",
          transformOrigin: "center center",
          transition: "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease",
          boxShadow: hovered
            ? isDark
              ? "0 24px 64px rgba(17,17,16,0.5)"
              : "0 24px 64px rgba(17,17,16,0.18)"
            : "none",
          zIndex: hovered ? 10 : 1,
        }}
        onClick={() => onClick(group)}
      >
        {/* Category pill — top left */}
        <div className="absolute top-5 left-5">
          <span
            className="text-xs font-mono tracking-wider uppercase rounded-full"
            style={{
              backgroundColor: pillBg,
              color: fg,
              padding: "5px 12px",
              display: "inline-block",
              lineHeight: "1.4",
            }}
          >
            Skills
          </span>
        </div>

        {/* "Tap to explore" hint on hover — top right */}
        <div
          className="absolute top-5 right-5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full"
            style={{
              backgroundColor: pillBg,
              padding: "5px 10px",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke={fg} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "0.6rem", color: fg, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.05em" }}>
              explore
            </span>
          </div>
        </div>

        {/* Content — full height flex column, anchored to bottom */}
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ padding: 20 }}
        >
          {/* Title — slides up on hover */}
          <h3
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: sizes.rowH < 400 ? "1.8rem" : "2.4rem",
              fontWeight: 400,
              color: fg,
              lineHeight: 1.1,
              textAlign: "left",
              transition: "transform 350ms ease",
              transform: hovered ? "translateY(-8px)" : "translateY(0)",
            }}
          >
            {group.label}
          </h3>

          {/* Hover — description only, no skill tags */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: hovered ? 120 : 0,
              opacity: hovered ? 1 : 0,
              transition: "max-height 350ms ease, opacity 300ms ease",
            }}
          >
            {group.description && (
              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: muted,
                  marginTop: 8,
                }}
              >
                {group.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Marquee row ──────────────────────────────────────────────
function MarqueeRow({
  itemCount,
  durationMs,
  children,
}: {
  itemCount: number
  durationMs: number
  children: ReactNode
}) {
  const firstSetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useLayoutEffect(() => {
    const set = firstSetRef.current
    const track = trackRef.current
    if (!set || !track) return
    const offset = set.offsetWidth + GAP
    track.style.setProperty("--mq-offset", `-${offset}px`)
  }, [itemCount])

  return (
    <div
      className="carousel-row-outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          gap: GAP,
          animation: `mq-left ${durationMs}ms linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div ref={firstSetRef} className="marquee-set" style={{ gap: GAP }}>{children}</div>
        <div className="marquee-set" aria-hidden="true" style={{ gap: GAP }}>{children}</div>
        <div className="marquee-set" aria-hidden="true" style={{ gap: GAP }}>{children}</div>
      </div>
    </div>
  )
}

// ── Interleave projects + skills ─────────────────────────────
function buildRow(
  projects: Project[],
  skills: SkillGroup[],
  skillEvery: number,
  skillOffset: number
): Array<{ kind: "project"; project: Project } | { kind: "skill"; group: SkillGroup }> {
  const result: Array<{ kind: "project"; project: Project } | { kind: "skill"; group: SkillGroup }> = []
  let si = skillOffset % Math.max(skills.length, 1)
  projects.forEach((p, i) => {
    result.push({ kind: "project", project: p })
    if ((i + 1) % skillEvery === 0 && skills.length > 0) {
      result.push({ kind: "skill", group: skills[si % skills.length] })
      si++
    }
  })
  return result
}

// ── Main export ──────────────────────────────────────────────
export default function WorkCarousel({
  projects,
  skillGroups,
}: {
  projects: Project[]
  skillGroups: SkillGroup[]
}) {
  const [activeModal, setActiveModal] = useState<Project | null>(null)
  const [activeSkill, setActiveSkill] = useState<SkillGroup | null>(null)
  const sizes = useCardSizes()

  if (projects.length === 0 && skillGroups.length === 0) return null

  const workProjects = projects.filter((p) => !p.type || p.type === "work")
  const otherProjects = projects.filter((p) => p.type && p.type !== "work")

  // Row 1: work cards + skills
  const row1 = buildRow(workProjects, skillGroups, 2, 0)
  // Row 2: project/presentation cards + skills
  const row2 = buildRow(otherProjects, skillGroups, 2, 1)

  return (
    <section className="carousel-section mt-4 flex flex-col">
      <MarqueeRow durationMs={88000} itemCount={row1.length}>
        {row1.map((item, i) =>
          item.kind === "project" ? (
            <ProjectCard key={`r1-${item.project.slug}`} project={item.project} onPresent={setActiveModal} sizes={sizes} />
          ) : (
            <SkillCard key={`r1-s-${i}`} group={item.group} onClick={setActiveSkill} sizes={sizes} />
          )
        )}
      </MarqueeRow>

      <MarqueeRow durationMs={70000} itemCount={row2.length}>
        {row2.map((item, i) =>
          item.kind === "project" ? (
            <ProjectCard key={`r2-${item.project.slug}`} project={item.project} onPresent={setActiveModal} sizes={sizes} />
          ) : (
            <SkillCard key={`r2-s-${i}`} group={item.group} onClick={setActiveSkill} sizes={sizes} />
          )
        )}
      </MarqueeRow>

      <SlideshowModal project={activeModal} onClose={() => setActiveModal(null)} />
      <SkillModal group={activeSkill} onClose={() => setActiveSkill(null)} />
    </section>
  )
}
