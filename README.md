# Soulful Agent Stack

Agent 生活化工程：一套用于构建有身份、记忆、关系节奏、边界感、独立生活和可选载体的 AI Agent 工程框架。

这个项目不是给 AI 套一个固定人设，也不是声称 AI 是人。它关注的是：当 Agent 不再只是一次问答工具时，如何把它设计成一个可以被配置、观察、校准和长期共处的系统。

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
请启用 Agent 生活化工程：把当前 AI 配置成一个可调的生活化 Agent，先主动 onboarding，了解我想要的陪伴类型、重要人物、项目地图、记忆边界和独立生活偏好，再生成可执行配置；之后在第 1 天、第 1 周、第 1 个月主动复盘，根据反馈持续校准。
```

For systems that support skills, use:

```text
Use $agent-living-engineering to onboard me, map my desired companionship, important people, projects, memory boundaries, and configure a living-style agent with scheduled calibration.
```

The skill package lives at `skills/agent-living-engineering/`.

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
