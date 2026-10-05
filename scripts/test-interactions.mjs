import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { addVercelProtectionCookie } from "./vercel-protection.mjs";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });

async function expectVisible(locator, message) {
  await locator.waitFor({ state: "visible", timeout: 10_000 });
  assert.equal(await locator.isVisible(), true, message);
}

try {
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    colorScheme: "dark",
  });
  await addVercelProtectionCookie(mobileContext, baseUrl);
  const mobile = await mobileContext.newPage();
  await mobile.goto(new URL("/", baseUrl).toString());
  await mobile.getByRole("button", { name: "Toggle menu" }).click();
  await expectVisible(mobile.getByRole("link", { name: "Works" }), "Mobile menu did not open");
  await mobile.getByRole("link", { name: "Works" }).click();
  await mobile.waitForURL("**/projects");
  assert.equal(await mobile.getByRole("heading", { name: "Projects" }).isVisible(), true);
  await mobileContext.close();

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  await addVercelProtectionCookie(context, baseUrl);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(new URL("/projects", baseUrl).toString());
  const projectSearch = page.getByPlaceholder("Search projects...");
  await projectSearch.fill("no-project-can-match-this");
  await expectVisible(page.getByText("No projects found matching your criteria."), "Project empty state missing");
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.ok(await page.locator('a[aria-label^="View "]').count() > 0, "Project cards did not return");
  await page.getByRole("button", { name: /^AI / }).click();
  assert.ok(await page.locator('a[aria-label^="View "]').count() > 0, "Project category filter removed every card");
  await page.getByRole("button", { name: /^All / }).click();
  await page.locator('a[aria-label^="View "]').first().click();
  await page.waitForURL("**/projects/**");
  const firstProjectUrl = page.url();
  await page.goBack();
  await page.waitForURL("**/projects");
  await page.goForward();
  await page.waitForURL(firstProjectUrl);
  await page.goBack();
  await page.waitForURL("**/projects");

  await page.goto(new URL("/writings", baseUrl).toString());
  await page.getByPlaceholder("Search writings...").fill("rate limiting");
  await expectVisible(page.getByText("Building Secure APIs with Rate Limiting and CSRF Protection"), "Writing search failed");
  await page.getByRole("button", { name: /^Articles / }).click();
  assert.ok(await page.getByText("Read article").count() > 0, "Writing category filter failed");

  await page.goto(new URL("/projects/real-time-digital-signage-system", baseUrl).toString());
  const galleryButton = page.locator("#gallery button").first();
  await galleryButton.scrollIntoViewIfNeeded();
  await galleryButton.click();
  await expectVisible(page.getByRole("dialog"), "Gallery lightbox did not open");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.locator('a[href="/projects/university-online-exam-software"]').last().click();
  await page.waitForURL("**/projects/university-online-exam-software");

  await page.goto(new URL("/projects/encrypt-decrypt", baseUrl).toString());
  const missingPdfResponse = page.waitForResponse(
    (response) => response.url().endsWith("/papers/encryption-best-practices.pdf"),
    { timeout: 10_000 },
  );
  await page.getByRole("button", { name: /paper \(pdf\)/i }).click();
  await expectVisible(page.getByRole("dialog"), "PDF viewer did not open");
  assert.match(await page.getByRole("dialog").locator("iframe").getAttribute("src"), /^\/papers\//);
  assert.equal((await missingPdfResponse).status(), 404, "The known missing PDF behavior changed");
  await page.evaluate(() => {
    window.__testOpenedUrls = [];
    window.__testDownloads = [];
    window.open = (url) => {
      window.__testOpenedUrls.push(String(url));
      return null;
    };
    HTMLAnchorElement.prototype.click = function captureDownload() {
      window.__testDownloads.push({ download: this.download, href: this.getAttribute("href") });
    };
  });
  await page.getByRole("button", { name: /open in new tab/i }).click();
  await page.getByRole("button", { name: /download/i }).click();
  const pdfControls = await page.evaluate(() => ({
    downloads: window.__testDownloads,
    openedUrls: window.__testOpenedUrls,
  }));
  assert.deepEqual(pdfControls.openedUrls, ["/papers/encryption-best-practices.pdf"]);
  assert.equal(pdfControls.downloads[0]?.href, "/papers/encryption-best-practices.pdf");
  assert.match(pdfControls.downloads[0]?.download ?? "", /\.pdf$/);
  await page.keyboard.press("Escape");
  consoleErrors.length = 0;

  const articleUrl = new URL("/article/building-secure-apis-rate-limiting-csrf", baseUrl).toString();
  await page.goto(articleUrl);
  await page.mouse.move(300, 240);
  assert.ok(
    await page.locator("div.fixed.pointer-events-none").count() >= 3,
    "Custom cursor layers did not render",
  );
  await page.evaluate(() => {
    window.__testOpenedUrls = [];
    window.open = (url) => {
      window.__testOpenedUrls.push(String(url));
      return null;
    };
  });
  await page.getByRole("button", { name: "Share on X" }).first().click();
  await page.getByRole("button", { name: "Share on LinkedIn" }).first().click();
  const shareUrls = await page.evaluate(() => window.__testOpenedUrls);
  assert.match(shareUrls[0] ?? "", /^https:\/\/twitter\.com\/intent\/tweet/);
  assert.match(shareUrls[1] ?? "", /^https:\/\/www\.linkedin\.com\/sharing\/share-offsite/);
  await page.getByRole("button", { name: "Copy article link" }).first().click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), articleUrl);
  await page.locator('a[href="/article/2"]').last().click();
  await page.waitForURL("**/article/2");
  await page.goBack();
  await page.waitForURL(articleUrl);
  await page.goForward();
  await page.waitForURL("**/article/2");

  await page.goto(new URL("/", baseUrl).toString());
  const mailLinks = page.locator('a[href^="mailto:"]');
  assert.ok(await mailLinks.count() >= 2, "Mail links are missing");
  assert.ok(
    await page.locator('a[target="_blank"][href^="https://"]').count() >= 3,
    "External links are missing their new-tab contract",
  );
  await page.getByRole("link", { name: "View projects" }).click();
  await page.waitForURL("**/#projects");
  await page.waitForFunction(() => window.scrollY > 0);
  await page.getByRole("link", { name: "Works" }).click();
  await page.waitForURL("**/projects");
  await page.waitForFunction(() => window.scrollY < 50);

  await page.goto(new URL("/#contact", baseUrl).toString());
  await page.locator("#contact").waitFor({ state: "visible" });
  await page.waitForFunction(() => window.scrollY > 0);
  await page.getByRole("textbox", { name: "Name" }).fill("Migration Test");
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page.getByRole("textbox", { name: "Message" }).fill("Testing the contact form.");
  assert.equal(await page.locator("form").evaluate((form) => form.checkValidity()), true);

  assert.deepEqual(consoleErrors, [], `Browser console errors: ${consoleErrors.join("\n")}`);
  await context.close();
  console.log("Navigation, hash/scroll/history, filters, cursor, gallery, PDF, share/clipboard, links, adjacent routes, and form checks passed.");
} finally {
  await browser.close();
}
