![Loop Engineering — a production AI control loop](/assets/blog/loop-engineering/loop-engineering-hero.png)

An agent can report “done” while the test is still red. It can retry the same failed action, consume its budget, and leave behind no durable explanation of what happened. In production, those are loop failures—not merely prompt failures.

The moment agent work repeats—CI failures, support tickets, stale pull requests, or monitoring alerts—you are no longer designing a single response. You are designing a control system.

## 1. The Unit of Design Is the Loop

Most agent systems are still designed one prompt at a time. An engineer writes an instruction, starts an agent, reads the result, notices what went wrong, and writes the next instruction. That workflow is useful while exploring a problem. It does not scale when the same class of work arrives every day.

The next step is not simply a larger prompt or a more autonomous model. It is to design the loop around the model.

**Loop engineering** is the practice of designing repeatable agent workflows that discover work, hand an agent a bounded task, observe the result, verify it with evidence, persist what happened, and decide whether to continue, stop, or escalate.

The model is an important component of the loop, but it is not the whole system. A production loop also needs a trigger, a task boundary, a state model, a feedback channel, an independent completion check, a budget, and an explicit terminal state.

This is an emerging term rather than a settled industry standard. The useful idea behind it is straightforward: stop treating every agent run as a conversation that needs to be manually continued, and start treating repeated agent work as an engineered operating process.

## 2. Loop Engineering Is Not Just “Put the Agent in a While Loop”

An agent already has an internal action loop:

```text
read context → choose an action → call a tool → observe the result → repeat
```

Loop engineering operates one level above that cycle. It decides when the agent should wake up, what work it should receive, what evidence counts as progress, where the result is recorded, and what happens when the work cannot be completed.

| Layer               | Primary question                                         | Typical output                                              |
| ------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Prompt engineering  | What should the model do in this turn?                   | An instruction                                              |
| Context engineering | What should the model see?                               | A focused context package                                   |
| Harness engineering | How should one run execute safely?                       | Tools, permissions, checks, and recovery                    |
| Loop engineering    | How should repeated work move toward a verified outcome? | Triggers, state, verification, budgets, and terminal states |

The layers are complementary. A well-designed loop still needs good prompts and useful context. A harness still needs to constrain each run. Loop engineering adds the outer control system that makes the work repeatable.

![Prompt, context, harness, and loop engineering layers](/assets/blog/loop-engineering/loop-engineering-layers.svg)

The distinction matters because more turns do not automatically mean more progress. An agent can repeat the same action, accumulate irrelevant context, consume its budget, and still report success without producing a verified result.

## 3. The Anatomy of a Production Loop

A reliable loop is a small state machine, even when the implementation uses an agent framework. One useful model is:

```text
Discover → Handoff → Execute → Observe → Verify
    ↑                                  ↓
    └──── Persist → Retry / Escalate / Stop
```

![The loop engineering core loop](/assets/blog/loop-engineering/loop-engineering-core-loop.svg?v=b758ab1)

### 3.0 At a glance: the seven stages

Use this map before the detailed sections:

- **Discover:** identify new, in-scope work and suppress duplicates.
- **Handoff:** define the goal, evidence, permissions, acceptance criteria, and stop rule.
- **Execute:** let the agent act inside an explicit boundary.
- **Observe:** capture tool-produced evidence, not just the agent’s narration.
- **Verify:** check the resulting artifact independently.
- **Persist:** record the attempt, evidence, decisions, and unresolved risks.
- **Decide:** retry only with new evidence; otherwise stop, escalate, or close.

### 3.1 Discovery: What work should happen next?

The loop needs a defined source of work. This might be a CI failure, a new issue, a support ticket, a stale pull request, a dependency update, a monitoring alert, or a scheduled review queue.

Discovery should be narrow and idempotent. A CI sweeper should not create a new task every time it sees the same unchanged failure. It needs a stable identity for the work item, such as a repository, branch, check name, and failure signature.

The discovery step should answer:

1. Is this new work or a duplicate?
2. Is it within the loop’s scope?
3. Is the required input available?
4. Is the work safe to start automatically?

### 3.2 Handoff: What exactly is the agent allowed to do?

The handoff converts an event into a bounded task. It should include the goal, relevant artifacts, constraints, acceptance criteria, working location, and stop rule.

For a coding task, a useful handoff might contain:

- the issue and its source links;
- the failing test or trace;
- the files and commands that are in scope;
- the expected behavior;
- the checks that must pass;
- the maximum number of attempts; and
- the point at which the agent must return control to a human.

