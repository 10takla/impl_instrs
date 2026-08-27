---
name: "impl-instrs:meta-instructions"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

**Essence:** The capability to author instructions at any level, including instructions for instructions.

## Strict Imperative Operational Algorithm

Upon receiving a task to create or modify a meta-instruction, strictly execute the following steps in the specified order:

### Step 1. Analysis of Current Base
1. Discover and read existing rules using `ai_instrs` file and folder patterns.
2. Determine which level of abstraction the task belongs to (e.g., baseline agent behavior, prompt authoring rules, directory structure).
3. Verify the concept for absence of overlap with existing instructions. Strictly adhere to the principle of isolated areas of responsibility.

### Step 2. Translating Concepts into Algorithms
Directly transferring abstract business requirements is prohibited. Translate every conceptual idea into an executable algorithm:
1. Replace abstract intentions (e.g., "agent should analyze the situation") with concrete tool execution steps (e.g., "Step 1: Use tool X. Step 2: Execute search Y").
2. Formulate a unified, clear, and unambiguous set of rules for the target entity.
3. Describe activation triggers if the instruction should trigger automatically (in accordance with `trigger: model_decision` standards).

### Step 3. Interconnections and Reuse
1. If a new meta-instruction utilizes logic described in another instruction, use explicit links formatted as `[Title](<Path>)`.
2. Never duplicate logic from adjacent entities.

### Step 4. Formatting and Validation
1. Format the final document in Markdown format with mandatory YAML frontmatter (if applicable).
2. Ensure that the final text contains no ambiguities and constitutes a strict technical pipeline.

### Step 5. Application
1. Form a file name strictly matching discovery patterns (e.g., `name.ai_instrs.md`).
2. Save the file in the current directory using exclusively allowed relative paths.
