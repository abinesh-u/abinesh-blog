import { mock, test, describe, expect } from "bun:test";
import React from "react";
import { readFileSync } from "fs";
import { join } from "path";

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
      return React.createElement("a", { href: to, ...props }, children);
    },
  };
});

// Mock SiteShell to isolate Contact component testing
mock.module("@/components/site-shell", () => {
  return {
    SiteShell: ({ children }: any) => React.createElement("div", { className: "site-shell-mock" }, children),
  };
});

import { renderToStaticMarkup } from "react-dom/server";
import { Route } from "../src/routes/contact";
import { siteMetadata, socialLinksList, sameAsUrls } from "../src/lib/metadata";

const CONTACT_FILE_PATH = join(process.cwd(), "src/routes/contact.tsx");

describe("Contact Redesign - Consolidated Adversarial & Edge Case Verification", () => {
  const Component = Route.options.component;
  if (!Component) {
    throw new Error("Contact component is not exported properly on Route.");
  }

  const html = renderToStaticMarkup(React.createElement(Component));
  const contactSource = readFileSync(CONTACT_FILE_PATH, "utf8");

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
        expect(sameAsUrls).toContain(url);
        expect(socialLinksUrls).toContain(url);
      });
    });

    test("Route head options dynamically reference siteMetadata", () => {
      expect(Route.options.head).toBeDefined();
      if (Route.options.head) {
        const headData = Route.options.head({} as any);
        const titleMeta = headData.meta.find((m: any) => m.title !== undefined);
        const descMeta = headData.meta.find((m: any) => m.name === "description");
        
        expect(titleMeta?.title).toBe(`Contact — ${siteMetadata.name}`);
        expect(descMeta?.content).toContain(siteMetadata.name);
      }
    });

    test("Canonical link must be a valid absolute URL", () => {
      if (Route.options.head) {
        const headData = Route.options.head({} as any);
        const canonical = headData.links.find((l: any) => l.rel === "canonical");
        expect(canonical).toBeDefined();
        if (canonical) {
          expect(canonical.href.startsWith("https://")).toBe(true);
          expect(canonical.href).toBe(`${siteMetadata.url}/contact`);
        }
      }
    });

    test("og:url must be a valid absolute URL", () => {
      if (Route.options.head) {
        const headData = Route.options.head({} as any);
        const ogUrl = headData.meta.find((m: any) => m.property === "og:url");
        expect(ogUrl).toBeDefined();
        if (ogUrl) {
          expect(ogUrl.content.startsWith("https://")).toBe(true);
          expect(ogUrl.content).toBe(`${siteMetadata.url}/contact`);
        }
      }
    });

    test("Critical social metadata tags are present (og:image, Twitter cards)", () => {
      if (Route.options.head) {
        const headData = Route.options.head({} as any);
        const metaTags = headData.meta || [];

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

        expect(ogImage.content).toBe(siteMetadata.imageUrl);
        expect(twitterImage.content).toBe(siteMetadata.imageUrl);
      }
    });
  });

  describe("UX Interactivity & Style Conflicts", () => {
    test("Sticker image: responds to hover and does not have pointer-events-none", () => {
      const match = html.match(/<img[^>]+src="\/assets\/contact\/sticker\.svg"[^>]*class="([^"]+)"/);
      expect(match).not.toBeNull();
      if (match) {
        const classes = match[1].split(" ");
        const hasPointerEventsNone = classes.includes("pointer-events-none");
        const hasHoverScale = classes.some(c => c.startsWith("hover:"));
        
        expect(hasPointerEventsNone).toBe(false);
        expect(hasHoverScale).toBe(true);
      }
    });

    test("Keyboard Navigation Accessibility - Detail cards support keyboard focus transition styles", () => {
      const hasGroupFocusWithin = contactSource.includes("group-focus-within:opacity-100") &&
                                  contactSource.includes("group-focus-within:max-h-40");
      expect(hasGroupFocusWithin).toBe(true);
    });

    test("Mobile Touch Accessibility - Communication cards support tap state and touch event toggles", () => {
      const hasTouchEvents = contactSource.includes("onTouchStart") && contactSource.includes("useState");
      expect(hasTouchEvents).toBe(true);
    });

    test("Ecosystem status indicator color robustness", () => {
      const hasDynamicStatusColors = contactSource.includes("getStatusColorClass");
      expect(hasDynamicStatusColors).toBe(true);
      
      const hasHardcodedEcosystemEmerald = contactSource.includes("bg-emerald-500 animate-pulse") && 
                                           !contactSource.includes("getStatusColorClass");
      expect(hasHardcodedEcosystemEmerald).toBe(false);
    });
  });

  describe("Layout Constraints & Connector Alignment Deviation", () => {
    test("SVG connector branch centers match calculated grid column centers", () => {
      // The cards grid uses gap-x-0 instead of gap-6 to avoid center offset misalignment,
      // and each of the 3 column wrappers uses px-3 to maintain the visual 24px gutter.
      const hasGapX0 = contactSource.includes("gap-x-0");
      const hasPx3 = contactSource.includes("px-3");
      
      expect(hasGapX0).toBe(true);
      expect(hasPx3).toBe(true);
    });
  });
});
