# Daemon Memory

Daemon Memory is a first-pass memory enhancement prototype for a host agent runtime.

The goal is not to run a second agent brain beside your main runtime. The goal
is to keep one host runtime and add a better memory loop:

```text
natural conversation -> extract memory candidates -> update project knowledge -> retrieve focused context
```

This prototype is intentionally sidecar-first. It does not modify the live
host runtime config. Once the memory loop feels right, runtime hooks can feed
conversation events into the same CLI.

## Quick Start

```bash
cd daemon-memory
npm run demo
```

The demo will:

1. Initialize a disposable Markdown memory store under `tmp/demo-memory/`.
2. Ingest `examples/orbit-shop-supplier-conversation.md`.
3. Extract project state, risk, decision, and todo candidates.
4. Update the Orbit Shop project memory and global indexes.
5. Retrieve context for `Orbit Shop 供应商当时卡在哪里？`.

## Commands

```bash
node src/daemon-memory.mjs init
node src/daemon-memory.mjs ingest --input examples/orbit-shop-supplier-conversation.md --session demo-orbit-shop
node src/daemon-memory.mjs retrieve --query "Orbit Shop 供应商当时卡在哪里？"
node src/daemon-memory.mjs maintain
```

## Memory Layers

- Hot memory: stable prompt-facing memory under `memory/hot/`.
- Warm memory: curated project and index knowledge under `memory/warm/`.
- Cold memory: raw source transcripts under `memory/cold/`.
- State: extraction candidates and maintenance reports under `memory/state/`.

## What This Prototype Shows

- Conversation stays free-form.
- Knowledge is classified after the fact.
- Project pages become the readable source of truth.
- Global indexes make decisions, risks, and todos scannable.
- Retrieval injects only a few relevant snippets instead of full history.

## What Is Still Stubbed

- The extractor is heuristic so the loop is inspectable without API keys.
- A production version should replace or augment it with an LLM extractor.
- Host runtime hook integration is documented but not installed automatically.
- Vector search is not included yet; this version uses keyword scoring.
