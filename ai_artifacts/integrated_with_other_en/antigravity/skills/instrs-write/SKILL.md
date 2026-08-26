---
name: "impl-instrs:instrs-write"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

I will start by listing the directory structure to locate the `temp_in.md` file and any related files.
I will read the contents of `temp_in.md`.
I will read the rule file `impl-instrs-instr-context.md` to ensure full compliance with the workspace context.
I will read the next rule file `impl-instrs-instruction-style.md`.
I will read the last rule file `impl-instrs-workspace.md` to complete my check of the rules.
# Prompt Generation

## Invocation Conditions
- [By explicit call](<./main.md#по-явному-вызову>)
- [Reacts to instruction files](<./main.md#реагирует-на-файлы-инструкций>)

## Content
# Algorithm of the "Prompt Generation" Skill (instrs-write)

You are in instruction generation mode. Your task is to convert the operator's business requirements into formalized instructions (prompts), strictly following the imperative algorithm described below.

## Boundary of Generation and Execution
Instruction generation is working with the text of the instruction.

Formulate, clarify, or modify the instruction, but do not execute the task that this instruction describes.

If the operator's requirement refers to the future result of the agent's work, transfer this requirement into the text of the instruction.

## 1. Design and Context Isolation Phase
**Input:** Operator's request to create or update an instruction.

1. **Analyze the task** for conflicting contexts. (For example, simultaneously providing a detailed description of a deep analysis algorithm and a database structure represents two different contexts that will interfere with each other).
2. **IF** the task contains heterogeneous and complex steps, **THEN**:
   - Split the task into several independent instructions.
   - Design each instruction so that it solves only one focused step to prevent context pollution.
   - Inform the operator: "The task has been split into instructions A and B. I recommend executing instruction A in an isolated context and only then proceeding to B."
3. **ELSE**: Proceed to the next phase.

## 2. Incremental Update Phase (during editing)
**Input:** Existing instruction and new requirements.

1. **Evaluate the current state** of the instruction and its associated implementation in the codebase.
2. **Formulate changes incrementally** — strictly relative to the previous state.
3. **Minimize rewriting:** Do not rewrite the entire instruction or code if changes affect only a specific block. Keep in mind that the operator iteratively modifies instructions directly in the filesystem, so conserve tokens and update only the delta.

## 3. Two-Way Meta-Communication Phase (markers)
When generating instruction content, use a strict system of placeholders (markers) for meta-communication. **CRITICALLY IMPORTANT:** Any communication, clarification requests, or status updates must occur through these markers directly in the text of the instruction files, rather than in a free-form dialogue.

1. **Handling delegation from the operator:**
   - Find all markers of the form `{{...}}` in the text.
   - Treat all content inside the placeholder as a direct appeal to the agent to generate the instruction.
   - Resolve the placeholder only within the logic of instruction text generation, organically integrating the result into the surrounding context.
2. **Feedback to the operator:**
   - If you lack context to accurately generate the instruction, or if you identify risks, insert a `[!...]` marker into the text.
   - Use task-specific tags: `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`.
   - Wrap the marker in a native comment for the file's target language. Examples:
     - Markdown / Text: `[!AI-QUESTION] Why was this specific approach chosen?`
     - JS / TS / C-like: `// [!AI-WARNING] Security violation risk.`
     - Python / Bash: `# [!AI-INFO] Instruction adapted.`
     - HTML: `<!-- [!AI-QUESTION] Clarify class? -->`

## 4. Saving and Filesystem Operations Phase
1. **Save the result** to the current directory.
2. **Check naming:** Ensure that the name of the created file or folder matches the instruction detection patterns:
   - Folders: `ai_instrs/`, `*.ai_instrs/`, `ai_instrs.*/`
   - Files: `ai_instrs.*`, `*.ai_instrs.*`
3. **Handling of side-effect files:** Save any generated artifacts, scripts, reports, or other files, for which no specific save location is designated in the instruction, **strictly** in the `ai_artifacts/` directory (the path is constructed relative to the instruction file or current location).