import { mock } from "bun:test";
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
    Link: ({ children, to, ...props }: any) => {
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

import { test, describe, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Route } from "../src/routes/contact";
import { siteMetadata, socialLinksList, sameAsUrls } from "../src/lib/metadata";

describe("Contact Redesign - Adversarial and Edge Case Verification", () => {
  const Component = Route.options.component;
  if (!Component) {
    throw new Error("Contact component is not exported properly on Route.");
  }

  const html = renderToStaticMarkup(<Component />);

  describe("Metadata Synchronization & Absolute URL Validation", () => {
    test("All socials in siteMetadata are valid absolute HTTPS URLs", () => {
      Object.entries(siteMetadata.socials).forEach(([platform, url]) => {
        expect(url.startsWith("https://")).toBe(true);
        expect(() => new URL(url)).not.toThrow();
      });
    });

    test("All siteMetadata socials keys are represented in socialLinksList and sameAsUrls", () => {
      const socialKeys = Object.keys(siteMetadata.socials) as Array<keyof typeof siteMetadata.socials>;
      const socialLinksUrls = socialLinksList.map(item => item.href);
      
      socialKeys.forEach(key => {
        const url = siteMetadata.socials[key];
        // Must be in sameAsUrls
        expect(sameAsUrls).toContain(url);
        // Must be in socialLinksList
        expect(socialLinksUrls).toContain(url);
      });
    });
  });

  describe("Route Head SEO & Meta Tags Completeness", () => {
    const headFn = Route.options.head;
    expect(headFn).toBeDefined();
    const headData = headFn ? headFn() : { meta: [], links: [] };
    const metaTags = headData.meta || [];
    const linkTags = headData.links || [];

    test("Canonical link must be a valid absolute URL", () => {
      const canonical = linkTags.find((l: any) => l.rel === "canonical");
      expect(canonical).toBeDefined();
      if (canonical) {
        expect(canonical.href.startsWith("https://")).toBe(true);
      }
    });

    test("og:url must be a valid absolute URL", () => {
      const ogUrl = metaTags.find((m: any) => m.property === "og:url");
      expect(ogUrl).toBeDefined();
      if (ogUrl) {
        expect(ogUrl.content.startsWith("https://")).toBe(true);
      }
    });

    test("Critical social metadata tags are present (og:image, Twitter cards)", () => {
      const ogImage = metaTags.find((m: any) => m.property === "og:image");
      const twitterCard = metaTags.find((m: any) => m.name === "twitter:card");
      const twitterTitle = metaTags.find((m: any) => m.name === "twitter:title");
      const twitterDesc = metaTags.find((m: any) => m.name === "twitter:description");
      const twitterImage = metaTags.find((m: any) => m.name === "twitter:image");

      expect(ogImage).toBeDefined();
      expect(twitterCard).toBeDefined();
      expect(twitterTitle).toBeDefined();
      expect(twitterDesc).toBeDefined();
      expect(twitterImage).toBeDefined();
    });
  });

  describe("UX Interactivity & Style Conflicts", () => {
    test("Sticker image: hover scale class should not conflict with pointer-events-none", () => {
      // Find the sticker img tag
      // className="w-72 md:w-80 lg:w-[26rem] h-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-500 ease-out pointer-events-none select-none"
      const match = html.match(/<img[^>]+src="\/assets\/contact\/sticker\.svg"[^>]*class="([^"]+)"/);
      expect(match).not.toBeNull();
      if (match) {
        const classes = match[1].split(" ");
        const hasPointerEventsNone = classes.includes("pointer-events-none");
        const hasHoverScale = classes.some(c => c.startsWith("hover:"));
        
        // Having both means hover transition is dead/unreachable code since pointer events are ignored.
        expect(hasPointerEventsNone && hasHoverScale).toBe(false);
      }
    });

    test("Mobile Touch Accessibility - Communication cards should support tap state or touch event toggles", () => {
      // White-box check: does the Contact component source contain touch-based state handling (like onTouchStart or state hook)?
      const fs = require("fs");
      const path = require("path");
      const contactSource = fs.readFileSync(path.join(process.cwd(), "src/routes/contact.tsx"), "utf8");
      
      const hasTouchEvents = contactSource.includes("onTouch") || contactSource.includes("useState");
      expect(hasTouchEvents).toBe(true);
    });

    test("Ecosystem status indicator color robustness", () => {
      // Verify that status colors are dynamic based on status instead of hardcoded to emerald.
      // If a status was "OFFLINE" or "DEPRECATED", it should not be emerald-500.
      const fs = require("fs");
      const path = require("path");
      const contactSource = fs.readFileSync(path.join(process.cwd(), "src/routes/contact.tsx"), "utf8");

      // Check if we dynamically assign status color class or if we just hardcode "bg-emerald-500" for all
      const hasDynamicStatusColors = contactSource.includes("plat.status === ") || contactSource.includes("statusBg");
      // Since statusBg is used for communicationNodes, let's see if ecosystemPlatforms uses dynamic class or hardcodes emerald.
      // In ecosystemPlatforms rendering:
      // <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
      // It is hardcoded to bg-emerald-500 regardless of whether status is ONLINE, INDEXED, ACTIVE, STABLE, VERIFIED or if it could be OFFLINE.
      const hasHardcodedEcosystemEmerald = contactSource.includes("bg-emerald-500 animate-pulse");
      expect(hasHardcodedEcosystemEmerald).toBe(false);
    });
  });

  describe("Layout Constraints & Connector Alignment Deviation", () => {
    test("SVG connector branch centers match calculated grid column centers", () => {
      // The SVG hero background uses x=100, x=300, x=500 for the channel gateway branch lines.
      // The communication topology grid was updated to use gap-x-0 (zero horizontal gap),
      // so the column centers at 1/6, 3/6, 5/6 of 600px now align correctly with the SVG coordinates.
      const fs = require("fs");
      const path = require("path");
      const contactSource = fs.readFileSync(path.join(process.cwd(), "src/routes/contact.tsx"), "utf8");

      // Verify the communication topology grid uses zero horizontal gap (gap-x-0)
      // so there's no alignment mismatch with the SVG branch coordinates
      const communicationGridHasZeroXGap = contactSource.includes("gap-x-0");
      expect(communicationGridHasZeroXGap).toBe(true);

      // Verify SVG branch x-coordinates are present in the file
      expect(contactSource).toContain('x1="100"');
      expect(contactSource).toContain('x1="500"');
    });
  });
});
