"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimationFrame } from "framer-motion"
import Image from "next/image"

interface InstagramPost {
  id: string
  type: "image" | "reel"
  src: string
  thumbnail?: string
  alt: string
  caption?: string
}

interface InstagramCarouselProps {
  handle: string
  profileUrl: string
  posts: InstagramPost[]
  speed?: number
  showHandle?: boolean
  className?: string
}

export default function InstagramCarousel({
  handle,
  profileUrl,
  posts,
  speed = 0.5,
  showHandle = true,
  className = "",
}: InstagramCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeReel, setActiveReel] = useState<string | null>(null)

  // Duplicate posts for infinite loop effect
  const duplicated = [...posts, ...posts]

  // Auto-scroll animation
  useAnimationFrame(() => {
    if (isPaused || !trackRef.current) return
    offsetRef.current -= speed
    const singleSetWidth = trackRef.current.scrollWidth / 2
    if (Math.abs(offsetRef.current) >= singleSetWidth) {
      offsetRef.current = 0
    }
    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`
  })

  const handleReelClick = useCallback((post: InstagramPost) => {
    if (post.type !== "reel") return
    setActiveReel((prev) => (prev === post.id ? null : post.id))
  }, [])

  return (
    <div className={className}>
      {showHandle && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, var(--color-accent), var(--color-fg))",
                color: "var(--color-bg)",
              }}
            >
              IG
            </div>
            <div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-fg)" }}
              >
                {handle}
              </a>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                {posts.length} curated posts
              </p>
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-4 py-1.5 rounded-full border transition-all hover:opacity-70"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-muted)",
            }}
          >
            View Profile
          </a>
        </div>
      )}

      {/* Carousel container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setActiveReel(null)
        }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
        >
          {duplicated.map((post, i) => (
            <div
              key={`${post.id}-${i}`}
              className="flex-shrink-0 group relative"
              style={{ width: post.type === "reel" ? "220px" : "280px" }}
            >
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer"
                style={{
                  aspectRatio: post.type === "reel" ? "9/16" : "1/1",
                }}
                onClick={() => handleReelClick(post)}
              >
                {/* Image or reel thumbnail */}
                {post.type === "reel" && activeReel === post.id ? (
                  <video
                    src={post.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={post.type === "reel" ? (post.thumbnail || post.src) : post.src}
                    alt={post.alt}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Reel play icon overlay */}
                {post.type === "reel" && activeReel !== post.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover caption overlay */}
                {post.caption && (
                  <div
                    className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    }}
                  >
                    <p className="text-white text-xs leading-relaxed line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pause indicator */}
      <div className="flex items-center justify-center mt-4 gap-2">
        <div className="flex gap-1">
          {posts.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isPaused
                  ? "var(--color-accent)"
                  : "var(--color-border)",
              }}
            />
          ))}
        </div>
        <p
          className="text-xs transition-opacity duration-300"
          style={{
            color: "var(--color-muted)",
            opacity: isPaused ? 1 : 0,
          }}
        >
          Paused — hover to explore
        </p>
      </div>
    </div>
  )
}
