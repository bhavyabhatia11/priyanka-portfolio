"use client"

import { useState } from "react"
import Image from "next/image"

interface MediaGridProps {
  images?: string[]
  /** Skip the first image (used when it's already shown as the hero) */
  skipFirstImage?: boolean
}

/** Instagram-style 3-column image grid */
export default function MediaGrid({ images = [], skipFirstImage = false }: MediaGridProps) {
  const imgs = skipFirstImage ? images.slice(1) : images

  if (imgs.length === 0) return null

  return (
    <div className="grid grid-cols-3 gap-[3px] sm:gap-1 rounded-xl overflow-hidden">
      {imgs.map((src, i) => (
        <ImageCell key={i} src={src} />
      ))}
    </div>
  )
}

function ImageCell({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="relative overflow-hidden col-span-1"
      style={{ aspectRatio: "1/1", backgroundColor: "var(--color-border)" }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 33vw, 280px"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 400ms ease" }}
      />
    </div>
  )
}
