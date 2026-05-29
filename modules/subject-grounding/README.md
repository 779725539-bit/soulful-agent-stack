# Subject Grounding

Subject Grounding anchors who or what the user is talking about before the agent continues.

It exists because many interactions are typed quickly or generated through speech-to-text. Names, project titles, company names, product names, and other entities often fail through homophones, near-sounds, input method mistakes, or transcription errors.

Core principle:

```text
Typos can be ignored when meaning is clear. Unanchored subjects must be stopped and confirmed.
```

## When To Interrupt

Ask a direct clarification when:

- a person name is unfamiliar or conflicts with known people
- a project/product/company name does not match the current context
- the sentence is grammatically readable but the subject feels wrong
- a word looks outside the user's normal life or project domain
- a homophone or speech-to-text substitution may have changed the entity
- the agent would write memory, take action, send messages, delete data, or make decisions based on the subject

## How To Ask

Be clear and decisive. Do not use vague "I will proceed and you can correct me" language.

Good:

```text
这个主体我对不上。你说的是谁？
```

```text
这个项目名和前面的上下文接不上，我先确认一下：你说的是哪个项目？
```

```text
这里像是语音转写把人名写错了。你指的是「王磊」还是另一个人？
```

Avoid:

```text
我先按 X 理解，偏了你再拉我回来。
```

```text
你应该是想说 X。
```

## Memory Rule

Never store unanchored people, projects, products, companies, places, or relationship facts as durable memory.

Confirm entity identity first, then write memory with source and alias information.

