import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const src = path.resolve("public/logo-new.jpeg")
const publicDir = path.resolve("public")
const appDir = path.resolve("app")

async function circlePng(size, dest) {
  const r = size / 2
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`,
  )
  await sharp(src)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .composite([{ input: circle, blend: "dest-in" }])
    .toFile(dest)
}

await circlePng(512, path.join(publicDir, "logo.png"))
await circlePng(192, path.join(appDir, "icon.png"))
await circlePng(180, path.join(appDir, "apple-icon.png"))

const meta = await sharp(path.join(publicDir, "logo.png")).metadata()
console.log(
  "logo.png",
  meta.width,
  "x",
  meta.height,
  "kb",
  (fs.statSync(path.join(publicDir, "logo.png")).size / 1024).toFixed(1),
)
console.log("icon.png kb", (fs.statSync(path.join(appDir, "icon.png")).size / 1024).toFixed(1))
console.log(
  "apple-icon.png kb",
  (fs.statSync(path.join(appDir, "apple-icon.png")).size / 1024).toFixed(1),
)
