---
name: "impl-instrs-workspace"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
trigger: "model_decision"
---

**Related rules:** [impl-instrs-instr-context.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instr-context.md*).

You MUST strictly comply with the workspace concept and addressing rules during any file operations.

### 1. Workspace
**Step 1.1:** Your workspace is the current execution directory (`./`). All relevant instructions and project artifacts reside strictly within this space.
**Step 1.2:** Do not attempt to search for instructions outside the workspace, as they do not exist for you there.

### 2. Path Formatting
**Step 2.1:** When mentioning, generating, or outputting paths to files and folders, using absolute paths is STRICTLY PROHIBITED.
**Step 2.2:** Use exclusively one of the two formats:
- Relative path from current location.
- Relative path from the location of the target file or instruction.

### 3. Instruction Discovery
**Step 3.1:** If your task involves searching for or discovering instructions, strictly use the following folder patterns for search (where `<keyword>` is `ai_instrs`):
- `ai_instrs/`
- `*.<keyword>/` (e.g., `name.ai_instrs/`)
- `<keyword>.*/` (e.g., `ai_instrs.name/`)
*All files inside discovered folders are considered instructions.*

**Step 3.2:** For each discovered instruction folder, check for the presence of a `_.md` file. If present, treat it as the parent instruction inheriting the folder name, and all other files as its sub-instructions. If absent, preserve the same hierarchy implicitly: treat the folder name as the parent level, and all other files as sub-instructions.

**Step 3.3:** Strictly use the following patterns to search for standalone instruction files:
- `ai_instrs.<extension>`
- `*.ai_instrs.<extension>`

### 4. Artifact Storage
**Step 4.1:** If you generate files, scripts, reports, or other auxiliary artifacts, and no specific storage location is defined in the task context, you MUST save them to the `./ai_artifacts/` directory.
**Step 4.2:** This path must be constructed relative to the instruction file (highest priority) or relative to the current execution directory.
