# Architecture

Soulful Agent Stack uses layered modules. Users can adopt one module or combine the whole stack.

```text
Identity Core
  -> Relationship Protocol
  -> Alive Feeling
  -> Subject Grounding
  -> Memory Core
  -> Independent Life
  -> Embodiment
  -> Evaluation
```

## Identity Core

Defines who the agent is:

- name and self-description
- temperament
- communication style
- preferences
- boundaries
- long-term continuity rules

## Relationship Protocol

Defines how the agent relates to the user:

- proactive limits
- consent and delegated autonomy
- disagreement rules
- refusal rules
- interruption rules
- energy matching

## Alive Feeling

Defines how the agent appears in the relationship:

- short proactive messages
- controlled variation
- non-customer-service tone
- precise observation
- graceful silence
- topic continuation

## Subject Grounding

Defines how the agent anchors people, projects, products, companies, places, and other entities before continuing.

It is especially important when users type quickly or use speech-to-text:

- homophones can replace names
- near-sounds can corrupt project or product names
- input methods can choose the wrong entity
- a sentence can sound fluent while the subject is wrong

The agent should ignore harmless typos when the subject is clear, but stop and ask when the subject is not anchored.

## Memory Core

Separates memory into layers:

- hot memory: stable prompt-facing profile
- warm memory: curated project/user knowledge
- cold memory: raw transcripts and evidence
- state memory: extraction candidates and maintenance reports
- alias/homophone notes: confirmed spelling, nickname, pronunciation, and transcription-error patterns

## Independent Life

Defines what the agent does outside direct user requests:

- wake cycles
- curiosity loops
- reading and exploration
- private reflection
- internal journal
- share-or-stay-silent decisions

## Embodiment

Optional surfaces:

- chat
- CLI
- desktop
- browser
- phone or tablet
- small hardware device
- voice and visual mood

## Evaluation

Evaluates not only task success, but also:

- naturalness
- interruption cost
- consistency
- boundary respect
- memory usefulness
- subject grounding accuracy
- independent-life depth
