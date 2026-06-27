import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, SectionLabel } from "@/components/site-shell";

const heroUrl = "/assets/home/abinesh-portrait.svg";
import { systems, articles, projects } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abinesh U — Designing Intelligent Systems" },
      {
        name: "description",
        content:
          "AI engineer designing agentic AI, multi-agent architectures and production AI infrastructure. Architecture breakdowns, case studies and long-form technical writing.",
      },
      { property: "og:title", content: "Abinesh U — Designing Intelligent Systems" },
      {
        property: "og:description",
        content: "Agentic AI · Multi-Agent Architectures · Production AI Infrastructure",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroUrl },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <CurrentFocus />
      <FeaturedSystems />
      <LatestArticles />
      <FeaturedProjects />
      <ClosingCTA />
    </SiteShell>
  );
}

function Hero() {
  return (
    <>
      <section className="relative border-b hairline">
        <HeroArchitectureBackground />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 lg:pt-6">
            <div className="flex items-center gap-4">
              <span className="mono-meta text-muted-foreground">01 / Design · Build · Scale</span>
              <span className="h-px w-20 bg-foreground" />
            </div>
            <h1 className="mt-10 display-xl">
              Designing
              <br />
              Intelligent
              <br />
              <span className="italic font-normal">Systems.</span>
            </h1>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-foreground" />
              <span className="mono-caps">Abinesh U — AI Engineer</span>
            </div>
            <p className="mt-10 body-lead">
              I design and document agentic AI, multi-agent architectures and the infrastructure that
              takes them into production.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                to="/systems"
                className="text-xs font-mono uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:opacity-90"
              >
                Explore Systems →
              </Link>
              <Link
                to="/about"
                className="text-xs font-mono uppercase tracking-widest border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                About Abinesh
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[30rem] lg:min-h-[38rem] mt-12 lg:mt-0 flex items-center justify-center">
            {/* Portrait transparent SVG sticker (unwrapped, bleeding freely) */}
            <img
              src="/assets/home/abinesh-portrait.svg"
              alt="Portrait of Abinesh U, AI engineer"
              className="absolute bottom-[-20px] lg:bottom-[-55px] right-0 h-[115%] lg:h-[135%] w-auto max-w-none object-contain z-10 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Bottom marquee strip: Architectural Blueprint Flow */}
      <section className="relative border-b hairline bg-background py-16 overflow-hidden">
        {/* Subtle grid background to match the hero */}
        <div className="absolute inset-0 dot-bg opacity-[0.06] pointer-events-none select-none" />
        
        <style>{`
          @keyframes blueprint-flow-horizontal {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -20; }
          }
          .blueprint-connector-path {
            stroke-dasharray: 4 4;
            animation: blueprint-flow-horizontal 16s linear infinite;
          }
        `}</style>

        {/* Global SVG Definitions for this section */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <marker
              id="bp-arrow-horizontal"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 5 5 L 0 8 z" fill="currentColor" opacity="0.45" />
            </marker>
          </defs>
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative">
            
            {/* Step 1: SYSTEMS */}
            <div className="relative z-10 w-full md:max-w-[15rem] flex-1 p-4 border border-foreground/10 dark:border-foreground/5 bg-background/60 backdrop-blur-[2px] rounded hover:border-foreground/25 dark:hover:border-foreground/20 hover:bg-background/80 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/35 select-none">SYS_NODE_01</span>
                <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/45 uppercase select-none">SYSTEMS</span>
                <span className="block text-sm font-medium tracking-tight text-foreground/80">Growing</span>
              </div>
              <div className="mt-3 pt-2 border-t border-foreground/5 flex items-center justify-between text-[8px] font-mono text-foreground/35 select-none">
                <span>METRIC_01</span>
                <span className="animate-pulse text-foreground/50">● ACTIVE</span>
              </div>
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block flex-1 min-w-[2rem] h-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="6"
                  y1="16"
                  x2="100%"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="0" y="14" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>
            {/* Mobile Connector 1 */}
            <div className="md:hidden h-8 w-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="16"
                  y1="6"
                  x2="16"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="14" y="0" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>

            {/* Step 2: KNOWLEDGE */}
            <div className="relative z-10 w-full md:max-w-[15rem] flex-1 p-4 border border-foreground/10 dark:border-foreground/5 bg-background/60 backdrop-blur-[2px] rounded hover:border-foreground/25 dark:hover:border-foreground/20 hover:bg-background/80 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/35 select-none">KNL_NODE_02</span>
                <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/45 uppercase select-none">KNOWLEDGE</span>
                <span className="block text-sm font-medium tracking-tight text-foreground/80">Compounding</span>
              </div>
              <div className="mt-3 pt-2 border-t border-foreground/5 flex items-center justify-between text-[8px] font-mono text-foreground/35 select-none">
                <span>METRIC_02</span>
                <span className="animate-pulse text-foreground/50">● INDEXED</span>
              </div>
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block flex-1 min-w-[2rem] h-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="6"
                  y1="16"
                  x2="100%"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="0" y="14" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>
            {/* Mobile Connector 2 */}
            <div className="md:hidden h-8 w-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="16"
                  y1="6"
                  x2="16"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="14" y="0" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>

            {/* Step 3: PROJECTS */}
            <div className="relative z-10 w-full md:max-w-[15rem] flex-1 p-4 border border-foreground/10 dark:border-foreground/5 bg-background/60 backdrop-blur-[2px] rounded hover:border-foreground/25 dark:hover:border-foreground/20 hover:bg-background/80 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/35 select-none">PRJ_NODE_03</span>
                <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/45 uppercase select-none">PROJECTS</span>
                <span className="block text-sm font-medium tracking-tight text-foreground/80">Shipping</span>
              </div>
              <div className="mt-3 pt-2 border-t border-foreground/5 flex items-center justify-between text-[8px] font-mono text-foreground/35 select-none">
                <span>METRIC_03</span>
                <span className="animate-pulse text-foreground/50">● DEPLOYED</span>
              </div>
            </div>

            {/* Connector 3 */}
            <div className="hidden md:block flex-1 min-w-[2rem] h-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="6"
                  y1="16"
                  x2="100%"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="0" y="14" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>
            {/* Mobile Connector 3 */}
            <div className="md:hidden h-8 w-8 relative">
              <svg className="w-full h-full text-foreground" fill="none">
                <line
                  x1="16"
                  y1="6"
                  x2="16"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="blueprint-connector-path"
                  markerEnd="url(#bp-arrow-horizontal)"
                />
                <rect x="14" y="0" width="4" height="4" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>

            {/* Step 4: LEARNING */}
            <div className="relative z-10 w-full md:max-w-[15rem] flex-1 p-4 border border-foreground/10 dark:border-foreground/5 bg-background/60 backdrop-blur-[2px] rounded hover:border-foreground/25 dark:hover:border-foreground/20 hover:bg-background/80 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/35 select-none">LRN_NODE_04</span>
                <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-foreground/45 uppercase select-none">LEARNING</span>
                <span className="block text-sm font-medium tracking-tight text-foreground/80">Never Stops</span>
              </div>
              <div className="mt-3 pt-2 border-t border-foreground/5 flex items-center justify-between text-[8px] font-mono text-foreground/35 select-none">
                <span>METRIC_04</span>
                <span className="animate-pulse text-foreground/50">● ETERNAL</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function HeroArchitectureBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <div className="absolute inset-y-0 right-0 w-[58%] bg-gradient-to-l from-background/0 via-background/10 to-background md:to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent md:via-background/62" />
      <div className="absolute inset-0 grid-bg opacity-[0.06] md:hidden" />
      <div className="absolute top-[20px] bottom-0 right-0 hidden w-[58%] md:block">
        <div className="absolute inset-0 dot-bg opacity-[0.16]" />
        <GridBackground />
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-foreground opacity-70"
      viewBox="80 15 760 456"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>{`
          @keyframes blueprint-flow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -20; }
          }
          .blueprint-path {
            stroke-dasharray: 4 4;
            animation: blueprint-flow 16s linear infinite;
          }
          @keyframes blueprint-pulse {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; }
          }
          .blueprint-animated {
            animation: blueprint-pulse 6s ease-in-out infinite;
          }
        `}</style>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 5 5 L 0 8 z" fill="currentColor" />
        </marker>
      </defs>

      {/* 3. Dotted/Dashed Connector Paths with Subtle Flow Animation */}
      <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.45">
        {/* USER -> ORCHESTRATOR */}
        <line
          x1="600"
          y1="60"
          x2="600"
          y2="100"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />

        {/* ORCHESTRATOR -> 3 AGENTS */}
        <line x1="600" y1="142" x2="600" y2="165" className="blueprint-path" />
        {/* Horizontal Split */}
        <line x1="430" y1="165" x2="770" y2="165" className="blueprint-path" />
        {/* Down to RESEARCH */}
        <line
          x1="430"
          y1="165"
          x2="430"
          y2="195"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />
        {/* Down to CODING */}
        <line
          x1="600"
          y1="165"
          x2="600"
          y2="195"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />
        {/* Down to ANALYSIS */}
        <line
          x1="770"
          y1="165"
          x2="770"
          y2="195"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />

        {/* 3 AGENTS -> SHARED MEMORY */}
        <line x1="430" y1="235" x2="430" y2="265" className="blueprint-path" />
        <line x1="600" y1="235" x2="600" y2="265" className="blueprint-path" />
        <line x1="770" y1="235" x2="770" y2="265" className="blueprint-path" />
        {/* Horizontal Merge */}
        <line x1="430" y1="265" x2="770" y2="265" className="blueprint-path" />
        {/* Down to SHARED MEMORY */}
        <line
          x1="600"
          y1="265"
          x2="600"
          y2="295"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />

        {/* SHARED MEMORY -> EXTERNAL RESOURCES */}
        <line x1="600" y1="339" x2="600" y2="370" className="blueprint-path" />
        {/* Horizontal Split */}
        <line x1="430" y1="370" x2="770" y2="370" className="blueprint-path" />
        {/* Down to VECTOR DB */}
        <line
          x1="430"
          y1="370"
          x2="430"
          y2="400"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />
        {/* Down to TOOLS */}
        <line
          x1="600"
          y1="370"
          x2="600"
          y2="400"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />
        {/* Down to KNOWLEDGE */}
        <line
          x1="770"
          y1="370"
          x2="770"
          y2="400"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />

        {/* EXTERNAL RESOURCES -> RESPONSE ENGINE */}
        <line x1="430" y1="440" x2="430" y2="470" className="blueprint-path" />
        <line x1="600" y1="440" x2="600" y2="470" className="blueprint-path" />
        <line x1="770" y1="440" x2="770" y2="470" className="blueprint-path" />
        {/* Horizontal Merge */}
        <line x1="430" y1="470" x2="770" y2="470" className="blueprint-path" />
        {/* Down to RESPONSE ENGINE */}
        <line
          x1="600"
          y1="470"
          x2="600"
          y2="500"
          markerEnd="url(#arrow)"
          className="blueprint-path"
        />
      </g>

      {/* 4. Small Square Junction Nodes (at all line intersection splits/merges) */}
      <g fill="currentColor" fillOpacity="0.5">
        <rect x="598" y="163" width="4" height="4" />
        <rect x="428" y="163" width="4" height="4" />
        <rect x="768" y="163" width="4" height="4" />

        <rect x="598" y="263" width="4" height="4" />
        <rect x="428" y="263" width="4" height="4" />
        <rect x="768" y="263" width="4" height="4" />

        <rect x="598" y="368" width="4" height="4" />
        <rect x="428" y="368" width="4" height="4" />
        <rect x="768" y="368" width="4" height="4" />

        <rect x="598" y="468" width="4" height="4" />
        <rect x="428" y="468" width="4" height="4" />
        <rect x="768" y="468" width="4" height="4" />
      </g>

      {/* 5. Minimalist Outlined Rounded Boxes with Subdued Text Labels */}
      <g className="blueprint-animated">
        {/* Node: USER */}
        <rect
          x="555"
          y="30"
          width="90"
          height="30"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="600"
          y="48"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          USER
        </text>

        {/* Node: ORCHESTRATOR */}
        <rect
          x="520"
          y="100"
          width="160"
          height="42"
          rx="4"
          className="stroke-foreground/20 fill-background/60 dark:stroke-foreground/15"
          strokeWidth="1"
        />
        <text
          x="600"
          y="119"
          textAnchor="middle"
          className="font-mono text-[9px] font-bold fill-foreground/50 tracking-widest"
        >
          ORCHESTRATOR
        </text>
        <text
          x="600"
          y="131"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          TASK PLANNING
        </text>

        {/* Node: RESEARCH AGENT */}
        <rect
          x="375"
          y="195"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="430"
          y="214"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          RESEARCH
        </text>
        <text
          x="430"
          y="224"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          AGENT
        </text>

        {/* Node: CODING AGENT */}
        <rect
          x="545"
          y="195"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="600"
          y="214"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          CODING
        </text>
        <text
          x="600"
          y="224"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          AGENT
        </text>

        {/* Node: ANALYSIS AGENT */}
        <rect
          x="715"
          y="195"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="770"
          y="214"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          ANALYSIS
        </text>
        <text
          x="770"
          y="224"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          AGENT
        </text>

        {/* Node: SHARED MEMORY */}
        <rect
          x="515"
          y="295"
          width="170"
          height="44"
          rx="4"
          className="stroke-foreground/20 fill-background/60 dark:stroke-foreground/15"
          strokeWidth="1"
        />
        <text
          x="600"
          y="314"
          textAnchor="middle"
          className="font-mono text-[9px] font-bold fill-foreground/50 tracking-widest"
        >
          SHARED MEMORY
        </text>
        <text
          x="600"
          y="326"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          SEMANTIC + EPISODIC
        </text>

        {/* Node: VECTOR DB INDEX */}
        <rect
          x="375"
          y="400"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="430"
          y="419"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          VECTOR DB
        </text>
        <text
          x="430"
          y="429"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          INDEX
        </text>

        {/* Node: TOOLS MCP/API */}
        <rect
          x="545"
          y="400"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="600"
          y="419"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/45 tracking-widest"
        >
          TOOLS
        </text>
        <text
          x="600"
          y="429"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          MCP / API
        </text>

        {/* Node: KNOWLEDGE BASE */}
        <rect
          x="715"
          y="400"
          width="110"
          height="40"
          rx="4"
          className="stroke-foreground/15 fill-background/60 dark:stroke-foreground/10"
          strokeWidth="1"
        />
        <text
          x="770"
          y="419"
          textAnchor="middle"
          className="font-mono text-[8px] font-semibold fill-foreground/75 tracking-widest"
        >
          KNOWLEDGE
        </text>
        <text
          x="770"
          y="429"
          textAnchor="middle"
          className="font-mono text-[6px] fill-muted-foreground/35 tracking-wider"
        >
          BASE
        </text>

        {/* Node: RESPONSE ENGINE */}
        <rect
          x="520"
          y="500"
          width="160"
          height="36"
          rx="4"
          className="stroke-foreground/20 fill-background/60 dark:stroke-foreground/15"
          strokeWidth="1"
        />
        <text
          x="600"
          y="521"
          textAnchor="middle"
          className="font-mono text-[9px] font-bold fill-foreground/50 tracking-widest"
        >
          RESPONSE ENGINE
        </text>
      </g>
    </svg>
  );
}

// ArchitectureFlow replaced by inline flowchart nodes styled to match the ChatGPT reference design

function FocusTag({ k, label }: { k: string; label: string }) {
  return (
    <div className="bg-background px-4 py-4">
      <div className="mono-meta text-muted-foreground">/ {k}</div>
      <div className="mt-2 text-sm font-medium tracking-tight">{label}</div>
    </div>
  );
}

function Pill({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className="text-base text-foreground">{icon}</span>
      <span className="text-foreground">{children}</span>
    </span>
  );
}

function DiagramNode({ label }: { label: string }) {
  return (
    <div className="border hairline bg-background px-3 py-2 text-center">
      <span className="mono-caps">{label}</span>
    </div>
  );
}
function Connector() {
  return (
    <div className="flex justify-center my-1">
      <div className="w-px h-5 bg-hairline" />
    </div>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-xl font-semibold tracking-tight">{k}</span>
      <span className="mono-caps text-muted-foreground">{label}</span>
    </div>
  );
}

function CurrentFocus() {
  const focus = [
    {
      k: "01",
      title: "Memory-first agent design",
      body: "Treating episodic and semantic memory as the core architecture, not a bolt-on.",
    },
    {
      k: "02",
      title: "Evaluation as infrastructure",
      body: "Continuous eval harnesses that run with every change, not just at launch.",
    },
    {
      k: "03",
      title: "Context engineering",
      body: "Designing the information environment an agent operates inside — instructions, retrieval, tools, state.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32">
      <SectionLabel index="02">Current focus</SectionLabel>
      <div className="grid md:grid-cols-3 border hairline">
        {focus.map((f, i) => (
          <div
            key={f.k}
            className={`p-8 ${i !== focus.length - 1 ? "md:border-r" : ""} border-b md:border-b-0 hairline`}
          >
            <div className="mono-caps text-muted-foreground">/ {f.k}</div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSystems() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32">
      <SectionLabel index="03">Featured architecture breakdowns</SectionLabel>
      <div className="grid md:grid-cols-2 gap-px bg-hairline border hairline">
        {systems.slice(0, 4).map((s) => (
          <Link
            key={s.slug}
            to="/systems"
            className="bg-background p-8 hover:bg-secondary transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="mono-caps text-muted-foreground">{s.index}</span>
              <span className="mono-caps text-muted-foreground">{s.entries} entries</span>
            </div>
            <h3 className="mt-8 text-3xl font-semibold tracking-tighter group-hover:underline underline-offset-4">
              {s.title}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
              {s.description}
            </p>
            <div className="mt-8 mono-meta">Read breakdown →</div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-right">
        <Link to="/systems" className="mono-caps hover:underline underline-offset-4">
          View all systems →
        </Link>
      </div>
    </section>
  );
}

function LatestArticles() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32">
      <SectionLabel index="04">Latest articles</SectionLabel>
      <div className="border-t hairline">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/blog"
            className="group grid grid-cols-12 gap-6 py-8 border-b hairline hover:bg-secondary transition-colors px-2 -mx-2"
          >
            <div className="col-span-12 md:col-span-2 mono-caps text-muted-foreground">
              {a.date}
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="mono-caps text-muted-foreground">{a.category}</div>
              <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.05] group-hover:underline underline-offset-4">
                {a.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {a.excerpt}
              </p>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right mono-caps text-muted-foreground">
              {a.readTime}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32">
      <SectionLabel index="05">Featured projects</SectionLabel>
      <div className="grid lg:grid-cols-3 gap-px bg-hairline border hairline">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to="/projects"
            className="bg-background p-8 hover:bg-secondary transition-colors group flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="mono-caps text-muted-foreground">{p.index}</span>
              <span className="mono-caps text-muted-foreground">{p.year}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight group-hover:underline underline-offset-4">
              {p.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.summary}</p>
            <div className="mt-6 mono-caps">Case study →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative border-t hairline mt-20 -mb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
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
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-24 text-center">
        <div className="mono-caps text-muted-foreground">06 / Next step</div>
        <h2 className="mt-8 display-lg max-w-4xl mx-auto">
          Let's build something
          <br />
          <span className="italic font-normal">worth documenting.</span>
        </h2>
        <p className="mt-8 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Whether it's a system architecture review, a writing collaboration, or an idea you want to
          stress-test — I'm reachable.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="text-xs font-mono uppercase tracking-widest bg-foreground text-background px-6 py-3.5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get in touch →
          </Link>
          <Link
            to="/systems"
            className="text-xs font-mono uppercase tracking-widest border border-foreground px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore systems
          </Link>
        </div>
      </div>
    </section>
  );
}