Without this contract, “fix the failure” becomes permission to redesign the system. Good handoffs reduce scope before the model starts reasoning.

### 3.3 Execute: Give the agent enough authority, but no more

The execution step may involve one agent, several specialized agents, or a fixed workflow around an agent. The choice should follow the task rather than fashion.

For a well-defined task, a simple sequence of model calls and programmatic checks may be easier to inspect than a fully autonomous agent. For an open-ended task, the agent may need to choose tools and determine the next step from environmental feedback. In both cases, permissions should be explicit.

Isolation is part of the loop contract. A coding run might use a disposable worktree, a branch, a container, or a sandbox. A support loop might receive read access to tickets but require approval before sending a customer-facing message. The loop should make the boundary visible rather than relying on the model to respect an instruction not to cross it.

### 3.4 Observe: Feed back evidence, not just narration

The loop can improve only when the next step receives useful information about the previous one.

Useful observations include test output, compiler errors, changed-file lists, API responses, diff summaries, policy decisions, reviewer comments, and measurements from the target environment.

“The change looks good” is not an observation. “14 of 14 unit tests passed; the integration suite was not run because the database credential was unavailable” is an observation that can drive a responsible next decision.

The loop should distinguish between facts produced by tools and claims produced by the agent. An agent’s statement that it completed a task is a proposal for the next state, not proof that the state is true.

### 3.5 Verify: Use an independent completion check

Verification is the point where many agent loops become unreliable. The agent that made a change should not be the only component deciding that the change is correct.

Verification can be deterministic or judgment-based:

- unit, integration, or end-to-end tests;
- type checking, linting, or schema validation;
- a comparison against a source of truth;
- a second evaluator with a separate rubric;
- a human review; or
- a combination of these checks.

The right verifier depends on the task. Tests can show that known cases pass, but they do not establish that the implementation meets every product requirement. A second model can identify issues that the first model missed, but it remains a fallible judge. High-impact actions need stronger evidence and an explicit human gate.

The verification result should be structured. Prefer:

```json
{
  "status": "blocked",
  "checks": [
    { "name": "unit_tests", "status": "passed" },
    { "name": "integration_tests", "status": "not_run", "reason": "missing database" }
  ],
  "next_action": "escalate"
}
```

over a free-form paragraph that the next model must interpret.

### 3.6 Persist: Make the next run start with state

The model context is not a durable database. A loop needs an external record of what it discovered, attempted, changed, verified, and deferred.

State might live in a database row, a queue, a pull request, an issue comment, a run ledger, or a small repository file. The storage mechanism matters less than the contract. The next run should be able to answer:

- What is the stable identity of this work?
- Which attempt is this?
- What changed since the previous attempt?
- Which checks have current evidence?
- What is the remaining budget?
- Why did the last run stop?

Persisting state also prevents duplicate work. If two workers wake up for the same issue, a lock or claim record should decide which one owns the attempt.

### 3.7 Stop, retry, or escalate: Define terminal states

“Keep trying until it works” is not a stopping rule. A loop needs named terminal states such as `completed`, `needs_review`, `blocked`, `timed_out`, and `discarded`.

Retries should be bounded by more than a counter. A retry is useful only when the loop has new evidence, a changed strategy, or a corrected input. If the same action produces the same failure, the loop should stop and surface the failure rather than rephrasing the same request.

Human intervention belongs in the design from the beginning. Exceeding a failure threshold, reaching a high-risk action, encountering ambiguous requirements, or approaching a budget limit are all legitimate escalation triggers.

## 4. A Concrete Example: The CI Failure Loop

Consider a loop that helps maintain a software repository.

### The naive version

An agent receives a failing CI notification and is told to fix it. It searches broadly, edits several files, runs one test, sees a failure, and tries again. After a few turns it reports that the issue is fixed. A human discovers that the original check never passed on the final commit.

The failure is not necessarily the model’s lack of intelligence. The loop has no stable work identity, no change boundary, no independent completion state, and no proof that the final artifact was tested.

![An engineered CI failure loop](/assets/blog/loop-engineering/loop-engineering-ci-loop.svg)

### The engineered version

1. **Discover:** A webhook records the repository, commit, workflow, job, and normalized failure signature. Duplicate events attach to the existing work item.
2. **Handoff:** The agent receives the failure log, the relevant repository state, a disposable worktree, allowed commands, acceptance criteria, and a two-attempt budget.
3. **Execute:** The agent investigates and proposes a minimal patch. It may edit only the files allowed by the task contract.
4. **Observe:** The loop records the diff, test output, exit codes, changed files, and elapsed time.
5. **Verify:** A fresh test run executes against the resulting commit. Static checks and repository policy checks run independently of the agent’s summary.
6. **Persist:** The work item stores the commit, evidence bundle, attempt number, and unresolved risks.
7. **Decide:** If the checks pass, the loop prepares a pull request for human review. If they fail with actionable new evidence, one bounded retry may occur. If the budget is exhausted or the failure is ambiguous, the loop stops as `needs_review`.

