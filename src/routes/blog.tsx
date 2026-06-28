import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { articles } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";

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
      { property: "og:url", content: `${siteMetadata.url}/blog` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — Architecture Notes by Abinesh U" },
      { name: "twitter:description", content: "Long-form technical writing on AI systems." },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${siteMetadata.url}/blog/#webpage`,
          url: `${siteMetadata.url}/blog`,
          name: `Blog — ${siteMetadata.name}`,
          description: "Long-form essays and architecture breakdowns on agentic AI and systems engineering.",
          isPartOf: { "@id": `${siteMetadata.url}/#website` },
          publisher: { "@id": `${siteMetadata.url}/#person` },
          blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            description: a.excerpt,
            url: `${siteMetadata.url}/blog#${a.slug}`,
            datePublished: new Date(a.date).toISOString(),
            author: { "@id": `${siteMetadata.url}/#person` },
          })),
        }),
      },
    ],
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
          {articles.map((a, i) => (
            <article
              key={a.slug}
              className="group grid grid-cols-12 gap-6 py-10 border-b hairline hover:bg-secondary/45 px-2 -mx-2 transition-all duration-300 ease-expo reveal-trigger cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
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
                <div className="mt-4 mono-caps flex items-center gap-1">
                  <span>Read essay</span>
                  <span className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
                </div>
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
