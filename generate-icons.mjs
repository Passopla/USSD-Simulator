// Generates SVG icons and converts to PNG using sharp (if available)
// Falls back to writing SVG files that can be used directly
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const dir = "./public/icons";
mkdirSync(dir, { recursive: true });

const makeSVG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <text
    x="50%"
    y="52%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Courier New, monospace"
    font-weight="bold"
    font-size="${Math.round(size * 0.22)}px"
    fill="#ffffff"
    letter-spacing="${Math.round(size * 0.01)}">*123#</text>
</svg>`;

writeFileSync(join(dir, "icon-192.svg"), makeSVG(192));
writeFileSync(join(dir, "icon-512.svg"), makeSVG(512));

// Try to use sharp for PNG conversion
try {
  const { default: sharp } = await import("sharp");
  await sharp(Buffer.from(makeSVG(192))).png().toFile(join(dir, "icon-192.png"));
  await sharp(Buffer.from(makeSVG(512))).png().toFile(join(dir, "icon-512.png"));
  console.log("PNG icons generated via sharp.");
} catch {
  // sharp not available — use SVG paths in manifest or install sharp
  console.log("SVG icons written. Install sharp to auto-convert to PNG: npm i -D sharp");
  console.log("Or run: npx sharp-cli --input public/icons/icon-192.svg --output public/icons/icon-192.png");
}
