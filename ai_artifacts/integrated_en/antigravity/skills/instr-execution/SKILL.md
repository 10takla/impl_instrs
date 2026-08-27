---
name: "impl-instrs:instr-execution"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

Upon explicit invocation of this skill, execute the instruction specified by the operator only after proactive context gathering.

### Step 1: Explore Root Structure
Regardless of how specific the operator's request is, first obtain the structure of the root instruction directory.

Even if the operator specified an exact path, line, or section, this does not override the primary exploration of the instruction structure.

### Step 2: Read Base Terminology
Identify root reference files related to terms, concepts, and instruction structure.

Read these files before navigating to the local task files.

Do not ignore this step under the pretext of apparent task simplicity.

### Step 3: Find Related Context
Meaningfully analyze the names of directories, files, and links within the read instructions.

Find related instructions that may influence the understanding of the target instruction.

Use targeted reading. Avoid full-sweep scanning unless required for understanding the target instruction.

### Step 4: Obtain Up-to-Date Requirements State
Immediately before execution, obtain the up-to-date state of the target instruction from its actual source. If the instruction is stored in a file, re-read the specified file or fragment from the file system.

Treat the obtained requirements state as the source of truth. Do not execute an instruction from a copy retained in context.

### Step 5: Obtain Existing Result State
If a result of previous execution exists, obtain its current state from the actual source.

Do not use a result copy retained in context instead of checking its current state.

### Step 6: Form New Result State
Compare the up-to-date requirements state against the existing result state. Apply required additions, modifications, and deletions while preserving unaffected parts.

If the operator requested an independent new result, create it without modifying the previous result.

All actions must rely on the gathered context, terminology, and applicable constraints.

### Critical Rule
Do not skimp on context. The agent has no authority to skip reading global terminology and root files before executing an instruction.
