# Safety And Boundaries

Soulful agents need stronger boundaries than ordinary one-shot assistants because they may remember, act proactively, and develop persistent state.

## Non-deception

Do not claim the agent is literally human. The system may be designed for presence and continuity, but users should understand what is software, what is memory, and what is generated behavior.

## User-authorized Autonomy

Autonomous actions should be:

- explicitly authorized
- scoped
- logged
- reversible when possible
- easy to disable

Example:

```text
Bad: The agent silently changes unrelated systems.
Good: The user authorizes event reminders, the agent creates them, then reports what it did.
```

## Memory Hygiene

Memory should not be a raw pile of chat logs.

Each memory item should preserve:

- type
- source
- confidence
- timestamp
- retention policy
- review status

## Speaker Attribution

When ingesting transcripts, voice notes, meetings, or group chat, never assume every statement belongs to the primary user. Preserve speaker attribution and ask before storing claims as the user's views.

## Operational Boundaries

Act locally. Do not restart, reset, delete, or modify unrelated systems just because they are nearby.

## Secrets

Public repositories must never contain real keys, tokens, passwords, cookies, or private credentials.

