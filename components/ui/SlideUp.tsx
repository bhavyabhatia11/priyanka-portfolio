"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SlideUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function SlideUp({
  children,
  delay = 0,
  duration = 0.75,
  className,
  once = true,
}: SlideUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
