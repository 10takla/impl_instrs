---
name: "meta-instructions"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

**Related rules:** /impl-instrs:instruction-style, /impl-instrs:workspace.

**Essence:** The ability to write instructions at any level, including instructions for instructions.

## Strict Imperative Execution Algorithm

When assigned to create or modify a meta-instruction, strictly execute the following steps in the specified order:

### Step 1. Analysis of the Existing Base
1. Discover and read existing rules using `ai_instrs` file and folder patterns.
2. Determine which level of abstraction the task belongs to (e.g., base agent behavior, prompt-writing rules, directory structure).
3. Verify the concept for absence of overlaps with existing instructions. Strictly adhere to the principle of isolated areas of responsibility.

### Step 2. Translating Concepts into Algorithms
Do not transfer abstract business requirements directly. Translate every conceptual idea into an executable algorithm:
1. Replace abstract intentions (e.g., "agent should analyze the situation") with concrete tool invocation steps (e.g., "Step 1: Use tool X. Step 2: Execute search Y").
2. Formulate a unified, clear, and unambiguous set of rules for the target object.
3. Describe activation triggers if the instruction must activate automatically (in accordance with `trigger: model_decision` standards).

### Step 3. Interconnections and Reuse
1. If a new meta-instruction utilizes logic described in another instruction, use explicit links in the format `[Name](<Path>)`.
2. Never duplicate logic from adjacent objects.

### Step 4. Formatting and Validation
1. Format the resulting document in Markdown with a mandatory YAML frontmatter (if applicable).
2. Ensure the resulting text contains no ambiguous interpretations and presents a strict technical pipeline.

### Step 5. Application
1. Form a filename that strictly conforms to discovery patterns (e.g., `name.ai_instrs.md`).
2. Save the file in the current directory using strictly permitted relative paths.
