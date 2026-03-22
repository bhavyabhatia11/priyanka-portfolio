"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SiteConfig } from "@/lib/types"

export default function Nav({ site }: { site: SiteConfig }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? "rgba(249,248,246,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight transition-opacity hover:opacity-60 relative z-50"
            style={{ color: "var(--color-fg)" }}
            onClick={() => setMenuOpen(false)}
          >
            {site.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-opacity"
                style={{
                  color: "var(--color-fg)",
                  opacity: pathname === item.href ? 1 : 0.5,
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border transition-all hover:opacity-80 hover:scale-105 flex items-center gap-1.5"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-fg)",
                fontSize: "0.8rem",
                padding: "7px 16px",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.05em",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "var(--color-fg)",
                transform: menuOpen ? "rotate(45deg) translateY(3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "var(--color-fg)",
                transform: menuOpen ? "rotate(-45deg) translateY(-3px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ backgroundColor: "var(--color-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-opacity"
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--color-fg)",
                    opacity: pathname === item.href ? 1 : 0.5,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border transition-all hover:opacity-80 mt-4 flex items-center gap-2"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-fg)",
                  fontSize: "0.85rem",
                  padding: "10px 24px",
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.05em",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
