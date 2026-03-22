"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SiteConfig } from "@/lib/types"

export default function Sidebar({ site }: { site: SiteConfig }) {
  const pathname = usePathname()

  return (
    <aside className="sidebar-col">
      {/* ── TOP — Identity ── */}
      <div className="mb-3">
        <Link href="/" className="block group">
          <h1
            className="transition-opacity group-hover:opacity-70"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "1.55rem",
              fontWeight: 500,
              color: "var(--color-fg)",
              lineHeight: 1.2,
            }}
          >
            {site.name}
          </h1>
        </Link>
      </div>

      <p
        style={{
          color: "var(--color-muted)",
          fontSize: "0.82rem",
          lineHeight: 1.5,
          marginBottom: "1.25rem",
        }}
      >
        {site.title}
      </p>

      {/* Availability */}
      {site.availableForWork && (
        <div
          className="flex items-center gap-2 mb-8"
          style={{
            backgroundColor: "rgba(76,175,80,0.08)",
            padding: "8px 12px",
            borderRadius: 8,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: "#4CAF50" }}
          />
          <span
            className="font-mono tracking-wider uppercase"
            style={{ color: "#3d8b40", fontSize: "0.7rem", fontWeight: 500 }}
          >
            Available for work
          </span>
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--color-border)", marginBottom: "1.5rem" }} />

      {/* ── MIDDLE — Nav ── */}
      <nav className="flex flex-col gap-1.5">
        {site.nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg transition-all"
              style={{
                fontSize: "0.95rem",
                padding: "10px 14px",
                backgroundColor: active ? "rgba(17,17,16,0.06)" : "transparent",
                color: active ? "var(--color-fg)" : "var(--color-muted)",
                fontWeight: active ? 500 : 400,
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* ── SPACER ── */}
      <div className="flex-1" />

      {/* ── BOTTOM — Pinned CTAs ── */}
      <div
        className="flex flex-col gap-3"
        style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}
      >
        {/* LinkedIn */}
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full rounded-full transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: "#0A66C2",
            color: "#fff",
            fontSize: "0.875rem",
            padding: "12px 20px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>

        {/* Instagram */}
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full rounded-full transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
          style={{
            background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
            color: "#fff",
            fontSize: "0.875rem",
            padding: "12px 20px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
          </svg>
          Instagram
        </a>

        {/* Email */}
        <a
          href={`mailto:${site.email}`}
          className="flex items-center justify-center gap-2.5 w-full rounded-full transition-all hover:opacity-85 hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: "var(--color-fg)",
            color: "var(--color-bg)",
            fontSize: "0.875rem",
            padding: "12px 20px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Say hi :)
        </a>

        {/* Resume */}
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full rounded-full transition-all hover:opacity-80 hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-fg)",
            fontSize: "0.875rem",
            padding: "12px 20px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Resume
        </a>
      </div>
    </aside>
  )
}
