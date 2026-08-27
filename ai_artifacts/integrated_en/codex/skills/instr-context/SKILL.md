---
name: "instr-context"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

Treat every instruction as part of a unified instruction system, not as a one-off isolated prompt.

An instruction is a structural element of the pack, formatted as a file and included in a connected instruction system.

Instructions can be located in different groups of files and directories. Connections between them can be defined by links, shared terminology, context, adjacent meaning, or the relationship between a general rule and a local refinement. Placing instructions in different root groups does not break the shared context.

Instructions form a unified project context and serve as the strict source of truth. Any agent action when working with instructions must rely on this context and comply with the goals, constraints, and terms defined in the applicable instructions.

Use the pack's core terms in their project-specific meaning:
- **Pack** — a set of system prompts.
- **Operator** — the agent's user.
- **Agent** — the AI executor of the operator's instructions.
- **Project** — the combination of the file structure with the results of the agent's work.
- **Agent artifact** — a reflection of the instruction execution result in the file system.
- **Instruction / Prompt** — a directive for the agent to execute.
- **Meta-instruction** — an instruction for instructions.
- **Graph navigation** — navigating Markdown instructions via a network of hyperlinks.

### Proactive Context Gathering

Before executing a task, you are required to gather context proactively. Relying on the instruction file structure, thoughtfully analyze directory and file names of instructions to evaluate their relevance. Find useful information in adjacent instructions and basic references, making informed decisions on whether to read them. This allows you to navigate without explicit links and avoid indiscriminate scanning, preventing context contamination.

1. **Mandatory structure exploration:** Even if the operator provided an exact path to a file or a specific line, you must first use file system exploration tools (e.g., `list_dir`) to obtain the instruction structure (e.g., `ai_instrs/`).
2. **Reading basic terminology:** Identify and read reference files (primarily related to terms, concepts, and structure) before proceeding to local files specified in the task.
3. **No economizing on context:** Imagined simplicity of a task is never an excuse to skip reading terminology and basic references. You do not have the right to decide to ignore them.

Do not use this rule as an algorithm for execution, file writing, refactoring, or result synchronization. Operational procedures are defined by separate drafts.
