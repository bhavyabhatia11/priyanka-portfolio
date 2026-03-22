"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SkillGroup } from "@/lib/types"

export default function SkillModal({
  group,
  onClose,
}: {
  group: SkillGroup | null
  onClose: () => void
}) {
  // Close on Escape
  useEffect(() => {
    if (!group) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [group, onClose])

  // Lock scroll when open
  useEffect(() => {
    if (group) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [group])

  const isDark = group ? ["#2A2A28", "#111110", "#3D3D3B", "#1a1a18"].includes(group.color ?? "") : false
  const fg = isDark ? "#F9F8F6" : "#111110"
  const muted = isDark ? "rgba(249,248,246,0.5)" : "rgba(17,17,16,0.45)"
  const pillBg = isDark ? "rgba(249,248,246,0.1)" : "rgba(17,17,16,0.07)"
  const dividerColor = isDark ? "rgba(249,248,246,0.12)" : "rgba(17,17,16,0.1)"

  return (
    <AnimatePresence>
      {group && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(17,17,16,0.72)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            className="fixed z-50 overflow-y-auto"
            style={{
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(16px, 4vw, 48px)",
              pointerEvents: "none",
            }}
          >
            <motion.div
              style={{
                backgroundColor: group.color || "#F9F8F6",
                borderRadius: 20,
                width: "100%",
                maxWidth: 580,
                padding: "clamp(28px, 5vw, 44px)",
                position: "relative",
                pointerEvents: "auto",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: pillBg,
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke={fg} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Label pill */}
              <span
                className="inline-block font-mono tracking-wider uppercase rounded-full"
                style={{
                  fontSize: "0.65rem",
                  padding: "4px 12px",
                  backgroundColor: pillBg,
                  color: muted,
                  marginBottom: 16,
                }}
              >
                Skills
              </span>

              {/* Group name */}
              <h2
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 2.8rem)",
                  fontWeight: 400,
                  color: fg,
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}
              >
                {group.label}
              </h2>

              {/* Description */}
              {group.description && (
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: muted,
                    marginBottom: 24,
                  }}
                >
                  {group.description}
                </p>
              )}

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: dividerColor, marginBottom: 20 }} />

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2" style={{ marginBottom: group.appliedAt?.length ? 28 : 0 }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs rounded-full"
                    style={{
                      padding: "6px 14px",
                      backgroundColor: pillBg,
                      color: fg,
                      lineHeight: 1.4,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Applied at */}
              {group.appliedAt && group.appliedAt.length > 0 && (
                <>
                  <div style={{ height: 1, backgroundColor: dividerColor, marginBottom: 20 }} />
                  <p
                    className="font-mono tracking-wider uppercase"
                    style={{ fontSize: "0.65rem", color: muted, marginBottom: 16 }}
                  >
                    Where I&apos;ve applied this
                  </p>
                  <div className="flex flex-col gap-3">
                    {group.appliedAt.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: pillBg,
                          borderRadius: 12,
                          padding: "14px 16px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: fg,
                            marginBottom: 4,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {item.project}
                        </p>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.55,
                            color: muted,
                          }}
                        >
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
