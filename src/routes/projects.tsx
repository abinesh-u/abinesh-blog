import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Case Studies by Abinesh U" },
      {
        name: "description",
        content:
          "Production AI case studies covering problem, architecture, tradeoffs, results and lessons learned.",
      },
      { property: "og:title", content: "Projects — Abinesh U" },
      { property: "og:description", content: "Production AI case studies in long-form." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  return (
    <SiteShell>
      <PageHeader
        index="/ PROJECTS — 03"
        title="Systems in production."
        description="Case studies in the documentation style I wish more engineering teams used: problem, architecture, tradeoffs, results, lessons."
      />
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 space-y-16">
        {projects.map((p) => (
          <article key={p.slug} className="border hairline">
            <header className="grid grid-cols-12 gap-6 p-8 border-b hairline">
              <div className="col-span-12 md:col-span-2 mono-caps text-muted-foreground">
                {p.index}
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">{p.title}</h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {p.summary}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 md:text-right mono-caps text-muted-foreground">
                {p.year}
              </div>
            </header>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x hairline">
              <Block label="01 — Problem" body={p.problem} />
              <Block label="02 — Architecture" body={p.architecture} />
              <Block label="03 — Tradeoffs" body={p.tradeoffs} />
              <Block label="04 — Results" body={p.results} />
            </div>
            <div className="border-t hairline p-8 bg-secondary">
              <div className="mono-caps text-muted-foreground">05 — Lessons learned</div>
              <p className="mt-3 text-base leading-relaxed max-w-3xl">{p.lessons}</p>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="p-8">
      <div className="mono-caps text-muted-foreground">{label}</div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
