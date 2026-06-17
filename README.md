# Dermiva — Bilingual Skincare E-commerce Storefront

Dermiva is a bilingual English/Arabic storefront built with the Next.js App Router. It provides a production-ready frontend foundation with API-ready services for a future .NET backend, focused on skincare, haircare, bodycare, and lip care shopping flows.

## Features

- English/Arabic locale routing with `/en` and `/ar` paths
- RTL/LTR support with locale-aware direction and typography
- Local fonts served from `public/fonts`
- Product, category, policy, payment, and social data layers
- API-ready async services backed by mock data in frontend-only mode
- Cart and wishlist with browser persistence
- Checkout UI flow with frontend validation and mock order success state
- Account, order, and saved-address mock flows
- SEO metadata per route
- `sitemap.xml` and `robots.txt`
- JSON-LD structured data
- GEO/AEO visible content structure for product, category, policy, and support pages
- Practical accessibility improvements for navigation, forms, focus states, skip link, and status messages
- Typed analytics/events readiness with no vendor enabled by default
- Responsive design for mobile, tablet, and desktop

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- next-intl
- Global CSS with design tokens, responsive utilities, and local fonts
- ESLint with `next/core-web-vitals`

## Project Structure

```txt
app/[locale]/              Localized App Router pages and layouts
components/                Shared storefront UI components
components/content/        Reusable visible content/GEO/AEO blocks
components/analytics/      Vendor-neutral analytics reporter components
lib/api/                   Async API-ready service layer
lib/mock/                  Current mock data source for frontend-only mode
lib/mappers/               Domain-to-view-model mapping utilities
lib/view-models/           UI-ready view-model builders
lib/types/                 Shared TypeScript domain and view-model types
lib/seo/                   SEO metadata, URL, robots, and structured-data helpers
lib/analytics/             Typed analytics event layer and no-op/debug providers
messages/                  English and Arabic translation files
public/                    Static images, icons, payment assets, and local fonts
```

## Internationalization

- English routes use `/en` and LTR layout.
- Arabic routes use `/ar` and RTL layout.
- Product names remain English intentionally in both locales.
- Dermiva remains English intentionally in both locales.
- UI strings live in `messages/en.json` and `messages/ar.json`.

## Data Architecture

The frontend data flow is:

```txt
types -> mock data -> mappers -> view models -> async services -> UI
```

Mock data is the current source while the app runs in frontend-only mode. Service functions are asynchronous and API-ready, so a future backend swap should mostly change service bodies or adapters rather than UI components.

## SEO And Discovery

- Route metadata is generated per page.
- Canonical and hreflang alternates are generated through the SEO helpers.
- `sitemap.xml` and `robots.txt` are provided by App Router route files.
- JSON-LD structured data is rendered for organization, website, product, category, contact, policy, and breadcrumb contexts where applicable.
- GEO/AEO visible content structure is included across storefront and content pages.
- Cart, checkout, account, search, login, register, and other utility pages are configured as noindex where appropriate.

## Accessibility

The storefront includes practical accessibility improvements such as keyboard-operable navigation, visible focus states, a skip link to main content, semantic sections, labeled form controls, connected validation errors, accessible toast/status messages, useful product image alt text, and RTL-aware layout handling.

This project does not claim formal WCAG certification.

## Analytics Readiness

- Analytics events are defined in a typed, vendor-neutral layer.
- The default provider is no-op.
- Optional debug logging is available only when explicitly enabled with public env flags.
- Web Vitals reporting is routed through the same abstraction when analytics is enabled.
- No third-party analytics vendor is enabled by default.
- No cookies, user identifiers, fingerprinting, or PII tracking are used in this phase.
- Real provider integration and consent handling are required before enabling production marketing or behavioral tracking.

## Environment Variables

All variables are optional for local builds.

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_ANALYTICS_ENABLED=
NEXT_PUBLIC_ANALYTICS_DEBUG=
NEXT_PUBLIC_ANALYTICS_PROVIDER=
```

- `NEXT_PUBLIC_SITE_URL`: Public canonical storefront URL. Falls back to `https://dermiva-eg.vercel.app`.
- `NEXT_PUBLIC_API_BASE_URL`: Public future backend base URL. Empty means mock-data mode.
- `NEXT_PUBLIC_ANALYTICS_ENABLED`: Set to `true`, `1`, or `yes` to enable analytics dispatch.
- `NEXT_PUBLIC_ANALYTICS_DEBUG`: Set to `true`, `1`, or `yes` to log safe analytics payloads in development only.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`: Provider selector. Currently resolves to `noop` unless debug logging is explicitly enabled.

No frontend secrets are required.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deployment

The storefront is Vercel-ready as a Next.js frontend. Set `NEXT_PUBLIC_SITE_URL` to the final production domain before launch. A future API base URL can be configured with `NEXT_PUBLIC_API_BASE_URL` when the backend is available.

Final public business contact details and social profile URLs should be confirmed before launch.

## Production Checklist

- Set the final domain in `NEXT_PUBLIC_SITE_URL`.
- Confirm public phone, email, address, and social links.
- Replace placeholder social URLs.
- Connect the real backend/API.
- Connect the real checkout/payment backend.
- Add consent handling before real marketing analytics.
- Validate sitemap and robots output after deployment.
- Test Open Graph cards.
- Run an accessibility smoke test.
- Verify Arabic RTL pages.
- Verify product and category routes.
- Verify noindex utility pages.

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev` | Start the development server |
| `build` | `next build` | Create a production build |
| `start` | `next start` | Run the production build locally |
| `lint` | `next lint` | Run ESLint |

## License / Ownership

License: Not specified.
