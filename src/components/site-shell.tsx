import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { socialLinksList, siteMetadata } from "../lib/metadata";
import { systems, projects } from "../lib/content";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/systems", label: "Systems" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            // Optionally stop observing once triggered to run animation only once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10px 0px", // Trigger when elements are just inside the viewport
        threshold: 0.05,
      }
    );

    // Dynamic queries for any trigger elements
    const elements = document.querySelectorAll(
      ".reveal-trigger, .reveal-trigger-scale, .reveal-trigger-left, .reveal-trigger-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]); // Re-run observer on page/navigation changes

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
              className="group relative flex items-baseline gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-1 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              activeProps={{
                className:
                  "group relative flex items-baseline gap-1.5 text-sm text-foreground px-1 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70 group-hover:text-muted-foreground/45 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative pb-0.5">
                {n.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-expo" />
              </span>
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="group hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-all duration-300 ease-expo focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span>Get in touch</span>
          <span className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
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
    <footer className="mt-40 bg-background relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-16">
        {/* Grid of columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Status Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6 reveal-trigger" style={{ transitionDelay: "50ms" }}>
            <div className="flex items-center gap-3">
              <img
                src="/assets/common/logo.svg"
                alt="Abinesh U Logo"
                className="h-6 w-auto object-contain dark:invert"
              />
              <img
                src="/assets/common/wordmark.svg"
                alt="Abinesh U"
                className="h-3.5 w-auto object-contain dark:invert"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Designing intelligent systems, agentic architectures, and production-grade runtimes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground bg-secondary/35 border border-hairline px-2.5 py-1.5 rounded w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>All systems operational</span>
              </div>
              <p className="font-mono text-[9px] text-muted-foreground leading-relaxed">
                © {new Date().getFullYear()} Abinesh U.<br />All architectures fully documented.
              </p>
            </div>
          </div>

          {/* Directory Column */}
          <div className="reveal-trigger" style={{ transitionDelay: "100ms" }}>
            <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/80 mb-4">Navigation</div>
            <ul className="space-y-2">
              {footerNav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Systems Column */}
          <div className="reveal-trigger" style={{ transitionDelay: "150ms" }}>
            <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/80 mb-4">Systems</div>
            <ul className="space-y-2">
              {systems.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/systems"
                    className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1 truncate max-w-[180px]"
                    title={s.title}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies Column */}
          <div className="reveal-trigger" style={{ transitionDelay: "200ms" }}>
            <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/80 mb-4">Case Studies</div>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects"
                    hash={p.slug}
                    className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gateways Column */}
          <div className="reveal-trigger" style={{ transitionDelay: "250ms" }}>
            <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/80 mb-4">Gateways</div>
            <ul className="space-y-2">
              {socialLinksList.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 py-1"
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
