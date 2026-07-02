import { createFileRoute } from '@tanstack/react-router'
import { SiteShell } from "@/components/site-shell";
import { Mail, Linkedin, Github, Youtube, BookOpen, Code2, Instagram, Terminal, CornerDownLeft } from "lucide-react";
import { MediumIcon, XLogo } from "@/components/icons";
import { siteMetadata } from "../lib/metadata";
import { useState, useEffect, useRef } from "react";

const stickerUrl = "/assets/contact/sticker.svg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteMetadata.name}` },
      {
        name: "description",
        content: `Get in touch with ${siteMetadata.name} — for collaborations, advisory, writing and speaking.`,
      },
      { property: "og:title", content: `Contact — ${siteMetadata.name}` },
      {
        property: "og:description",
        content: "Get in touch — collaborations, advisory, writing and speaking.",
      },
      { property: "og:url", content: `${siteMetadata.url}/contact` },
      { property: "og:image", content: siteMetadata.imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Contact — ${siteMetadata.name}` },
      {
        name: "twitter:description",
        content: "Get in touch — collaborations, advisory, writing and speaking.",
      },
      { name: "twitter:image", content: siteMetadata.imageUrl },
    ],
    links: [{ rel: "canonical", href: `${siteMetadata.url}/contact` }],
  }),
  component: Contact,
});

const communicationNodes = [
  {
    port: "01",
    label: "Email",
    value: "abinesh.ai.ml [at] gmail.com",
    href: "#",
    icon: Mail,
    protocol: "SMTP / SSL",
    purpose: "DIRECT INTAKE",
    status: "ACTIVE",
    statusBg: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.3)]",
    latency: "< 24 HOURS",
    action: "SEND ↗",
    brandBorder: "hover:border-red-500/30",
    accentColor: "group-hover:text-red-500",
  },
  {
    port: "02",
    label: "LinkedIn",
    value: "/in/abineshu",
    href: siteMetadata.socials.linkedin,
    icon: Linkedin,
    protocol: "HTTPS / OAUTH",
    purpose: "PROFESSIONAL",
    status: "STABLE",
    statusBg: "bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.3)]",
    latency: "< 12 HOURS",
    action: "CONNECT ↗",
    brandBorder: "hover:border-sky-500/30",
    accentColor: "group-hover:text-sky-500",
  },
  {
    port: "03",
    label: "GitHub",
    value: "@abinesh-u",
    href: siteMetadata.socials.github,
    icon: Github,
    protocol: "SSH / KEY",
    purpose: "CODE REVIEWS",
    status: "STABLE",
    statusBg: "bg-neutral-500 dark:bg-neutral-400 shadow-[0_0_6px_rgba(115,115,115,0.3)]",
    latency: "< 48 HOURS",
    action: "CLONE ↗",
    brandBorder: "hover:border-neutral-500/30",
    accentColor: "group-hover:text-neutral-800 dark:group-hover:text-neutral-200",
  },
];

const ecosystemPlatforms = [
  { name: "Medium", href: siteMetadata.socials.medium, icon: MediumIcon, handle: "@abinesh_ai", status: "INDEXED", type: "Articles" },
  { name: "YouTube", href: siteMetadata.socials.youtube, icon: Youtube, handle: "@abinesh_ai", status: "ONLINE", type: "Videos" },
  { name: "X / Twitter", href: siteMetadata.socials.x, icon: XLogo, handle: "@abinesh_ai", status: "ACTIVE", type: "Shortform" },
  { name: "Dev.to", href: siteMetadata.socials.devto, icon: BookOpen, handle: "@abinesh_ai", status: "STABLE", type: "Technical" },
  { name: "Google Dev", href: siteMetadata.socials.googleDev, icon: Code2, handle: "abineshu", status: "VERIFIED", type: "Profile" },
  { name: "Instagram", href: siteMetadata.socials.instagram, icon: Instagram, handle: "@abinesh_ai", status: "ACTIVE", type: "Social" },
];

interface TerminalLine {
  type: "input" | "output" | "system";
  text: string;
}

const commands = [
  "help",
  "about",
  "status",
  "stack",
  "projects",
  "systems",
  "architecture",
  "blog",
  "contact",
  "availability",
  "location",
  "resume",
  "github",
  "linkedin",
  "vision",
  "clear",
  "whoami",
  "fortune",
  "coffee",
  "sudo hire"
];

function TerminalConsoleWidget() {
  const [history, setHistory] = useState<TerminalLine[]>(() => [
    { type: "system", text: "Initializing Runtime v2.0.6..." },
    { type: "system", text: "Loading Agent Registry..." },
    { type: "system", text: "████████████████████ 100%" },
    { type: "system", text: "Connecting Memory Layer..." },
    { type: "system", text: "Loading Knowledge Graph..." },
    { type: "system", text: "Registering MCP Tools..." },
    { type: "system", text: "Initializing Communication Gateway..." },
    { type: "system", text: "System Ready." },
    { type: "system", text: 'Type "help" to begin.' }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Client-side boot flow & periodic background logs
  useEffect(() => {
    const isBooted = typeof window !== "undefined" && window.sessionStorage.getItem("agent-runtime-booted") === "true";
    if (isBooted) {
      setHistory([
        { type: "system", text: "Abinesh U AI Agent [Version 2.0.6]" },
        { type: "system", text: "System Ready. Type 'help' to begin." }
      ]);
      setBootComplete(true);
      return;
    }

    setHistory([]); // clear SSR items for staggered client side animation
    const sequence = [
      { text: "Initializing Runtime v2.0.6...", delay: 100 },
      { text: "Loading Agent Registry...", delay: 350 },
      { text: "████████████████████ 100%", delay: 700 },
      { text: "Connecting Memory Layer...", delay: 950 },
      { text: "Loading Knowledge Graph...", delay: 1150 },
      { text: "Registering MCP Tools...", delay: 1350 },
      { text: "Initializing Communication Gateway...", delay: 1550 },
      { text: "System Ready.", delay: 1750 },
      { text: 'Type "help" to begin.', delay: 1950 }
    ];

    sequence.forEach((step) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { type: "system", text: step.text }]);
      }, step.delay);
    });

    setTimeout(() => {
      setBootComplete(true);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("agent-runtime-booted", "true");
      }
    }, 2150);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, loading]);

  // Periodic background system logs
  useEffect(() => {
    if (!bootComplete) return;

    const logMessages = [
      "Memory synchronization complete.",
      "Agent registry healthy.",
      "Knowledge graph updated.",
      "MCP Tool Servers connection stable.",
      "Context compression pipeline executed.",
      "Decision engine metrics calibrated."
    ];

    const interval = setInterval(() => {
      const timeString = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      setHistory((prev) => [
        ...prev,
        { type: "system", text: `[${timeString}] ${randomMsg}` }
      ]);
    }, 30000); // every 30s

    return () => clearInterval(interval);
  }, [bootComplete]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Track command history
    const updatedHistory = [...cmdHistory, trimmed];
    setCmdHistory(updatedHistory);
    setHistoryPointer(updatedHistory.length);

    setHistory((prev) => [...prev, { type: "input", text: `agent@abinesh.blog:~$ ${trimmed}` }]);
    setLoading(true);

    const cmdLower = trimmed.toLowerCase();
    const args = cmdLower.split(/\s+/);
    const baseCmd = args[0];

    setTimeout(() => {
      let outputLines: TerminalLine[] = [];
      switch (baseCmd) {
        case "help":
          outputLines = [
            { type: "system", text: "--------------------------------" },
            { type: "output", text: "AVAILABLE COMMANDS" },
            { type: "output", text: "" },
            { type: "output", text: "about        - Profile summary" },
            { type: "output", text: "status       - Availability details" },
            { type: "output", text: "stack        - Tech stack breakdown" },
            { type: "output", text: "projects     - Active project repositories" },
            { type: "output", text: "systems      - Architecture tracks" },
            { type: "output", text: "architecture - Specializations" },
            { type: "output", text: "blog         - Published articles" },
            { type: "output", text: "resume       - Career summary" },
            { type: "output", text: "availability - Advisory slots" },
            { type: "output", text: "contact      - Gateways" },
            { type: "output", text: "github       - Git node link" },
            { type: "output", text: "linkedin     - Professional graph node" },
            { type: "output", text: "vision       - Engineering mission" },
            { type: "output", text: "clear        - Clear buffer" },
            { type: "system", text: "--------------------------------" }
          ];
          break;
        case "status":
          outputLines = [
            { type: "system", text: "--------------------------------" },
            { type: "output", text: "SYSTEM STATUS" },
            { type: "output", text: "● AVAILABLE FOR SELECT ADVISORY" },
            { type: "output", text: "" },
            { type: "output", text: "Current Focus" },
            { type: "output", text: "• Multi-Agent Systems" },
            { type: "output", text: "• Production AI" },
            { type: "output", text: "• AI Infrastructure" },
            { type: "output", text: "" },
            { type: "output", text: "Average Response" },
            { type: "output", text: "<24 Hours" },
            { type: "system", text: "--------------------------------" }
          ];
          break;
        case "stack":
          outputLines = [
            { type: "output", text: "LANGUAGES" },
            { type: "output", text: "Python" },
            { type: "output", text: "TypeScript" },
            { type: "output", text: "" },
            { type: "output", text: "FRAMEWORKS" },
            { type: "output", text: "LangGraph" },
            { type: "output", text: "FastAPI" },
            { type: "output", text: "PydanticAI" },
            { type: "output", text: "OpenAI SDK" },
            { type: "output", text: "" },
            { type: "output", text: "VECTOR DATABASES" },
            { type: "output", text: "Qdrant" },
            { type: "output", text: "" },
            { type: "output", text: "DATABASES" },
            { type: "output", text: "PostgreSQL" },
            { type: "output", text: "Redis" },
            { type: "output", text: "" },
            { type: "output", text: "INFRASTRUCTURE" },
            { type: "output", text: "Docker" },
            { type: "output", text: "Vercel" },
            { type: "output", text: "GPU Runtime" }
          ];
          break;
        case "architecture":
          outputLines = [
            { type: "output", text: "SPECIALIZATIONS" },
            { type: "output", text: "✓ Agent Orchestration" },
            { type: "output", text: "✓ Memory Systems" },
            { type: "output", text: "✓ RAG Pipelines" },
            { type: "output", text: "✓ MCP Integrations" },
            { type: "output", text: "✓ Evaluation Frameworks" },
            { type: "output", text: "✓ Production Deployment" }
          ];
          break;
        case "whoami":
          outputLines = [
            { type: "output", text: "Abinesh U" },
            { type: "output", text: "AI Engineer" },
            { type: "output", text: "Designing intelligent systems that think before they act." }
          ];
          break;
        case "coffee":
          outputLines = [
            { type: "output", text: "ERROR" },
            { type: "output", text: "Coffee module unavailable." },
            { type: "output", text: "Engineer recharge required." }
          ];
          break;
        case "sudo hire":
          outputLines = [
            { type: "output", text: "Permission Granted." },
            { type: "output", text: "Opening communication channel..." }
          ];
          setTimeout(() => {
            document.getElementById("channels")?.scrollIntoView({ behavior: "smooth" });
          }, 500);
          break;
        case "clear":
          setHistory([]);
          setLoading(false);
          return;
        case "about":
          outputLines = [
            { type: "output", text: "Abinesh U is an AI Engineer and Systems Architect." },
            { type: "output", text: "Focused on agentic loops, custom context routing, and MLOps." }
          ];
          break;
        case "projects":
          outputLines = [
            { type: "output", text: "PRJ-01 : Hermes - Voice Intelligence" },
            { type: "output", text: "PRJ-02 : Athena - Enterprise Retrieval" },
            { type: "output", text: "PRJ-03 : Aegis  - Decision Governance" }
          ];
          break;
        case "systems":
          outputLines = [
            { type: "output", text: "Detected Runtime Modules" },
            { type: "output", text: "" },
            { type: "output", text: "✓ Hermes" },
            { type: "output", text: "Research & Multi-Agent Orchestration" },
            { type: "output", text: "" },
            { type: "output", text: "✓ Athena" },
            { type: "output", text: "Knowledge Intelligence Platform" },
            { type: "output", text: "" },
            { type: "output", text: "✓ Aegis" },
            { type: "output", text: "Evaluation & Security Framework" },
            { type: "output", text: "" },
            { type: "system", text: 'Type "open <name>" (e.g. open hermes) to inspect.' }
          ];
          break;
        case "open":
          const target = args[1];
          if (!target) {
            outputLines = [
              { type: "output", text: "Usage: open <module>" },
              { type: "output", text: "Available modules: hermes, athena, aegis" }
            ];
          } else if (target === "hermes" || target === "athena" || target === "aegis") {
            const capitalize = target.charAt(0).toUpperCase() + target.slice(1);
            outputLines = [
              { type: "output", text: `Opening ${capitalize}...` },
              { type: "output", text: "Redirecting..." }
            ];
            setTimeout(() => {
              if (typeof window !== "undefined") {
                window.location.href = `/projects#${target}`;
              }
            }, 800);
          } else {
            outputLines = [
              { type: "output", text: `Module not detected: ${target}` },
              { type: "output", text: "Available modules: hermes, athena, aegis" }
            ];
          }
          break;
        case "blog":
          outputLines = [
            { type: "output", text: "ART-08 : The Shape of Agentic Systems" },
            { type: "output", text: "ART-07 : Memory Is the System" },
            { type: "output", text: "ART-06 : RAG Is a Retrieval Problem" },
            { type: "output", text: "ART-05 : Evals as Product Engineering" }
          ];
          break;
        case "contact":
          outputLines = [
            { type: "output", text: "EMAIL    : abinesh.ai.ml@gmail.com" },
            { type: "output", text: "LINKEDIN : /in/abineshu" },
            { type: "output", text: "GITHUB   : @abinesh-u" }
          ];
          break;
        case "availability":
          outputLines = [
            { type: "output", text: "AVAILABILITY : ACCEPTING SELECT ADVISORY" }
          ];
          break;
        case "location":
          outputLines = [
            { type: "output", text: "BENGALURU, IN" }
          ];
          break;
        case "resume":
          outputLines = [
            { type: "output", text: "RESUME LINK" },
            { type: "output", text: "Request resume via email: abinesh.ai.ml@gmail.com" }
          ];
          break;
        case "github":
          outputLines = [
            { type: "output", text: "https://github.com/abinesh-u" }
          ];
          break;
        case "linkedin":
          outputLines = [
            { type: "output", text: "https://linkedin.com/in/abineshu" }
          ];
          break;
        case "vision":
          outputLines = [
            { type: "output", text: "Designing intelligent systems that think before they act." }
          ];
          break;
        case "fortune":
          const quotes = [
            "Simple systems scale farther.",
            "Every agent deserves good memory.",
            "Architecture is communication.",
            "Design for orchestration, not automation."
          ];
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          outputLines = [
            { type: "output", text: `"${randomQuote}"` }
          ];
          break;
        default:
          outputLines = [
            { type: "output", text: "Command not found." },
            { type: "output", text: "Type \"help\" for available commands." }
          ];
      }

      // Write lines staggered with a 50ms interval to feel premium & dynamic
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, line]);
          if (index === outputLines.length - 1) {
            setLoading(false);
          }
        }, (index + 1) * 50);
      });
    }, 80);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const val = inputVal.trim().toLowerCase();
      if (!val) return;
      const matches = commands.filter((c) => c.startsWith(val));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: "input", text: `agent@abinesh.blog:~$ ${inputVal}` },
          { type: "output", text: matches.join("    ") }
        ]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyPointer < cmdHistory.length - 1) {
        const nextPointer = historyPointer + 1;
        setHistoryPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      } else if (historyPointer === cmdHistory.length - 1) {
        setHistoryPointer(cmdHistory.length);
        setInputVal("");
      }
    }
  };

  const handleSuggestion = (cmd: string) => {
    if (loading || !bootComplete) return;
    executeCommand(cmd);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      className="relative border border-hairline/80 bg-background/40 backdrop-blur-[2px] p-4 rounded overflow-hidden h-[340px] flex flex-col justify-between font-mono text-[11px] shadow-sm cursor-text"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between pb-2 border-b border-foreground/5 shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
        </div>
        <span className="text-[9px] text-foreground/45 tracking-wider">agent@abinesh.blog:~</span>
        <Terminal className="w-3 h-3 text-foreground/40" />
      </div>

      {/* Terminal Output */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto my-3 space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-foreground/10"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={
              line.type === "input"
                ? "text-foreground font-semibold"
                : line.type === "system"
                  ? "text-foreground/35"
                  : "text-foreground/75"
            }
          >
            {line.text}
          </div>
        ))}
        {loading && (
          <div className="text-foreground/40 animate-pulse">
            &gt; Executing pipeline...
          </div>
        )}
      </div>

      {/* Dynamic Suggestions Chips */}
      <div className="shrink-0 pt-2 border-t border-foreground/5 space-y-2">
        <div className="flex flex-wrap gap-1.5 select-none">
          {["help", "projects", "architecture", "availability", "resume"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSuggestion(cmd)}
              disabled={loading || !bootComplete}
              className="px-2 py-1 border border-foreground/10 hover:border-foreground/25 bg-background/50 hover:bg-secondary/40 rounded text-[9px] text-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider cursor-pointer disabled:opacity-40"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 pt-1">
          {bootComplete ? (
            <span className="text-foreground/50 font-semibold">agent@abinesh.blog:~$</span>
          ) : (
            <span className="text-foreground/30 font-semibold">$</span>
          )}
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || !bootComplete}
              placeholder={inputVal ? "" : "Type help..."}
              className="absolute inset-0 bg-transparent border-none outline-none font-mono text-[11px] w-full text-transparent caret-transparent z-10 selection:bg-foreground/20 selection:text-foreground"
              aria-label="Terminal input"
              autoFocus
            />
            <div className="flex-1 font-mono text-[11px] text-foreground select-none pointer-events-none flex items-center">
              <span>{inputVal || (loading || !bootComplete ? "" : "Type help...")}</span>
              {(!loading && bootComplete) && <span className="inline-block w-1.5 h-3.5 bg-foreground/75 ml-0.5 animate-blink" />}
            </div>
          </div>
          <button
            onClick={() => {
              executeCommand(inputVal);
              setInputVal("");
            }}
            disabled={loading || !bootComplete}
            className="p-1 text-foreground/40 hover:text-foreground transition-colors cursor-pointer disabled:opacity-40"
            title="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const systemStats = [
  { label: "OPERATIONAL STATUS", value: "AVAILABLE FOR ADVISORY", code: "SYS_STATUS_OK" },
  { label: "TIMEZONE / REGION", value: "IST (UTC+5:30) / BENGALURU, IN", code: "LOC_ZONE_01" },
  { label: "RESPONSE LATENCY", value: "98% / < 24 HOURS", code: "METRIC_RESP_01" },
  { label: "PRIMARY GATEWAY", value: "LINKEDIN / EMAIL", code: "GATEWAY_PREF" },
];

