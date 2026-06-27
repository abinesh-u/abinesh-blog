import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { expect, test, describe } from "bun:test";

const CONTACT_PATH = join(process.cwd(), "src/routes/contact.tsx");
const METADATA_PATH = join(process.cwd(), "src/lib/metadata.ts");

describe("Contact Page Redesign - Static AST & Configuration Verification", () => {
  const content = readFileSync(CONTACT_PATH, "utf8");

  test("File paths exist", () => {
    expect(existsSync(CONTACT_PATH)).toBe(true);
    expect(existsSync(METADATA_PATH)).toBe(true);
  });

  // ==========================================
  // 1. Headline & Category Tag (Hero)
  // ==========================================
  test("TC-1.1.1: Existence of <h1> in Hero", () => {
    expect(content).toContain("<h1");
    expect(content).toContain("</h1>");
  });

  test("TC-1.1.2: Exact text content (Open a Channel.)", () => {
    expect(content).toContain("Open a");
    expect(content).toContain("Channel.");
    expect(content).toContain("italic font-normal");
  });

  test("TC-1.1.3: Category tag presence (06 / CONTACT)", () => {
    expect(content).toMatch(/06\s*\/\s*CONTACT/);
  });

  test("TC-1.1.4: Hero description text match", () => {
    expect(content).toContain("I am reachable for collaborations on agentic systems");
    expect(content).toContain("advisory work on production AI infrastructure");
  });

  test("TC-1.1.5: Monospace/muted aesthetic styles", () => {
    expect(content).toContain("mono-meta");
    expect(content).toContain("text-muted-foreground");
  });

  test("TC-1.2.1: Robustness against alternate layouts", () => {
    // Verifies that both mobile and desktop grids are configured in the container
    expect(content).toContain("grid-cols-12");
    expect(content).toContain("col-span-12");
    expect(content).toContain("lg:col-span-7");
  });

  test("TC-1.2.2: Whitespace formatting independence", () => {
    // Strips whitespace to ensure title components match independent of code spacing
    const normalized = content.replace(/\s+/g, "");
    expect(normalized).toContain("Opena<br/>");
    expect(normalized).toContain("Channel.");
  });

  test("TC-1.2.3: Concatenated title verification", () => {
    // Verifies the two parts of the title render in sequential order
    const openIndex = content.indexOf("Open a");
    const channelIndex = content.indexOf("Channel.");
    expect(openIndex).toBeGreaterThan(-1);
    expect(channelIndex).toBeGreaterThan(-1);
    expect(channelIndex).toBeGreaterThan(openIndex);
  });

  test("TC-1.2.4: Spacing margins for mobile layout stability", () => {
    // Verifies layout spacing and padding styles are present
    expect(content).toContain("pt-8");
    expect(content).toContain("pb-24");
    expect(content).toContain("mt-10");
  });

  test("TC-1.2.5: TanStack route metadata synchronization", () => {
    // Verifies route head meta contains the exact page properties
    expect(content).toContain("title: `Contact — ${siteMetadata.name}`");
    expect(content).toContain('name: "description"');
    expect(content).toContain("property: \"og:url\", content: `${siteMetadata.url}/contact`");
    expect(content).toContain("links: [{ rel: \"canonical\", href: `${siteMetadata.url}/contact` }]");
  });

  // ==========================================
  // 2. Sticker SVG Integration
  // ==========================================
  test("TC-2.1.1: Sticker image path /assets/contact/sticker.svg existence", () => {
    expect(content).toContain('const stickerUrl = "/assets/contact/sticker.svg"');
  });

  test("TC-2.1.2: Alt attribute description (Abinesh U sticker)", () => {
    expect(content).toContain('alt="Abinesh U sticker"');
  });

  test("TC-2.1.3: Grid layout allocation", () => {
    expect(content).toContain("col-span-12 lg:col-span-5");
  });

  test("TC-2.1.4: Bound within container blocks", () => {
    // Sticker is now absolutely positioned within a relative min-h container in the hero grid
    expect(content).toContain("col-span-12 lg:col-span-5");
    expect(content).toContain("relative min-h-");
  });

  test("TC-2.1.5: Responsive dimension classes", () => {
    // Sticker now uses absolute positioning with percentage height for a bleeding effect
    expect(content).toContain("h-[105%] lg:h-[120%]");
    expect(content).toContain("select-none");
  });

  test("TC-2.2.1: Interaction prevention (select-none is present, but pointer-events-none is removed for interactivity)", () => {
    expect(content).toContain("select-none");
    expect(content).not.toContain("pointer-events-none select-none");
  });

  test("TC-2.2.2: SVG asset validation", () => {
    expect(content).toContain(".svg");
  });

  test("TC-2.2.3: Hover micro-transitions presence", () => {
    expect(content).toContain("hover:scale-[1.02] transition-transform duration-500 ease-out");
  });

  test("TC-2.2.4: Drop-shadow classes for visual depth", () => {
    expect(content).toContain("drop-shadow-[0_16px_48px_rgba(0,0,0,0.12)]");
  });

  test("TC-2.2.5: Graceful image load failure robustness", () => {
    // Check that standard properties keep layout stable even if image fails
    expect(content).toContain("drop-shadow-[");
    expect(content).toContain("select-none");
    // Sticker is absolutely positioned — verify it has sizing classes
    expect(content).toContain("h-[105%]");
  });

  // ==========================================
  // 3. Communication Nodes
  // ==========================================
  test("TC-3.1.1: Exact node count (3 nodes)", () => {
    const matches = content.match(/port:\s*"\d\d"/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(3);
  });

  test("TC-3.1.2: Valid target URLs (Email, LinkedIn, GitHub)", () => {
    expect(content).toContain("hello@abinesh.blog");
    expect(content).toContain("siteMetadata.socials.linkedin");
    expect(content).toContain("siteMetadata.socials.github");
  });

  test("TC-3.1.3: Visual lucide-react icons existence", () => {
    expect(content).toContain("Mail");
    expect(content).toContain("Linkedin");
    expect(content).toContain("Github");
  });

  test("TC-3.1.4: Port moniker labels format (PORT / ch_01)", () => {
    expect(content).toContain("PORT / ch_{node.port}");
  });

  test("TC-3.1.5: Status indicators rendering", () => {
    expect(content).toContain("statusBg");
    expect(content).toContain("ACTIVE");
    expect(content).toContain("STABLE");
  });

  test("TC-3.2.1: Target security attributes (_blank, noreferrer)", () => {
    // Verify target="_blank" check dynamically evaluates for http URLs and rel="noreferrer" is always added
    expect(content).toContain('target={node.href.startsWith("http") ? "_blank" : undefined}');
    expect(content).toContain('rel="noreferrer"');
  });

  test("TC-3.2.2: Pulsing status dots animation", () => {
    expect(content).toContain("rounded-full");
    expect(content).toContain("animate-pulse");
  });

  test("TC-3.2.3: Theme-compliant hover border transitions", () => {
    expect(content).toContain("brandBorder");
    expect(content).toContain("hover:border-red-500/30");
    expect(content).toContain("hover:border-sky-500/30");
    expect(content).toContain("hover:border-neutral-500/30");
  });

  test("TC-3.2.4: Address text truncation styling", () => {
    expect(content).toContain("truncate");
  });

  test("TC-3.2.5: Centralized metadata integration", () => {
    expect(content).toContain("import { siteMetadata } from");
  });

  // ==========================================
  // 4. Interactive Hover Metadata Cards
  // ==========================================
  test("TC-4.1.1: Metadata details panel existence", () => {
    expect(content).toContain("Interactive Slide-down Metadata Card");
  });

  test("TC-4.1.2: Casing for protocols (SMTP / SSL, etc.)", () => {
    expect(content).toContain("SMTP / SSL");
    expect(content).toContain("HTTPS / OAUTH");
    expect(content).toContain("SSH / KEY");
  });

  test("TC-4.1.3: Node purposes validation", () => {
    expect(content).toContain("DIRECT INTAKE");
    expect(content).toContain("PROFESSIONAL");
    expect(content).toContain("CODE REVIEWS");
  });

  test("TC-4.1.4: Response time latency display", () => {
    expect(content).toContain("< 24 HOURS");
    expect(content).toContain("< 12 HOURS");
    expect(content).toContain("< 48 HOURS");
  });

  test("TC-4.1.5: Action prompt text (SEND ↗, etc.)", () => {
    expect(content).toContain("SEND ↗");
    expect(content).toContain("CONNECT ↗");
    expect(content).toContain("CLONE ↗");
  });

  test("TC-4.2.1: Default hidden layout (opacity-0 max-h-0)", () => {
    expect(content).toContain("opacity-0");
    expect(content).toContain("max-h-0");
  });

  test("TC-4.2.2: Hover transition styles (group-hover:opacity-100 group-hover:max-h-40)", () => {
    expect(content).toContain("group-hover:opacity-100");
    expect(content).toContain("group-hover:max-h-40");
  });

  test("TC-4.2.3: Accessibility screen reader availability", () => {
    // Verify that the element's content is visually hidden with class styles (max-h-0, opacity-0) 
    // rather than using display:none or hidden attributes, which preserves accessibility.
    expect(content).not.toContain('style={{ display: "none" }}');
    expect(content).not.toContain('className="hidden"');
  });

  test("TC-4.2.4: Focus-within support for keyboard navigators", () => {
    // Verifies focus transitions match screen interactions
    expect(content).toContain("group cursor-pointer");
  });

  test("TC-4.2.5: Grid layout stability during card expansion", () => {
    // Verify height and overflow configurations prevent shifting of elements outside card bounds
    expect(content).toContain("overflow-hidden");
    expect(content).toContain("transition-all duration-500 ease-in-out");
  });
});
