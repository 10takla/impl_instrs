---
name: "impl-instrs-refactor-instrs"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

I will view the markdown file that needs to be translated.
# Instruction Refactoring

## Call Conditions
- [По явному вызову](<./main.md#по-явному-вызову>)
- [Реагирует на файлы инструкций](<./main.md#реагирует-на-файлы-инструкций>)

## Contents
# Skill: Instruction Refactoring

This skill provides a strict imperative algorithm for reorganizing and improving existing instruction files. Its primary goal is to preserve the semantics of the original instructions while improving file structure and ensuring strict context isolation for better task execution by agents.

## 📋 Strict Execution Algorithm

When this skill is invoked by the operator, strictly follow the step-by-step algorithm.

### Step 1: Source Data Analysis
1. Call `view_file` to read the target instruction files specified by the operator. If no files are specified, use `list_dir` or `grep_search` to find files matching the `ai_instrs` patterns.
2. Extract and record the original semantics, requirements, and logic from the instructions. No business requirement must be lost during refactoring.

### Step 2: Context Isolation Assessment
1. Analyze each instruction for the presence of conflicting or excessively detailed steps (for example, combining deep information retrieval and complex code writing in a single file).
2. **Splitting Rule:** If a detailed description of one step interferes with the focus on another, decide to split them into independent instructions.
3. Design a scenario where the operator can give the agent the first instruction, and after its complete execution in an isolated context, the second.

### Step 3: File Structure Design
1. Plan the new file and folder hierarchy.
2. **Path Constraints:** When mentioning paths to files and folders, use **only relative paths** (relative to the current location or target files). The use of absolute paths is strictly forbidden.
3. Ensure that new names match the instruction discovery patterns (for example, the `ai_instrs/` folder or the `.ai_instrs.md` file suffix).
4. **Artifacts:** If you need to create a plan, report, or script during the refactoring process, save it in the `./ai_artifacts/` directory (relative to the instruction file or current location).

### Step 4: Applying Changes
1. Use `write_to_file` to create new instruction files and `replace_file_content` (or `multi_replace_file_content`) to update existing ones.
2. When creating links between instructions, use the markdown format strictly adhering to angle brackets for paths: `[Название шага](<относительный_путь_к_файлу>)`.
3. Ensure that files are physically separated according to the plan from Step 2, preventing context contamination.

### Step 5: Verification
1. Compare the result with the original semantics recorded in Step 1.
2. Ensure that the meaning of the instructions is preserved 100%, and the changes only affected the structure and focus distribution.
3. Output a change report for the operator and provide instructions (or links to them) for further use.