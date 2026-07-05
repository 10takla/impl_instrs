# Workspace Agent Rules for Codex

Since Codex does not automatically load rule files from the plugin's `rules/` directory, you need to manually install these rules to ensure the agent operates under the correct execution context, instruction style, language formats, and workspace isolation guidelines.

## Installation Instructions

Choose one of the following methods to install the rules:

### Method 1: Local Project-Level Rules (Recommended)
Copy the rules below into files in the `.agents/` directory at the root of your workspace:
1. `.agents/impl-instrs-execution-context.md`
2. `.agents/impl-instrs-instruction-style.md`
3. `.agents/impl-instrs-language-formats.md`
4. `.agents/impl-instrs-workspace.md`

### Method 2: Global Rules
Copy the rules below into files in the `~/.codex/rules/` directory:
1. `~/.codex/rules/impl-instrs-execution-context.md`
2. `~/.codex/rules/impl-instrs-instruction-style.md`
3. `~/.codex/rules/impl-instrs-language-formats.md`
4. `~/.codex/rules/impl-instrs-workspace.md`

---

## Rule Definitions

### 1. Execution Context (`impl-instrs-execution-context.md`)

```markdown
---
trigger: "model_decision"
description: "CRITICAL BLOCKER: YOU MUST read this when executing instruction files matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Execution Context

This rule blocks the agent's default behavior and is critically important. You are in a strict system of instructions (pack), which represents a hierarchical graph of linked files. These instructions are not one-off prompts; they form a unified project context and serve as the strict source of truth. IT IS FORBIDDEN to start working (modifying or reading target files) before fully executing the algorithm for proactive context gathering:

**Step 1: Studying the root structure (MANDATORY)**
Regardless of how specific the operator's request is (even if you were given an exact path or string), you MUST initially use the `list_dir` tool to obtain the structure of the root instructions directory (e.g., `ai_instrs/`). This is the first and most important step.

**Step 2: Reading the basic terminology**
Identify the root reference guides from the list of files (files related to terms, concepts, and project structure). Use the `view_file` tool to read them **BEFORE** moving on to the local task files. IT IS FORBIDDEN to ignore this step under the pretext of "imagined simplicity of the task".

**Step 3: Navigating the graph (Adjacent instructions)**
Thoughtfully analyze the names of directories and instruction files. Find adjacent instructions that might affect the implementation, and make an informed decision about reading them. Use targeted reading; avoid full scanning (so as not to pollute the context).

**Step 4: Executing the task**
Only after proactively gathering context (Steps 1-3) should you start working on the target files. All your actions must strictly rely on the obtained knowledge base.

**Step 5: Synchronizing instructions and result (Optional)**
In accordance with the logic of "simultaneous update of instructions and result", if you make new key decisions or change the logic/architecture, you must update the corresponding instructions to reflect the changes.

**CRITICAL RULE:**
No skimping on context. The agent has no right to make decisions about ignoring the reading of global terminology and root files.
```

### 2. Instruction Style (`impl-instrs-instruction-style.md`)

```markdown
---
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
trigger: model_decision
---

# Strict Algorithm for Writing and Formatting Instructions

When creating or editing any instruction files, YOU MUST execute the following algorithm line by line:

## STEP 1: Ensure "Target Completeness"
1. Analyze the input requirements.
2. Exclude any fabricated details added for the sake of perceived "objective completeness" or an ideal specification template.
3. Keep ONLY those facts, meanings, and constraints that directly convey the vision of the task.

## STEP 2: Compress to "Conciseness"
1. Rewrite all retained thoughts as directly and briefly as possible.
2. Remove verbal "fluff", introductory words, and lengthy reasoning.
3. Ensure that for each semantic unit, there is exactly one unambiguous formulation. Not a single word should take up space unnecessarily.

## STEP 3: Calibrate the Level of Generalization
For each formulated rule, check its level of abstraction:
1. **Search for over-specification:** Ensure that a general rule is NOT described using terms of a specific example. If it is — generalize the formulation.
2. **Search for over-abstraction:** Ensure that the rule is NOT disconnected from the actual context of the instruction. If it has become vague — make it more specific.
*The rule must be generalized to exactly the level at which the instruction itself resides.*

## STEP 4: Adjust the Boundaries (Positive / Negative prompts)
1. Assess the risk of a critical agent error when executing the instruction.
2. If the risk is high, add a strict negative prompt (prohibition) as a boundary of what is allowed.
3. IT IS FORBIDDEN to duplicate the same meaning in both a positive and negative way (this wastes tokens).
4. If strict control is not required, use neutral notifications instead of directive prompts.
```

### 3. Language Formats (`impl-instrs-language-formats.md`)

```markdown
---
description: "Rule for formatting paths in Markdown files to preserve spaces"
trigger: glob
globs: "**/*.md"
---

## Language Formats: Markdown

- File paths in links `[]()` must be specified only in angle brackets `(<path>)` to preserve spaces.
```

### 4. Workspace (`impl-instrs-workspace.md`)

```markdown
---
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
trigger: model_decision
---

# Workspace

You are in an isolated workspace. You must strictly follow these algorithmic steps during any file operations.

## 1. File System Operations
**Step 1.1:** Separate read and write operations. Read operations (including those outside the working directory) are not restricted.
**Step 1.2:** When performing ANY write operations (creating, editing, deleting files), first verify that the target path is STRICTLY within the current working directory.
**Step 1.3:** FORBIDDEN to modify files outside the working directory.

## 2. Path Formatting
**Step 2.1:** When mentioning or outputting paths to files and folders of the working directory, it is STRICTLY FORBIDDEN to use absolute paths.
**Step 2.2:** Use exclusively one of two formats:
- Relative path from the root of the working directory.
- Relative path from the location of the current file.

## 3. Instruction Discovery
**Step 3.1:** If your task involves searching for or recognizing instructions, use strictly the following folder patterns for the search (where `<keyword>` is `ai_instrs`):
- `ai_instrs/`
- `*.<keyword>/` (for example: `name.ai_instrs/`)
- `<keyword>.*/` (for example: `ai_instrs.name/`)
*All files inside discovered folders are considered instructions.*

**Step 3.2:** Use strictly the following patterns for searching single instruction files:
- `ai_instrs.<extension>`
- `*.ai_instrs.<extension>`

## 4. Saving Artifacts
**Step 4.1:** If you generate files, scripts, reports, or other artifacts, and the context of the task does not specify a specific location to save them, you must save them in the `./ai_artifacts/` directory.
**Step 4.2:** The `./ai_artifacts/` path should be constructed relative to the instruction file (highest priority) or relative to the root of the working directory (if the instruction is not bound to a specific path).
```
