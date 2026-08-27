---
name: "impl-instrs:refactor-instrs"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

This skill provides a strict imperative algorithm for reorganizing and refining existing instruction files. Its primary goal is to preserve the semantics of source instructions while improving file structure and ensuring strict context isolation for superior agent task execution.

## 📋 Strict Execution Algorithm

Upon invocation of this skill by the operator, strictly follow the step-by-step algorithm:

### Step 1: Source Data Analysis
1. Invoke `view_file` to read the target instruction files specified by the operator. If files are not specified, use `list_dir` or `grep_search` to find files matching `ai_instrs` patterns.
2. Extract and record the source semantics, requirements, and logic from the instructions. Not a single business requirement must be lost during refactoring.

### Step 2: Context Isolation Assessment
1. Analyze each instruction for conflicting or overly detailed stages (e.g., combining deep information search and complex code authoring in a single file).
2. **Splitting Rule:** If the detailed description of one step interferes with focus on another, make the decision to split them into independent instructions.
3. Design a scenario where the operator can provide the agent with the first instruction, and upon its full completion in an isolated context — the second.

### Step 3: File Structure Design
1. Plan the new file and folder hierarchy.
2. **Path Constraints:** When mentioning paths to files and folders, use **only relative paths** (from the current location or target files). The use of absolute paths is strictly prohibited.
3. Ensure new names match instruction discovery patterns (e.g., `ai_instrs/` folder or `.ai_instrs.md` file suffix).
4. **Artifacts:** If you need to create a plan, report, or script during refactoring, save it in the `./ai_artifacts/` directory (relative to the instruction file or current location).

### Step 4: Applying Changes
1. Use `write_to_file` to create new instruction files and `replace_file_content` (or `multi_replace_file_content`) to update existing ones.
2. When creating links between instructions, use Markdown format strictly adhering to angle brackets for paths: `[Step Name](<relative_path_to_file>)`.
3. Ensure files are physically separated according to the plan from Step 2, preventing context pollution.

### Step 5: Verification
1. Compare the result against the source semantics recorded in Step 1.
2. Verify that the meaning of the instructions is 100% preserved, and changes only affected structure and focus distribution.
3. Output a change report for the operator and provide instructions (or links to them) for further use.
