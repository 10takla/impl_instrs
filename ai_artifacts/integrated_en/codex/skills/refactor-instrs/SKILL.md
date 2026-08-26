---
name: "refactor-instrs"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via slash command. Refactor instruction files to optimize structure and isolate context while preserving the original semantics. Trigger on files matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'"
---

# Skill: Refactor Instructions

This skill provides a strict imperative algorithm for reorganizing and improving existing instruction files. Its main goal is to preserve the semantics of the original instructions while improving the file structure and ensuring strict context isolation for better task execution by agents.

## 📋 Strict Execution Algorithm

When this skill is invoked by the operator, strictly follow the step-by-step algorithm.

### Step 1: Source Data Analysis
1. Invoke `view_file` to read the target instruction files specified by the operator. If no files are specified, use `list_dir` or `grep_search` to find files matching the `ai_instrs` patterns.
2. Extract and record the original semantics, requirements, and logic from the instructions. Not a single business requirement should be lost during refactoring.

### Step 2: Context Isolation Assessment
1. Analyze each instruction for conflicting or overly detailed stages (for example, combining deep information search and complex code writing in one file).
2. **Separation Rule:** If a detailed description of one step interferes with the focus on another, make a decision to separate them into independent instructions.
3. Design a scenario where the operator can give the agent the first instruction, and after its complete execution in an isolated context, the second one.

### Step 3: File Structure Design
1. Plan the new file and folder hierarchy.
2. **Path Constraints:** When mentioning paths to files and folders, use **only relative paths** (from the working directory or from files within it). The use of absolute paths is strictly prohibited.
3. Ensure that the new names match the instruction discovery patterns (for example, the `ai_instrs/` folder or the `.ai_instrs.md` file suffix).
4. **Artifacts:** If you need to create a plan, report, or script during the refactoring process, save it in the `./ai_artifacts/` directory (relative to the instruction file or the working directory).

### Step 4: Applying Changes
1. Use `write_to_file` to create new instruction files and `replace_file_content` (or `multi_replace_file_content`) to update existing ones.
2. When creating links between instructions, use the markdown format with strict adherence to angle brackets for paths: `[Step Name](<relative_file_path>)`.
3. Ensure that the files are physically separated according to the plan from Step 2, preventing context pollution.

### Step 5: Verification
1. Compare the result with the original semantics recorded in Step 1.
2. Ensure that the meaning of the instructions is 100% preserved, and the changes only affected the structure and focus distribution.
3. Output a report of changes for the operator and provide instructions (or links to them) for further use.
