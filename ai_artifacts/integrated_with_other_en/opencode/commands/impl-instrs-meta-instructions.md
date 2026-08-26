---
name: "impl-instrs-meta-instructions"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

I will view the markdown file to be translated.
# Meta-instructions

## Invocation conditions
- [По явному вызову](<./main.md#по-явному-вызову>)
- [Реагирует на файлы инструкций](<./main.md#реагирует-на-файлы-инструкций>)

## Contents
# Meta-instructions

**Essence:** The ability to write instructions at any level, including instructions for instructions.

## Rigid imperative workflow

When receiving a task to create or modify a meta-instruction, strictly perform the following steps in the specified order:

### Step 1. Analysis of the current base
1. Detect and read existing rules using patterns of `ai_instrs` files and folders.
2. Determine which level of abstraction the task belongs to (for example, basic agent behavior, prompt writing rules, directory structure).
3. Check the concept for intersections with already existing instructions. Strictly observe the principle of isolated areas of responsibility.

### Step 2. Translation of concepts into algorithms
It is forbidden to transfer abstract business requirements directly. Translate each conceptual idea into an executable algorithm:
1. Replace abstract intentions (for example, "the agent must analyze the situation") with specific tool call steps (for example, "Step 1: Use tool X. Step 2: Perform search Y").
2. Formulate a single, clear, and unambiguous set of rules for the target object.
3. Describe activation triggers if the instruction should trigger automatically (in accordance with `trigger: model_decision` standards).

### Step 3. Interrelationships and reuse
1. If a new meta-instruction uses logic described in another instruction, use explicit links in the format `[Название](<Путь>)`.
2. Never duplicate logic from related objects.

### Step 4. Formatting and validation
1. Format the final document in Markdown with a mandatory YAML header (if applicable).
2. Make sure that the final text does not contain double interpretations, but represents a strict technical pipeline.

### Step 5. Application
1. Formulate a file name strictly corresponding to discovery patterns (for example, `название.ai_instrs.md`).
2. Save the file in the current directory using only allowed relative paths.