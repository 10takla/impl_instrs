---
name: "reverse-engineer-instr"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

I will list the files in the workspace directory to find the markdown file to be translated.
I will view the content of `temp_in.md` to translate it.
I will view `dev.ai_instrs.md` to see the structure and how markdown links are used in this workspace.
I will view `TODO.md` to see if there are any instructions or tasks related to this.
I will search for files in the `tests` directory to see if there are any references or translation scripts/data.
I will view `tests/ai_instrs.md` to see its contents.
I will search for files in the `tests2` directory.
# Reverse Engineering

## Trigger Conditions
- [По явному вызову](<./main.md#по-явному-вызову>)

## Table of Contents

# Skill: Reverse Engineering of Instructions

This skill translates an existing result (finished code, architecture, artifacts) back into the format of strict text instructions for AI agents. Your main task is to create a base of rules and algorithms, relying on which the agent will be able to independently reconstruct the current result from scratch.

## Strict Imperative Work Algorithm

**Step 1. Studying the target object (result)**
1. Request from the operator (if not specified initially) absolute paths to the files or directories whose implementation needs to be translated into instructions.
2. Use `list_dir` to overview the structure and `view_file` for a detailed study of the source code and artifacts.
3. Analyze how the implementation functions, what patterns are used, and what the architecture and business requirements are.

**Step 2. Translating concepts into mechanical steps**
1. Decompose the studied implementation into logical blocks (for example: "File structure", "Architectural solutions", "Business logic", "Formatting rules").
2. For each block, formulate specific, step-by-step instructions for the LLM.
   - It is **FORBIDDEN** to describe the current state with abstract concepts (for example: "the agent is aware of the structure").
   - It is **REQUIRED** to translate abstractions into a shared base of knowledge and actions, formulating rules in the imperative mood (for example: "Step 1: perform `list_dir` on directory X", "Use pattern Y").
3. The resulting instructions must represent a strict algorithm excluding ambiguity.

**Step 3. Designing the structure of instruction files**
1. Plan the structure for saving rules (usually in the `ai_instrs/` folder of the project).
2. If `_.md` is present, use it as a parent instruction with the folder name, and the other files as sub-instructions.
3. If `_.md` is absent, keep the hierarchy implicit: the folder name is the parent level, and the other files are sub-instructions.

**Step 4. Physical creation of instructions**
1. Use `write_to_file` to create all planned Markdown files.
2. **REQUIRED**: when forming links between instruction files, strictly follow the syntax: paths in links `[]()` must be enclosed in angle brackets `(<path>)` (example: `[Модуль](<./module.md>)`).

**Step 5. Completion and reporting**
1. Stop calling editing tools after saving all files.
2. Generate a brief and clear report for the operator with a list of all created files (in the form of clickable links).
3. Specify the main concepts that were successfully translated into the format of AI instructions. Await further instructions.