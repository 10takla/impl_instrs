---
name: "impl-instrs:instr-execution"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Instruction Execution

## Invocation Conditions
- [By explicit call](<./main.md#по-явному-вызову>)
- [Reacts to instruction files](<./main.md#реагирует-на-файлы-инструкций>)

## Content
Upon explicit invocation of this skill, execute the instruction specified by the operator only after proactive context gathering.

### Step 1: Study the Root Structure
Regardless of how specific the operator's request is, first obtain the structure of the root instructions directory.

Even if the operator specified an exact path, line, or section, this does not waive the initial study of the instruction structure.

### Step 2: Read the Basic Terminology
Identify the root reference files related to terms, concepts, and the structure of instructions.

Read these files before proceeding to the local task files.

Do not ignore this step under the pretext of the task's apparent simplicity.

### Step 3: Find Adjacent Context
Thoughtfully analyze the names of directories, files, and links within the read instructions.

Find adjacent instructions that may affect the understanding of the target instruction.

Use targeted reading. Avoid continuous scanning unless it is required to understand the target instruction.

### Step 4: Execute the Target Instruction
Only after gathering the necessary context should you proceed to execute the instruction specified by the operator.

All actions must rely on the gathered context, terminology, and applicable constraints.

### Critical Rule
Do not skimp on context. The agent is not permitted to skip reading global terminology and root files before executing the instruction.