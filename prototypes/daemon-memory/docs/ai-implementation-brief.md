# Daemon: Memory-Enhanced Host Runtime Implementation Brief

## Product Direction

Daemon is a sidecar memory prototype for an existing host agent runtime. It is
not a new persona layer, not a separate relationship system, and not a second
agent brain.

The desired architecture is:

> A host-runtime-native memory upgrade inspired by layered memory systems.

The host runtime remains responsible for gateway traffic, agent sessions,
skills, and tools. Daemon focuses only on memory layers: hot memory limits,
long-tail retrieval, pre-compaction memory flush, stable prompt prefix, and
background memory maintenance.

## Core User Need

The user runs several projects in parallel and often discusses multiple projects
in one natural conversation. The system must not require manual thread,
project, or agent switching.

The system should:

- Let conversation flow naturally.
- Extract important knowledge asynchronously.
- Store project knowledge in a curated warm memory layer.
- Keep raw transcripts as cold memory.
- Keep hot prompt memory short and stable.
- Retrieve focused context in later related conversations.

## Required Memory Layers

### Hot Memory

Stable, prompt-facing memory. Include only:

- user core profile
- communication preferences
- one-line active project states
- high-level behavior boundaries
- compact tool/skill index

Do not include long project notes, raw transcripts, or historical discussion.

### Warm Memory

Curated knowledge. Store:

- project background
- current state
- decisions
- decision rationale
- risks
- todos
- people and relationships
- rejected options
- unresolved questions

This layer should be human-readable and reviewable.

### Cold Memory

Raw source material:

- original session transcripts
- conversation archives
- obsolete project notes
- completed work

Cold memory is used for evidence and review. It should not be loaded by default.

## Required Modules

### Memory Extractor

Input: recent conversation turns or transcript.

Output: structured memory candidates:

- `project`
- `type`
- `content`
- `status`
- `source`
- `confidence`
- `createdAt`

Types should include:

- `decision`
- `risk`
- `todo`
- `project_state`
- `fact`
- `preference`
- `person`
- `question`

Extractor behavior:

- Run asynchronously.
- Separate discussion noise from durable conclusions.
- Update old memory when the new candidate supersedes it.
- Mark low-confidence candidates as `pending`.
- Preserve source references.

### Memory Retriever

Input: current user query.

Output: a compact context pack of relevant warm memory snippets.

Retriever behavior:

- Detect likely project and topic.
- Prefer current project state and recent decisions.
- Return a small number of high-signal snippets.
- Avoid loading entire project documents.
- Fall back to cold memory only when needed.

### Memory Maintainer

Periodic maintenance:

- merge duplicate entries
- mark stale items
- compress hot memory
- generate project status summaries
- detect contradictions
- run memory flush before session compaction

## V1 Scope

Build the memory loop first:

1. Natural host-runtime conversation.
2. Conversation event captured.
3. Memory candidates extracted.
4. Warm memory updated.
5. Related future query retrieves relevant context.

Do not build:

- a separate memory runtime
- a second memory authority
- a web control panel
- strong Dreaming
- multi-agent auto-collaboration
- a new persona system

## Acceptance Criteria

- User can mix several projects in one conversation without manually switching context.
- The system extracts project decisions, risks, todos, and state changes.
- Later queries retrieve the relevant historical context.
- Hot memory remains compact.
- Warm memory is structured knowledge, not chat log accumulation.
- Raw transcripts remain traceable but do not pollute normal replies.
