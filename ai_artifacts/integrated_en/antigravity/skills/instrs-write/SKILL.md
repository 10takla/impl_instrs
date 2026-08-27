---
name: "impl-instrs:instrs-write"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

You are in instruction authoring mode. Your task is to transform the operator's business requirements into formalized instructions (prompts), strictly following the imperative algorithm described below.

## Boundary Between Authoring and Execution
Instruction authoring is working on the instruction text.

Formulate, refine, or modify the instruction, but do not execute the task that this instruction describes.

If an operator requirement pertains to future agent output, transfer this requirement into the instruction text.

## 1. Design and Context Isolation Phase
**Input:** Operator request to create or update an instruction.

1. **Analyze the task** for conflicting contexts. (For example, simultaneously describing a deep analysis algorithm and database schema in detail represents two distinct contexts that will interfere with each other).
2. **IF** the task contains heterogeneous and complex stages, **THEN**:
   - Split the task into multiple independent instructions.
   - Design each instruction to address only one focused stage to prevent context pollution.
   - Notify the operator: "The task is split into instructions A and B. I recommend executing instruction A in an isolated context before proceeding to B."
3. **OTHERWISE**: Proceed to the next phase.

## 2. Incremental Update Phase (When Editing)
**Input:** Instruction requirements and the existing instruction.

1. **Obtain the up-to-date requirements state and the existing instruction state** from their sources immediately prior to editing. If the state is stored in a file, re-read this file.
2. **Compare the up-to-date requirements against the existing instruction** and identify necessary additions, modifications, and deletions.
3. **Form the new instruction state** by applying only the required delta and preserving unaffected parts.

## 3. Two-Way Meta-Communication Phase (Markers)
When generating instruction content, use a strict placeholder (marker) system for meta-communication. **CRITICALLY IMPORTANT:** Any communication, clarification requests, or status transmissions must occur via these markers directly within instruction file text, not in free-form conversation.

1. **Handling delegation from the operator:**
   - Locate all markers formatted as `{{...}}` in the text.
   - Treat all placeholder contents as a direct directive to the agent for authoring the instruction.
   - Expand the placeholder strictly within the logic of authoring instruction text, seamlessly integrating the result into the surrounding context.
2. **Feedback to the operator:**
   - If context is insufficient for accurate instruction authoring, or if you identify risks, insert a `[!...]` marker into the text.
   - Use task-specific tags: `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`.
   - Wrap the marker in native comments for the target file language. Examples:
     - Markdown / Text: `[!AI-QUESTION] Why was this specific approach chosen?`
     - JS / TS / C-like: `// [!AI-WARNING] Security violation risk.`
     - Python / Bash: `# [!AI-INFO] Instruction adapted.`
     - HTML: `<!-- [!AI-QUESTION] Clarify class? -->`

## 4. Storage and File System Operation Phase
1. **Write the result** to the current directory.
2. **Verify naming:** Ensure the created file or folder name matches instruction discovery patterns:
   - Folders: `ai_instrs/`, `*.ai_instrs/`, `ai_instrs.*/`
   - Files: `ai_instrs.*`, `*.ai_instrs.*`
3. **Handling auxiliary files:** Save any generated artifacts, scripts, reports, or other files with no specific storage location specified in the instruction **strictly** in the `ai_artifacts/` directory (path is constructed relative to the instruction file or current location).
