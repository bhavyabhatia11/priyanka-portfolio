"use client"

import { useState } from "react"
import type { SkillGroup } from "@/lib/types"

function getTextColor(bgColor: string): string {
  // Return light text for dark backgrounds, dark text for light backgrounds
  const dark = ["#111110", "#3D3D3B", "#1a1a18"]
  return dark.includes(bgColor) ? "#F9F8F6" : "#111110"
}

export default function SkillCard({ group }: { group: SkillGroup }) {
  const [hovered, setHovered] = useState(false)
  const bg = group.color || "#EDE8E0"
  const textColor = getTextColor(bg)
  const mutedColor = textColor === "#F9F8F6" ? "rgba(249,248,246,0.6)" : "rgba(17,17,16,0.5)"

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-default select-none"
      style={{ aspectRatio: "1/1", backgroundColor: bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default state: label + "Skills" */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: mutedColor }}
        >
          Skills
        </span>
        <h3
          className="font-serif leading-none"
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: textColor,
          }}
        >
          {group.label}
        </h3>
      </div>

      {/* Hover state: description + skill list (slides up) */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 transition-all duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div>
          <span
            className="text-xs font-mono tracking-widest uppercase block mb-3"
            style={{ color: mutedColor }}
          >
            {group.label}
          </span>
          {group.description && (
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: textColor, opacity: 0.85 }}
            >
              {group.description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: textColor === "#F9F8F6"
                  ? "rgba(249,248,246,0.15)"
                  : "rgba(17,17,16,0.1)",
                color: textColor,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
