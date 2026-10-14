/**
 * Captures each craft demo as a 1200x630 Open Graph image in `public/craft/og/<slug>.png`.
 *
 * Needs the dev server running. Usage:
 *   pnpm og:craft                      every piece with a note in app/craft/notes
 *   pnpm og:craft file-tree bricks     only these slugs
 *
 * Set BASE_URL to capture from somewhere other than http://localhost:3000.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const NOTES_DIR = path.resolve("app/craft/notes");
const OUT_DIR = path.resolve("public/craft/og");

// Close to the demo's real on-site height (374px), widened to the 1200x630 shape so nothing is cropped.
// 720 x 378 at a 5/3 scale lands on exactly 1200 x 630 device pixels.
const FRAME_WIDTH = 720;
const FRAME_HEIGHT = 378;
const SCALE = 5 / 3;

// Pieces whose first state says little about them get put in a better one before the shot
const PREPARE = {
  "feedback-popover": (frame) => frame.getByRole("button", { name: "Feedback" }).click(),
};

// Pieces that build up over time get longer to settle
const SETTLE_MS = { "animated-list": 4000 };
const DEFAULT_SETTLE_MS = 2500;

const requested = process.argv.slice(2);
const slugs = requested.length
  ? requested
  : (await readdir(NOTES_DIR)).filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4));

const browser = await chromium.launch();
// Reduced motion leaves each demo in a clean resting state instead of mid-animation
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: SCALE,
  reducedMotion: "reduce",
});

for (const slug of slugs) {
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/craft/${slug}`, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      #${slug} > div:first-child {
        position: fixed !important;
        inset: 0 auto auto 0 !important;
        z-index: 9999 !important;
        width: ${FRAME_WIDTH}px !important;
        height: ${FRAME_HEIGHT}px !important;
        max-width: none !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      [aria-label="Restart animation"], [aria-label="Restart"] { visibility: hidden !important; }
      nextjs-portal { display: none !important; }
    `,
  });

  const frame = page.locator(`#${slug} > div:first-child`);
  await page
    .waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0), null, {
      timeout: 15000,
    })
    .catch(() => console.warn(`${slug}: some images had not loaded`));
  await PREPARE[slug]?.(frame);
  await page.waitForTimeout(SETTLE_MS[slug] ?? DEFAULT_SETTLE_MS);

  // The frame is pinned to the top-left corner, so every edge lands on a whole device pixel
  await page.screenshot({
    path: path.join(OUT_DIR, `${slug}.png`),
    clip: { x: 0, y: 0, width: FRAME_WIDTH, height: FRAME_HEIGHT },
  });
  console.log(`saved public/craft/og/${slug}.png`);
  await page.close();
}

await browser.close();
