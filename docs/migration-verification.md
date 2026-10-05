# Next.js migration verification

Verified on October 2, 2026 against the pre-migration commit `458cef6`, local production builds, protected Vercel previews, and the public production deployment.

## Quality gates

- `npm ci`: passed; npm audit reported zero vulnerabilities.
- `npm run lint`: passed with no warnings.
- `npm run typecheck`: passed.
- `VERCEL_ENV=production SITE_URL=https://tech-essence-deck.vercel.app npm run build`: passed on Next.js 16.3.8.
- `npm run test:e2e`: passed navigation, hash and route scrolling, browser history, filters, custom cursor, gallery/lightbox, PDF controls, sharing/clipboard, mail and external link contracts, adjacent routes, and contact-form validity.

The PDF interaction check expects the existing `/papers/encryption-best-practices.pdf` 404. The migration intentionally does not fabricate the missing `/resume.pdf` or `/papers/*` source assets.

## Rendering and SEO

- No-JavaScript initial-HTML checks passed for all 16 canonical routes, including primary headings, descriptions, canonical tags, Open Graph tags, Twitter tags, index/follow directives, and JSON-LD.
- All 16 sitemap URLs returned successful canonical pages.
- `/article/3`, `/article/4`, and `/article/5` redirected to `/writings`; invalid detail URLs redirected to their listing pages; an unmatched URL returned 404.
- The production sitemap contained exactly 16 URLs.
- A `VERCEL_ENV=preview` build emitted `noindex, nofollow`, and its `robots.txt` disallowed `/`.
- Production Lighthouse SEO score: **100/100**. Preview builds intentionally emit `noindex`, so the production URL is the authoritative crawlability target.
- The 48 screenshots covering 16 routes at 375×812, 768×1024, and 1440×900 all passed the 0.5% threshold. Maximum pixel difference was **0.0039%**; 42 comparisons were pixel-identical.
- Eleven additional old-versus-new interactive-state screenshots covered mobile navigation, card hover, project and writing filters, custom cursor, gallery lightbox, PDF modal, collapsed table of contents, hash scrolling, and a filled contact form. All passed; 10 were pixel-identical and the PDF modal differed by **0.2665%**.
- The Next.js capture had no browser-console errors. The old Vite baseline's nested-anchor warning on `/projects` was removed without a visual change.
- The Vercel preview route matrix was pixel-identical to the Vite baseline across all 48 captures. The final preview's 11 interaction-state captures were also pixel-identical.
- Direct and cross-route hash navigation was verified after making hash restoration deterministic on route changes.
- `next/font` was evaluated but not retained because its generated font files changed glyph metrics under the strict visual-parity gate. The root layout keeps the original Google Fonts stylesheet and exact family/weight request, with a focused Next.js lint exception.

## Performance record

Local Lighthouse performance score: **70/100**.

| Metric | Result |
| --- | ---: |
| First Contentful Paint | 3.8 s |
| Largest Contentful Paint | 4.5 s |
| Speed Index | 5.1 s |
| Total Blocking Time | 210 ms |
| Cumulative Layout Shift | 0 |
| Time to Interactive | 4.7 s |

This score is recorded separately from the parity gate. It includes remote Google Font and Unsplash requests and was not used to justify UI-changing image or typography work.

## Deployment status

- Protected preview: `https://tech-essence-deck-p6xs5bk31-aayush-6753s-projects.vercel.app`
- Production: `https://tech-essence-deck.vercel.app`
- Final production deployment: `dpl_8mbmFzSp8bviW6SEC1ecvGcvqayd`
- `SITE_URL` is configured as a Vercel Production environment variable.
- The verified preview was promoted with Vercel's production rebuild flow, so production metadata uses the Production environment and is indexable.
- Production route, redirect, 404, interaction, SEO, sitemap, robots, and error-log checks passed. Vercel reported no runtime error logs.

The Vercel project is linked locally for CLI deployments. Automatic Git deployments are not connected because the signed-in Vercel account does not have write/admin access to `anuragkmr45/tech-essence-deck`; future releases can use the CLI or connect Git after granting that access.
