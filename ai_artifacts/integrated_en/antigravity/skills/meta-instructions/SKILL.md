---
name: "impl-instrs:meta-instructions"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Write meta-instructions that define guidelines and formats for other instructions. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'."
---

# Meta-instructions

**Core:** The ability to write instructions at any level, including instructions for instructions.

## Strict Imperative Workflow Algorithm

Upon receiving a task to create or modify a meta-instruction, strictly execute the following steps in the specified order:

### Step 1. Analysis of Current Base
1. Discover and read existing rules using the `ai_instrs` file and directory patterns.
2. Determine to which abstraction level the task belongs (e.g., core agent behavior, prompt authoring rules, directory structure).
3. Check the concept for absence of overlaps with already existing instructions. Strictly adhere to the principle of isolated areas of responsibility.

### Step 2. Translation of Concepts into Algorithms
Direct transfer of abstract business requirements is prohibited. Translate every conceptual idea into an executable algorithm:
1. Replace abstract intentions (e.g., "the agent should analyze the situation") with specific tool invocation steps (e.g., "Step 1: Use tool X. Step 2: Perform search Y").
2. Formulate a single, clear, and unambiguous set of rules for the target object.
3. Describe activation triggers if the instruction must trigger automatically (in accordance with `trigger: model_decision` standards).

### Step 3. Interconnections and Reuse
1. If a new meta-instruction uses logic described in another instruction, use explicit links in the format `[Name](<Path>)`.
2. Never duplicate logic from adjacent objects.

### Step 4. Formatting and Validation
1. Format the final document in Markdown with a mandatory YAML frontmatter (if applicable).
2. Ensure that the final text does not contain ambiguous interpretations, but represents a strict technical pipeline.

### Step 5. Application
1. Formulate a file name strictly matching discovery patterns (e.g., `name.ai_instrs.md`).
2. Save the file in the working directory using exclusively allowed relative paths.
