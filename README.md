# Dermiva — E-Commerce Prototype

A premium, fully responsive storefront prototype for **Dermiva**, a science-driven skincare, haircare, bodycare, and lip care brand made with care in Egypt. Built with the Next.js App Router, it delivers a complete shopping experience — browsing, search, filtering, cart, wishlist, checkout, and account flows — as a polished, client-ready frontend.

## Overview

Dermiva is a static, front-end e-commerce experience. All catalog, pricing, and content data is bundled with the app (no backend or database required), and cart, wishlist, and account state persist in the browser. This makes it ideal as a presentation build and a foundation for a production storefront.

- Prices are in Egyptian Pounds (EGP).
- Egypt-focused payment methods: Cash on Delivery, Mobile Wallets, Fawry Pay, and InstaPay.
- Art-directed responsive imagery (mobile / tablet / desktop) across hero, category, and collection banners.

## Features

- **Responsive design** — tuned from 360px phones up to 1920px desktops, with no horizontal overflow.
- **Product catalog** — 12 products across four categories (Face, Hair, Body, Lip).
- **Category pages** — art-directed hero banners, category content, benefits, ingredients, and how-to.
- **Search, filtering & sorting** — live search plus price and sort controls.
- **Cart** — add / remove / update quantities, promo code field, and live totals.
- **Wishlist** — toggle favourites and move items straight to the cart.
- **Checkout** — validated delivery form with Egypt-specific payment options and a success state.
- **Account area** — profile, order history, order details, and saved addresses.
- **Content pages** — About, Contact (with FAQs), and shipping / returns / privacy / terms policies.
- **Brand-consistent UI** — single-source logo, payments, social links, and product imagery.
- **SEO & sharing** — metadata, Open Graph image, and a complete favicon / app-icon set.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- CSS (global stylesheet with design tokens) + inline styles
- Google Fonts (Cormorant Garamond, Jost) via `next/font`
- ESLint (`next/core-web-vitals`)

## Project Structure

```
dermiva/
├── app/                  # App Router pages, layouts, and route-level UI
│   ├── account/          # Account, orders, order detail, addresses
│   ├── category/[cat]/   # Category pages (face / hair / body / lip)
│   ├── product/[id]/     # Product detail pages
│   ├── policy/[slug]/    # Shipping / returns / privacy / terms
│   ├── cart, checkout, wishlist, search, shop, login, register, about, contact
│   ├── layout.tsx        # Root layout, fonts, and metadata
│   ├── globals.css       # Global styles and design tokens
│   └── not-found.tsx     # 404 page
├── components/           # Reusable UI (header, footer, product cards, etc.)
├── lib/                  # Catalog, payments, social data, and the store
│   ├── catalog.ts        # Products, categories, content, policies, helpers
│   ├── payments.ts       # Payment methods (single source of truth)
│   ├── social.ts         # Social links (single source of truth)
│   └── store.tsx         # Cart / wishlist / auth / toast state provider
├── public/               # Static assets (see Assets below)
└── config files          # next.config.mjs, tsconfig.json, .eslintrc.json
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage (hero, categories, best sellers, featured product, collection banner) |
| `/shop` | Full product listing with search, filters, and sorting |
| `/category/[cat]` | Category page — `face`, `hair`, `body`, `lip` |
| `/product/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form and order summary |
| `/wishlist` | Saved products |
| `/search` | Search results |
| `/login`, `/register` | Authentication screens |
| `/account` | Account overview |
| `/account/orders`, `/account/orders/[no]` | Order history and detail |
| `/account/addresses` | Saved addresses |
| `/about`, `/contact` | Brand story and contact / FAQs |
| `/policy/[slug]` | `shipping`, `returns`, `privacy`, `terms` |
| `*` | Custom 404 page |

## Assets

All static assets live under `public/`, in kebab-case folders and filenames for case-safe deployment on Linux/Vercel:

```
public/
├── brand/                      # Logo, favicons, app icons, OG image
├── hero/                       # Homepage hero (desktop / tablet / mobile)
├── category/
│   ├── category-card/          # "Shop by Category" card images
│   └── category-hero/          # Per-category responsive hero banners
├── hair-therapy-collection/    # Collection banner (desktop / tablet / mobile)
├── products/packshots/         # Product images (WebP)
├── payments/                   # Payment method logos
├── icons/social/               # Social media icons (SVG)
├── about/                      # About page imagery
└── favicon.ico
```

Product packshots and banners are served as optimised **WebP**. The brand logo is a transparent WebP, and social icons are SVGs.

## Getting Started

Requirements: **Node.js 18.18+** (Node 20 LTS recommended) and npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Deployment on Vercel

This is a standard Next.js App Router application and deploys to [Vercel](https://vercel.com/) with zero configuration:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Vercel auto-detects Next.js — no custom build settings, environment variables, or `vercel.json` are required.

The default build command is `next build` and the output is served automatically. No backend, database, or secrets are needed.

## Notes

- This is a **client-ready frontend prototype**. Catalog, orders, and account data are static/mock and stored in the browser; there is no live backend, payment processing, or authentication service.
- Replace the placeholder social profile URLs in `lib/social.ts` and confirm the support contact details before going live.
- All product, category, and payment data is centralised in `lib/` to keep the UI consistent and easy to update.
