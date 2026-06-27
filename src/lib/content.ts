export const systems = [
  {
    slug: "multi-agent-systems",
    index: "SYS-01",
    title: "Multi-Agent Systems",
    description:
      "Coordinating specialised agents through orchestrators, planners and shared state. Patterns for delegation, conflict resolution and handoffs.",
    entries: 8,
  },
  {
    slug: "agent-memory",
    index: "SYS-02",
    title: "Agent Memory Systems",
    description:
      "Short-term working memory, episodic recall, vector-based semantic memory and long-horizon context compression strategies.",
    entries: 6,
  },
  {
    slug: "rag-architectures",
    index: "SYS-03",
    title: "RAG Architectures",
    description:
      "From naive retrieval to hybrid, agentic and graph RAG. Choosing the right retrieval substrate for your domain.",
    entries: 7,
  },
  {
    slug: "mcp-architectures",
    index: "SYS-04",
    title: "MCP Architectures",
    description:
      "Model Context Protocol patterns for tool servers, resource exposure and cross-process agent capability sharing.",
    entries: 4,
  },
  {
    slug: "ai-evaluation",
    index: "SYS-05",
    title: "AI Evaluation Systems",
    description:
      "Offline and online evaluation pipelines, LLM-as-judge designs, regression suites, traces and continuous quality measurement.",
    entries: 5,
  },
  {
    slug: "production-patterns",
    index: "SYS-06",
    title: "Production AI Patterns",
    description:
      "Reliability, cost control, observability, guardrails, fallbacks and the operational shape of AI systems in production.",
    entries: 9,
  },
];

export const projects = [
  {
    slug: "agent-orchestrator",
    index: "PRJ-01",
    title: "Distributed Agent Orchestrator",
    year: "2025",
    summary:
      "A planner-executor orchestration layer routing tasks across 12 specialised agents with shared episodic memory.",
    problem:
      "Single-agent loops collapsed under multi-domain tasks — finance, search and code synthesis kept blending context.",
    architecture:
      "Planner agent decomposes intents, an orchestrator dispatches to domain agents, results flow through a verification agent before a synthesiser composes the final response.",
    tradeoffs:
      "Latency increased ~1.4× over a single agent, but task success on cross-domain benchmarks improved from 41% to 78%.",
    results:
      "78% task success · 3.2× tool-use accuracy · 60% lower hallucination rate on factual queries.",
    lessons:
      "Explicit handoff contracts beat shared scratchpads. Memory belongs to the orchestrator, not to individual agents.",
  },
  {
    slug: "contextual-rag",
    index: "PRJ-02",
    title: "Contextual RAG for Long Documents",
    year: "2025",
    summary:
      "Hybrid retrieval pipeline over 200k+ regulatory documents using context-prefixed chunks and a re-ranker.",
    problem:
      "Top-k semantic search returned topically-similar but contextually-wrong chunks for legal queries.",
    architecture:
      "Documents are chunked, then each chunk is rewritten with a short LLM-generated context prefix. A hybrid BM25 + dense retriever feeds a cross-encoder re-ranker.",
    tradeoffs:
      "Ingestion cost rose 3× from context generation. Retrieval precision@10 improved from 0.52 to 0.86.",
    results:
      "+34 pts precision · 2.1× faster review time · 0 hallucinated citations across the eval set.",
    lessons: "Context is cheaper to add at ingest than to reconstruct at query time.",
  },
  {
    slug: "eval-harness",
    index: "PRJ-03",
    title: "Continuous AI Evaluation Harness",
    year: "2024",
    summary:
      "End-to-end evaluation pipeline running prompt regressions, LLM-as-judge scoring and trace-level diffs on every deploy.",
    problem:
      "Silent regressions were shipping with every prompt tweak. Manual spot-checks missed entire failure modes.",
    architecture:
      "Golden dataset → multi-judge evaluation → trace diffing → automated PR comments with score deltas and failing traces.",
    tradeoffs:
      "Judges introduced variance; we addressed this with ensembled prompts and pairwise scoring instead of absolute ratings.",
    results: "Caught 14 regressions in the first quarter · cut prompt-change review time by 70%.",
    lessons:
      "Evaluation is product engineering, not QA. Treat the eval harness as a first-class system.",
  },
];

export const articles = [
  {
    slug: "the-shape-of-agentic-systems",
    index: "ART-08",
    title: "The Shape of Agentic Systems",
    date: "Jun 2026",
    readTime: "12 min",
    category: "Architecture",
    excerpt:
      "Most agent failures are not model failures — they are shape failures. A taxonomy of the loops, hierarchies and graphs that actually work in production.",
  },
  {
    slug: "memory-is-the-system",
    index: "ART-07",
    title: "Memory Is the System",
    date: "May 2026",
    readTime: "9 min",
    category: "Memory",
    excerpt:
      "Agent capability is mostly a function of memory design. A breakdown of working, episodic, semantic and procedural memory in practice.",
  },
  {
    slug: "rag-is-a-retrieval-problem",
    index: "ART-06",
    title: "RAG Is a Retrieval Problem, Not a Generation Problem",
    date: "Apr 2026",
    readTime: "7 min",
    category: "RAG",
    excerpt:
      "Why most RAG systems plateau, and the retrieval-side investments that actually move the quality curve.",
  },
  {
    slug: "evals-as-product-engineering",
    index: "ART-05",
    title: "Evals as Product Engineering",
    date: "Mar 2026",
    readTime: "10 min",
    category: "Evaluation",
    excerpt:
      "Treating evaluation as a first-class system — datasets, judges, traces, regressions and the discipline of continuous quality.",
  },
];
