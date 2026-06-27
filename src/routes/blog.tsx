import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { articles } from "@/lib/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Architecture Notes by Abinesh U" },
      {
        name: "description",
        content:
          "Long-form, documentation-style technical writing on agentic AI, memory, RAG, evaluation and production AI patterns.",
      },
      { property: "og:title", content: "Blog — Abinesh U" },
      { property: "og:description", content: "Long-form technical writing on AI systems." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <SiteShell>
      <PageHeader
        index="/ BLOG — 04"
        title="Notes from the system."
        description="Long-form essays and architecture breakdowns. Written in a documentation style — short on rhetoric, long on diagrams, named patterns and explicit tradeoffs."
      />
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16">
        <div className="border-t hairline">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="group grid grid-cols-12 gap-6 py-10 border-b hairline hover:bg-secondary px-2 -mx-2 transition-colors"
            >
              <div className="col-span-12 md:col-span-2 space-y-2">
                <div className="mono-caps text-muted-foreground">{a.index}</div>
                <div className="mono-caps">{a.date}</div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="mono-caps text-muted-foreground">{a.category}</div>
                <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tighter group-hover:underline underline-offset-4">
                  {a.title}
                </h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {a.excerpt}
                </p>
                <div className="mt-4 mono-caps">Read essay →</div>
              </div>
              <div className="col-span-12 md:col-span-2 md:text-right mono-caps text-muted-foreground">
                {a.readTime}
              </div>
            </article>
          ))}
        </div>
        <div className="py-10 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Subscribe via{" "}
            <a href="/rss.xml" className="underline underline-offset-4">
              RSS
            </a>{" "}
            for new essays.
          </p>
          <span className="mono-caps text-muted-foreground">More in the queue —</span>
        </div>
      </section>
    </SiteShell>
  );
}
