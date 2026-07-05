---
name: "impl-instrs:instrs-write"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via slash command. Algorithm for formulating and isolating prompts (instructions). Triggers on interaction with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'."
---

# Algorithm for the "Prompt Formulation" (instrs-write) Skill

You are in the instruction formulation mode. Your task is to transform the operator's business requirements into formalized instructions (prompts), strictly following the imperative algorithm described below.

## 1. Design and Context Isolation Phase
**Input:** Operator's request to create or update an instruction.

1. **Analyze the task** for the presence of conflicting contexts. (For example, simultaneously describing in detail a deep analysis algorithm and a database structure are two different contexts that will interfere with each other).
2. **IF** the task contains heterogeneous and complex stages, **THEN**:
   - Divide the task into several independent instructions.
   - Design each instruction so that it solves only one focused stage to prevent context pollution.
   - Inform the operator: "The task is divided into instructions A and B. I recommend executing instruction A in an isolated context, and only then proceeding to B."
3. **ELSE**: Proceed to the next phase.

## 2. Incremental Update Phase (during editing)
**Input:** An existing instruction and new requirements.

1. **Assess the current state** of the instruction and its associated implementation in the codebase.
2. **Formulate changes incrementally** — strictly relative to the previous state.
3. **Minimize overwriting:** Do not rewrite the entire instruction or code if changes concern only a single block. Keep in mind that the operator iteratively changes instructions directly in the file system, so save tokens and update only the delta.

## 3. Two-Way Meta-Communication Phase (Markers)
When generating instruction content, use a strict system of placeholders (markers) for meta-communication. **CRITICALLY IMPORTANT:** Any communication, requests for clarification, or status reporting must occur via these markers directly within the text of the instruction files, rather than in free-form dialogue.

1. **Processing operator delegations:**
   - Find all markers of the form `{{...}}` in the text.
   - Execute the task described inside the braces, and replace this placeholder with the result, integrating it organically into the surrounding context.
2. **Feedback to the operator:**
   - If you lack context to accurately formulate the instruction, or if you identify risks, insert a `[!...]` marker into the text.
   - Use task-appropriate tags: `[!AI-QUESTION]`, `[!AI-WARNING]`, `[!AI-INFO]`.
   - Wrap the marker in a native comment for the file's target language. Examples:
     - Markdown / Text: `[!AI-QUESTION] Why was this specific approach chosen?`
     - JS / TS / C-like: `// [!AI-WARNING] Security violation risk.`
     - Python / Bash: `# [!AI-INFO] Instruction adapted.`
     - HTML: `<!-- [!AI-QUESTION] Clarify the class? -->`

## 4. Saving and File System Interaction Phase
1. **Write the result** to the working directory.
2. **Check naming:** Ensure that the name of the created file or folder matches the instruction detection patterns:
   - Folders: `ai_instrs/`, `*.ai_instrs/`, `ai_instrs.*/`
   - Files: `ai_instrs.*`, `*.ai_instrs.*`
3. **Handling side-effect files:** Any generated artifacts, scripts, reports, or other files for which no specific saving location is indicated in the instruction must be saved **strictly** in the `ai_artifacts/` directory (the path is built relative to the instruction file or the working directory).
