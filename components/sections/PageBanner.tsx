"use client"

import { motion } from "framer-motion"

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PageBannerProps {
  topLabel: string
  headline: string
  headlineItalic?: string
  subtitle: string
}

export default function PageBanner({
  topLabel,
  headline,
  headlineItalic,
  subtitle,
}: PageBannerProps) {
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-sidebar-bg)",
        borderRadius: "12px",
        minHeight: "clamp(200px, 30vh, 320px)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{
          padding: "clamp(28px, 4vw, 48px)",
          minHeight: "clamp(200px, 30vh, 320px)",
        }}
      >
        {/* Top label */}
        <motion.p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {topLabel}
        </motion.p>

        {/* Headline + subtitle */}
        <div>
          <motion.h1
            className="font-serif leading-none mb-6 sm:mb-8 lg:mb-12"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 400,
              color: "var(--color-fg)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {headline}
            {headlineItalic && (
              <>
                {" "}
                <em style={{ fontStyle: "italic" }}>{headlineItalic}</em>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-sm leading-relaxed"
            style={{
              color: "var(--color-muted)",
              maxWidth: "480px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
