---
name: "impl-instrs:reverse-engineer-instr"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Translate an existing implementation or artifacts back into strict AI instructions."
---

# Skill: Reverse Engineering Instructions

This skill translates an existing result (completed code, architecture, artifacts) back into the format of strict text instructions for AI agents. Your main task is to create a base of rules and algorithms, relying on which the agent will be able to independently recreate the current result from scratch.

## Strict Imperative Workflow Algorithm

**Step 1. Study the target object (result)**
1. Request from the operator (if not specified initially) absolute paths to files or directories whose implementation needs to be translated into instructions.
2. Use `list_dir` to review the structure and `view_file` to study the source code and artifacts in detail.
3. Analyze how the implementation functions, what patterns are used, and what the architectural and business requirements are.

**Step 2. Translation of concepts into mechanical steps**
1. Decompose the studied implementation into logical blocks (for example: "File structure", "Architectural decisions", "Business logic", "Formatting rules").
2. For each block, formulate specific, step-by-step instructions for the LLM.
   - **IT IS FORBIDDEN** to describe the current state using abstract concepts (for example: "the agent understands the structure").
   - **IT IS MANDATORY** to translate abstractions into a shared knowledge base and actions, formulate rules in the imperative mood (for example: "Step 1: do `list_dir` of directory X", "Use pattern Y").
3. The final instructions must represent a strict algorithm that eliminates ambiguity.

**Step 3. Designing the structure of instruction files**
1. Plan the structure for saving the rules (usually in the `ai_instrs/` folder of the project).
2. Design `main.md` as a central entry point that consolidates the context.
3. Distribute highly specialized rules into separate files and link them from `main.md`.

**Step 4. Physical creation of instructions**
1. Use `write_to_file` to create all planned Markdown files.
2. **MANDATORY**: when forming links between instruction files, strictly follow the syntax: paths in links `[]()` must be wrapped in angle brackets `(<path>)` (example: `[Module](<./module.md>)`).

**Step 5. Completion and reporting**
1. Stop calling editing tools after all files have been saved.
2. Generate a brief and clear report for the operator with a list of all created files (as clickable links).
3. Specify the main concepts that were successfully translated into the format of AI instructions. Await further commands.
