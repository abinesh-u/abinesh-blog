import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// SSR entry: src/server.ts (the project's SSR error wrapper).
const tanstackStartOptions = {
  importProtection: {
    behavior: "error",
    client: {
      files: ["**/server/**"],
      specifiers: ["server-only"],
    },
  },
  server: { entry: "server" },
};

export default defineConfig(({ mode }) => {
  // Inject VITE_* env vars as `import.meta.env.*` defines (replaces the
  // preset's `envDefine: true` default).
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define: envDefine,
    // Match the build's CSS pipeline in dev: Lightning CSS in both, otherwise
    // build-time transforms (e.g. collapsing a hand-written
    // `-webkit-backdrop-filter` to the prefixed form Chrome ignores) break the
    // built/static output while the dev preview looks fine.
    css: { transformer: "lightningcss" },
    resolve: {
      tsconfigPaths: true,
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    // Pre-bundle React core. Including @tanstack/react-start here would pull
    // its node:async_hooks server entry into the client bundle and crash
    // hydration.
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: { host: "::", port: 8080 },
    plugins: [tailwindcss(), tanstackStart(tanstackStartOptions)],
  };
});
