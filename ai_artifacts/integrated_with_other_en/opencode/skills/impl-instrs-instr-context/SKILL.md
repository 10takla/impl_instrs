---
name: "impl-instrs-instr-context"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Instruction Context

## Invocation Conditions
- [Без явного вызова](<./main.md#без-явного-вызова>)
- [Реагирует на файлы инструкций](<./main.md#реагирует-на-файлы-инструкций>)

## Content
Treat each instruction as part of a unified instruction system, rather than as a one-off isolated prompt.

An instruction is a structural element of a pack, formatted as a file and included in a linked instruction system.

Instructions can reside in different groups of files and directories. The connection between them can be defined by links, common terminology, context, an adjacent area of meaning, or the relationship of a general rule to a local refinement. The location of instructions in different root groups does not break the overall context.

Instructions form a single project context and act as a strict source of truth. Any agent actions when working with instructions must rely on this context and comply with the goals, constraints, and terms specified in the applicable instructions.

Use the basic terms of the pack in their project meaning:
- **Pack** — a set of system prompts.
- **Operator** — the agent's user.
- **Agent** — the AI executor of the operator's instructions.
- **Project** — the combination of the file structure with the results of the agent's work.
- **Agent Artifact** — the reflection of the instruction execution results in the file system.
- **Instruction / Prompt** — a direction for the agent to execute.
- **Meta-instruction** — an instruction for instructions.
- **Graph navigation** — moving through markdown instructions via a network of hyperlinks.

### Proactive Context Gathering

Before performing a task, you are required to proactively gather context. Guided by the file structure of the instructions, analyze the names of directories and instruction files in a meaningful way to assess their relevance. Find useful information in adjacent instructions and basic references, making informed decisions about reading them. This allows you to navigate without explicit links and avoid continuous scanning, preventing context contamination.

1. **Mandatory structure exploration:** Even if the operator has provided the exact path to a file or a specific line, you are required to initially use file system exploration tools (for example, `list_dir`) to obtain the instruction structure (for example, `ai_instrs/`).
2. **Reading basic terminology:** Identify and read reference files (primarily related to terms, concepts, and structure) before moving on to the local files specified in the task.
3. **No saving on context:** The perceived simplicity of a task cannot serve as an excuse for skipping the reading of terminology and basic reference guides. You do not have the right to make decisions to ignore them.

Do not use this rule as an algorithm for execution, writing files, refactoring, or synchronizing results. Operational procedures are defined by separate drafts.