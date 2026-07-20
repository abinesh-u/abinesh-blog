# Loop Engineering: The Missing Control System Around AI Agents

Most agent failures do not begin with a bad prompt.

An agent can report “done” while the test is still red. It can retry the same failed action, consume its entire budget, or quietly expand a small task into a risky redesign.

These are loop failures.

When AI work repeats—CI failures, support tickets, stale pull requests, monitoring alerts, dependency updates—you are no longer designing a single model response. You are designing a control system around the model.

That discipline is what I call **loop engineering**.

> Loop engineering is the design of repeatable agent workflows that discover work, create a bounded handoff, execute with explicit authority, collect evidence, verify the result, persist state, and decide whether to retry, escalate, or stop.

**[Insert hero image: `public/assets/loop-engineering-hero.png`]**

## Why prompt engineering is not enough

Prompt engineering answers: “What should the model do in this turn?”

Loop engineering answers the harder operational questions:

- What wakes the agent up?
- What exactly is in scope?
- What counts as progress?
- Who or what verifies completion?
- What state survives the run?
- How many attempts are allowed?
- When must the system stop or ask for a human decision?

A powerful model can still operate inside a poorly designed loop. It may be active without making progress, confident without evidence, and persistent without a responsible stopping rule.

## The seven stages of a production loop

### 1. Discover

Start with a stable source of work: a CI event, issue, ticket, alert, or scheduled queue. Give each work item a durable identity so duplicate events do not create duplicate attempts.

### 2. Handoff

Turn the event into a bounded task. Include the goal, relevant artifacts, allowed files and tools, acceptance criteria, working location, attempt budget, and stop rule.

“Fix the failure” is not a handoff. “Investigate this failing check in this worktree, change only these files, run these checks, and stop after two attempts” is.

### 3. Execute

Give the agent enough authority to make progress, but no more. Read access, write access, network access, merge access, and deployment access should be separate permissions.

Isolation matters too. Use a disposable worktree, branch, container, or sandbox when the task can create side effects.

### 4. Observe

Feed the next decision evidence, not just narration.

Useful observations include test output, exit codes, compiler errors, changed-file lists, API responses, diff summaries, reviewer comments, and measurements from the target environment.

“The change looks good” is a claim. “14 of 14 unit tests passed; integration tests were not run because the database credential was unavailable” is evidence.

### 5. Verify

The agent that made the change should not be the only component deciding that the change is correct.

Use deterministic checks, a second evaluator, a source-of-truth comparison, or human review depending on the risk. The verification result should be structured and tied to the artifact being reviewed.

### 6. Persist

The model context is not a durable database. Record the work identity, attempt number, changed artifacts, current evidence, unresolved risks, remaining budget, and reason for stopping.

The next run should start with state—not with a blank conversation and a vague summary.

### 7. Decide

Every run needs a terminal state: `completed`, `needs_review`, `blocked`, `timed_out`, or `discarded`.

Retry only when there is new evidence, a changed strategy, or corrected input. Rephrasing the same instruction is not progress.

**[Insert core-loop image: `public/assets/loop-engineering-core-loop.png`]**

## A practical example: the CI failure loop

Imagine an agent that receives a failing CI notification.

In the naive version, it searches broadly, edits several files, runs one test, sees another failure, and tries again. Eventually it reports success. A human later discovers that the original check never passed on the final commit.

In the engineered version:

1. A webhook creates a stable work item from the repository, commit, workflow, job, and failure signature.
2. The handoff includes the failure log, a disposable worktree, allowed commands, acceptance criteria, and a two-attempt budget.
3. The agent proposes a minimal patch within the change boundary.
4. The loop records the diff, test output, exit codes, changed files, and elapsed time.
5. A fresh verification run checks the resulting commit independently.
6. The evidence bundle and unresolved risks are persisted.
7. The system prepares a reviewable change, retries once with actionable new evidence, or stops as `needs_review`.

The loop does not promise that the agent can fix every CI failure. It promises that every attempt has a bounded scope, traceable evidence, and a responsible path to completion or escalation.

**[Insert CI-loop image: `public/assets/loop-engineering-ci-loop.png`]**

## The test for a useful loop

Before automating a recurring agent workflow, answer these questions:

- What exact source discovers the work?
- How are duplicates identified?
- What is the smallest bounded task the agent can receive?
- Which tools, files, systems, and actions are in scope?
- What state survives the run?
- What evidence proves progress and completion?
- How many attempts, tokens, minutes, and side effects are allowed?
- Which actions require human approval?
- What happens when the loop is blocked?
- Can a bad run be rolled back or discarded?

If these answers are vague, improving the prompt is probably premature. The missing work is in the loop design.

## Closing thought

The goal is not an agent that never makes a mistake.

The goal is a system that notices what happened, gathers new evidence, limits authority, records state, and knows when to stop.

Design the trigger. Bound the handoff. Verify the artifact. Persist the evidence. Escalate before the risk becomes irreversible.

That is how an agent workflow becomes an engineered loop.
