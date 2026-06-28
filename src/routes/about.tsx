import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "../components/site-shell";
import { Github, Linkedin, Youtube, Target, Box, ArrowRight } from "lucide-react";
import { siteMetadata, sameAsUrls } from "../lib/metadata";
import { MediumIcon, XLogo } from "../components/icons";

// Structured Data Implementation
const schemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteMetadata.url}/#person`,
      name: siteMetadata.name,
      url: siteMetadata.url,
      image: siteMetadata.imageUrl,
      jobTitle: "AI Engineer",
      description: siteMetadata.description,
      sameAs: sameAsUrls,
      knowsAbout: siteMetadata.knowsAbout,
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.url}/#website`,
      url: siteMetadata.url,
      name: `${siteMetadata.name} | AI Engineer`,
      publisher: { "@id": `${siteMetadata.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteMetadata.url}/about/#webpage`,
      url: `${siteMetadata.url}/about`,
      name: siteMetadata.title,
      description: siteMetadata.description,
      isPartOf: { "@id": `${siteMetadata.url}/#website` },
      about: { "@id": `${siteMetadata.url}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteMetadata.url}/about/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteMetadata.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteMetadata.url}/about`,
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: siteMetadata.title },
      {
        name: "description",
        content: siteMetadata.description,
      },
      { property: "og:title", content: siteMetadata.title },
      {
        property: "og:description",
        content: siteMetadata.description,
      },
      { property: "og:url", content: `${siteMetadata.url}/about` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:title", content: siteMetadata.title },
      { name: "twitter:description", content: siteMetadata.description },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schemas),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <div
        className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background overflow-x-hidden"
        itemScope
        itemType="https://schema.org/Person"
      >
        {/* HERO SECTION */}
        <section
          style={{
            '--hero-image-height': '51rem',
          } as React.CSSProperties}
          className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-2 lg:pb-3 grid grid-cols-12 gap-8 lg:gap-16 items-end"
        >
          <style>{`
            @media (min-width: 1024px) {
              .hero-about-image {
                height: var(--hero-image-height) !important;
                right: calc(var(--hero-image-height) * -0.01) !important;
                width: auto !important;
                max-width: none !important;
              }
              .hero-about-socials {
                padding-bottom: calc(var(--hero-image-height) * 0.2559 + 1.2rem) !important;
              }
            }
          `}</style>
          {/* Main Text & Table Socials */}
          <div className="col-span-12 lg:col-span-6 pt-2 opacity-0 animate-reveal [animation-delay:100ms] flex flex-col justify-between h-full relative">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="mono-meta text-muted-foreground">01 / Who is Abinesh U</span>
                <span className="h-px w-20 bg-foreground" />
              </div>

              <h1 itemProp="name" className="mt-10 display-xl text-foreground mb-10">
                About
                <br />
                <span className="italic font-normal">Abinesh U.</span>
              </h1>

              <div
                itemProp="description"
                className="mt-8 text-sm text-muted-foreground max-w-xl leading-relaxed space-y-6 mb-16"
              >
                <p>
                  I'm an AI engineer focused on designing agentic AI systems, multi-agent
                  architectures, and production AI infrastructure.
                </p>
                <p>I build, experiment, and document the engineering behind intelligent systems.</p>
              </div>
            </div>

            <div className="relative w-full mt-auto pb-8 lg:pb-0 hero-about-socials z-20">
              {/* Social links resting above the table bar */}
              <div className="flex justify-around items-end px-4 relative z-30">
                {/* LinkedIn */}
                <a
                  itemProp="sameAs"
                  href={siteMetadata.socials.linkedin}
                  className="flex flex-col items-center group text-xs font-mono uppercase tracking-widest hover:-translate-y-1.5 transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-muted-foreground select-none pointer-events-none absolute -top-6 bg-background/90 px-2 py-0.5 rounded border border-hairline/40 whitespace-nowrap z-30">
                    LinkedIn
                  </span>
                  <Linkedin
                    className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </a>

                {/* GitHub */}
                <a
                  itemProp="sameAs"
                  href={siteMetadata.socials.github}
                  className="flex flex-col items-center group text-xs font-mono uppercase tracking-widest hover:-translate-y-1.5 transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-muted-foreground select-none pointer-events-none absolute -top-6 bg-background/90 px-2 py-0.5 rounded border border-hairline/40 whitespace-nowrap z-30">
                    GitHub
                  </span>
                  <Github className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" strokeWidth={2} />
                </a>

                {/* Medium */}
                <a
                  itemProp="sameAs"
                  href={siteMetadata.socials.medium}
                  className="flex flex-col items-center group text-xs font-mono uppercase tracking-widest hover:-translate-y-1.5 transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-muted-foreground select-none pointer-events-none absolute -top-6 bg-background/90 px-2 py-0.5 rounded border border-hairline/40 whitespace-nowrap z-30">
                    Medium
                  </span>
                  <MediumIcon className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
                </a>

                {/* X */}
                <a
                  itemProp="sameAs"
                  href={siteMetadata.socials.x}
                  className="flex flex-col items-center group text-xs font-mono uppercase tracking-widest hover:-translate-y-1.5 transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-muted-foreground select-none pointer-events-none absolute -top-6 bg-background/90 px-2 py-0.5 rounded border border-hairline/40 whitespace-nowrap z-30">
                    X (Twitter)
                  </span>
                  <XLogo className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
                </a>

                {/* YouTube */}
                <a
                  itemProp="sameAs"
                  href={siteMetadata.socials.youtube}
                  className="flex flex-col items-center group text-xs font-mono uppercase tracking-widest hover:-translate-y-1.5 transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-muted-foreground select-none pointer-events-none absolute -top-6 bg-background/90 px-2 py-0.5 rounded border border-hairline/40 whitespace-nowrap z-30">
                    YouTube
                  </span>
                  <Youtube className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image (Sitting on table) */}
          <div className="col-span-12 lg:col-span-6 relative min-h-[25rem] lg:min-h-[48rem] mt-8 lg:mt-0 flex items-end lg:items-center justify-center lg:justify-end opacity-0 animate-reveal [animation-delay:300ms]">
            <img
              itemProp="image"
              src="/assets/about/abinesh-profile.svg"
              alt="Abinesh U"
              fetchPriority="high"
              decoding="async"
              className="relative lg:absolute bottom-0 right-0 w-full max-w-[420px] lg:max-w-none h-auto lg:w-auto object-contain object-bottom lg:object-right-bottom z-10 pointer-events-none transition-all duration-300 hero-about-image"
            />
          </div>
        </section>

        {/* DEFINITIVE IDENTITY / SEO SECTION */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-4 lg:pt-6 pb-20 border-t hairline reveal-trigger" id="who">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="mono-meta text-muted-foreground">01.5 / Identity Overview</span>
                <span className="h-px w-20 bg-foreground/15" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tighter mb-6 text-foreground pr-4 leading-[1.1]">
                The definitive answer to "Who is Abinesh U?"
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10 pr-4">
                Mapping the intersection of artificial intelligence and systems
                architecture—defining the scope of work, technical specializations, and engineering
                focus.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="prose-doc space-y-6 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                <p>
                  <strong className="text-foreground font-semibold">
                    Abinesh U is an AI Engineer and Systems Architect
                  </strong>{" "}
                  specializing in the design, orchestration, and deployment of intelligent systems.
                  His core expertise lies in{" "}
                  <strong className="text-foreground font-semibold">Agentic AI</strong> and{" "}
                  <strong className="text-foreground font-semibold">Multi-Agent Systems</strong>,
                  focusing on the architectural frameworks required to move large language models
                  from experimental notebooks into robust, deterministic production environments.
                </p>
                <p>
                  Rather than treating artificial intelligence merely as an API integration, Abinesh
                  approaches it as a rigorous systems engineering discipline. His work in{" "}
                  <strong className="text-foreground font-semibold">AI Architecture</strong>{" "}
                  encompasses building complex state machines, establishing persistent memory
                  layers, and developing sophisticated{" "}
                  <strong className="text-foreground font-semibold">Context Engineering</strong>{" "}
                  pipelines. He designs the underlying{" "}
                  <strong className="text-foreground font-semibold">AI Infrastructure</strong> that
                  allows autonomous agents to execute long-horizon goals reliably.
                </p>
                <p>
                  As the architect and author of this platform, Abinesh U publishes deep technical
                  documentation, architecture breakdowns, and system design patterns. He is known
                  for his work in{" "}
                  <strong className="text-foreground font-semibold">Production AI</strong>,
                  implementing robust{" "}
                  <strong className="text-foreground font-semibold">
                    Retrieval-Augmented Generation (RAG)
                  </strong>{" "}
                  pipelines, securing data via the{" "}
                  <strong className="text-foreground font-semibold">
                    Model Context Protocol (MCP)
                  </strong>
                  , and establishing LLM-as-a-judge evaluation frameworks. His overarching mission
                  is to make the engineering behind intelligent systems legible, predictable, and
                  scalable for the wider engineering community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE SECTION */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-20 pb-12 lg:pb-16 border-t hairline reveal-trigger">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Col 1 */}
            <div className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 border border-hairline flex items-center justify-center rounded-sm shrink-0">
                  <Box className="w-5 h-5 text-foreground stroke-[1.5]" />
                </div>
                <span className="mono-meta text-muted-foreground">02 / What I Do</span>
                <span className="h-px w-20 bg-foreground/15" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tighter mb-6 text-foreground pr-4 leading-[1.1]">
                I design and build intelligent systems.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10 pr-4">
                My work spans agentic AI, orchestration frameworks, memory systems, RAG pipelines,
                evaluation, and the infrastructure required to run AI systems in production.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center border border-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors group/btn"
              >
                <span>Explore Projects</span>
                <span className="inline-block transition-transform duration-300 ease-expo group-hover/btn:translate-x-1.5 ml-2">→</span>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="relative group">
              <div className="hidden md:block absolute left-[-1.5rem] lg:left-[-2rem] top-0 bottom-0 w-[1px] bg-hairline/40"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 border border-hairline flex items-center justify-center rounded-full shrink-0">
                  <Target className="w-5 h-5 text-foreground stroke-[1.5]" />
                </div>
                <span className="mono-meta text-muted-foreground">03 / Current Focus</span>
                <span className="h-px w-20 bg-foreground/15" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tighter mb-6 text-foreground pr-4 leading-[1.1]">
                Exploring the next layer of intelligent systems.
              </h3>
              <div className="prose-doc">
                <ul className="mb-10 text-sm text-muted-foreground space-y-1">
                  <li>Agent Memory & Long-term Context</li>
                  <li>Multi-Agent Collaboration Patterns</li>
                  <li>Model Context Protocol (MCP)</li>
                  <li>Evaluation as a First-Class System</li>
                  <li>Production AI Observability</li>
                </ul>
              </div>
              <Link
                to="/systems"
                className="mono-caps hover:underline underline-offset-4 inline-flex items-center gap-1.5 group/btn"
              >
                <span>See what I'm working on</span>
                <span className="inline-block transition-transform duration-300 ease-expo group-hover/btn:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION (JOURNEY) */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-20 pb-12 lg:pb-16 border-t hairline reveal-trigger">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Journey */}
            <div className="lg:col-span-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="mono-meta text-muted-foreground">04 / Journey</span>
                <span className="h-px w-20 bg-foreground/15" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tighter mb-14 text-foreground pr-4">
                From data to systems.
              </h3>

              {/* Horizontal Flow Timeline */}
              <div className="relative mt-12">
                {/* Timeline connecting line behind nodes (desktop only) */}
                <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-0.5 border-t border-dashed hairline/40 -z-10"></div>

                {/* Animated flow arrows (desktop only) */}
                <div className="hidden md:block absolute top-[20px] left-0 w-full h-4 -z-10 pointer-events-none">
                  {/* Arrow 1 (around 25%) */}
                  <div className="absolute left-[25%] -translate-x-1/2 flex items-center justify-center">
                    <div className="font-mono text-[10px] text-muted-foreground/35 animate-arrow-flow font-light">
                      →
                    </div>
                  </div>
                  {/* Arrow 2 (around 50%) */}
                  <div className="absolute left-[50%] -translate-x-1/2 flex items-center justify-center">
                    <div
                      className="font-mono text-[10px] text-muted-foreground/35 animate-arrow-flow font-light"
                      style={{ animationDelay: "0.8s" }}
                    >
                      →
                    </div>
                  </div>
                  {/* Arrow 3 (around 75%) */}
                  <div className="absolute left-[75%] -translate-x-1/2 flex items-center justify-center">
                    <div
                      className="font-mono text-[10px] text-muted-foreground/35 animate-arrow-flow font-light"
                      style={{ animationDelay: "1.6s" }}
                    >
                      →
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  {/* Step 1 */}
                  <div className="group flex flex-col items-center md:items-start reveal-trigger" style={{ transitionDelay: "50ms" }}>
                    {/* Node circle */}
                    <div className="w-14 h-14 rounded-full border border-hairline bg-background flex items-center justify-center mono-caps text-foreground/80 group-hover:border-foreground group-hover:text-foreground transition-all duration-300 shadow-sm relative mb-6">
                      01
                      {/* Little pulsing radar indicator */}
                      <div className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/30 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    {/* Card block */}
                    <div className="w-full border border-hairline/60 bg-muted/10 p-5 rounded-sm hover:border-foreground/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between min-h-[180px] relative">
                      {/* Tech corner tick */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r hairline/40 group-hover:border-foreground/40 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l hairline/40 group-hover:border-foreground/40 transition-colors"></div>

                      <div>
                        <div className="mono-meta text-muted-foreground mb-2">
                          [ PHASE.01 / ANALYST ]
                        </div>
                        <h4 className="text-base font-semibold tracking-tight mb-2 text-foreground">
                          Data Analyst
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Foundations in analysis, SQL, product telemetry data, and insights.
                        </p>
                      </div>

                      {/* Tech stack footer */}
                      <div className="mt-4 pt-3 border-t hairline/20 mono-meta text-muted-foreground/80">
                        STACK: SQL · BI · Python · Git
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="group flex flex-col items-center md:items-start reveal-trigger" style={{ transitionDelay: "150ms" }}>
                    {/* Node circle */}
                    <div className="w-14 h-14 rounded-full border border-hairline bg-background flex items-center justify-center mono-caps text-foreground/80 group-hover:border-foreground group-hover:text-foreground transition-all duration-300 shadow-sm relative mb-6">
                      02
                      <div className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/30 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    {/* Card block */}
                    <div className="w-full border border-hairline/60 bg-muted/10 p-5 rounded-sm hover:border-foreground/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between min-h-[180px] relative">
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r hairline/40 group-hover:border-foreground/40 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l hairline/40 group-hover:border-foreground/40 transition-colors"></div>

                      <div>
                        <div className="mono-meta text-muted-foreground mb-2">
                          [ PHASE.02 / DATA_SCI ]
                        </div>
                        <h4 className="text-base font-semibold tracking-tight mb-2 text-foreground">
                          Data Science
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Applied predictive modeling, statistical modeling, and ML system
                          prototyping.
                        </p>
                      </div>

                      {/* Tech stack footer */}
                      <div className="mt-4 pt-3 border-t hairline/20 mono-meta text-muted-foreground/80">
                        STACK: Python · Scikit-Learn · Pandas · Stats
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="group flex flex-col items-center md:items-start reveal-trigger" style={{ transitionDelay: "250ms" }}>
                    {/* Node circle */}
                    <div className="w-14 h-14 rounded-full border border-hairline bg-background flex items-center justify-center mono-caps text-foreground/80 group-hover:border-foreground group-hover:text-foreground transition-all duration-300 shadow-sm relative mb-6">
                      03
                      <div className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/30 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    {/* Card block */}
                    <div className="w-full border border-hairline/60 bg-muted/10 p-5 rounded-sm hover:border-foreground/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between min-h-[180px] relative">
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r hairline/40 group-hover:border-foreground/40 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l hairline/40 group-hover:border-foreground/40 transition-colors"></div>

                      <div>
                        <div className="mono-meta text-muted-foreground mb-2">
                          [ PHASE.03 / AI_ENG ]
                        </div>
                        <h4 className="text-base font-semibold tracking-tight mb-2 text-foreground">
                          AI Engineering
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Designing model serving infra, deployment pipelines, and MLOps workflows.
                        </p>
                      </div>

                      {/* Tech stack footer */}
                      <div className="mt-4 pt-3 border-t hairline/20 mono-meta text-muted-foreground/80">
                        STACK: Docker · FastAPI · PyTorch · MLOps
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="group flex flex-col items-center md:items-start reveal-trigger" style={{ transitionDelay: "350ms" }}>
                    {/* Node circle */}
                    <div className="w-14 h-14 rounded-full border border-hairline bg-background flex items-center justify-center mono-caps text-foreground/80 group-hover:border-foreground group-hover:text-foreground transition-all duration-300 shadow-sm relative mb-6">
                      04
                      <div className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/30 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    {/* Card block */}
                    <div className="w-full border border-hairline/60 bg-muted/10 p-5 rounded-sm hover:border-foreground/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between min-h-[180px] relative">
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r hairline/40 group-hover:border-foreground/40 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l hairline/40 group-hover:border-foreground/40 transition-colors"></div>

                      <div>
                        <div className="mono-meta text-muted-foreground mb-2">
                          [ PHASE.04 / AGENTIC ]
                        </div>
                        <h4 className="text-base font-semibold tracking-tight mb-2 text-foreground">
                          Agentic AI
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Designing multi-agent architectures, memory loops, and production AI
                          systems.
                        </p>
                      </div>

                      {/* Tech stack footer */}
                      <div className="mt-4 pt-3 border-t hairline/20 mono-meta text-muted-foreground/80">
                        STACK: Multi-Agent Loops · MCP · RAG · Eval
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
