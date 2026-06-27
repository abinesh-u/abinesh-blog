import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Mail, Linkedin, Github, Youtube, BookOpen, Code2, Instagram } from "lucide-react";
import { MediumIcon, XLogo } from "@/components/icons";
import { siteMetadata } from "../lib/metadata";
import { useState } from "react";

const stickerUrl = "/assets/contact/sticker.svg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteMetadata.name}` },
      {
        name: "description",
        content: `Get in touch with ${siteMetadata.name} — for collaborations, advisory, writing and speaking.`,
      },
      { property: "og:title", content: `Contact — ${siteMetadata.name}` },
      {
        property: "og:description",
        content: "Get in touch — collaborations, advisory, writing and speaking.",
      },
      { property: "og:url", content: `${siteMetadata.url}/contact` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Contact — ${siteMetadata.name}` },
      {
        name: "twitter:description",
        content: "Get in touch — collaborations, advisory, writing and speaking.",
      },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/contact` }],
  }),
  component: Contact,
});

const communicationNodes = [
  {
    port: "01",
    label: "Email",
    value: "hello@abinesh.blog",
    href: "mailto:hello@abinesh.blog",
    icon: Mail,
    protocol: "SMTP / SSL",
    purpose: "DIRECT INTAKE",
    status: "ACTIVE",
    statusBg: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.3)]",
    latency: "< 24 HOURS",
    action: "SEND ↗",
    brandBorder: "hover:border-red-500/30",
    accentColor: "group-hover:text-red-500",
  },
  {
    port: "02",
    label: "LinkedIn",
    value: "/in/abineshu",
    href: siteMetadata.socials.linkedin,
    icon: Linkedin,
    protocol: "HTTPS / OAUTH",
    purpose: "PROFESSIONAL",
    status: "STABLE",
    statusBg: "bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.3)]",
    latency: "< 12 HOURS",
    action: "CONNECT ↗",
    brandBorder: "hover:border-sky-500/30",
    accentColor: "group-hover:text-sky-500",
  },
  {
    port: "03",
    label: "GitHub",
    value: "@abinesh-u",
    href: siteMetadata.socials.github,
    icon: Github,
    protocol: "SSH / KEY",
    purpose: "CODE REVIEWS",
    status: "STABLE",
    statusBg: "bg-neutral-500 dark:bg-neutral-400 shadow-[0_0_6px_rgba(115,115,115,0.3)]",
    latency: "< 48 HOURS",
    action: "CLONE ↗",
    brandBorder: "hover:border-neutral-500/30",
    accentColor: "group-hover:text-neutral-800 dark:group-hover:text-neutral-200",
  },
];

const ecosystemPlatforms = [
  { name: "Medium", href: siteMetadata.socials.medium, icon: MediumIcon, handle: "@abinesh_ai", status: "INDEXED", type: "Articles" },
  { name: "YouTube", href: siteMetadata.socials.youtube, icon: Youtube, handle: "@abinesh_ai", status: "ONLINE", type: "Videos" },
  { name: "X / Twitter", href: siteMetadata.socials.x, icon: XLogo, handle: "@abinesh_ai", status: "ACTIVE", type: "Shortform" },
  { name: "Dev.to", href: siteMetadata.socials.devto, icon: BookOpen, handle: "@abinesh_ai", status: "STABLE", type: "Technical" },
  { name: "Google Dev", href: siteMetadata.socials.googleDev, icon: Code2, handle: "abineshu", status: "VERIFIED", type: "Profile" },
  { name: "Instagram", href: siteMetadata.socials.instagram, icon: Instagram, handle: "@abinesh_ai", status: "ACTIVE", type: "Social" },
];

const workflowStages = [
  {
    step: "01",
    title: "Discovery",
    description: "Initial intake, scope alignment, and mapping system requirements.",
    status: "INPUT",
  },
  {
    step: "02",
    title: "Architecture Review",
    description: "Deep-dive analysis of agent loops, memory barriers, and performance bottlenecks.",
    status: "PROCESSED",
  },
  {
    step: "03",
    title: "Proposal",
    description: "Formulating multi-agent orchestration designs, RAG schemas, and evaluation matrices.",
    status: "COMPILE",
  },
  {
    step: "04",
    title: "Execution",
    description: "Implementation, testing, evaluation runtimes, and deployment guardrails.",
    status: "OUTPUT",
  },
];

