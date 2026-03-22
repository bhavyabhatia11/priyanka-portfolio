#!/usr/bin/env node

/**
 * Image optimization script for Portfolio Engine.
 *
 * Scans each project folder in content/projects/ for image files,
 * generates optimized WebP versions in public/images/projects/{slug}/,
 * and skips images that are already up to date.
 *
 * Usage: node scripts/optimize-images.mjs [--force]
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const projectsDir = path.join(root, "content", "projects")
const outputBase = path.join(root, "public", "images", "projects")

const SIZES = {
  thumb: 600,
  full: 1400,
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"])
const force = process.argv.includes("--force")

async function optimizeImage(src, destDir, baseName) {
  const tasks = []

  for (const [label, width] of Object.entries(SIZES)) {
    const outPath = path.join(destDir, `${baseName}-${label}.webp`)

    // Skip if output exists and is newer than source (unless --force)
    if (!force && fs.existsSync(outPath)) {
      const srcStat = fs.statSync(src)
      const outStat = fs.statSync(outPath)
      if (outStat.mtimeMs >= srcStat.mtimeMs) continue
    }

    tasks.push(
      sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath)
        .then(() => console.log(`  ✓ ${path.basename(outPath)}`))
    )
  }

  // Also copy/convert the cover as "cover.webp" at full size for backwards compat
  if (baseName === "cover") {
    const coverOut = path.join(destDir, "cover.webp")
    if (force || !fs.existsSync(coverOut) || fs.statSync(coverOut).mtimeMs < fs.statSync(src).mtimeMs) {
      tasks.push(
        sharp(src)
          .resize({ width: SIZES.full, withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(coverOut)
          .then(() => console.log(`  ✓ cover.webp`))
      )
    }
  }

  await Promise.all(tasks)
}

async function processProject(folderName) {
  const folderPath = path.join(projectsDir, folderName)

  // Read slug from brief.md frontmatter
  const briefPath = path.join(folderPath, "brief.md")
  if (!fs.existsSync(briefPath)) return

  const { data } = matter(fs.readFileSync(briefPath, "utf-8"))
  const slug = data.slug || folderName.replace(/^\d+-/, "").split("-")[0].toLowerCase()

  const destDir = path.join(outputBase, slug)
  fs.mkdirSync(destDir, { recursive: true })

  // Find all image files in the project folder (including assets/ subdirectory)
  const imageFiles = []
  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        scanDir(fullPath)
      } else if (IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())) {
        imageFiles.push(fullPath)
      }
    }
  }
  scanDir(folderPath)

  if (imageFiles.length === 0) return

  console.log(`\n📁 ${folderName} → ${slug}/`)
  for (const imgPath of imageFiles) {
    const baseName = path.basename(imgPath, path.extname(imgPath))
    await optimizeImage(imgPath, destDir, baseName)
  }
}

async function main() {
  console.log("🖼️  Portfolio Image Optimizer\n")

  if (!fs.existsSync(projectsDir)) {
    console.log("No projects directory found. Nothing to optimize.")
    return
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true })
  const folders = entries.filter((e) => e.isDirectory() && /^\d+-/.test(e.name))

  if (folders.length === 0) {
    console.log("No project folders found.")
    return
  }

  console.log(`Found ${folders.length} project folders`)

  for (const folder of folders) {
    await processProject(folder.name)
  }

  console.log("\n✅ Done!")
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
