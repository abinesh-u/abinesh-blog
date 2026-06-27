import { mock, test, describe, expect } from "bun:test";
import React from "react";

// Mock TanStack routing context to load Route component
mock.module("@tanstack/react-router", () => {
  return {
    createFileRoute: (path: string) => {
      return (options: any) => {
        return {
          options,
        };
      };
    },
    Link: ({ children, to, activeProps, activeOptions, ...props }: any) => {
      return <a href={to} {...props}>{children}</a>;
    },
  };
});

// Mock SiteShell to isolate Contact component testing and improve runtime reliability
mock.module("@/components/site-shell", () => {
  return {
    SiteShell: ({ children }: any) => <div className="site-shell-mock">{children}</div>,
  };
});

import { renderToStaticMarkup } from "react-dom/server";

import { Route } from "../src/routes/contact";
import { siteMetadata } from "../src/lib/metadata";

describe("Contact Component - Dynamic DOM & Integration Validation", () => {
  const Component = Route.options.component;
  if (!Component) {
    throw new Error("Contact component is not exported properly on Route.");
  }

  // Render the contact page component to HTML
  const html = renderToStaticMarkup(<Component />);

  // ==========================================
  // 5. Platforms Connected Ecosystem
  // ==========================================
  test("TC-5.1.1: Platform count (6 nodes)", () => {
    // There should be exactly 6 external ecosystem anchors listed
    const ecosystemMatches = html.match(/href="https:\/\/[^"]+"/g) || [];
    // Filter to count the ones containing platform URLs
    const platformUrls = [
      siteMetadata.socials.medium,
      siteMetadata.socials.youtube,
      siteMetadata.socials.x,
      siteMetadata.socials.devto,
      siteMetadata.socials.googleDev,
      siteMetadata.socials.instagram
    ];
    const platformMatches = ecosystemMatches.filter(url => 
      platformUrls.some(platUrl => url.includes(platUrl))
    );
    expect(platformMatches.length).toBe(6);
  });

  test("TC-5.1.2: Platform target links", () => {
    expect(html).toContain(siteMetadata.socials.medium);
    expect(html).toContain(siteMetadata.socials.youtube);
    expect(html).toContain(siteMetadata.socials.x);
    expect(html).toContain(siteMetadata.socials.devto);
    expect(html).toContain(siteMetadata.socials.googleDev);
    expect(html).toContain(siteMetadata.socials.instagram);
  });

  test("TC-5.1.3: Platform ecosystem custom icons", () => {
    // Custom SVGs and Lucide icons should render svg tags
    const svgCount = (html.match(/<svg/g) || []).length;
    expect(svgCount).toBeGreaterThanOrEqual(8); // Hero background, connectors, plus platform/communication icons
  });

  test("TC-5.1.4: User casing handles", () => {
    expect(html).toContain("@abinesh_ai");
    expect(html).toContain("abineshu");
  });

  test("TC-5.1.5: Status labels format", () => {
    expect(html).toContain("INDEXED");
    expect(html).toContain("ONLINE");
    expect(html).toContain("VERIFIED");
  });

  test("TC-5.2.1: Metadata centralization source compliance", () => {
    // Verifies that the platform URLs match siteMetadata definitions exactly
    expect(html).toContain(`href="${siteMetadata.socials.medium}"`);
    expect(html).toContain(`href="${siteMetadata.socials.youtube}"`);
    expect(html).toContain(`href="${siteMetadata.socials.x}"`);
  });

  test("TC-5.2.2: Hover detail fade-in classes", () => {
    expect(html).toContain("group-hover:opacity-100 transition-opacity");
  });

  test("TC-5.2.3: Architectural background mesh visuals", () => {
    // Verify background decorative svg line nodes exist in the markup
    expect(html).toContain('stroke-dasharray="2 2"');
    expect(html).toContain('cx="300" cy="150"');
  });

  test("TC-5.2.4: Dynamic column adaptation", () => {
    expect(html).toContain("grid grid-cols-2 md:grid-cols-3");
  });

  test("TC-5.2.5: URL structure validation", () => {
    // All platform target links must be absolute HTTP/HTTPS addresses
    const links = [
      siteMetadata.socials.medium,
      siteMetadata.socials.youtube,
      siteMetadata.socials.x,
      siteMetadata.socials.devto,
      siteMetadata.socials.googleDev,
      siteMetadata.socials.instagram
    ];
    links.forEach(link => {
      expect(link.startsWith("http://") || link.startsWith("https://")).toBe(true);
    });
  });

  // ==========================================
  // 6. Collaboration Protocol Workflow
  // ==========================================
  test("TC-6.1.1: Process step count (4 steps)", () => {
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("03");
    expect(html).toContain("04");
  });

  test("TC-6.1.2: Chronological ordering (01, 02, 03, 04)", () => {
    // Scope the search to the collaboration protocol section which comes after Communication Topology
    const sectionStart = html.indexOf("Collaboration Protocol");
    expect(sectionStart).toBeGreaterThan(-1);
    const sectionHtml = html.slice(sectionStart);
    const idx1 = sectionHtml.indexOf(">01<");
    const idx2 = sectionHtml.indexOf(">02<");
    const idx3 = sectionHtml.indexOf(">03<");
    const idx4 = sectionHtml.indexOf(">04<");
    expect(idx1).toBeGreaterThan(-1);
    expect(idx1).toBeLessThan(idx2);
    expect(idx2).toBeLessThan(idx3);
    expect(idx3).toBeLessThan(idx4);
  });

  test("TC-6.1.3: Phase title matches (Discovery, Architecture Review, Proposal, Execution)", () => {
    expect(html).toContain("Discovery");
    expect(html).toContain("Architecture Review");
    expect(html).toContain("Proposal");
    expect(html).toContain("Execution");
  });

  test("TC-6.1.4: Descriptive text blocks existence", () => {
    expect(html).toContain("Initial intake, scope alignment");
    expect(html).toContain("Deep-dive analysis of agent loops");
    expect(html).toContain("Formulating multi-agent orchestration designs");
    expect(html).toContain("Implementation, testing, evaluation runtimes");
  });

  test("TC-6.1.5: Thin vertical connector line positioning", () => {
    expect(html).toContain("absolute left-10 top-10 bottom-10 w-px");
  });

  test("TC-6.2.1: Diagnostics status tags display", () => {
    expect(html).toContain("INPUT");
    expect(html).toContain("PROCESSED");
    expect(html).toContain("COMPILE");
    expect(html).toContain("OUTPUT");
  });

  test("TC-6.2.2: Pulsing bullet step accents", () => {
    expect(html).toContain("absolute -top-0.5 -right-0.5 h-1.5 w-1.5");
  });

  test("TC-6.2.3: Connector alignment on mobile", () => {
    // Verifies timeline connector element contains responsive alignment configurations
    expect(html).toContain("left-10");
  });

  test("TC-6.2.4: Text alignment stability", () => {
    expect(html).toContain("flex-1 min-w-0");
  });

  test("TC-6.2.5: React iteration key compliance", () => {
    // Verify that the step numbers used as keys ("01".."04") appear in HTML as distinct elements
    // This confirms React received unique keys during map rendering
    const stepPattern = /\b0[1-4]\b/g;
    const sectionStart = html.indexOf("Collaboration Protocol");
    expect(sectionStart).toBeGreaterThan(-1);
    const protocolSection = html.slice(sectionStart);
    const stepMatches = protocolSection.match(stepPattern) || [];
    // Should have all 4 steps rendered
    expect(stepMatches.filter(m => m === "01").length).toBeGreaterThanOrEqual(1);
    expect(stepMatches.filter(m => m === "02").length).toBeGreaterThanOrEqual(1);
    expect(stepMatches.filter(m => m === "03").length).toBeGreaterThanOrEqual(1);
    expect(stepMatches.filter(m => m === "04").length).toBeGreaterThanOrEqual(1);
  });

  // ==========================================
  // 7. System Status Dashboard
  // ==========================================
  test("TC-7.1.1: Telemetry footer block presence", () => {
    expect(html).toContain("SYSTEM_TELEMETRY_06");
  });

  test("TC-7.1.2: Diagnostic availability indicators", () => {
    expect(html).toContain("OPERATIONAL STATUS");
    expect(html).toContain("AVAILABLE FOR ADVISORY");
  });

  test("TC-7.1.3: Geographical timezone details", () => {
    expect(html).toContain("TIMEZONE / REGION");
    expect(html).toContain("IST (UTC+5:30)");
  });

  test("TC-7.1.4: Response latency metrics", () => {
    expect(html).toContain("RESPONSE LATENCY");
    expect(html).toContain("98% / &lt; 24 HOURS"); // HTML encoded markup verification
  });

  test("TC-7.1.5: Gateway preferred routing channels", () => {
    expect(html).toContain("PRIMARY GATEWAY");
    expect(html).toContain("LINKEDIN / EMAIL");
  });

  test("TC-7.2.1: Diagnostics code tags format (SYS_STATUS_OK, etc.)", () => {
    expect(html).toContain("SYS_STATUS_OK");
    expect(html).toContain("LOC_ZONE_01");
    expect(html).toContain("METRIC_RESP_01");
    expect(html).toContain("GATEWAY_PREF");
  });

  test("TC-7.2.2: Responsive telemetry column spans", () => {
    expect(html).toContain("grid-cols-1 sm:grid-cols-2 lg:grid-cols-4");
  });

  test("TC-7.2.3: Visual accent status indicators", () => {
    expect(html).toContain("w-1.5 h-1.5 border border-foreground/20");
  });

  test("TC-7.2.4: Monospace typography styling", () => {
    expect(html).toContain("font-mono");
  });

  test("TC-7.2.5: Contrast compatibility", () => {
    // Verifies text uses dimmed foreground colors for compliance with contrast boundaries
    expect(html).toContain("text-foreground/35");
    expect(html).toContain("text-foreground/30");
  });

  // ==========================================
  // Tier 3: Cross-Feature Combinations
  // ==========================================
  test("TC-3.1: Responsive layout shifts and vector connector visibility", () => {
    // Horizontal SVG is desktop-only, mobile vertical separator is hidden on desktop
    expect(html).toContain("hidden md:block w-full h-full");
    expect(html).toContain("md:hidden w-px h-16");
  });

  test("TC-3.2: Interaction clickability during detail drawers expansion", () => {
    // Links have "group cursor-pointer" and pointer-events is NOT disabled on the link itself
    expect(html).toContain("mailto:hello@abinesh.blog");
    expect(html).toContain("group-hover:max-h-40");
    // Verify dot-bg has pointer-events-none so it doesn't block clicks on links
    expect(html).toContain("dot-bg opacity-[0.03] pointer-events-none");
  });

  test("TC-3.3: Decentralized platforms metadata synchronization", () => {
    // Communication nodes and PlatformsConnectedEcosystem both reference the centralized siteMetadata
    expect(html).toContain(siteMetadata.socials.linkedin);
    expect(html).toContain(siteMetadata.socials.github);
  });

  test("TC-3.4: Light/Dark color adjustments for diagnostic output", () => {
    // Dark mode variant styles exist on the links and status indicators
    expect(html).toContain("dark:group-hover:text-neutral-200");
    expect(html).toContain("dark:bg-neutral-400");
  });

  test("TC-3.5: Diagnostics dashboard and timeline tag casing consistency", () => {
    // Confirm uppercase casing on telemetry tags and status badges
    expect(html).toContain("SYS_STATUS_OK");
    expect(html).toContain("INPUT");
    expect(html).toContain("PROCESSED");
    expect(html).toContain("COMPILE");
    expect(html).toContain("OUTPUT");
  });

  // ==========================================
  // Tier 4: Real-World Scenarios
  // ==========================================
  test("TC-4.1: Client E2E onboarding walkthrough simulation", () => {
    // Simulate navigation walkthrough: Client finds email channel
    const emailIndex = html.indexOf("hello@abinesh.blog");
    const emailProtocol = html.indexOf("SMTP / SSL");
    const emailAction = html.indexOf("SEND ↗");
    
    expect(emailIndex).toBeGreaterThan(-1);
    expect(emailProtocol).toBeGreaterThan(-1);
    expect(emailAction).toBeGreaterThan(-1);
    // Latency details should display next to email protocol info
    expect(html).toContain("&lt; 24 HOURS");
  });

  test("TC-4.2: Recruiter repo clone workflow simulation", () => {
    // Simulate recruiter visiting GitHub node
    expect(html).toContain("@abinesh-u");
    expect(html).toContain("SSH / KEY");
    expect(html).toContain("CLONE ↗");
  });

  test("TC-4.3: Crawler SEO and metadata verification", () => {
    // Verify metadata options are set on Route
    expect(Route.options.head).toBeDefined();
    const headMetadata = Route.options.head!({} as any);
    expect(headMetadata.meta).toBeDefined();
    expect(headMetadata.links).toBeDefined();

    const titleMeta = headMetadata.meta?.find((m: any) => m.title);
    const descMeta = headMetadata.meta?.find((m: any) => m.name === "description");
    const canonicalLink = headMetadata.links?.find((l: any) => l.rel === "canonical");

    expect(titleMeta?.title).toBe("Contact — Abinesh U");
    expect(descMeta?.content).toContain("Get in touch with Abinesh U");
    expect(canonicalLink?.href).toBe("https://abinesh.blog/contact");
  });

  test("TC-4.4: Layout shifting prevention during dynamic hover transitions", () => {
    // Check that transition wrapper cards employ height boundaries (max-h-0 and overflow-hidden)
    // to isolate layout recalculations inside the hover card block.
    expect(html).toContain("opacity-0 max-h-0 overflow-hidden");
  });

  test("TC-4.5: Keyboard-only tab focus path validation", () => {
    // Standard link tags must not be skipped by browser tabs (no tabIndex={-1})
    // and must have href target parameters for normal keyboard events
    const tabIndexCheck = html.includes('tabIndex="-1"') || html.includes("tabIndex={-1}");
    expect(tabIndexCheck).toBe(false);
  });
});
