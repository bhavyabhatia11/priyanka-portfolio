"use client"

import { motion } from "framer-motion"
import InstagramCarousel from "@/components/ui/InstagramCarousel"
import type { InstagramFeed as InstagramFeedType } from "@/lib/types"

interface InstagramFeedProps {
  feed: InstagramFeedType
  title?: string
  subtitle?: string
}

export default function InstagramFeed({
  feed,
  title = "On the 'Gram",
  subtitle = "A curated look at the work, process, and everything in between.",
}: InstagramFeedProps) {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="font-serif mb-3"
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--color-fg)",
            }}
          >
            {title}
          </h2>
          <p
            className="text-base max-w-lg"
            style={{ color: "var(--color-muted)" }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Full-width carousel (bleeds past max-w container) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <InstagramCarousel
            handle={feed.handle}
            profileUrl={feed.profileUrl}
            posts={feed.posts}
            speed={0.4}
          />
        </div>
      </motion.div>
    </section>
  )
}
