import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { addVercelProtectionCookie } from "./vercel-protection.mjs";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = process.env.OUTPUT_DIR ?? "/tmp/tech-essence-deck-visuals";
const navigationTimeout = Number(process.env.NAVIGATION_TIMEOUT ?? 30_000);

const routes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["writings", "/writings"],
  ["project-signage", "/projects/real-time-digital-signage-system"],
  ["project-exam", "/projects/university-online-exam-software"],
  ["project-vidchat", "/projects/vidchat"],
  ["project-magic-notes", "/projects/magic-notes"],
  ["project-encrypt-decrypt", "/projects/encrypt-decrypt"],
  ["project-rate-limiter", "/projects/rate-limiter-utils"],
  ["project-ai-chat", "/projects/ai-chat-assistant"],
  ["case-study-cs1", "/case-study/cs1"],
  ["case-study-cs2", "/case-study/cs2"],
  ["case-study-cs3", "/case-study/cs3"],
  ["case-study-cs4", "/case-study/cs4"],
  ["article-secure-api", "/article/building-secure-apis-rate-limiting-csrf"],
  ["article-offline-first", "/article/offline-first-architecture-digital-signage"],
];

const viewports = [
  ["mobile", { width: 375, height: 812 }],
  ["tablet", { width: 768, height: 1024 }],
  ["desktop", { width: 1440, height: 900 }],
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const manifest = [];

try {
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({
      colorScheme: "dark",
      locale: "en-US",
      reducedMotion: "reduce",
      viewport,
    });
    await addVercelProtectionCookie(context, baseUrl);

    for (const [routeName, route] of routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      const response = await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: "domcontentloaded",
        timeout: navigationTimeout,
      });
      await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content:
          "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;caret-color:transparent!important}",
      });
      await page.waitForTimeout(1_000);

      const filename = `${viewportName}--${routeName}.png`;
      await page.screenshot({
        animations: "disabled",
        fullPage: true,
        path: path.join(outputDir, filename),
      });

      manifest.push({
        consoleErrors,
        filename,
        finalUrl: page.url(),
        route,
        status: response?.status() ?? null,
        viewport,
      });
      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

await writeFile(
  path.join(outputDir, "manifest.json"),
  `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), manifest }, null, 2)}\n`,
);

console.log(`Captured ${manifest.length} screenshots in ${outputDir}`);
