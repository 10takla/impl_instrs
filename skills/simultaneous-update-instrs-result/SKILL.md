---
name: impl-instrs:simultaneous-update-instrs-result
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Simultaneously update code/implementation results and the corresponding instruction files to keep them synchronized. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Simultaneous Update of Instructions and Result

Use this skill to synchronously modify code and instructions so that the implementation never diverges from its description.

## When to Use
* **Reacts to Instruction Files**: When making changes to the project that affect both implementation files (code) and instruction files (`.md`).

## When Not to Use
* When changing only documentation without changing the code.
* When refactoring code without changing its external behavior and logic.

## Core Rules

### 1. Compliance with Execution Context
* Apply the rule [impl-instrs-execution-context.md](<../../rules/impl-instrs-execution-context.md>).
* Before writing working code or editing files, ensure that the planned behavior is described in the instruction files.
* Do not separate these phases in time: if you update the code, update the instruction in the same iteration (or even in the same request).

### 2. Synchronous Update
* Any code edit (bug fix, feature addition) must be mirrored in the instruction.
* If you realize during coding that the initial instruction was incomplete or erroneous, update the instruction, and then bring the code into alignment with it.
