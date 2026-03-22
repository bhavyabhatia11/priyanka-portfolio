"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import type { Project } from "@/lib/types"
import Tag from "@/components/ui/Tag"
import MediaGrid from "@/components/ui/MediaGrid"

export default function SlideshowModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [project])

  const isPresentation = project?.type === "presentation"

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(17,17,16,0.92)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-6xl rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--color-bg)",
              maxHeight: isPresentation ? "auto" : "90vh",
            }}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
              style={{
                backgroundColor: "var(--color-border)",
                color: "var(--color-fg)",
              }}
              aria-label="Close"
            >
              ×
            </button>

            {isPresentation ? (
              /* Presentation embed */
              <>
                {project.presentationUrl ? (
                  <div style={{ aspectRatio: "16/9", minHeight: "480px" }}>
                    <iframe
                      src={project.presentationUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${project.title} presentation`}
                      style={{ border: "none" }}
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-6 p-12 sm:p-16 text-center"
                    style={{ minHeight: "400px" }}
                  >
                    <span
                      className="font-serif italic"
                      style={{
                        fontFamily: "'EB Garamond', Georgia, serif",
                        fontSize: "clamp(3rem, 8vw, 5rem)",
                        color: "var(--color-accent)",
                        lineHeight: 1,
                      }}
                    >
                      {project.title}
                    </span>
                    <p
                      className="text-base max-w-sm leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {project.summary}
                    </p>
                    <p
                      className="text-xs font-mono tracking-wider uppercase"
                      style={{ color: "var(--color-border)" }}
                    >
                      Presentation link coming soon — add presentationUrl to brief.md
                    </p>
                  </div>
                )}

                {/* Footer strip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                    padding: "20px 32px",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--color-fg)", margin: 0 }}>
                      {project.title}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>
                      {project.industry} · {project.year}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono, monospace)",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {project.impact}
                  </span>
                </div>
              </>
            ) : (
              /* Project brief view */
              <div className="overflow-y-auto" style={{ maxHeight: "90vh" }}>
                {/* Hero image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "16/7",
                    minHeight: "180px",
                    backgroundColor: project.accentColor || "var(--color-border)",
                  }}
                >
                  {project.coverImage && (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(17,17,16,0.85) 0%, rgba(17,17,16,0.1) 55%, transparent 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="text-xs font-mono tracking-widest uppercase mb-2"
                      style={{ color: "rgba(249,248,246,0.5)" }}
                    >
                      {project.industry} · {project.year}
                    </p>
                    <h2
                      className="font-serif leading-none"
                      style={{
                        fontFamily: "'EB Garamond', Georgia, serif",
                        fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                        fontWeight: 400,
                        color: "#F9F8F6",
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Metrics row */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 border-b"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {[
                    { label: "Impact", value: project.impact, accent: true },
                    { label: "Role", value: project.role || project.category },
                    { label: "Industry", value: project.industry },
                    { label: "Year", value: project.year },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="py-4 px-5"
                      style={{ borderRight: i < 3 ? "1px solid var(--color-border)" : "none" }}
                    >
                      <p
                        className="text-xs font-mono tracking-widest uppercase mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {m.label}
                      </p>
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ color: m.accent ? "var(--color-accent)" : "var(--color-fg)" }}
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Client link */}
                {project.clientUrl && (
                  <div
                    className="px-5 py-3 border-b flex items-center gap-2"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <a
                      href={project.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono tracking-widest uppercase flex items-center gap-1 hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-accent)" }}
                    >
                      View {project.client} on Instagram ↗
                    </a>
                  </div>
                )}

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <p
                    className="text-base leading-relaxed mb-5"
                    style={{ color: "var(--color-muted)", maxWidth: "600px" }}
                  >
                    {project.summary}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
                    </div>
                  )}

                  {/* Instagram-style media grid */}
                  <MediaGrid images={project.images} />

                  {/* Reels */}
                  {project.videoLinks && project.videoLinks.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-3 mb-8 hide-scrollbar">
                      {project.videoLinks.map((src, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 rounded-lg overflow-hidden"
                          style={{ width: "160px", aspectRatio: "9/16", backgroundColor: "#111110" }}
                        >
                          <video src={src} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Case study body */}
                  {project.content && (
                    <div className="prose prose-sm max-w-none" style={{ color: "var(--color-fg)" }}>
                      <ReactMarkdown>{project.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
