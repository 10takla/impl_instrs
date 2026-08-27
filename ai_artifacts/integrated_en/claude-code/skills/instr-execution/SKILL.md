---
name: "instr-execution"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

**Related rules:** /impl-instrs:instruction-style, /impl-instrs:workspace.

When explicitly invoking this skill, execute the instruction specified by the operator only after proactively gathering context.

### Step 1: Study the Root Structure
Regardless of how specific the operator's request is, first obtain the structure of the root instruction directory.

Even if the operator provided an exact path, line, or section, that does not cancel the initial study of the instruction structure.

### Step 2: Read Basic Terminology
Identify root reference files related to terms, concepts, and instruction structure.

Read these files before moving on to the local task files.

Do not ignore this step under the pretext of imagined simplicity of the task.

### Step 3: Find Adjacent Context
Thoughtfully analyze directory names, file names, and links inside the instructions you have read.

Find adjacent instructions that may affect the understanding of the target instruction.

Use targeted reading. Avoid indiscriminate scanning unless required to understand the target instruction.

### Step 4: Obtain the Current State of Requirements
Immediately before execution, obtain the current state of the target instruction from its actual source. If the instruction is stored in a file, reread the file or snippet specified by the operator from the file system.

Treat the obtained state of requirements as the source of truth. Do not execute the instruction from a copy retained in context.

### Step 5: Obtain the Existing State of the Result
If a result from a previous execution exists, obtain its current state from its actual source.

Do not use a copy of the result retained in context instead of checking its current state.

### Step 6: Form the New State of the Result
Reconcile the current state of requirements with the existing state of the result. Apply the necessary additions, changes, and removals while preserving unaffected parts.

If the operator requested an independent new result, create it without modifying the previous result.

All actions must rely on the gathered context, terminology, and applicable constraints.

### Critical Rule
Do not economize on context. The agent is not permitted to skip reading global terminology and root files before executing an instruction.
