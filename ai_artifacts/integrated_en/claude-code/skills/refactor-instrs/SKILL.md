---
name: "refactor-instrs"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

**Related rules:** /impl-instrs:instruction-style, /impl-instrs:workspace.

This skill provides a strict imperative algorithm for reorganizing and improving existing instruction files. Its primary goal is to preserve original instruction semantics while improving file structure and providing strict context isolation for higher-quality agent task execution.

## 📋 Strict Execution Algorithm

When this skill is invoked by the operator, strictly follow the step-by-step algorithm:

### Step 1: Initial Data Analysis
1. Call `view_file` to read the target instruction files specified by the operator. If files are not specified, use `list_dir` or `grep_search` to search for files matching `ai_instrs` patterns.
2. Extract and record the original semantics, requirements, and logic from the instructions. Not a single business requirement must be lost during refactoring.

### Step 2: Evaluating Context Isolation
1. Analyze each instruction for conflicting or overly detailed stages (e.g., combining deep information retrieval and complex code authoring in a single file).
2. **Separation Rule:** If a detailed description of one step hinders focus on another, decide to split them into independent instructions.
3. Design a workflow where the operator can provide the agent with the first instruction, and only after its complete execution in an isolated context, provide the second.

### Step 3: Designing File Structure
1. Plan the new file and directory hierarchy.
2. **Path Constraints:** When referencing paths to files and folders, use **only relative paths** (relative to the current location or target files). The use of absolute paths is strictly forbidden.
3. Ensure new names match instruction discovery patterns (e.g., `ai_instrs/` folder or `.ai_instrs.md` file suffix).
4. **Artifacts:** If you need to create a plan, report, or script during refactoring, save it in the `./ai_artifacts/` directory (relative to the instruction file or current location).

### Step 4: Applying Changes
1. Use `write_to_file` to create new instruction files and `replace_file_content` (or `multi_replace_file_content`) to update existing ones.
2. When creating links between instructions, use Markdown format with strict angle-bracket path enclosures: `[Step Name](<relative_path_to_file>)`.
3. Ensure files are physically separated according to the plan from Step 2, preventing context contamination.

### Step 5: Verification
1. Compare the result with the original semantics recorded in Step 1.
2. Ensure the meaning of instructions is 100% preserved, with changes affecting only structure and focus distribution.
3. Output a change report for the operator and provide instructions (or links to them) for further use.
