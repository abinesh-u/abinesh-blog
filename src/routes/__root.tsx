import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { siteMetadata, sameAsUrls } from "../lib/metadata";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mono-caps text-muted-foreground">Error / 404</div>
        <h1 className="mt-6 text-6xl font-semibold tracking-tighter text-foreground">Not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This route does not exist in the system.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-mono uppercase tracking-widest border border-foreground px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mono-caps text-muted-foreground">System fault</div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page failed to load. Try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center text-xs font-mono uppercase tracking-widest bg-foreground text-background px-4 py-3 hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center text-xs font-mono uppercase tracking-widest border border-foreground px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Abinesh U — Designing Intelligent Systems" },
      {
        name: "description",
        content:
          "Abinesh U is an AI engineer designing agentic AI, multi-agent architectures and production AI infrastructure.",
      },
      { name: "author", content: "Abinesh U" },
      { property: "og:site_name", content: "Abinesh U" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@abinesh_ai" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/assets/common/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/assets/common/favicon/favicon-96x96.png",
      },
      { rel: "icon", type: "image/svg+xml", href: "/assets/common/favicon/favicon.svg" },
      { rel: "apple-touch-icon", href: "/assets/common/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/assets/common/favicon/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteMetadata.url}/#person`,
          name: siteMetadata.name,
          url: siteMetadata.url,
          image: siteMetadata.imageUrl,
          jobTitle: "AI Engineer",
          description: siteMetadata.description,
          sameAs: sameAsUrls,
          knowsAbout: siteMetadata.knowsAbout,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
