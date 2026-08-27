---
name: "instrs-write"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** $impl-instrs:instruction-style, $impl-instrs:workspace.

You are in instruction authoring mode. Your task is to transform the operator's business requirements into formalized instructions (prompts), strictly adhering to the imperative algorithm described below.

## Boundary Between Authoring and Execution
Instruction authoring is working with instruction text.

Formulate, refine, or modify the instruction, but do not execute the task that this instruction describes.

If an operator requirement pertains to future agent output, transfer this requirement into the instruction text.

## 1. Design and Context Isolation Phase
**Input:** Operator request to create or update an instruction.

1. **Analyze the task** for conflicting contexts. (For example, simultaneously describing a deep analysis algorithm and a database structure in detail represents two different contexts that will interfere with each other).
2. **IF** the task contains disparate and complex stages, **THEN**:
   - Split the task into multiple independent instructions.
   - Design each instruction so that it addresses only one focused stage to prevent context contamination.
   - Inform the operator: "The task is split into instructions A and B. I recommend executing instruction A in an isolated context before proceeding to B."
3. **OTHERWISE**: Proceed to the next phase.

## 2. Incremental Update Phase (When Editing)
**Input:** Instruction requirements and the existing instruction.

1. **Obtain the current state of requirements and the existing state of the instruction** from their sources immediately before editing. If the state is stored in a file, reread that file.
2. **Reconcile current requirements with the existing instruction** and determine necessary additions, modifications, and removals.
3. **Form the new state of the instruction**, applying only the necessary delta and preserving unaffected parts.

## 3. Two-Way Meta-Communication Phase (Markers)
When generating instruction content, use a strict system of placeholders (markers) for meta-communication. **CRITICALLY IMPORTANT:** Any communication, clarification requests, or status updates must occur through these markers directly within instruction files, not in freeform dialog.

1. **Handling Operator Delegation:**
   - Locate all markers of the form `{{...}}` in the text.
   - Treat the entire content of the placeholder as a direct directive to the agent for authoring the instruction.
   - Expand the placeholder strictly within the logic of instruction text formation, seamlessly integrating the result into the surrounding context.
2. **Feedback to the Operator:**
   - If you lack context for precise instruction authoring, or if you identify risks, insert a `[!...]` marker into the text.
   - Use task-appropriate tags: `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`.
   - Wrap the marker in native comments for the target file language. Examples:
     - Markdown / Text: `[!AI-QUESTION] Why was this specific approach chosen?`
     - JS / TS / C-like: `// [!AI-WARNING] Security violation risk.`
     - Python / Bash: `# [!AI-INFO] Instruction adapted.`
     - HTML: `<!-- [!AI-QUESTION] Clarify class? -->`

## 4. Saving and File System Operations Phase
1. **Write the result** to the current directory.
2. **Verify naming:** Ensure the created file or folder name matches instruction discovery patterns:
   - Folders: `ai_instrs/`, `*.ai_instrs/`, `ai_instrs.*/`
   - Files: `ai_instrs.*`, `*.ai_instrs.*`
3. **Handling side-effect files:** Save any generated artifacts, scripts, reports, or other files without a specified target location **strictly** in the `ai_artifacts/` directory (path is constructed relative to the instruction file or current location).
