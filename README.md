# Abinesh U — Designing Intelligent Systems

The canonical personal authority platform and technical architecture catalog for **Abinesh U** (AI Systems Engineer). Built using **React**, **TanStack Start (SSR)**, **TypeScript**, and **Vite** with a premium, documentation-first monochrome aesthetic.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 19 + TypeScript
- **Routing & SSR**: TanStack Start (File-based routing, Server Functions, SSR)
- **Styling**: Vanilla CSS (custom timing variables, cubic-bezier easings, and prefers-reduced-motion locks)
- **Runtime & Tools**: Bun (Runtime, package manager, and test runner)
- **Build System**: Vite 8

---

## 📡 Key Features

### 1. Interactive Topology Systems
- **Blueprint Mapping**: Interactive SVG grid background that dynamically responds to card hover states, highlighting active paths (Memory, Context, Evals) and dimming non-relevant channels.
- **Staggered Viewport Reveals**: Global `IntersectionObserver` in the site shell that triggers smooth fade-in and scale animations when elements enter the viewport.

### 2. Entity SEO & Structured Data
- **Knowledge Graph Optimization**: Integrated JSON-LD schemas for `Person`, `ProfilePage`, `WebSite`, `BreadcrumbList`, and `CollectionPage` mapping.
- **Dynamic RSS Feed**: Server-rendered RSS 2.0 feed at `/rss.xml` compiling technical essays for syndication.
- **Sitemap Generation**: Server-rendered `/sitemap.xml` listing indexable routes.

### 3. Contact & Telemetry Dashboard
- **Obfuscated Port Channels**: Direct SMTP/SSL mail channels base64-decoded on click to prevent static scraper email harvesting.
- **Diagnostics Panel**: High-fidelity terminal emulator reflecting local system uptime, timezone, and operational telemetry.

---
## 📁 Repository Structure

```
├── public/                 # Static assets (Favicons, logos, WebP/SVG graphics)
├── src/
│   ├── components/         # Shared UI components (SiteShell, Icons)
│   ├── lib/                # Content definitions, metadata, and error utilities
│   ├── routes/             # TanStack Router file-based page routes
│   │   ├── __root.tsx      # Root layout, global SEO, and Person schema
│   │   ├── index.tsx       # Homepage (Hero, Projects, Systems, Focus)
│   │   ├── about.tsx       # About page (ProfilePage, career timeline)
│   │   ├── rss[.]xml.ts    # Dynamic RSS syndication endpoint
│   │   └── sitemap[.]xml.ts# Dynamic Sitemap endpoint
│   ├── server.ts           # SSR Fetch handler & security headers middleware
│   ├── start.ts            # Client hydration entry point
│   └── styles.css          # Global styling tokens and transitions
└── tests/                  # Integration, DOM, and static test suites
```

---

## 📄 License

Copyright © 2026 Abinesh U. All rights reserved.
All architectures and code documented in this repository are proprietary.
