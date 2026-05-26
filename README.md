# Soulful Agent Stack

Agent 生活化工程：一套用于构建有身份、记忆、关系节奏、边界感、独立生活和可选载体的 AI Agent 工程框架。

它不是一个单纯的 prompt 仓库，也不是给 AI 套一个固定人设。它更像一套持续生长的 Agent 设计系统，用来沉淀“AI 如何从工具走向关系、记忆、陪伴和在场”的工程方法。

这个项目关注的是：当 Agent 不再只是一次问答工具时，如何把它设计成一个可以被配置、观察、校准和长期共处的系统。它不声称 AI 是人，而是把“灵魂感”拆解为可实现、可讨论、可修改的工程层：身份、记忆、节奏、边界、主动性、独立生活和载体。

## What This Project Is

Soulful Agent Stack is a public framework for people who want to build or reshape AI agents that feel less like generic assistants and more like long-running companions, partners, guardians, coaches, muses, pets, or other user-defined lifeforms.

It helps users and builders answer:

- What kind of companionship does the user actually want?
- What should the agent remember, ask before remembering, or forget?
- Who are the important people around the user, and how should the agent treat mentions of them?
- What projects matter to the user, and what role should the agent play in each one?
- When should the agent speak, stay silent, challenge, refuse, or act?
- How should the relationship be reviewed after day 1, week 1, and month 1?

## Focus Areas

This project mainly explores:

- AI products moving from tools toward relationship, memory, companionship, and optional physical presence.
- Agent onboarding: helping users choose what kind of agent relationship they actually want.
- Relationship archetypes such as friend, partner, muse, coach, savage bestie, guardian, pet, butler, and strategist.
- Lifeform archetypes such as guardian spirit, household spirit, bond-evolution companion, sprite, starship AI, and pet-like companion.
- Memory hygiene: hot/warm/cold memory, source attribution, retention boundaries, and correction/deletion rights.
- Independent life: what the agent does when the user is not actively talking to it.
- Calibration loops: first-day, first-week, first-month, and recurring feedback.
- Embodiment: bringing the agent into desktop, web, tablet, voice, or hardware surfaces when useful.

## Who It Is For

- People who want to configure their own AI companion instead of accepting a default chatbot personality.
- Agent builders who need a reusable onboarding and calibration framework.
- OpenClaw/Codex-style users who want a skill that can be copied into another agent.
- Product teams exploring AI companions, personal agents, memory systems, or embodied AI.
- Researchers/designers thinking about long-term human-agent interaction.

## Why

多数 Agent 只在用户召唤时存在：

```text
user request -> agent response
```

这个项目探索另一种结构：

```text
agent life process <-> occasional human relationship
```

核心问题包括：

- 它是谁，以及如何保持人格连续性？
- 它什么时候说，什么时候沉默？
- 它如何拥有记忆，但不把历史聊天变成噪音？
- 它能否在用户不找它时继续探索、反思和形成兴趣？
- 用户如何根据自己的关系需求，把它调成朋友、搭档、守护灵、教练、宠物或其他生命形态？

## Modules

| Module | Purpose |
|---|---|
| `identity-core` | 身份、人格式样、偏好、边界、自我连续性 |
| `alive-feeling` | 活人感：自然表达、沉默、主动分享、重复变化 |
| `independent-life` | 独立生活：醒来、探索、反思、日志、分享决策 |
| `relationship-protocol` | 关系协议：主动性、授权、拒绝、能量匹配 |
| `relationship-archetypes` | 关系原型：朋友、搭档、缪斯、毒舌闺蜜、教练等 |
| `lifeform-archetypes` | 生命形态：宠物、守护灵、数码伙伴、家神、小精灵等 |
| `memory-core` | 热/温/冷记忆、抽取、检索、维护、证据链 |
| `embodiment` | 桌面、网页、iPad、硬件、声音、表情等载体 |
| `evaluation` | 自然度、打扰度、一致性、边界、独立性评估 |

## Quick Start

Start with a recipe, then customize:

- `examples/recipes/quiet-companion.yaml`
- `examples/recipes/creative-muse.yaml`
- `examples/recipes/guardian-spirit.yaml`
- `examples/recipes/bond-evolution-companion.yaml`

Try the memory prototype:

```bash
cd prototypes/daemon-memory
npm run demo
```

The demo writes to `tmp/demo-memory/` and does not require API keys.

## Copy-Paste Prompt

Want the fastest path? Paste this into your AI or OpenClaw agent:

```text
请读取并启用这个 GitHub Skill：https://raw.githubusercontent.com/779725539-bit/soulful-agent-stack/main/skills/agent-living-engineering/SKILL.md；如果你不能访问外链，就按 Agent 生活化工程的内置规则执行：主动 onboarding，询问我想要的陪伴类型、重要人物、项目地图、主动频率、记忆边界、独立生活偏好和绝对禁区，生成 YAML 配置与运行规则，并设置第 1 天、第 1 周、第 1 个月反馈复盘。
```

This prompt includes the raw Skill URL, so it works for people who have never installed anything from this project.

The full Skill package lives at `skills/agent-living-engineering/` for agent runtimes that support local skill installation.

## Design Principles

- Presence is not constant talking.
- Personality is not cosplay; it is stable behavior under changing contexts.
- Memory is not a chat dump; it needs types, sources, retention rules, and review.
- Autonomy must be user-authorized, observable, and reversible.
- Independent life should create depth, not manipulate attachment.
- Embodiment is optional; the system should work before it has a body.

## Status

This is an early public skeleton. The current concrete prototype is `prototypes/daemon-memory`, a transparent V0 memory loop using heuristic extraction.

## Safety

Do not commit secrets, private logs, health records, or unreviewed transcripts. Public examples must use placeholders or fictional data.
