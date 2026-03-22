"use client"

interface ReelStripProps {
  videos?: string[]
}

/** Horizontal row of vertical videos — autoplay, muted, looping */
export default function ReelStrip({ videos = [] }: ReelStripProps) {
  if (videos.length === 0) return null

  return (
    <section>
      <p
        className="text-xs font-mono tracking-widest uppercase mb-5"
        style={{ color: "var(--color-muted)" }}
      >
        Reels
      </p>

      <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory hide-scrollbar">
        {videos.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden snap-start"
            style={{
              width: "286px",
              aspectRatio: "9/16",
              backgroundColor: "#111110",
            }}
          >
            <video
              src={src}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
