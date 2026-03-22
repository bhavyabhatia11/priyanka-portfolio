const TAG_COLORS = [
  { bg: "#D6E8F5", text: "#1F5F8A" },   // blue
  { bg: "#F5E6D6", text: "#8A4A20" },   // warm
  { bg: "#D6F0D8", text: "#1F6040" },   // green
  { bg: "#F5F0D6", text: "#7A5518" },   // gold
  { bg: "#E8D6F5", text: "#5A2A8A" },   // purple
  { bg: "#F5D6E0", text: "#8A2045" },   // rose
  { bg: "#D6F0F0", text: "#1A6060" },   // teal
  { bg: "#F0E6D6", text: "#6A4A2A" },   // tan
]

function hashIndex(str: string, len: number) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h) % len
}

export default function Tag({ label }: { label: string }) {
  const color = TAG_COLORS[hashIndex(label, TAG_COLORS.length)]

  return (
    <span
      className="inline-block text-xs font-mono tracking-wider uppercase rounded-full"
      style={{
        backgroundColor: color.bg,
        color: color.text,
        padding: "6px 14px",
        lineHeight: "1.4",
      }}
    >
      {label}
    </span>
  )
}
