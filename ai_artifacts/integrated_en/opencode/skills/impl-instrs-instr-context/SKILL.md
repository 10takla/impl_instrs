---
name: "impl-instrs-instr-context"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

Treat every instruction as part of a unified instruction system, not as a one-off isolated prompt.

An instruction is a structural element of the pack, represented as a file and included in a connected instruction system.

Instructions can be located in different groups of files and directories. Connections between them can be defined by links, shared terminology, context, adjacent meaning, or the relationship between a general rule and a local refinement. Placing instructions in different root groups does not break the shared context.

Instructions form a unified project context and serve as the strict source of truth. Any agent action when working with instructions must rely on this context and comply with the goals, constraints, and terms defined in the applicable instructions.

Use the pack's core terms in their project-specific meaning:
- **Pack** — a set of system prompts.
- **Operator** — the agent's user.
- **Agent** — the AI executor of the operator's instructions.
- **Project** — the combination of the file structure with the agent's work results.
- **Agent Artifact** — the reflection of the instruction execution result in the file system.
- **Instruction / Prompt** — a directive for the agent to execute.
- **Meta-instruction** — an instruction for instructions.
- **Graph navigation** — moving through markdown instructions via a network of hyperlinks.

### Proactive Context Gathering

Before executing a task, you must proactively gather context. Relying on the file structure of instructions, thoughtfully analyze the names of directories and instruction files to evaluate their relevance. Find useful information in adjacent instructions and basic references, making reasoned decisions about reading them. This allows you to navigate without explicit links and avoid full scanning, preventing context pollution.

1. **Mandatory Structure Study:** Even if the operator provided an exact path to a file or a specific line, you are required to initially use file system exploration tools (e.g., `list_dir`) to obtain the instruction structure (e.g., `ai_instrs/`).
2. **Reading Basic Terminology:** Identify and read reference files (primarily related to terms, concepts, and structure) before proceeding to the local files specified in the task.
3. **No Economizing on Context:** The apparent simplicity of the task cannot serve as an excuse for skipping the reading of terminology and basic references. You have no right to make decisions to ignore them.

Do not use this rule as an algorithm for execution, file writing, refactoring, or result synchronization. Operational procedures are defined by separate drafts.
