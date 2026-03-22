"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import type { SiteConfig } from "@/lib/types"

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero({ site }: { site: SiteConfig }) {
  return (
    <motion.div
      className="hero-container relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-fg)",
        borderRadius: "12px",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Photo — desktop: absolute right half */}
      {site.heroImage && (
        <div className="hidden md:block absolute top-0 right-0 bottom-0 hero-photo-col">
          <Image
            src={site.heroImage}
            alt="Priyanka Datwani"
            fill
            priority
            className="object-cover object-top"
            sizes="45vw"
          />
          {/* Left fade to blend with dark bg */}
          <div
            className="absolute inset-y-0 left-0 w-32"
            style={{
              background: "linear-gradient(to right, var(--color-fg), transparent)",
            }}
          />
        </div>
      )}

      {/* Placeholder if no photo — desktop only */}
      {!site.heroImage && (
        <div
          className="hidden md:flex absolute top-0 right-0 bottom-0 items-center justify-center"
          style={{ width: "45%", backgroundColor: "#1a1a18" }}
        >
          <div className="text-center">
            <span
              className="block font-serif italic"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                color: "var(--color-accent)",
                opacity: 0.4,
                lineHeight: 1,
              }}
            >
              P
            </span>
            <p
              className="text-xs font-mono tracking-wider mt-3"
              style={{ color: "rgba(249,248,246,0.25)" }}
            >
              Add /public/images/priyanka.jpg
            </p>
          </div>
        </div>
      )}

      {/* Text content */}
      <div className="hero-text-col relative z-10 flex flex-col justify-between">
        {/* Top label */}
        <motion.p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgba(249,248,246,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {site.title}
        </motion.p>

        {/* Main headline */}
        <div>
          <motion.h1
            className="hero-headline font-serif leading-none mb-3"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 400,
              color: "#F9F8F6",
              paddingBottom: "8px",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {site.heroLine1}{" "}
            <em style={{ fontStyle: "italic" }}>{site.heroLine2}</em>
          </motion.h1>

          <motion.p
            className="text-sm leading-relaxed w-full"
            style={{
              color: "rgba(249,248,246,0.55)",
              whiteSpace: "pre-line",
              maxWidth: "clamp(35vw, calc(576px - 5vw), 70vw)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {site.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            style={{ marginTop: "clamp(20px, 3vw, 32px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            {/* Primary — See My Work */}
            <Link
              href="/work"
              className="font-mono tracking-wider uppercase rounded-full transition-all hover:opacity-85 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#F9F8F6",
                color: "#111110",
                fontSize: "0.8rem",
                padding: "10px 24px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              See My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Secondary — Download Resume */}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:opacity-85 hover:scale-105 active:scale-95 rounded-full flex items-center gap-2 font-mono tracking-wider uppercase"
              style={{
                border: "1px solid rgba(249,248,246,0.35)",
                color: "#F9F8F6",
                fontSize: "0.8rem",
                padding: "10px 20px",
                letterSpacing: "0.07em",
                fontWeight: 500,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v13M7 11l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume
            </a>

            {/* Tertiary — Email */}
            <a
              href={`mailto:${site.email}`}
              className="transition-all hover:opacity-75 flex items-center gap-1.5"
              style={{
                color: "rgba(249,248,246,0.45)",
                fontSize: "0.78rem",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}
            >
              Say hi
              <span style={{ color: "var(--color-accent)" }}>:)</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Photo — mobile only: below text */}
      {site.heroImage && (
        <div className="md:hidden relative" style={{ height: 300 }}>
          <Image
            src={site.heroImage}
            alt="Priyanka Datwani"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Top fade to blend with dark card */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: 48,
              background: "linear-gradient(to bottom, var(--color-fg), transparent)",
            }}
          />
        </div>
      )}
    </motion.div>
  )
}
