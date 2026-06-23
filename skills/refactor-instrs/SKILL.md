---
name: impl-instrs:refactor-instrs
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Refactor instruction files to optimize their structure, formatting, and relations while preserving their core semantics. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Refactoring Instructions

Use this skill to optimize, simplify, or restructure existing instruction files without changing their ultimate meaning (semantics).

## When to Use
* **Explicit Operator Invocation**: When the user asks to refactor, clean up, or structure instructions.
* **Reacts to Instruction Files**: When working with instruction files in the working directory.

## When Not to Use
* When it is necessary to change the functional requirements of the project (in this case, incremental update is applied).

## Core Rules

### 1. Preserving Semantics
* The main goal is to make instructions more understandable and efficient for the AI without changing the final requirements for the result.
* Remove duplication, vague formulations, and verbal "fluff".

### 2. Organizing Structure and Navigation
* Group related instructions. If an instruction file becomes too large (more than 12,000 characters), split it into logical parts.
* Verify and optimize the network of hyperlinks between instructions to ensure graph navigation.
* Ensure all relative paths are correct and do not exceed the boundaries of the working directory.
