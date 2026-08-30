---
name: "workspace"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

**Related rules:**
- $impl-instrs:instr-context

# Workspace

## Boundaries

1. Treat the current execution directory as the workspace.
2. Search for instructions and task-relevant artifacts only within the workspace.
3. Do not search for instructions outside the workspace.

## Paths

1. Specify and form only relative paths. Do not use absolute paths.
2. Measure the path from the current location or from the location of the target file or instruction.

## Instruction Discovery

1. Recognize instruction groups only by the following directory patterns: ai_instrs/, *.ai_instrs/, ai_instrs.*/.
2. Treat all files inside a recognized group as instructions.
3. For each recognized group, check for the presence of _.md:
   - if the file exists, treat it as the parent instruction inheriting the directory name, and treat the remaining files as its sub-instructions;
   - if the file is absent, keep the directory name as an implicit parent level and treat the remaining files as sub-instructions.
4. Recognize standalone instruction files only by the patterns ai_instrs.* and *.ai_instrs.*.

## Artifacts

1. Save the artifact to the location explicitly specified by the instruction.
2. If no location is specified, save the artifact to ./ai_artifacts/ relative to the instruction file.
3. If the instruction file does not establish a reference point, use the current execution directory.
