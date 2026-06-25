---
name: impl-instrs:instrs-write
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Formulate and initialize implementation instruction files (prompts) using a structured functional format. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Prompt Formulation

Use this skill to create initial instruction files and prompts, as well as for their basic initialization.

## When to Use
* **Explicit Operator Invocation**: When the user requests the creation of a new instruction or prompt initialization.
* **Reacts to Instruction Files**: 
  - When creating/initializing new instruction files.
  - When there is a need to incrementally update execution logic or code based on requirement changes captured in the instruction files.

## When Not to Use
* For everyday or minor code changes without the need to create/modify a formal instruction structure.
* During the first project initialization or complete rewrite of all code from scratch (for incremental update tasks).

## Core Rules

### 1. Style Compliance
* Follow the rule [impl-instrs-instruction-style.md](<../../rules/impl-instrs-instruction-style.md>).
* Apply the principle of **target (subjective) completeness** and **conciseness**. Do not write redundant boilerplate.

### 2. Optimization and Graph Navigation
* Each created Markdown instruction must contain a relative link to the parent instruction file.
* This provides quick link navigation without scanning the file system structure.

### 3. Incremental Implementation Updates
* **Current State Analysis**: Compare the current implementation with the new requirements. Identify the delta (difference). Do not rewrite files entirely if changes can be made locally (via precise replacement). This significantly saves tokens and reduces the risk of regression.
* **Step-by-Step Changes**: Apply changes sequentially. Reflect each step in the instruction file (or the task file `task.md`) to control execution progress. Ensure intermediate project states remain functional or quickly testable.

### 4. Context Isolation
* **Prevent Context Pollution**: Do not mechanically divide tasks. Split tasks into separate instruction files if their detailed descriptions conflict and cause context pollution (e.g., deep research vs. complex coding).
* **Isolated Execution**: Formulate these separate instructions so the operator can feed them to the agent sequentially, allowing the agent to complete each step in a clean, focused context.

### 5. Placeholders and Feedback Markers
Use the two-way meta-communication tool when formulating instructions:
* **Delegation (`{{...}}`)**: Resolve `{{...}}` placeholders, replacing them with the execution result of the instruction inside the brackets. Integrate the result organically into the file context.
* **Feedback (`[!...]`)**: Use signal markers (e.g., `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`) to pass statuses, messages, and clarification requests directly in the target file.
* **Feedback Marker Format**: In Markdown (`.md`, `.txt`), write `[!...]` directly. In code, wrap in native comments (e.g., `// [!...]`, `# [!...]`, `<!-- [!... ] -->`, etc.). Conversation that does not directly concern the logic/text of the instruction is forbidden.
