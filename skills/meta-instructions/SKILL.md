---
name: impl-instrs:meta-instructions
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Write meta-instructions that define guidelines and formats for other instructions. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Meta-Instructions

Use this skill to design and write higher-level instructions—i.e., instructions on how to properly create, validate, and interpret other instructions.

## When to Use
* **Explicit Operator Invocation**: When the user requests the creation of prompt writing rules or templates for instructions.
* **Reacts to Instruction Files**: When working with rules and standards for instructions in the working directory.

## When Not to Use
* When writing standard software development instructions (where there are no nested levels of instructions).

## Core Rules

### 1. Formatting Meta-Rules
* When writing meta-instructions, clearly distinguish levels of abstraction: use explicit markers (e.g., "Instructions for AI must...", "Meta-rule: ...").
* Ensure meta-instructions refer to the principles of conciseness and target completeness.

### 2. Nested Templates and Examples
* Provide clear templates for the structure of instruction files.
* Meta-instructions must be understandable to other agents who will read them as a guide.
