import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { socialLinksList } from "../lib/metadata";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/systems", label: "Systems" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/assets/common/logo.svg"
            alt="Abinesh U Logo"
            className="h-7 w-auto object-contain dark:invert"
          />
          <img
            src="/assets/common/wordmark.svg"
            alt="Abinesh U"
            className="h-4 w-auto object-contain dark:invert"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className="group flex items-baseline gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-1 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              activeProps={{
                className:
                  "group flex items-baseline gap-1.5 text-sm text-foreground px-1 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center text-xs font-mono uppercase tracking-widest border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const footerNav = [
    { to: "/" as const, label: "Home" },
    { to: "/about" as const, label: "About" },
    { to: "/systems" as const, label: "Systems" },
    { to: "/projects" as const, label: "Projects" },
    { to: "/blog" as const, label: "Blog" },
    { to: "/contact" as const, label: "Contact" },
  ];

  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-20">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/common/logo.svg"
            alt="Abinesh U Logo"
            className="h-7 w-auto object-contain dark:invert"
          />
          <img
            src="/assets/common/wordmark.svg"
            alt="Abinesh U"
            className="h-4 w-auto object-contain dark:invert"
          />
        </div>

        {/* Tagline */}
        <p className="mt-6 text-sm text-muted-foreground max-w-md leading-relaxed">
          Designing intelligent systems, one architecture at a time.
        </p>

        {/* Navigation Links */}
        <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {footerNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {socialLinksList.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              {l.label}
              <span className="text-xs">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright + Version */}
      <div className="border-t hairline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/common/logo.svg"
              alt="Abinesh U Logo"
              className="w-4 h-4 object-contain dark:invert opacity-50"
            />
            <p className="mono-caps text-muted-foreground">
              © {new Date().getFullYear()} Abinesh U — All systems documented.
            </p>
          </div>
          <p className="mono-caps text-muted-foreground">v1.0 · Built in the open</p>
        </div>
      </div>
    </footer>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-6 mb-12">
      <span className="font-mono text-xs font-medium tabular-nums text-foreground">{index}</span>
      <span className="h-px flex-1 bg-foreground/15" />
      <span className="mono-caps text-foreground">{children}</span>
    </div>
  );
}

export function BlueprintFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="relative h-full w-full">
          {[0, 25, 50, 75, 100].map((p) => (
            <div
              key={p}
              className="absolute top-0 bottom-0 w-px bg-foreground/[0.06]"
              style={{ left: `${p}%` }}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function PageHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative border-b hairline overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="relative h-full w-full">
          {[0, 25, 50, 75, 100].map((p) => (
            <div
              key={p}
              className="absolute top-0 bottom-0 w-px bg-foreground/[0.06]"
              style={{ left: `${p}%` }}
            />
          ))}
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-20">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-2 mono-meta text-muted-foreground">{index}</div>
          <div className="col-span-12 md:col-span-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-foreground/20" />
            <span className="mono-meta text-muted-foreground">/ FIELD NOTE</span>
          </div>
        </div>
        <h1 className="mt-10 display-xl max-w-5xl">{title}</h1>
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-2 mono-meta text-muted-foreground pt-2">
            — Abstract
          </div>
          <p className="col-span-12 md:col-span-7 body-lead">{description}</p>
        </div>
      </div>
    </section>
  );
}
