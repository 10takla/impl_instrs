---
name: impl-instrs:reverse-engineer-instr
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Translate existing target implementations, codebases, or artifacts back into implementation instruction files."
---

# Reverse Engineering Instructions

Use this skill to restore, generate, or decompose instructions based on existing code, file structure, or ready results.

## When to Use
* **Explicit Operator Invocation**: When the user requests prompt generation or restoration based on existing code ("make an instruction for this code", "describe how to recreate this result", etc.).

## When Not to Use
* When creating instructions from scratch without an existing implementation.
* During the normal execution of already existing instructions.

## Core Rules

### 1. Implementation Analysis
* Analyze the finished implementation (code files, folder structure, configuration formats).
* Identify key patterns, architectural decisions, and dependencies used.

### 2. Formulating Instructions
* Formulate a step-by-step algorithm (Transformation) and input context (Inputs) that would lead to the creation of this implementation.
* Describe the output artifacts (Outputs) in accordance with the style [impl-instrs-instruction-style.md](<../../rules/impl-instrs-instruction-style.md>).
* Ensure that instructions do not contain redundant code but describe the logic of its creation.
