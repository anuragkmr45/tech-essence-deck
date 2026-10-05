import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { addVercelProtectionCookie } from "./vercel-protection.mjs";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = process.env.OUTPUT_DIR ?? "/tmp/tech-essence-deck-interactions";
const browser = await chromium.launch({ headless: true });
const manifest = [];

await mkdir(outputDir, { recursive: true });

async function prepare(page, pathname) {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  const response = await page.goto(new URL(pathname, baseUrl).toString(), {
    waitUntil: "load",
    timeout: 30_000,
  });
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;caret-color:transparent!important}",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  return { consoleErrors, response };
}

async function capture(page, filename, state, options = {}) {
  const target = options.locator ?? page;
  await target.screenshot({
    animations: "disabled",
    path: path.join(outputDir, filename),
    ...(options.fullPage ? { fullPage: true } : {}),
  });
  manifest.push({ filename, state, url: page.url() });
}

try {
  const mobileContext = await browser.newContext({
    colorScheme: "dark",
    locale: "en-US",
    reducedMotion: "reduce",
    viewport: { width: 375, height: 812 },
  });
  await addVercelProtectionCookie(mobileContext, baseUrl);
  const mobile = await mobileContext.newPage();
  await prepare(mobile, "/");
  await mobile.getByRole("button", { name: "Toggle menu" }).click();
  await capture(mobile, "mobile--navigation-open.png", "Mobile navigation open");
  await mobileContext.close();

  const desktopContext = await browser.newContext({
    colorScheme: "dark",
    locale: "en-US",
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  await addVercelProtectionCookie(desktopContext, baseUrl);
  const page = await desktopContext.newPage();

  await prepare(page, "/projects");
  const firstProject = page.locator('a[href="/projects/real-time-digital-signage-system"]').first();
  await firstProject.hover();
  await capture(page, "desktop--project-card-hover.png", "Project card hover");

  await page.getByPlaceholder("Search projects...").fill("AI");
  await capture(page, "desktop--project-search.png", "Project search results");
  await page.getByPlaceholder("Search projects...").fill("");
  await page.getByRole("button", { name: /^AI / }).click();
  await capture(page, "desktop--project-filter.png", "Project category filter");

  await page.getByRole("button", { name: /^All / }).click();
  await page.mouse.move(600, 400);
  await capture(page, "desktop--custom-cursor.png", "Custom cursor pointer state");

  await prepare(page, "/writings");
  await page.getByPlaceholder("Search writings...").fill("rate limiting");
  await page.getByRole("button", { name: /^Articles / }).click();
  await capture(page, "desktop--writing-search-filter.png", "Writing search and category filter");

  await prepare(page, "/projects/real-time-digital-signage-system");
  const galleryButton = page.locator("#gallery button").first();
  await galleryButton.scrollIntoViewIfNeeded();
  await galleryButton.click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await capture(page, "desktop--gallery-lightbox.png", "Gallery lightbox open");

  await prepare(page, "/projects/encrypt-decrypt");
  await page.getByRole("button", { name: /paper \(pdf\)/i }).click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await capture(page, "desktop--pdf-modal.png", "PDF modal open");

  await prepare(page, "/article/building-secure-apis-rate-limiting-csrf");
  await page.getByRole("button", { name: /on this page/i }).first().click();
  await capture(page, "desktop--toc-collapsed.png", "Article table of contents collapsed");

  await prepare(page, "/");
  await page.getByRole("link", { name: "View projects" }).click();
  await page.waitForFunction(() => window.scrollY > 0);
  await capture(page, "desktop--hash-scroll.png", "Home hash scroll target");

  await page.goto(new URL("/#contact", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("textbox", { name: "Name" }).fill("Migration Test");
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page.getByRole("textbox", { name: "Message" }).fill("Testing the contact form.");
  const form = page.locator("form");
  await form.scrollIntoViewIfNeeded();
  await capture(page, "desktop--contact-form-filled.png", "Contact form filled", { locator: form });

  await desktopContext.close();
} finally {
  await browser.close();
}

await writeFile(
  path.join(outputDir, "manifest.json"),
  `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), manifest }, null, 2)}\n`,
);

console.log(`Captured ${manifest.length} interactive screenshots in ${outputDir}`);
