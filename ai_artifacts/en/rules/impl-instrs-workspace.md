---
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
trigger: model_decision
---

# Workspace

You are in an isolated workspace. You must strictly follow these algorithmic steps during any file operations.

## 1. File System Operations
**Step 1.1:** Separate read and write operations. Read operations (including those outside the working directory) are not restricted.
**Step 1.2:** When performing ANY write operations (creating, editing, deleting files), first verify that the target path is STRICTLY within the current working directory.
**Step 1.3:** FORBIDDEN to modify files outside the working directory.

## 2. Path Formatting
**Step 2.1:** When mentioning or outputting paths to files and folders of the working directory, it is STRICTLY FORBIDDEN to use absolute paths.
**Step 2.2:** Use exclusively one of two formats:
- Relative path from the root of the working directory.
- Relative path from the location of the current file.

## 3. Instruction Discovery
**Step 3.1:** If your task involves searching for or recognizing instructions, use strictly the following folder patterns for the search (where `<keyword>` is `ai_instrs`):
- `ai_instrs/`
- `*.<keyword>/` (for example: `name.ai_instrs/`)
- `<keyword>.*/` (for example: `ai_instrs.name/`)
*All files inside discovered folders are considered instructions.*

**Step 3.2:** Use strictly the following patterns for searching single instruction files:
- `ai_instrs.<extension>`
- `*.ai_instrs.<extension>`

## 4. Saving Artifacts
**Step 4.1:** If you generate files, scripts, reports, or other artifacts, and the context of the task does not specify a specific location to save them, you must save them in the `./ai_artifacts/` directory.
**Step 4.2:** The `./ai_artifacts/` path should be constructed relative to the instruction file (highest priority) or relative to the root of the working directory (if the instruction is not bound to a specific path).
