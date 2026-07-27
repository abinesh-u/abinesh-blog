import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { articles } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useMemo, useRef } from "react";

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
    const socialImage = article.socialImage
      ? `${siteMetadata.url}${article.socialImage}`
      : siteMetadata.imageUrl;
    return {
      meta: [
        { title: `${article.title} — Abinesh U` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:url", content: `${siteMetadata.url}/blog/${article.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: socialImage },
        { property: "og:image:alt", content: `${article.title} hero graphic` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.excerpt },
        { name: "twitter:image", content: socialImage },
        { name: "twitter:image:alt", content: `${article.title} hero graphic` },
      ],
      links: [{ rel: "canonical", href: `${siteMetadata.url}/blog/${article.slug}` }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useLoaderData();
  const article = articles.find((a) => a.slug === slug);

  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  // Match the file key in the global imports map
  const fileKey = `../content/blog/${slug}.md`;
  const markdownContent = postModules[fileKey] || "";

  const headings = useMemo(() => {
    const h2Reg = /^##\s+(.+)$/gm;
    const matches = [...markdownContent.matchAll(h2Reg)];
    return matches.map((m) => {
      let text = m[1].trim();
      // Strip markdown links if any exist in heading
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return { text, id };
    });
  }, [markdownContent]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scroll);

      // Show TOC sidebar only after scrolling past the hero header (300px)
      // and hide it once the user scrolls past the end of the article body
      const articleEl = contentRef.current;
      const articleEnd = articleEl ? articleEl.offsetTop + articleEl.offsetHeight - 60 : Infinity;
      setIsSidebarVisible(window.scrollY > 300 && window.scrollY < articleEnd);

      // Deterministically find the heading closest to the top of the viewport
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 120; // offset for sticky header

      let currentActiveId = headings[0]?.id || null;
      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        } else {
          break;
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

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
      <div 
        className="fixed top-0 left-0 h-1 bg-foreground z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Sticky Stepper Table of Contents */}
      {headings.length > 0 && (
        <nav 
          className={`fixed left-6 xl:left-10 top-32 z-40 hidden xl:block max-h-[calc(100vh-12rem)] w-48 overflow-y-auto scrollbar-none select-none transition-all duration-500 transform ${
            isSidebarVisible 
              ? "opacity-100 translate-x-0 pointer-events-auto" 
              : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 mb-4 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"/></svg>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Sections</span>
            </div>
            <div className="relative pl-4 border-l border-foreground/[0.06] flex flex-col gap-3">
              {headings.map((h, index) => {
                const isActive = activeId === h.id;
                return (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="group relative flex items-start gap-2.5 text-left transition-all duration-200"
                  >
                    <div 
                      className={`absolute -left-[17px] top-1 w-[2px] h-3.5 rounded-full shrink-0 transition-all duration-300 ${
                        isActive ? "bg-foreground scale-y-100" : "bg-transparent group-hover:bg-foreground/15 scale-y-75"
                      }`}
                    />
                    <span className={`text-[10px] font-mono shrink-0 transition-colors duration-200 ${
                      isActive ? "text-foreground font-semibold" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                    }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-[11px] font-mono transition-colors duration-200 leading-tight ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                    }`}>
                      {h.text}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      )}
      <article className="mx-auto max-w-4xl px-6 lg:px-10 pt-16 pb-10">
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
          <div className="mt-8 flex items-center gap-3">
            <img src={siteMetadata.imageUrl} alt="Abinesh U" className="w-6 h-6 rounded-full border border-hairline object-cover shadow-sm" />
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-foreground font-medium">Abinesh U</span>
              <span>•</span>
              <span>{article.readTime} read</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div ref={contentRef} className="max-w-none">
          {markdownContent ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold tracking-tight text-foreground mt-12 mb-6" {...props} />
                ),
                h2: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  return (
                    <h2
                      id={id}
                      className="group relative flex items-center text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pb-2 border-b hairline"
                      {...props}
                    >
                      <span>{children}</span>
                      <a
                        href={`#${id}`}
                        className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground text-lg"
                        aria-label="Link to section"
                      >
                        🔗
                      </a>
                    </h2>
                  );
                },
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
                blockquote: ({ node, children, ...props }) => (
                  <blockquote className="my-8 rounded-lg border-l-4 border-foreground/50 bg-secondary/30 p-6 shadow-sm" {...props}>
                    <div className="text-muted-foreground text-base leading-relaxed [&>p:first-child]:font-semibold [&>p:first-child]:text-foreground [&>p:first-child]:mb-2 [&>p:first-child]:not-italic italic">
                      {children}
                    </div>
                  </blockquote>
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
                      onClick={() => setZoomedImg(src || null)}
                      className="mx-auto max-w-full border border-hairline shadow-sm inline-block cursor-zoom-in hover:opacity-90 transition-opacity"
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

        {/* Author Footer */}
        {markdownContent && (
          <div className="mt-32 relative group overflow-hidden rounded-2xl border border-hairline bg-card/30 p-8 sm:p-10 transition-all duration-500 hover:bg-card hover:shadow-xl hover:shadow-black/5 hover:border-foreground/20">
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-foreground/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-110" />
                <img 
                  src={siteMetadata.imageUrl} 
                  alt="Abinesh U" 
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-hairline object-cover shadow-sm bg-background transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="text-center sm:text-left flex-1 flex flex-col justify-center">
                <div className="mb-4 inline-flex self-center sm:self-start items-center rounded-full border border-hairline bg-secondary/30 px-3 py-1 text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-colors duration-300">
                  About the Author
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Abinesh U
                </h3>
                
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {siteMetadata.description}
                </p>
                
                <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <a 
                    href={siteMetadata.socials.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center rounded-full border border-hairline bg-background px-5 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={siteMetadata.socials.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center rounded-full border border-hairline bg-background px-5 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                  >
                    GitHub
                  </a>
                  <a 
                    href={siteMetadata.socials.medium} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center rounded-full border border-hairline bg-background px-5 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                  >
                    Medium
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Image Zoom Modal */}
      {zoomedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 cursor-zoom-out transition-all"
          onClick={() => setZoomedImg(null)}
        >
          <img src={zoomedImg} className="max-w-[95vw] max-h-[95vh] rounded-md shadow-2xl border border-hairline" alt="Zoomed diagram" />
        </div>
      )}
    </SiteShell>
  );
}
