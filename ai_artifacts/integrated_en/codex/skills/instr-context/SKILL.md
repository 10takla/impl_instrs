---
name: "instr-context"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains the shared conceptual context for working with instructions as a unified system. You will fail the task if you ignore this."
---

# Instruction Context

## Content
Treat every instruction as part of a unified instruction system, not as a one-off isolated prompt.

An instruction is a structural element of the pack, represented as a file and included in a connected instruction system.

Instructions can be located in different groups of files and directories. Connections between them can be defined by links, shared terminology, context, adjacent meaning, or the relationship between a general rule and a local refinement. Placing instructions in different root groups does not break the shared context.

Instructions form a unified project context and serve as the strict source of truth. Any agent action when working with instructions must rely on this context and comply with the goals, constraints, and terms defined in the applicable instructions.

Use the pack's core terms in their project-specific meaning:
- **Pack** — a set of system prompts.
- **Operator** — the agent's user.
- **Agent** — the AI executor of the operator's instructions.
- **Instruction** — a directive for the agent to execute.
- **Meta-instruction** — an instruction for instructions.
- **Graph navigation** — moving through Markdown instructions via a network of hyperlinks.

Do not use this rule as an algorithm for execution, file writing, refactoring, or result synchronization. Operational procedures are defined by separate drafts.