function getStatusColorClass(status: string): string {
  const color = status === "OFFLINE" ? "neutral-500" : "emerald-500";
  return `bg-${color} animate-pulse`;
}



function Contact() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  return (
    <SiteShell>
      <div className="w-full">
        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative border-b hairline overflow-hidden">

          <div aria-hidden className="absolute inset-0 dot-bg opacity-[0.04] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-24 mt-10 grid lg:grid-cols-12 gap-10 lg:gap-0 items-end">

            {/* LEFT — text column, About-page typography pattern */}
            <div className="col-span-12 lg:col-span-6 pb-20 flex flex-col justify-end opacity-0 animate-reveal [animation-delay:100ms]">
              <div className="flex items-center gap-4 mb-8">
                <span className="mono-meta text-muted-foreground">06 / CONTACT</span>
                <span className="h-px w-20 bg-foreground" />
              </div>

              <h1 className="mt-10 display-xl text-foreground mb-10">
                Open a
                <br />
                <span className="italic font-normal">Channel.</span>
              </h1>

              <p className="mt-8 text-sm text-muted-foreground max-w-md leading-relaxed">
                I am reachable for collaborations on agentic systems, advisory work on production AI infrastructure, writing and speaking.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "mailto:" + atob("YWJpbmVzaC5haS5tbEBnbWFpbC5jb20=");
                  }}
                  className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:opacity-80 transition-opacity"
                >
                  Send a Message →
                </a>
                <span className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">or scroll to explore channels ↓</span>
              </div>
            </div>

            {/* RIGHT — sticker + constellation animation */}
            <div className="col-span-12 lg:col-span-6 relative min-h-[460px] lg:min-h-[600px] flex items-end justify-center opacity-0 animate-reveal">

              {/* Constellation SVG — sits behind the sticker */}
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full text-foreground pointer-events-none"
                viewBox="0 0 480 560"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <style>{`
                    @keyframes edge-draw {
                      0%   { stroke-dashoffset: 200; opacity: 0; }
                      15%  { opacity: 0.18; }
                      60%  { stroke-dashoffset: 0; opacity: 0.18; }
                      80%  { opacity: 0; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    @keyframes node-pulse {
                      0%, 100% { r: 2.5; opacity: 0.25; }
                      50%       { r: 4;   opacity: 0.55; }
                    }
                    @keyframes node-pulse-slow {
                      0%, 100% { r: 2;   opacity: 0.15; }
                      50%       { r: 3.5; opacity: 0.4;  }
                    }
                    .e1  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 0s    infinite; }
                    .e2  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 0.6s  infinite; }
                    .e3  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 1.2s  infinite; }
                    .e4  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 1.8s  infinite; }
                    .e5  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 2.4s  infinite; }
                    .e6  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 3.0s  infinite; }
                    .e7  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 3.6s  infinite; }
                    .e8  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 4.2s  infinite; }
                    .e9  { stroke-dasharray: 200; animation: edge-draw 6s ease-in-out 4.8s  infinite; }
                    .np  { animation: node-pulse      3s ease-in-out infinite; }
                    .nps { animation: node-pulse-slow 4s ease-in-out infinite; }
                  `}</style>
                </defs>

                {/* Edges — staggered draw-fade */}
                <g stroke="currentColor" strokeWidth="0.75">
                  <line className="e1" x1="80"  y1="120" x2="210" y2="80"  />
                  <line className="e2" x1="210" y1="80"  x2="370" y2="140" />
                  <line className="e3" x1="370" y1="140" x2="400" y2="270" />
                  <line className="e4" x1="400" y1="270" x2="300" y2="370" />
                  <line className="e5" x1="300" y1="370" x2="150" y2="340" />
                  <line className="e6" x1="150" y1="340" x2="80"  y2="220" />
                  <line className="e7" x1="80"  y1="220" x2="210" y2="80"  />
                  <line className="e8" x1="210" y1="80"  x2="300" y2="370" />
                  <line className="e9" x1="370" y1="140" x2="150" y2="340" />
                </g>

                {/* Nodes */}
                <g fill="currentColor">
                  <circle className="np"  cx="80"  cy="120" />
                  <circle className="nps" cx="210" cy="80"  />
                  <circle className="np"  cx="370" cy="140" />
                  <circle className="nps" cx="400" cy="270" />
                  <circle className="np"  cx="300" cy="370" />
                  <circle className="nps" cx="150" cy="340" />
                  <circle className="np"  cx="80"  cy="220" />
                  {/* Extra sparse nodes */}
                  <circle className="nps" cx="290" cy="180" />
                  <circle className="np"  cx="180" cy="460" />
                  <circle className="nps" cx="390" cy="420" />
                  <circle className="np"  cx="60"  cy="380" />
                  <circle className="nps" cx="430" cy="90"  />
                </g>

                {/* Faint static long-range edges */}
                <g stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.06">
                  <line x1="80"  y1="120" x2="400" y2="270" />
                  <line x1="210" y1="80"  x2="150" y2="340" />
                  <line x1="80"  y1="220" x2="300" y2="370" />
                  <line x1="370" y1="140" x2="80"  y2="380" />
                </g>
              </svg>

              {/* Sticker in front of constellation */}
              <img
                src={stickerUrl}
                alt="Abinesh U sticker"
                fetchPriority="high"
                decoding="async"
                className="relative z-10 w-full max-w-[340px] lg:max-w-none h-[105%] lg:h-[120%] w-auto object-contain object-bottom select-none hover:scale-[1.02] transition-transform duration-500 ease-out drop-shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
              />
            </div>

          </div>
        </section>


        {/* COMMUNICATION ARCHITECTURE (INTERACTIVE NETWORK TOPOLOGY) */}
        <section id="channels" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50">
          <div className="flex items-center gap-4 mb-10">
            <span className="mono-meta text-muted-foreground">06.1 / Communication Topology</span>
            <span className="h-px w-20 bg-foreground/15" />
          </div>

          <div className="relative border border-hairline/80 bg-background/30 backdrop-blur-[2px] rounded p-6 md:p-10 overflow-hidden select-none">
            <div className="absolute inset-0 dot-bg opacity-[0.03] pointer-events-none" />
            
            <div className="flex flex-col items-center">
              {/* Top User Node */}
              <div className="relative z-10 p-4 border border-foreground/20 bg-background rounded-sm text-center min-w-[12rem] hover:border-foreground/45 transition-colors">
                <div className="mono-caps text-foreground/40 text-[8px] mb-1">USER_NODE / SOURCE</div>
                <div className="text-sm font-semibold tracking-tight text-foreground">Abinesh U</div>
                <div className="font-mono text-[9px] text-muted-foreground mt-0.5">AI ENGINEER</div>
              </div>
              
              <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                {/* Responsive SVG Connector */}
                <div className="relative w-full h-16 my-2">
                  {/* Desktop horizontal branching spine */}
                  <svg className="hidden md:block w-full h-full text-foreground/20 dark:text-foreground/10" viewBox="0 0 600 64" fill="none" preserveAspectRatio="none">
                    <defs>
                      <style>{`
                        @keyframes flow-dash {
                          from { stroke-dashoffset: 20; }
                          to { stroke-dashoffset: 0; }
                        }
                        .connector-flow {
                          stroke-dasharray: 4 4;
                          animation: flow-dash 3s linear infinite;
                        }
                      `}</style>
                    </defs>
                    <line x1="300" y1="0" x2="300" y2="20" stroke="currentColor" strokeWidth="1" />
                    <line x1="100" y1="20" x2="500" y2="20" stroke="currentColor" strokeWidth="1" />
                    
                    <line x1="100" y1="20" x2="100" y2="64" stroke="currentColor" strokeWidth="1" />
                    <line x1="300" y1="20" x2="300" y2="64" stroke="currentColor" strokeWidth="1" />
                    <line x1="500" y1="20" x2="500" y2="64" stroke="currentColor" strokeWidth="1" />

                    <path d="M 300 0 L 300 20 L 100 20 L 100 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                    <path d="M 300 0 L 300 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                    <path d="M 300 0 L 300 20 L 500 20 L 500 64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="connector-flow" />
                  </svg>
                  {/* Mobile vertical line */}
                  <div className="md:hidden w-px h-16 bg-foreground/20 mx-auto" />
                </div>

                {/* Target Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-6 md:gap-y-0 w-full mt-4 md:mt-0">
                  {communicationNodes.map((node, index) => (
                    <div key={node.port} className="flex flex-col px-3 reveal-trigger" style={{ transitionDelay: `${index * 150}ms` }}>
                      {index > 0 && (
                        <div className="md:hidden w-px h-6 bg-foreground/15 mx-auto" />
                      )}
                      <a
                        href={node.href}
                        target={node.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className={`relative border border-foreground/10 ${node.brandBorder} bg-background/50 hover:bg-secondary/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] p-5 rounded transition-all duration-300 ease-expo group cursor-pointer`}
                        onClick={(e) => {
                          if (node.port === "01") {
                            e.preventDefault();
                            window.location.href = "mailto:" + atob("YWJpbmVzaC5haS5tbEBnbWFpbC5jb20=");
                          } else if (typeof window !== "undefined" && window.innerWidth < 768) {
                            if (activeCard !== node.port) {
                              e.preventDefault();
                              setActiveCard(node.port);
                            }
                          }
                        }}
                        onTouchStart={(e) => {
                          if (node.port === "01") {
                            e.preventDefault();
                            window.location.href = "mailto:" + atob("YWJpbmVzaC5haS5tbEBnbWFpbC5jb20=");
                          } else if (typeof window !== "undefined" && window.innerWidth < 768) {
                            if (activeCard !== node.port) {
                              e.preventDefault();
                              setActiveCard(node.port);
                            }
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-[9px] text-foreground/45 font-semibold">PORT / ch_{node.port}</span>
                          <span className="flex items-center gap-1.5 font-mono text-[9px] text-foreground/40 font-semibold">
                            <span className={`status-indicator h-1.5 w-1.5 rounded-full ${node.statusBg}`} />
                            {node.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <node.icon className={`w-4 h-4 text-foreground/50 ${node.accentColor} transition-colors stroke-[1.5]`} />
                          <span className={`font-semibold tracking-tight text-sm text-foreground/75 ${node.accentColor} transition-colors`}>
                            {node.label}
                          </span>
                        </div>

                        <div className="mt-2 font-mono text-xs text-foreground/60 truncate">
                          {node.value}
                        </div>

                        {/* Interactive Slide-down Metadata Card */}
                        <div className={`mt-4 pt-3 border-t border-foreground/5 space-y-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 group-focus-within:opacity-100 group-focus-within:max-h-40 transition-all duration-500 ease-in-out ${activeCard === node.port ? "opacity-100 max-h-40" : ""}`}>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">PROTOCOL</span>
                            <span className="text-foreground/80">{node.protocol}</span>
                          </div>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">PURPOSE</span>
                            <span className="text-foreground/80">{node.purpose}</span>
                          </div>
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-foreground/40">LATENCY</span>
                            <span className="text-foreground/80">{node.latency}</span>
                          </div>
                          <div className={`text-right font-mono text-[9px] font-bold ${node.accentColor} pt-1`}>
                            {node.action}
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KNOWLEDGE NETWORK ECOSYSTEM & COLLABORATION PROTOCOL */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50 grid lg:grid-cols-12 gap-12 reveal-trigger">
          {/* R3. Knowledge Network Connected Ecosystem (Left Column) */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="mono-meta text-muted-foreground">06.2 / Knowledge Ecosystem</span>
              <span className="h-px w-20 bg-foreground/15" />
            </div>

            <div className="relative border border-hairline/80 bg-background/30 backdrop-blur-[2px] rounded p-6 md:p-8 overflow-hidden select-none">
              <div className="absolute inset-0 dot-bg opacity-[0.03] pointer-events-none" />
              
              {/* Architectural Mesh Vectors in Background */}
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                <svg className="w-full h-full text-foreground/10" viewBox="0 0 600 300" fill="none" preserveAspectRatio="none">
                  <line x1="80" y1="150" x2="520" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="150" y1="50" x2="150" y2="250" stroke="currentColor" strokeWidth="1" />
                  <line x1="300" y1="50" x2="300" y2="250" stroke="currentColor" strokeWidth="1" />
                  <line x1="450" y1="50" x2="450" y2="250" stroke="currentColor" strokeWidth="1" />
                  
                  <circle cx="150" cy="150" r="3.5" fill="currentColor" />
                  <circle cx="300" cy="150" r="3.5" fill="currentColor" />
                  <circle cx="450" cy="150" r="3.5" fill="currentColor" />
                </svg>
              </div>

              {/* Ecosystem Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                {ecosystemPlatforms.map((plat, i) => (
                  <a
                    key={plat.name}
                    href={plat.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col justify-between border border-foreground/10 hover:border-foreground/25 hover:bg-secondary/40 hover:-translate-y-0.5 transition-all duration-300 ease-expo p-4 rounded min-h-[6.5rem] cursor-pointer reveal-trigger"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[8px] text-foreground/45 uppercase tracking-wider font-semibold">{plat.type}</span>
                      <plat.icon className="w-3.5 h-3.5 text-foreground/50 group-hover:text-foreground transition-colors stroke-[1.5]" />
                    </div>
                    <span className="font-semibold text-xs text-foreground/75 group-hover:text-foreground transition-colors">
                      {plat.name}
                    </span>
                    {/* Hover Platform Metadata */}
                    <div className="mt-3 pt-2 border-t border-foreground/5 flex justify-between font-mono text-[8px] text-foreground/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{plat.handle}</span>
                      <span className="flex items-center gap-1.5 text-[7px] text-emerald-500 font-bold">
                        <span className={`status-indicator h-1 w-1 rounded-full ${getStatusColorClass(plat.status)}`} />
                        {plat.status}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* R4. Terminal Console Simulator (Right Column) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="mono-meta text-muted-foreground">06.3 / Terminal Console</span>
              <span className="h-px w-20 bg-foreground/15" />
            </div>

            <TerminalConsoleWidget />
          </div>
        </section>

        {/* R5. SYSTEM STATUS DASHBOARD */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t hairline bg-background/50">
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-meta text-muted-foreground">06.4 / System Diagnostics</span>
            <span className="h-px w-20 bg-foreground/15" />
          </div>

          <div className="border border-hairline bg-background/40 backdrop-blur-[2px] p-6 rounded relative overflow-hidden group hover:border-foreground/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-foreground/5">
              <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-foreground/35 select-none">SYSTEM_TELEMETRY_06</span>
              <span className="w-1.5 h-1.5 border border-foreground/20 bg-background group-hover:bg-foreground/45 transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
              {systemStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <span className="text-foreground/40 uppercase tracking-wider block text-[8px] font-bold select-none">{stat.label}</span>
                  <span className="block text-xs font-semibold text-foreground/80 tracking-tight">{stat.value}</span>
                  <span className="block text-[7px] text-foreground/30 select-none">{stat.code}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
