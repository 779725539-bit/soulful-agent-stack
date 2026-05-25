# Host Runtime Integration Notes

This prototype is sidecar-first by design. Do not install it into the live
host runtime gateway until the memory behavior has been reviewed with real
transcripts.

## Recommended Integration Shape

Use the host runtime as the single agent runtime and feed conversation events
into Daemon Memory.

```text
chat gateway -> host runtime -> agent reply
                         -> conversation event -> daemon-memory ingest
```

Daemon Memory should not become a second gateway, second session manager, or
second user-profile authority.

## Event Shape To Feed

The memory sidecar only needs a compact transcript:

```markdown
User: ...
Assistant: ...
User: ...
Assistant: ...
```

For production, prefer a structured event envelope:

```json
{
  "sessionId": "session-id",
  "channel": "chat",
  "accountId": "daemon",
  "turns": [
    { "role": "user", "text": "..." },
    { "role": "assistant", "text": "..." }
  ],
  "createdAt": "2026-05-02T00:00:00.000Z"
}
```

The sidecar can convert this to cold memory and then extract warm memory.

## Safe V1 Hook Points

Start with one of these low-risk paths:

- Manual transcript export -> `daemon-memory ingest`.
- Scheduled job that ingests recent host-runtime session excerpts.
- Host-runtime internal hook after message preprocessing or before reset/compact,
  once hook payload shape is confirmed.

Avoid installing write-heavy hooks before extraction quality is reviewed.

## Retrieval Handoff

Before a future host-runtime reply, call:

```bash
node src/daemon-memory.mjs retrieve --query "<current user message>"
```

The JSON `contextPack` can be injected into the host-runtime prompt as warm memory.
The `answerHint` is only a debug preview; production should pass structured
snippets and source references.

## Production Upgrades

Replace the heuristic extractor with an LLM extractor that returns strict JSON:

- `project`
- `type`
- `content`
- `status`
- `confidence`
- `sourceTurnIds`
- `supersedes`

Then add:

- vector or SQLite FTS retrieval
- conflict detection
- memory review queue
- hot memory summarizer
- pre-compaction memory flush
