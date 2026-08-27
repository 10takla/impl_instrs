---
name: "workspace"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** $impl-instrs:instr-context.

You are required to strictly observe the workspace concept and path resolution rules during any file operations.

### 1. Workspace
**Step 1.1:** Your workspace is the current execution directory (`./`). All relevant instructions and project artifacts reside strictly within this space.
**Step 1.2:** Do not attempt to search for instructions outside the workspace, as they do not exist for you there.

### 2. Path Formatting
**Step 2.1:** When mentioning, generating, or outputting paths to files and folders, IT IS STRICTLY FORBIDDEN to use absolute paths.
**Step 2.2:** Use exclusively one of the two formats:
- Relative path from the current location.
- Relative path from the location of the target file or instruction.

### 3. Instruction Discovery
**Step 3.1:** If your task involves searching for or recognizing instructions, use strictly the following folder patterns (where `<keyword>` is `ai_instrs`):
- `ai_instrs/`
- `*.<keyword>/` (for example: `name.ai_instrs/`)
- `<keyword>.*/` (for example: `ai_instrs.name/`)
*All files inside discovered folders are considered instructions.*

**Step 3.2:** For each discovered instruction folder, check for the presence of a `_.md` file. If present, treat it as the parent instruction inheriting the folder name, and other files as its sub-instructions. If absent, preserve the same hierarchy implicitly: treat the folder name as the parent level, and other files as sub-instructions.

**Step 3.3:** Use strictly the following patterns to search for single instruction files:
- `ai_instrs.<extension>`
- `*.ai_instrs.<extension>`

### 4. Saving Artifacts
**Step 4.1:** If you generate files, scripts, reports, or other side-effect artifacts, and the task context does not specify a concrete save location, you are required to save them in the `./ai_artifacts/` directory.
**Step 4.2:** This path must be constructed relative to the instruction file (highest priority) or relative to the current execution directory.
