/* eslint-disable @next/next/no-page-custom-font -- The original Google Fonts URL is required for pixel-identical typography. */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import ScrollRestoration from "@/components/ScrollRestoration";
import { personalInfo } from "@/data/portfolio";
import { getSiteUrl, isPreviewDeployment } from "@/lib/site";
import "@/index.css";
import Providers from "./providers";

const siteUrl = getSiteUrl();
const shouldIndex = !isPreviewDeployment();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${personalInfo.name} | ${personalInfo.role}`,
    template: "%s",
  },
  description: `${personalInfo.name} - ${personalInfo.role}. ${personalInfo.tagline}`,
  applicationName: personalInfo.name,
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  keywords: [
    "Anurag Kumar",
    "Full-Stack Developer",
    "Mobile Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.tagline,
    type: "website",
    url: "/",
    siteName: personalInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.tagline,
    creator: "@anuragkmr_45",
  },
  robots: {
    index: shouldIndex,
    follow: shouldIndex,
    googleBot: {
      index: shouldIndex,
      follow: shouldIndex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ScrollRestoration />
          <GlobalNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
