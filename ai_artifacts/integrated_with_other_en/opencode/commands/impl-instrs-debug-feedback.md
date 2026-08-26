---
name: "impl-instrs-debug-feedback"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Debug and Feedback

## Invocation Conditions
- [По явному вызову](<./main.md#по-явному-вызову>)
- [Реагирует на файлы инструкций](<./main.md#реагирует-на-файлы-инструкций>)

## Contents
# Debug and Feedback

This skill is designed for step-by-step justification of the agent's decisions, providing feedback, and finding errors (debugging) in the processes of **execution** and **formation** of instruction files.

## Execution Algorithm

When explicitly invoked by the operator, strictly perform the following steps in the specified order:

### Step 1: Initialization and Context Gathering
1. Analyze the operator's request and determine the subject of debugging: the process of *execution* of existing instructions or the process of *formation* (creation/update) of instructions.
2. Use `list_dir` to scan the current directory with instructions (including the `ai_instrs/` folder and its contents).
3. Read the root rule and terminology files related to the subject of the request (using `view_file`) before accessing local files and drawing conclusions. This is a critical condition for preventing context loss.

### Step 2: Conducting Checks

**If the subject is Instruction Execution:**
1. Read the target instruction file and the source code (or artifact) that was generated based on this instruction.
2. Analyze your own reasoning/thoughts (thinking log) when executing the task. Your goal is to understand exactly how the current formulation of the instructions caused the agent to arrive at an undesirable result.
3. Analyze the instruction files themselves to determine exactly where they turned out to be inaccurate, ambiguous, or erroneous (which led to incorrect logic).
4. Record all identified deficiencies in the instructions: lack of important constraints, abstract concepts instead of strict steps, contradictions, or lack of context.

**If the subject is Instruction Formation:**
1. Read the generated instruction text.
2. Check the structure: whether the formatting rules, completeness, and conciseness are observed.
3. Check for the presence of abstract philosophical concepts instead of strict imperative steps. Record them as critical errors.
4. Ensure there are no violations of the basic rules of prompt writing (excessive positive formulations, incorrect level of generalization).

### Step 3: Generation of Error Report and Suggestions
1. Generate a structured report for the operator.
2. **Justification of instruction vulnerability:** Based on the analysis of your reasoning, explain why the instructions led the agent to an erroneous result (for example, "the instruction contains a contradictory requirement", "the constraint was described too abstractly, which allowed it to be ignored").
3. Rely only on facts from the filesystem. Specify exact links to files in the format [название](<относительный/путь/к/файлу.md>).
4. **Suggestions for correcting instructions:** Provide specific formulations for correcting problematic instructions (translation of abstract rules into clear steps, adding new negative prompts, etc.). It is FORBIDDEN to make changes independently — only suggest them to the operator in the form of text inserts (code templates or diff blocks).

## Strict Constraints
- It is FORBIDDEN to independently make any changes to the project files or perform code fixes during the debugging process. Only reading, analysis, and generation of a text report with justification and a plan are allowed.
- It is forbidden to use general phrases or assume system behavior without confirmation by facts from logs or instruction files.
- Any claim of violation must be accompanied by a link to a specific rule described in the official instructions (for example, style rules, execution context, or workspace constraints).