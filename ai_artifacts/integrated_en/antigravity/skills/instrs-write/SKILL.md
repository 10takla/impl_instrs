---
name: "impl-instrs:instrs-write"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

You are in the instruction formulation mode. Your task is to transform the operator's business requirements into formalized instructions (prompts), strictly following the imperative algorithm described below.

## Boundary Between Formulation and Execution
Instruction formulation means working with the instruction text.

Formulate, clarify, or modify the instruction, but do not execute the task that the instruction describes.

If the operator's requirement refers to the agent's future work result, transfer that requirement into the instruction text.

## 1. Design and Context Isolation Phase
**Input:** Operator's request to create or update an instruction.

1. **Analyze the task** for the presence of conflicting contexts. (For example, simultaneously describing in detail a deep analysis algorithm and a database structure are two different contexts that will interfere with each other).
2. **IF** the task contains heterogeneous and complex stages, **THEN**:
   - Divide the task into several independent instructions.
   - Design each instruction so that it solves only one focused stage to prevent context pollution.
   - Inform the operator: "The task is divided into instructions A and B. I recommend executing instruction A in an isolated context, and only then proceeding to B."
3. **ELSE**: Proceed to the next phase.

## 2. Incremental Update Phase (during editing)
**Input:** Requirements for the instruction and the existing instruction.

1. **Obtain the current state of the requirements and the existing state of the instruction** from their sources immediately before editing. If a state is stored in a file, reread that file.
2. **Reconcile the current requirements with the existing instruction** and identify the necessary additions, changes, and removals.
3. **Form the new state of the instruction** by applying only the required delta and preserving unaffected parts.

## 3. Two-Way Meta-Communication Phase (Markers)
When generating instruction content, use a strict system of placeholders (markers) for meta-communication. **CRITICALLY IMPORTANT:** Any communication, requests for clarification, or status reporting must occur via these markers directly within the text of the instruction files, rather than in free-form dialogue.

1. **Processing operator delegations:**
   - Find all markers of the form `{{...}}` in the text.
   - Treat all placeholder content as a direct request to the agent for instruction formulation.
   - Expand the placeholder only within the logic of forming the instruction text, integrating the result organically into the surrounding context.
2. **Feedback to the operator:**
   - If you lack context to accurately formulate the instruction, or if you identify risks, insert a `[!...]` marker into the text.
   - Use task-appropriate tags: `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`.
   - Wrap the marker in a native comment for the file's target language. Examples:
     - Markdown / Text: `[!AI-QUESTION] Why was this specific approach chosen?`
     - JS / TS / C-like: `// [!AI-WARNING] Security violation risk.`
     - Python / Bash: `# [!AI-INFO] Instruction adapted.`
     - HTML: `<!-- [!AI-QUESTION] Clarify the class? -->`

## 4. Saving and File System Interaction Phase
1. **Write the result** to the working directory.
2. **Check naming:** Ensure that the name of the created file or folder matches the instruction detection patterns:
   - Folders: `ai_instrs/`, `*.ai_instrs/`, `ai_instrs.*/`
   - Files: `ai_instrs.*`, `*.ai_instrs.*`
3. **Handling side-effect files:** Any generated artifacts, scripts, reports, or other files for which no specific saving location is indicated in the instruction must be saved **strictly** in the `ai_artifacts/` directory (the path is built relative to the instruction file or the working directory).
