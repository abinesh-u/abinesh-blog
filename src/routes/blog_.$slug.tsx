import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { articles } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Load all markdown files as raw strings at build-time using Vite's import.meta.glob
const postModules = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const article = articles.find((a) => a.slug === loaderData.slug);
    if (!article) return {};
    return {
      meta: [
        { title: `${article.title} — Abinesh U` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:url", content: `${siteMetadata.url}/blog/${article.slug}` },
        { property: "og:image", content: siteMetadata.imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.excerpt },
      ],
      links: [{ rel: "canonical", href: `${siteMetadata.url}/blog/${article.slug}` }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useLoaderData();
  const article = articles.find((a) => a.slug === slug);

  // Match the file key in the global imports map
  const fileKey = `../content/blog/${slug}.md`;
  const markdownContent = postModules[fileKey] || "";

  if (!article) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Article not found</h1>
          <p className="mt-4 text-muted-foreground">The article you are looking for does not exist.</p>
          <Link to="/blog" className="mt-8 inline-block underline underline-offset-4 font-mono text-sm">
            ← Back to blog
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-6 lg:px-10 pt-16 pb-24">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>← Back to blog</span>
          </Link>
        </div>

        {/* Article Meta Header */}
        <header className="border-b hairline pb-12 mb-12">
          <div className="flex items-center gap-3 text-muted-foreground mono-caps text-xs">
            <span>{article.index}</span>
            <span>•</span>
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tighter text-foreground leading-[1.1]">
            {article.title}
          </h1>
          <div className="mt-8 flex items-center gap-4 text-muted-foreground mono-caps text-xs">
            <span>By Abinesh U</span>
            <span>•</span>
            <span>{article.readTime} read</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-none">
          {markdownContent ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold tracking-tight text-foreground mt-12 mb-6" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pb-2 border-b hairline"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-medium tracking-tight text-foreground mt-8 mb-3" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base text-muted-foreground leading-relaxed my-5" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 my-5 space-y-2 text-base text-muted-foreground" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 my-5 space-y-2 text-base text-muted-foreground" {...props} />
                ),
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-foreground/30 pl-5 italic my-6 text-muted-foreground" {...props} />
                ),
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <pre className="p-5 bg-secondary/50 border border-hairline rounded my-6 overflow-x-auto font-mono text-xs text-foreground leading-relaxed">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="px-1.5 py-0.5 bg-secondary/80 border border-hairline rounded font-mono text-xs text-foreground" {...props}>
                      {children}
                    </code>
                  );
                },
                img: ({ node, src, alt, ...props }) => (
                  <span className="my-10 block text-center">
                    <img
                      src={src}
                      alt={alt}
                      className="mx-auto max-w-full border border-hairline shadow-sm inline-block"
                      {...props}
                    />
                    {alt && <span className="mt-3 block font-mono text-[10px] text-muted-foreground/60">{alt}</span>}
                  </span>
                ),
                table: ({ node, ...props }) => (
                  <div className="my-8 w-full overflow-x-auto rounded-md border border-hairline bg-card/50 shadow-sm">
                    <table className="w-full text-left text-sm text-muted-foreground border-collapse" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-secondary/50 border-b border-hairline text-foreground mono-caps text-[10px]" {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className="divide-y divide-hairline" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className="hover:bg-secondary/20 transition-colors" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="px-5 py-4 font-medium tracking-wider" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-5 py-4 leading-relaxed" {...props} />
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div className="py-12 text-center border border-dashed border-foreground/10 rounded">
              <p className="text-muted-foreground text-sm font-mono">
                This essay is currently being compiled. Check back soon for the full breakdown!
              </p>
            </div>
          )}
        </div>
      </article>
    </SiteShell>
  );
}
