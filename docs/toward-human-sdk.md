# Toward Human SDK

Soulful Agent Stack should evolve cautiously from a design framework into a Human SDK: a set of interfaces that help agents understand, remember, and relate to a person responsibly.

The project should not rename itself too early. `Soulful Agent Stack` remains the umbrella. `Human SDK` is the long-term direction.

## Current Position

The current project is strongest as a modular framework:

- identity core
- alive feeling
- subject grounding
- relationship protocol
- relationship archetypes
- lifeform archetypes
- memory core
- independent life
- embodiment
- evaluation

The current executable pieces are:

- copy-paste GitHub Skill prompt
- `agent-living-engineering` skill
- transparent `daemon-memory` prototype
- YAML recipes

## Human SDK Direction

The SDK should answer:

> How can an agent model a human context well enough to interact with memory, boundaries, relationships, projects, and long-term preferences?

This means turning concepts into stable interfaces:

| Layer | SDK Interface |
|---|---|
| Onboarding | collect companionship preference, important people, projects, boundaries |
| Identity | define stable agent traits and allowed variation |
| Relationship | configure archetype mix, initiative, disagreement, refusal |
| Subject Grounding | confirm people, projects, products, homophones, aliases |
| Memory | write/retrieve hot, warm, cold, alias, and evidence memory |
| Independent Life | run wake/explore/reflect/share-or-silent cycles |
| Calibration | schedule day-1, week-1, month-1 and recurring reviews |
| Embodiment | adapt the same agent state to chat, desktop, voice, hardware |

## Stable Route

1. Keep the umbrella project name stable.
2. Research comparable products before expanding scope.
3. Convert one concept at a time into a schema or small package.
4. Keep examples fictional and public-safe.
5. Avoid claiming consciousness; frame the work as interface, memory, relationship, and autonomy design.
6. Build evaluation around real misses: wrong subject, wrong memory, over-eager agreement, interruption cost, and unsafe autonomy.

## Research Targets

Use these as reference systems, not models to copy blindly:

- Second Me: personal AI, memory, representation, user context
- Elys: personal/long-term AI positioning, onboarding, privacy, continuity
- Claude Agent SDK: developer-facing structure, runtime interfaces, examples, documentation style

Research questions:

- How do they onboard a user?
- What do they ask before creating long-term memory?
- How do they represent people, projects, and preferences?
- What do they expose as configuration vs hide as product behavior?
- How do they handle privacy, deletion, and correction?
- What is missing from their approach that Soulful Agent Stack can do better?

## Next Milestones

### M1: Public Framework Clarity

- Tighten README positioning.
- Keep copy-paste prompt obvious.
- Keep `agent-living-engineering` skill current.
- Add examples for subject grounding, scarcity/edge, and calibration.

### M2: Schema Layer

- Create JSON/YAML schemas for:
  - onboarding profile
  - important people map
  - project map
  - subject grounding map
  - memory policy
  - relationship protocol

### M3: Runtime Prototype

- Extend `daemon-memory` or create a new `human-context-runtime` prototype.
- Support ingesting onboarding answers.
- Retrieve people/project/entity context.
- Block unanchored memory writes.

### M4: SDK Package

- Provide a small package that apps can call:
  - `createProfile()`
  - `groundSubject()`
  - `writeMemoryCandidate()`
  - `retrieveHumanContext()`
  - `scheduleCalibration()`
  - `generateAgentConfig()`

### M5: Embodied Reference App

- Build a small desktop or web reference implementation.
- Show how identity, memory, subject grounding, and calibration affect behavior.

