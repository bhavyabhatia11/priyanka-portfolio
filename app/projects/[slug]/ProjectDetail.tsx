"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Project } from "@/lib/types"
import Tag from "@/components/ui/Tag"
import MediaGrid from "@/components/ui/MediaGrid"
import ReelStrip from "@/components/ui/ReelStrip"
import ReactMarkdown from "react-markdown"

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ProjectDetail({ project }: { project: Project }) {
  const heroVideo = project.coverVideo
  const heroImage = !heroVideo ? (project.images?.[0] || project.coverImage) : null

  return (
    <article style={{ paddingBottom: "64px", paddingTop: "8px" }}>

      {/* Breadcrumb */}
      <motion.nav
        aria-label="Breadcrumb"
        style={{ marginBottom: "40px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ol
          className="flex items-center gap-1.5 flex-wrap"
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
            color: "var(--color-muted)",
          }}
        >
          <li>
            <Link
              href="/"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-muted)" }}
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" style={{ opacity: 0.4 }}>/</li>
          <li>
            <Link
              href="/work"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-muted)" }}
            >
              Work
            </Link>
          </li>
          <li aria-hidden="true" style={{ opacity: 0.4 }}>/</li>
          <li
            style={{ color: "var(--color-fg)", fontWeight: 500 }}
            aria-current="page"
          >
            {project.title}
          </li>
        </ol>
      </motion.nav>

      {/* ── Hero image ── */}
      <motion.div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16/7", minHeight: "220px", backgroundColor: "var(--color-border)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        {heroVideo && (
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {heroImage && (
          <Image
            src={heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(17,17,16,0.85) 0%, rgba(17,17,16,0.1) 55%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: "32px 32px 48px 32px" }}>
          <p
            className="text-xs font-mono tracking-widest uppercase mb-2"
            style={{ color: "rgba(249,248,246,0.5)" }}
          >
            {project.industry} · {project.year}
          </p>
          <h1
            className="font-serif leading-none"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              fontWeight: 400,
              color: "#F9F8F6",
            }}
          >
            {project.title}
          </h1>
        </div>
      </motion.div>

      {/* ── Spacer ── */}
      <div style={{ height: "48px" }} />

      {/* ── Metrics row ── */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4"
        style={{
          backgroundColor: "var(--color-sidebar-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { label: "Impact", value: project.impact, accent: true },
          { label: "Role", value: project.role || project.category },
          { label: "Industry", value: project.industry },
          { label: "Year", value: project.year },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              padding: "24px 28px",
              borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
              borderBottom: i < 2 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--color-muted)",
                marginBottom: "10px",
              }}
            >
              {m.label}
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                lineHeight: 1.4,
                color: m.accent ? "var(--color-accent)" : "var(--color-fg)",
              }}
            >
              {m.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ── Spacer ── */}
      <div style={{ height: "40px" }} />

      {/* ── Summary + Tags ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--color-muted)", maxWidth: "680px" }}
        >
          {project.summary}
        </p>

        <div style={{ height: "20px" }} />

        <div className="flex flex-wrap gap-2.5">
          {project.tags?.map((tag) => <Tag key={tag} label={tag} />)}
        </div>
      </motion.div>

      {/* ── Spacer ── */}
      <div style={{ height: "56px" }} />

      {/* ── Mobile: Grid first, then case study text ── */}
      <div className="lg:hidden">
        <MediaGrid images={project.images} skipFirstImage={!heroVideo} />

        {project.content && (
          <div style={{ height: "40px" }} />
        )}

        {project.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-sm max-w-none" style={{ color: "var(--color-fg)" }}>
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Desktop: Case study left (38%) sticky + Grid right (62%) ── */}
      <div className="hidden lg:flex gap-12 items-start">
        {/* Left — sticky case study */}
        {project.content && (
          <motion.div
            className="w-[38%] flex-shrink-0 sticky top-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-sm max-w-none" style={{ color: "var(--color-fg)" }}>
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>
          </motion.div>
        )}

        {/* Right — scrollable media grid */}
        <div className={project.content ? "flex-1 min-w-0" : "w-full"}>
          <MediaGrid images={project.images} skipFirstImage={!heroVideo} />
        </div>
      </div>

      {/* ── Vertical Reels ── */}
      {project.videoLinks && project.videoLinks.length > 0 && (
        <>
          <div style={{ height: "56px" }} />
          <ReelStrip videos={project.videoLinks} />
        </>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between"
        style={{
          marginTop: "80px",
          paddingTop: "40px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <Link
          href="/work"
          className="transition-all hover:opacity-80 hover:scale-[1.02] inline-flex items-center gap-2 rounded-full"
          style={{
            color: "var(--color-accent)",
            border: "1px solid var(--color-border)",
            padding: "10px 20px",
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All work
        </Link>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "priyankadatwani99@gmail.com"}`}
          className="transition-all hover:opacity-80 hover:scale-[1.02] inline-flex items-center gap-2 rounded-full"
          style={{
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
            padding: "10px 20px",
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Let&apos;s talk :)
        </a>
      </div>
    </article>
  )
}
