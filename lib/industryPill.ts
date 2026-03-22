// Shared industry → pill color mapping (matches carousel cards)
export function industryPill(industry: string): { bg: string; text: string } {
  const s = (industry || "").toLowerCase()
  if (s.includes("edtech") || s.includes("education"))
    return { bg: "var(--pill-edtech-bg)", text: "var(--pill-edtech-text)" }
  if (s.includes("crowd") || s.includes("fund") || s.includes("health"))
    return { bg: "var(--pill-crowd-bg)", text: "var(--pill-crowd-text)" }
  if (s.includes("fabric") || s.includes("fashion") || s.includes("apparel") || s.includes("event"))
    return { bg: "var(--pill-fab-bg)", text: "var(--pill-fab-text)" }
  if (s.includes("jewel"))
    return { bg: "var(--pill-jewelry-bg)", text: "var(--pill-jewelry-text)" }
  if (s.includes("music") || s.includes("culture"))
    return { bg: "var(--pill-music-bg)", text: "var(--pill-music-text)" }
  return { bg: "var(--pill-default-bg)", text: "var(--pill-default-text)" }
}
