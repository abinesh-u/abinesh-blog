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
      return React.createElement("a", { href: to, ...props }, children);
    },
  };
});

import { test, describe, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "fs";
import { join } from "path";

import { Route } from "../src/routes/contact";
import { siteMetadata } from "../src/lib/metadata";

const CONTACT_FILE_PATH = join(process.cwd(), "src/routes/contact.tsx");

describe("Contact Page Redesign - Adversarial Test Suite", () => {
  // Test Case 1: Route options head configuration and structure
  test("TC-A1.1: Route options head returns expected metadata structure", () => {
    expect(Route.options.head).toBeDefined();
    if (Route.options.head) {
      const headData = Route.options.head({} as any);
      expect(headData).toBeTypeOf("object");
      expect(headData.meta).toBeTypeOf("object");
      expect(Array.isArray(headData.meta)).toBe(true);
      expect(headData.links).toBeTypeOf("object");
      expect(Array.isArray(headData.links)).toBe(true);

      // Verify necessary SEO tags are present
      const metaNames = headData.meta.map((m: any) => m.name || m.property || (m.title ? "title" : ""));
      expect(metaNames).toContain("title");
      expect(metaNames).toContain("description");
      expect(metaNames).toContain("og:title");
      expect(metaNames).toContain("og:description");
      expect(metaNames).toContain("og:url");

      const canonicalLink = headData.links.find((l: any) => l.rel === "canonical");
      expect(canonicalLink).toBeDefined();
    }
  });

  // Test Case 2: Verification of dynamic synchronization of metadata
  test("TC-A1.2: Metadata in Route head is dynamically synchronized with siteMetadata", () => {
    if (Route.options.head) {
      const headData = Route.options.head({} as any);
      const titleMeta = headData.meta.find((m: any) => m.title !== undefined);
      const descMeta = headData.meta.find((m: any) => m.name === "description");

      // Verify that contact route metadata now dynamically references siteMetadata.name
      expect(titleMeta?.title).toContain(siteMetadata.name);
      expect(titleMeta?.title).toContain("Contact");
      expect(descMeta?.content).toContain(siteMetadata.name);
      expect(descMeta?.content).toContain("Get in touch with");
    }
  });

  // Test Case 3: URL Absoluteness Verification (OpenGraph/Canonical links are now absolute)
  test("TC-A1.3: OpenGraph and Canonical links should ideally be absolute URLs", () => {
    if (Route.options.head) {
      const headData = Route.options.head({} as any);
      const ogUrlMeta = headData.meta.find((m: any) => m.property === "og:url");
      const canonicalLink = headData.links.find((l: any) => l.rel === "canonical");

      expect(ogUrlMeta).toBeDefined();
      expect(canonicalLink).toBeDefined();

      // URLs are now absolute (using siteMetadata.url prefix) — this is the correct SEO behavior
      expect(ogUrlMeta?.content).toContain("https://");
      expect(canonicalLink?.href).toContain("https://");
      expect(ogUrlMeta?.content).toContain("/contact");
      expect(canonicalLink?.href).toContain("/contact");
    }
  });

  // Test Case 4: Keyboard Navigation Accessibility (Focus vs Hover Card visibility)
  test("TC-A1.4: Detail cards support both hover and keyboard focus transition styles", () => {
    const Component = Route.options.component;
    expect(Component).toBeDefined();
    if (Component) {
      const html = renderToStaticMarkup(React.createElement(Component));
      
      // Verify we have hover card styles
      expect(html).toContain("group-hover:opacity-100");
      expect(html).toContain("group-hover:max-h-40");

      // Verify that focus-within transitions are now present for keyboard accessibility
      const hasGroupFocusWithin = html.includes("group-focus-within:");
      expect(hasGroupFocusWithin).toBe(true);
    }
  });

  // Test Case 5: Grid Layout Center Alignment with SVG Connector (Mathematical coordinate mismatch)
  test("TC-A1.5: SVG branching coordinates assume uniform layout without gutter offsets", () => {
    const content = readFileSync(CONTACT_FILE_PATH, "utf8");

    // Extract SVG connector parameters
    expect(content).toContain('viewBox="0 0 600 64"');
    
    // The branching lines are placed at:
    // Left: 100 (16.67% of 600)
    // Center: 300 (50.00% of 600)
    // Right: 500 (83.33% of 600)
    expect(content).toContain('x1="100"');
    expect(content).toContain('x1="300"');
    expect(content).toContain('x1="500"');

    // The grid container layout uses columns with spacing: "grid grid-cols-1 md:grid-cols-3 gap-6"
    expect(content).toContain("grid-cols-3");
    expect(content).toContain("gap-6");

    // Grid details: Column centers in a 3-column container with 24px (gap-6) gaps:
    // For width W:
    // Col 1 center = W/6 - 8px
    // Col 2 center = W/2
    // Col 3 center = W/6 * 5 + 8px
    // The horizontal branch positions in SVG (W/6, W/2, 5W/6) do not account for the 8px gutter offset
    // on the left/right columns, leading to alignment misalignment.
    // This test documents the static layout mismatch.
  });

  // Test Case 6: Mobile Interaction (Touch event handling is present)
  test("TC-A1.6: Interactive cards support touch event listeners for mobile hover state replication", () => {
    const content = readFileSync(CONTACT_FILE_PATH, "utf8");

    // Verify touch handlers are present to replicate hover state on mobile touch devices
    const hasTouchStart = content.includes("onTouchStart");
    expect(hasTouchStart).toBe(true);
  });

  // Test Case 7: Secure Protocols for siteMetadata Social links
  test("TC-A1.7: Centralized socials metadata URLs must use secure HTTPS protocol", () => {
    const urls = Object.values(siteMetadata.socials);
    expect(urls.length).toBeGreaterThan(0);
    urls.forEach((url) => {
      expect(url).toStartWith("https://");
    });
  });
});
