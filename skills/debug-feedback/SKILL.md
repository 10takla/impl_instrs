---
name: impl-instrs:debug-feedback
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Explain, justify, and debug the execution and creation of implementation instructions. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Debug and Feedback

Use this skill to analyze execution errors, discrepancies between code and instructions, and to justify decisions made.

## When to Use
* **Explicit Operator Invocation**: When the user requests an explanation ("why was it done this way?", "explain the logic of the solution", "why did this error occur?").
* **Reacts to Instruction Files**: When resolving errors in instruction files or debugging discrepancies in the working directory.

## When Not to Use
* During normal, conflict-free code writing or creation of new instructions.

## Core Rules

### 1. Justification of Results
* The agent must be able to explain which specific line or section of the instruction influenced the decision made.
* Answers must refer to specific instruction files using relative paths.

### 2. Failure Analysis
* In case of compilation errors or incorrect code operation, correlate the problem with the instructions. Identify whether the instruction was ambiguous, incomplete, or outdated.
* Suggest precise formulations for fixing instructions to avoid similar errors in the future.

### 3. Passing Feedback via Markers
* Upon detecting risks, lacking context, or needing to explain logic, use signal markers `[!...]` (e.g., `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`).
* Embed markers directly into the target files: in Markdown as direct text (`[!AI-INFO] ...`), in code and configs wrapped in native comments (e.g., `// [!AI-WARNING] ...`).
* The content of the marker must strictly relate to the logic or text of the instruction. Conversing about anything other than the instruction is forbidden.
