const DEFAULT_SITE_URL = "https://tech-essence-deck.lovable.app";

export function getSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (process.env.VERCEL_ENV === "production" && !configuredUrl) {
    throw new Error("SITE_URL must be configured for production deployments.");
  }

  const siteUrl = new URL(configuredUrl || DEFAULT_SITE_URL);

  if (siteUrl.protocol !== "https:" && siteUrl.protocol !== "http:") {
    throw new Error("SITE_URL must use http or https.");
  }

  return siteUrl;
}

export function isPreviewDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview";
}
