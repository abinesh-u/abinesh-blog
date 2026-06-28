import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { systems } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Systems — Architecture Breakdowns by Abinesh U" },
      {
        name: "description",
        content:
          "A growing collection of architecture breakdowns: multi-agent systems, agent memory, RAG, MCP, AI evaluation and production AI patterns.",
      },
      { property: "og:title", content: "Systems — Abinesh U" },
      { property: "og:description", content: "Architecture breakdowns for production AI systems." },
      { property: "og:url", content: `${siteMetadata.url}/systems` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Systems — Architecture Breakdowns by Abinesh U" },
      { name: "twitter:description", content: "Architecture breakdowns for production AI systems." },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/systems` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteMetadata.url}/systems/#webpage`,
          url: `${siteMetadata.url}/systems`,
          name: `Systems — ${siteMetadata.name}`,
          description: "A growing collection of AI system architecture breakdowns.",
          isPartOf: { "@id": `${siteMetadata.url}/#website` },
          about: { "@id": `${siteMetadata.url}/#person` },
          hasPart: systems.map((s) => ({
            "@type": "CreativeWork",
            name: s.title,
            description: s.description,
            identifier: s.index,
          })),
        }),
      },
    ],
  }),
  component: Systems,
});

function Systems() {
  return (
    <SiteShell>
      <PageHeader
        index="/ SYSTEMS — 02"
        title="Architecture, broken down."
        description="A living index of the systems I study, build and document — from multi-agent coordination to production reliability patterns. Each track is a vertical of related breakdowns."
      />
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-8">
        <div className="border hairline">
          {systems.map((s, i) => (
            <article
              key={s.slug}
              className={`grid grid-cols-12 gap-6 p-8 hover:bg-secondary/45 border-transparent hover:border-foreground/10 transition-all duration-300 ease-expo ${
                i !== systems.length - 1 ? "border-b" : ""
              } hairline group cursor-pointer reveal-trigger`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="col-span-12 md:col-span-2">
                <div className="mono-caps text-muted-foreground">{s.index}</div>
                <div className="mt-2 mono-caps">{s.entries} entries</div>
                {/* Reveal coordinate label on hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] text-muted-foreground/50 select-none">
                  LOC // 02.{String.fromCharCode(65 + i)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {s.description}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 md:text-right self-end">
                <span className="mono-caps inline-flex items-center gap-1">
                  <span>Open</span>
                  <span className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
