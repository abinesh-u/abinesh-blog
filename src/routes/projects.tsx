import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { projects } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${siteMetadata.name}` },
      {
        name: "description",
        content:
          "Architecture case studies: Hermes, Athena, and Aegis — production AI systems documented through problem, architecture, tradeoffs, capabilities and lessons.",
      },
      { property: "og:title", content: `Projects — ${siteMetadata.name}` },
      {
        property: "og:description",
        content: "Production AI systems documented as architecture case studies.",
      },
      { property: "og:url", content: `${siteMetadata.url}/projects` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:title", content: `Projects — ${siteMetadata.name}` },
      { name: "twitter:description", content: "Production AI systems documented as architecture case studies." },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/projects` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteMetadata.url}/projects/#webpage`,
          url: `${siteMetadata.url}/projects`,
          name: `Projects — ${siteMetadata.name}`,
          description: "Architecture case studies: Hermes, Athena, and Aegis — production AI systems.",
          isPartOf: { "@id": `${siteMetadata.url}/#website` },
          about: { "@id": `${siteMetadata.url}/#person` },
          hasPart: projects.map((p) => ({
            "@type": "SoftwareSourceCode",
            name: p.title,
            description: p.abstract,
            codeRepository: `https://github.com/abinesh-u/${p.repo}`,
            programmingLanguage: p.stack,
          })),
        }),
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <SiteShell>
      <div className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">

        {/* ── PAGE HEADER ────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12 border-b hairline">
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-meta text-muted-foreground">/ PROJECTS — 03</span>
            <span className="h-px w-20 bg-foreground/20" />
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground leading-[1.05]">
                Architecture case studies.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-2 flex items-start">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Production-grade AI systems documented in the style of an engineering design review —
                problem, architecture, tradeoffs, capabilities and lessons learned.
              </p>
            </div>
          </div>
        </section>

        {/* ── PROJECT LIST ───────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 space-y-24">
          {projects.map((p, index) => (
            <article
              key={p.slug}
              id={p.slug}
              className="border hairline bg-background hover:bg-secondary/[0.04] hover:border-foreground/20 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.03)] transition-all duration-500 ease-expo group reveal-trigger-scale"
              style={{ transitionDelay: `${index * 150}ms` }}
            >

              {/* ── Project Header */}
              <header className="grid grid-cols-12 gap-6 p-8 lg:p-10 border-b hairline">
                <div className="col-span-12 md:col-span-2">
                  <div className="mono-meta text-muted-foreground">{p.index}</div>
                  <div className="mono-meta text-muted-foreground mt-1">{p.year}</div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground transition-transform duration-300 group-hover:translate-x-1">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-base text-muted-foreground font-light tracking-wide">
                    {p.subtitle}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {p.abstract}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right flex md:flex-col items-start md:items-end gap-3 self-start pt-1">
                  <a
                    href={`https://github.com/abinesh-u/${p.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-foreground/10 hover:border-foreground/30 px-3 py-1.5 inline-flex items-center gap-1 group/btn"
                  >
                    <span>Source</span>
                    <span className="inline-block transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
                  </a>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 border border-foreground/[0.06] px-3 py-1.5 inline-block cursor-default select-none">
                    Docs →
                  </span>
                </div>
              </header>

              {/* ── 01 Problem + 02 Architecture side by side */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x hairline border-b hairline">

                {/* Problem */}
                <div className="p-8 lg:p-10">
                  <div className="mono-meta text-muted-foreground mb-4">01 — Problem</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.problem}</p>
                </div>

                {/* Architecture Pipeline */}
                <div className="p-8 lg:p-10">
                  <div className="mono-meta text-muted-foreground mb-6">02 — Architecture</div>
                  <div className="flex flex-col items-start gap-0">
                    {p.pipeline.map((step, i) => (
                      <div key={step} className="flex flex-col items-start">
                        <div className={`flex items-center gap-3 transition-colors duration-500 ${
                          i === 0 || i === p.pipeline.length - 1
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground/80"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500 ease-expo group-hover:bg-foreground group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.25)] ${
                            i === 0 || i === p.pipeline.length - 1
                              ? "bg-foreground"
                              : "bg-foreground/30"
                          }`} />
                          <span className="text-xs font-mono tracking-wide">{step}</span>
                        </div>
                        {i < p.pipeline.length - 1 && (
                          <div className="ml-[2.8px] w-px h-4 bg-foreground/15 group-hover:bg-foreground/35 transition-colors duration-500 ease-expo" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 03 Tradeoffs + 04 Capabilities side by side */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x hairline border-b hairline">

                {/* Tradeoffs */}
                <div className="p-8 lg:p-10">
                  <div className="mono-meta text-muted-foreground mb-4">03 — Tradeoffs</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.tradeoffs}</p>
                </div>

                {/* Capabilities */}
                <div className="p-8 lg:p-10">
                  <div className="mono-meta text-muted-foreground mb-5">04 — Capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {p.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="font-mono text-[10px] uppercase tracking-wider text-foreground/60 border border-foreground/12 px-2.5 py-1 transition-all duration-300 ease-expo hover:border-foreground/45 hover:text-foreground hover:-translate-y-0.5 cursor-default select-none"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 05 System Stack */}
              <div className="p-8 lg:p-10 border-b hairline">
                <div className="mono-meta text-muted-foreground mb-5">05 — System Stack</div>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {p.stack.map((tech) => (
                    <span key={tech} className="flex items-center gap-2 text-xs text-muted-foreground font-mono group/tech hover:text-foreground transition-colors duration-300">
                      <span className="w-px h-3 bg-foreground/20 group-hover/tech:bg-foreground transition-colors duration-300" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── 06 Lessons Learned */}
              <div className="p-8 lg:p-10 bg-secondary">
                <div className="mono-meta text-muted-foreground mb-4">06 — Lessons Learned</div>
                <p className="text-sm leading-relaxed max-w-3xl text-foreground/80">{p.lessons}</p>
              </div>

            </article>
          ))}
        </section>

      </div>
    </SiteShell>
  );
}