const systemStats = [
  { label: "OPERATIONAL STATUS", value: "AVAILABLE FOR ADVISORY", code: "SYS_STATUS_OK" },
  { label: "TIMEZONE / REGION", value: "IST (UTC+5:30) / BENGALURU, IN", code: "LOC_ZONE_01" },
  { label: "RESPONSE LATENCY", value: "98% / < 24 HOURS", code: "METRIC_RESP_01" },
  { label: "PRIMARY GATEWAY", value: "LINKEDIN / EMAIL", code: "GATEWAY_PREF" },
];

function getStatusColorClass(status: string): string {
  const color = status === "OFFLINE" ? "neutral-500" : "emerald-500";
  return `bg-${color} animate-pulse`;
}



function Contact() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  return (
    <SiteShell>
      <div className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background overflow-x-hidden">
        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative border-b hairline overflow-hidden">

          {/* Full-section subtle dot bg */}
          <div aria-hidden className="absolute inset-0 dot-bg opacity-[0.04] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-0 grid lg:grid-cols-12 gap-10 lg:gap-0 items-end">

            {/* LEFT — text column, About-page typography pattern */}
            <div className="col-span-12 lg:col-span-6 pb-20 flex flex-col justify-end opacity-0 animate-reveal [animation-delay:100ms]">
              <div className="flex items-center gap-4 mb-8">
                <span className="mono-meta text-muted-foreground">06 / Open a Channel</span>
                <span className="h-px w-20 bg-foreground" />
              </div>

              <h1 className="mt-10 display-xl text-foreground mb-10">
                Open a
                <br />
                <span className="italic font-normal">Channel.</span>
              </h1>

              <p className="mt-8 text-sm text-muted-foreground max-w-md leading-relaxed">
                Every meaningful collaboration starts with a well-defined communication protocol.
                Available for AI architecture consulting, agentic systems, and research collaborations.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:hello@abinesh.blog"
                  className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:opacity-80 transition-opacity"
                >
                  Send a Message →
                </a>
                <span className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">or scroll to explore channels ↓</span>
              </div>
            </div>

            {/* RIGHT — sticker + constellation animation */}
            <div className="col-span-12 lg:col-span-6 relative min-h-[460px] lg:min-h-[600px] flex items-end justify-center opacity-0 animate-reveal [animation-delay:250ms]">

              {/* Constellation SVG — sits behind the sticker */}
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full text-foreground pointer-events-none"
                viewBox="0 0 480 560"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <style>{`
                    @keyframes edge-draw {
                      0%   { stroke-dashoffset: 200; opacity: 0; }
                      15%  { opacity: 0.18; }
                      60%  { stroke-dashoffset: 0; opacity: 0.18; }
                      80%  { opacity: 0; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    @keyframes node-pulse {
                      0%, 100% { r: 2.5; opacity: 0.25; }
                      50%       { r: 4;   opacity: 0.55; }
                    }
                    @keyframes node-pulse-slow {
                      0%, 100% { r: 2;   opacity: 0.15; }
                      50%       { r: 3.5; opacity: 0.4;  }
                    }
                    .e1  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 0s    infinite; }
                    .e2  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 0.6s  infinite; }
                    .e3  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 1.2s  infinite; }
                    .e4  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 1.8s  infinite; }
                    .e5  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 2.4s  infinite; }
                    .e6  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 3.0s  infinite; }
                    .e7  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 3.6s  infinite; }
                    .e8  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 4.2s  infinite; }
                    .e9  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 4.8s  infinite; }
                    .np  { animation: node-pulse      3s ease-in-out infinite; }
                    .nps { animation: node-pulse-slow 4s ease-in-out infinite; }
                  `}</style>
                </defs>

                {/* Edges — staggered draw-fade */}
                <g stroke="currentColor" strokeWidth="0.75">
                  <line className="e1" x1="80"  y1="120" x2="210" y2="80"  />
                  <line className="e2" x1="210" y1="80"  x2="370" y2="140" />
                  <line className="e3" x1="370" y1="140" x2="400" y2="270" />
                  <line className="e4" x1="400" y1="270" x2="300" y2="370" />
                  <line className="e5" x1="300" y1="370" x2="150" y2="340" />
                  <line className="e6" x1="150" y1="340" x2="80"  y2="220" />
                  <line className="e7" x1="80"  y1="220" x2="210" y2="80"  />
                  <line className="e8" x1="210" y1="80"  x2="300" y2="370" />
                  <line className="e9" x1="370" y1="140" x2="150" y2="340" />
                </g>

                {/* Nodes */}
                <g fill="currentColor">
                  <circle className="np"  cx="80"  cy="120" />
                  <circle className="nps" cx="210" cy="80"  />
                  <circle className="np"  cx="370" cy="140" />
                  <circle className="nps" cx="400" cy="270" />
                  <circle className="np"  cx="300" cy="370" />
                  <circle className="nps" cx="150" cy="340" />
                  <circle className="np"  cx="80"  cy="220" />
                  {/* Extra sparse nodes */}
                  <circle className="nps" cx="290" cy="180" />
                  <circle className="np"  cx="180" cy="460" />
                  <circle className="nps" cx="390" cy="420" />
                  <circle className="np"  cx="60"  cy="380" />
                  <circle className="nps" cx="430" cy="90"  />
                </g>

                {/* Faint static long-range edges */}
                <g stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.06">
                  <line x1="80"  y1="120" x2="400" y2="270" />
                  <line x1="210" y1="80"  x2="150" y2="340" />
                  <line x1="80"  y1="220" x2="300" y2="370" />
                  <line x1="370" y1="140" x2="80"  y2="380" />
                </g>
              </svg>

              {/* Sticker in front of constellation */}
              <img
                src={stickerUrl}
                alt="Abinesh U"
                fetchPriority="high"
                decoding="async"
                className="relative z-10 w-full max-w-[340px] lg:max-w-none lg:h-[88%] h-auto w-auto object-contain object-bottom pointer-events-none select-none transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>

          </div>
        </section>


        {/* COMMUNICATION ARCHITECTURE (INTERACTIVE NETWORK TOPOLOGY) */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50">
          <div className="flex items-center gap-4 mb-10">
            <span className="mono-meta text-muted-foreground">06.1 / Communication Topology</span>
            <span className="h-px w-20 bg-foreground/15" />
          </div>

          <div className="relative border border-hairline/80 bg-background/30 backdrop-blur-[2px] rounded p-6 md:p-10 overflow-hidden select-none">
            <div className="absolute inset-0 dot-bg opacity-[0.03] pointer-events-none" />
            
            <div className="flex flex-col items-center">
              {/* Top User Node */}
              <div className="relative z-10 p-4 border border-foreground/20 bg-background rounded-sm text-center min-w-[12rem] hover:border-foreground/45 transition-colors">
                <div className="mono-caps text-foreground/40 text-[8px] mb-1">USER_NODE / SOURCE</div>
                <div className="text-sm font-semibold tracking-tight text-foreground">Abinesh U</div>
                <div className="font-mono text-[9px] text-muted-foreground mt-0.5">AI ENGINEER</div>
              </div>
              
              <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                {/* Responsive SVG Connector */}
                <div className="relative w-full h-16 my-2">
                  {/* Desktop horizontal branching spine */}
                  <svg className="hidden md:block w-full h-full text-foreground/20 dark:text-foreground/10" viewBox="0 0 600 64" fill="none" preserveAspectRatio="none">
                    <defs>
                      <style>{`
                        @keyframes flow-dash {
                          from { stroke-dashoffset: 20; }
                          to { stroke-dashoffset: 0; }
                        }
                        .connector-flow {
                          stroke-dasharray: 4 4;
                          animation: flow-dash 3s linear infinite;
                        }
                      `}</style>
                    </defs>
                    <line x1="300" y1="0" x2="300" y2="20" stroke="currentColor" strokeWidth="1" />
                    <line x1="100" y1="20" x2="500" y2="20" stroke="currentColor" strokeWidth="1" />
                    
                    <line x1="100" y1="20" x2="100" y2="64" stroke="currentColor" strokeWidth="1" />
                    <line x1="300" y1="20" x2="300" y2="64" stroke="currentColor" strokeWidth="1" />
                    <line x1="500" y1="20" x2="500" y2="64" stroke="currentColor" strokeWidth="1" />

                    <path d="M 300 0 L 300 20 L 100 20 L 100 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                    <path d="M 300 0 L 300 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                    <path d="M 300 0 L 300 20 L 500 20 L 500 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                  </svg>
                  {/* Mobile vertical line */}
                  <div className="md:hidden w-px h-16 bg-foreground/20 mx-auto" />
                </div>

                {/* Target Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-6 md:gap-y-0 w-full mt-4 md:mt-0">
                  {communicationNodes.map((node, index) => (
                    <div key={node.port} className="flex flex-col px-3">
                      {index > 0 && (
                        <div className="md:hidden w-px h-6 bg-foreground/15 mx-auto" />
                      )}
                      <a
                        href={node.href}
                        target={node.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className={`relative border border-foreground/10 ${node.brandBorder} bg-background/50 p-5 rounded transition-all duration-300 group cursor-pointer`}
                        onClick={(e) => {
                          if (typeof window !== "undefined" && window.innerWidth < 768) {
                            if (activeCard !== node.port) {
                              e.preventDefault();
                              setActiveCard(node.port);
                            }
                          }
                        }}
                        onTouchStart={(e) => {
                          if (typeof window !== "undefined" && window.innerWidth < 768) {
                            if (activeCard !== node.port) {
                              e.preventDefault();
                              setActiveCard(node.port);
                            }
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-[9px] text-foreground/45 font-semibold">PORT / ch_{node.port}</span>
                          <span className="flex items-center gap-1.5 font-mono text-[9px] text-foreground/40 font-semibold">
                            <span className={`h-1.5 w-1.5 rounded-full ${node.statusBg} animate-pulse`} />
                            {node.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <node.icon className={`w-4 h-4 text-foreground/50 ${node.accentColor} transition-colors stroke-[1.5]`} />
                          <span className={`font-semibold tracking-tight text-sm text-foreground/75 ${node.accentColor} transition-colors`}>
                            {node.label}
                          </span>
                        </div>

                        <div className="mt-2 font-mono text-xs text-foreground/60 truncate">
                          {node.value}
                        </div>

                        {/* Interactive Slide-down Metadata Card */}
                        <div className={`mt-4 pt-3 border-t border-foreground/5 space-y-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 group-focus-within:opacity-100 group-focus-within:max-h-40 transition-all duration-500 ease-in-out ${activeCard === node.port ? "opacity-100 max-h-40" : ""}`}>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">PROTOCOL</span>
                            <span className="text-foreground/80">{node.protocol}</span>
                          </div>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">PURPOSE</span>
                            <span className="text-foreground/80">{node.purpose}</span>
                          </div>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">LATENCY</span>
                            <span className="text-foreground/80">{node.latency}</span>
                          </div>
                          <div className={`text-right font-mono text-[9px] font-bold ${node.accentColor} pt-1`}>
                            {node.action}
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KNOWLEDGE NETWORK ECOSYSTEM & COLLABORATION PROTOCOL */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50 grid lg:grid-cols-12 gap-12">
          {/* R3. Knowledge Network Connected Ecosystem (Left Column) */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="mono-meta text-muted-foreground">06.2 / Knowledge Ecosystem</span>
              <span className="h-px w-20 bg-foreground/15" />
            </div>

            <div className="relative border border-hairline/80 bg-background/30 backdrop-blur-[2px] rounded p-6 md:p-8 overflow-hidden select-none">
              <div className="absolute inset-0 dot-bg opacity-[0.03] pointer-events-none" />
              
              {/* Architectural Mesh Vectors in Background */}
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                <svg className="w-full h-full text-foreground/10" viewBox="0 0 600 300" fill="none" preserveAspectRatio="none">
                  <line x1="80" y1="150" x2="520" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="150" y1="50" x2="150" y2="250" stroke="currentColor" strokeWidth="1" />
                  <line x1="300" y1="50" x2="300" y2="250" stroke="currentColor" strokeWidth="1" />
                  <line x1="450" y1="50" x2="450" y2="250" stroke="currentColor" strokeWidth="1" />
                  
                  <circle cx="150" cy="150" r="3.5" fill="currentColor" />
                  <circle cx="300" cy="150" r="3.5" fill="currentColor" />
                  <circle cx="450" cy="150" r="3.5" fill="currentColor" />
                </svg>
              </div>

              {/* Ecosystem Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                {ecosystemPlatforms.map((plat) => (
                  <a
                    key={plat.name}
                    href={plat.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col justify-between border border-foreground/10 hover:border-foreground/25 bg-background/60 p-4 rounded min-h-[6.5rem] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[8px] text-foreground/45 uppercase tracking-wider font-semibold">{plat.type}</span>
                      <plat.icon className="w-3.5 h-3.5 text-foreground/50 group-hover:text-foreground transition-colors stroke-[1.5]" />
                    </div>
                    <span className="font-semibold text-xs text-foreground/75 group-hover:text-foreground transition-colors">
                      {plat.name}
                    </span>
                    {/* Hover Platform Metadata */}
                    <div className="mt-3 pt-2 border-t border-foreground/5 flex justify-between font-mono text-[8px] text-foreground/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{plat.handle}</span>
                      <span className="flex items-center gap-1 text-[7px] text-emerald-500 font-bold">
                        <span className={`h-1 w-1 rounded-full ${getStatusColorClass(plat.status)}`} />
                        {plat.status}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* R4. Collaboration Protocol Workflow (Right Column) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="mono-meta text-muted-foreground">06.3 / Collaboration Protocol</span>
              <span className="h-px w-20 bg-foreground/15" />
            </div>

            <div className="relative border border-hairline/80 bg-background/30 backdrop-blur-[2px] p-6 rounded overflow-hidden">
              <div className="absolute inset-0 dot-bg opacity-[0.03] pointer-events-none" />
              
              {/* Timeline spine connecting nodes */}
              <div className="absolute left-10 top-10 bottom-10 w-px bg-foreground/15" />
              
              <div className="space-y-6 relative z-10">
                {workflowStages.map((stage) => (
                  <div key={stage.step} className="flex gap-5 items-start group">
                    {/* Architectural step node */}
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20 bg-background font-mono text-[10px] font-bold text-foreground/60 group-hover:border-foreground/80 group-hover:text-foreground transition-all duration-300 select-none shrink-0">
                      {stage.step}
                      <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground transition-colors" />
                    </div>
                    
                    {/* Process Info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-semibold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                          {stage.title}
                        </h4>
                        <span className="font-mono text-[7px] tracking-wider border border-foreground/10 bg-background/50 px-1.5 py-0.5 rounded text-foreground/45 select-none uppercase font-semibold">
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* R5. SYSTEM STATUS DASHBOARD */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50">
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-meta text-muted-foreground">06.4 / System Diagnostics</span>
            <span className="h-px w-20 bg-foreground/15" />
          </div>

          <div className="border border-hairline bg-background/40 backdrop-blur-[2px] p-6 rounded relative overflow-hidden group hover:border-foreground/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-foreground/5">
              <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-foreground/35 select-none">SYSTEM_TELEMETRY_06</span>
              <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
              {systemStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <span className="text-foreground/40 uppercase tracking-wider block text-[8px] font-bold select-none">{stat.label}</span>
                  <span className="block text-xs font-semibold text-foreground/80 tracking-tight">{stat.value}</span>
                  <span className="block text-[7px] text-foreground/30 select-none">{stat.code}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
