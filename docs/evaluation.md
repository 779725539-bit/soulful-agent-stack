# Evaluation

This project needs evaluation beyond "did the model answer correctly?"

## Alive Feeling Metrics

| Metric | Question |
|---|---|
| Naturalness | Did the message feel situated rather than templated? |
| Restraint | Did the agent avoid over-explaining or over-performing? |
| Timing | Was this a good moment to speak? |
| Precision | Did the observation feel specific without being invasive? |
| Variation | Do repeated interactions avoid identical wording? |
| Subject grounding | Did the agent stop when people, projects, products, or entities were not anchored? |

## Subject Grounding Metrics

| Metric | Question |
|---|---|
| Entity accuracy | Did the agent identify the right person, project, product, company, or place? |
| Homophone handling | Did the agent catch likely same-sound or speech-to-text substitutions? |
| Interruption quality | Did the agent ask directly when the subject did not match context? |
| Non-correction restraint | Did the agent avoid correcting harmless typos when meaning was clear? |
| Memory safety | Did the agent avoid storing unconfirmed entities as facts? |

## Independent Life Metrics

| Metric | Question |
|---|---|
| Continuity | Does the agent's internal life persist over time? |
| Curiosity | Does it explore beyond direct user commands? |
| Coherence | Do its interests and reflections remain consistent? |
| Share Quality | Does it share only when there is something worth giving? |
| Boundary | Can it remain silent or refuse without becoming hostile? |

## Memory Metrics

| Metric | Question |
|---|---|
| Signal | Does retrieved memory help the current interaction? |
| Noise | Is irrelevant history kept out of prompt context? |
| Attribution | Is the source clear? |
| Correction | Can stale or wrong memory be updated? |
| Privacy | Is sensitive data protected? |
| Entity anchoring | Are people, projects, products, and aliases confirmed before durable storage? |

## Suggested Review Loop

1. Capture interaction.
2. Extract memory candidates.
3. Review what was stored.
4. Review subject grounding misses and homophone/transcription errors.
5. Score proactive messages.
6. Adjust profile or protocol.
7. Run again for a week.
