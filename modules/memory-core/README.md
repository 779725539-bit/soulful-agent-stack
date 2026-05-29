# Memory Core

Memory Core keeps memory structured, scoped, and reviewable.

It must work with subject grounding. Do not store people, projects, products, companies, places, or relationship facts when the entity is not anchored. This matters especially when user input comes from speech-to-text, where homophones and near-sound substitutions can corrupt names.

Recommended layers:

- hot memory: small stable prompt-facing memory
- warm memory: curated project and user knowledge
- cold memory: raw transcripts and evidence
- state memory: extraction candidates and maintenance reports
- alias/homophone notes: confirmed alternate spellings, pronunciations, and transcription failure patterns for important people and entities

See `prototypes/daemon-memory` for a transparent V0 implementation.
