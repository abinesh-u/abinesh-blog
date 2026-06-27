import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { systems } from "@/lib/content";

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
      { property: "og:url", content: "/systems" },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
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
              className={`grid grid-cols-12 gap-6 p-8 hover:bg-secondary transition-colors ${
                i !== systems.length - 1 ? "border-b" : ""
              } hairline`}
            >
              <div className="col-span-12 md:col-span-2">
                <div className="mono-caps text-muted-foreground">{s.index}</div>
                <div className="mt-2 mono-caps">{s.entries} entries</div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {s.description}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 md:text-right self-end">
                <span className="mono-caps">Open →</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