The loop does not promise that an agent can fix every CI failure. It promises that every attempt has a bounded scope, a traceable result, and a responsible path to completion or escalation.

## 5. Design Principles for Loops That Converge

### Start with a narrow recurring job

The best first loop is usually boring: classify new issues, summarize stale pull requests, group dependency updates, or prepare a diagnostic patch. Narrow scope makes verification and rollback practical.

### Put acceptance criteria outside the agent’s imagination

If success matters, represent it as a check, a schema, a test, a policy decision, or a human decision. Do not make the agent both define and certify its own success.

### Separate progress from activity

More tool calls, longer traces, and more tokens are not progress by themselves. Progress means that the work item moved closer to a verified terminal state.

### Make retries evidence-driven

Every retry should state what new evidence it received and what strategy changed. This makes repeated failure diagnosable and protects the system from infinite self-correction.

### Keep state smaller than history

Persist decisions, artifacts, evidence, and unresolved questions—not every token from every previous run. A loop should remember what affects the next decision, not accumulate an ever-growing transcript.

### Treat authority as a budget

Read access, write access, network access, merge access, and deployment access should be granted separately. A loop can often prepare a change automatically while requiring approval for merge, publish, delete, bill, or deploy actions.

### Measure the loop, not only the model

Useful operational metrics include:

- percentage of work items reaching a verified terminal state;
- false-completion rate;
- first-attempt acceptance rate;
- average attempts and time to completion;
- retry rate by failure category;
- cost per completed work item;
- escalation rate and human review time; and
- duplicate work or conflicting-claim rate.

These metrics reveal whether the problem is the model, the task boundary, the verifier, the trigger, or the state model.

## 6. Common Failure Modes

### The loop has no real trigger

If a person still has to restate the task every time, the system may be an agent session rather than a loop. Manual dispatch is valid, but it should be explicit.

### The loop confuses a claim with evidence

“Done,” “tested,” and “ready to merge” are lifecycle claims. Each should be backed by current evidence tied to the artifact being reviewed.

### The loop retries without changing the information state

Rewording the same instruction does not create progress. Detect repeated observations and terminate or escalate.

### The evaluator shares the generator’s blind spot

A second model with the same context and the same rubric may repeat the first model’s mistake. Add deterministic checks, different perspectives, or human review where the risk justifies it.

### The loop silently expands its scope

An agent that starts with one failing test may decide to rewrite a subsystem. Enforce file, tool, time, and change-size boundaries, and make scope expansion an explicit review decision.

### The loop never reaches a terminal state

Every run should end with a status that another system or human can act on. “Continue” is not a terminal state; it is a transition that needs a reason and a remaining budget.

## 7. The Practical Test

Before automating a recurring agent workflow, answer these questions:

1. What exact source discovers the work?
2. How is duplicate work identified?
3. What is the smallest bounded task an agent can receive?
4. Which files, tools, systems, and actions are in scope?
5. What external state survives the run?
6. What evidence proves progress and completion?
7. How many attempts, tokens, minutes, and side effects are allowed?
8. Which actions require a human decision?
9. What happens when the loop is blocked?
10. Can a bad run be rolled back or discarded?

If these questions do not have concrete answers, improving the prompt is probably premature. The missing work is in the loop design.

## 8. Conclusion

Loop engineering is not the replacement for prompt engineering, context engineering, or harness engineering. It is the discipline that connects them across repeated work.

The goal is not an agent that never makes a mistake. The goal is a system that notices what happened, gathers new evidence, limits its authority, records its state, and knows when to stop.

Design the trigger. Bound the handoff. Verify the artifact. Persist the evidence. Escalate before the risk becomes irreversible.

That is how an agent workflow becomes an engineered loop.

## Further reading

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic’s overview of workflows, agents, evaluator-optimizer loops, environmental feedback, and stopping conditions.
- [A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) — OpenAI’s guide to guardrails, bounded retries, and human intervention.
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview) — Durable execution, persistence, and human-in-the-loop orchestration.
- [What Is Loop Engineering?](https://loopengineering.run/blog/what-is-loop-engineering) — A current practitioner definition of the emerging term and its recurring-loop primitives.
