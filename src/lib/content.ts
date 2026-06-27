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
    slug: "hermes",
    index: "PRJ-01",
    title: "Hermes",
    subtitle: "Real-Time Voice Intelligence Platform",
    repo: "Hermes_AI",
    year: "2026",
    abstract:
      "A low-latency orchestration platform that transforms live speech into reliable AI conversations through streaming speech recognition, agentic reasoning, retrieval, and neural speech synthesis.",
    problem:
      "Building conversational voice AI requires far more than speech recognition. Audio streaming, reasoning, retrieval, tool execution and speech synthesis must all operate together under strict latency constraints while maintaining conversational context.",
    pipeline: [
      "Microphone",
      "Streaming Speech Recognition",
      "Conversation Memory",
      "Planner Agent",
      "Tool Execution + RAG",
      "LLM Reasoning",
      "Streaming Speech Synthesis",
      "Speaker",
    ],
    tradeoffs:
      "Prioritized modularity and extensibility over a tightly coupled pipeline. Independent services introduce orchestration overhead but enable each subsystem to evolve without affecting the entire platform.",
    capabilities: [
      "Streaming Speech Recognition",
      "Agent Orchestration",
      "Conversation Memory",
      "Retrieval-Augmented Generation",
      "Streaming Text-to-Speech",
      "Event-Driven Processing",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Redis", "Qdrant", "OpenAI", "Whisper", "Docker"],
    lessons:
      "Real-time conversational AI is fundamentally an orchestration challenge. Keeping speech, reasoning, retrieval and synthesis loosely coupled produces systems that are easier to evolve, observe and scale.",
  },
  {
    slug: "athena",
    index: "PRJ-02",
    title: "Athena",
    subtitle: "Enterprise Retrieval Intelligence Platform",
    repo: "athena-ai",
    year: "2026",
    abstract:
      "A production-oriented retrieval platform designed for trustworthy enterprise knowledge access through optimized search, reranking, vector search and permission-aware retrieval.",
    problem:
      "Enterprise search requires more than semantic similarity. Knowledge systems must retrieve accurate information while respecting permissions, reducing hallucinations and scaling across continuously growing document collections.",
    pipeline: [
      "Documents",
      "Chunking Pipeline",
      "Embedding Generation",
      "Vector Database",
      "Hybrid Retrieval",
      "Cross-Encoder Reranking",
      "Access Control",
      "LLM Response",
    ],
    tradeoffs:
      "Hybrid retrieval introduces additional infrastructure complexity but significantly improves retrieval quality compared with embedding-only search.",
    capabilities: [
      "Hybrid Retrieval",
      "Query Optimization",
      "Cross-Encoder Reranking",
      "Vector Search",
      "Access-Aware Retrieval",
      "Scalable Knowledge Architecture",
    ],
    stack: ["Python", "FastAPI", "Qdrant", "PostgreSQL", "Docker", "OpenAI", "Redis"],
    lessons:
      "Retrieval quality depends far more on disciplined retrieval pipelines than increasingly larger language models. Well-curated context consistently produces better reasoning.",
  },
  {
    slug: "aegis",
    index: "PRJ-03",
    title: "Aegis",
    subtitle: "Trust & Decision Intelligence System",
    repo: "AegisAI",
    year: "2026",
    abstract:
      "An enterprise AI governance platform focused on explainable reasoning, calibrated confidence estimation and policy-aware decision validation.",
    problem:
      "High-impact AI systems require transparent reasoning before decisions can be trusted. Predictions alone are insufficient without explanation, confidence estimation and governance.",
    pipeline: [
      "Input",
      "Evidence Collection",
      "Reasoning Engine",
      "Confidence Calibration",
      "Policy Validation",
      "Decision Report",
      "Human Review",
    ],
    tradeoffs:
      "Governance layers increase inference latency but substantially improve transparency, auditability and human trust.",
    capabilities: [
      "Explainable Reasoning",
      "Confidence Calibration",
      "Decision Governance",
      "Risk Assessment",
      "Human-in-the-Loop Review",
      "Audit Logging",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "OpenAI", "LangGraph"],
    lessons:
      "Enterprise AI succeeds when humans understand why a recommendation was made rather than simply receiving a prediction. Trust is designed through architecture, not generated by models.",
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
