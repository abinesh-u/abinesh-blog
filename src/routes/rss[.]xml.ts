import { createFileRoute } from "@tanstack/react-router";
import { articles } from "../lib/content";
import { siteMetadata } from "../lib/metadata";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const items = articles
          .map(
            (a) => `
        <item>
          <title>${a.title}</title>
          <link>${siteMetadata.url}/blog</link>
          <guid>${siteMetadata.url}/blog#${a.slug}</guid>
          <pubDate>${new Date(a.date).toUTCString()}</pubDate>
          <description>${a.excerpt}</description>
        </item>`,
          )
          .join("");

        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Architecture Notes — ${siteMetadata.name}</title>
    <link>${siteMetadata.url}/blog</link>
    <description>${siteMetadata.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteMetadata.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

        return new Response(rss, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
