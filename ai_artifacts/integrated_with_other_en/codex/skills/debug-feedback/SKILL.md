---
name: "debug-feedback"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via slash command. Justification of the execution result and instruction formation. CRITICAL BLOCK: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

# Debug and Feedback

This skill is designed for step-by-step justification of the agent's decisions, providing feedback, and finding errors (debugging) in the processes of **execution** and **formation** of instruction files.

## Execution Algorithm

When explicitly invoked by the operator, strictly perform the following steps in the specified order:

### Step 1: Initialization and Context Gathering
1. Analyze the operator's request and determine the subject of debugging: the process of *execution* of existing instructions or the process of *formation* (creation/updating) of instructions.
2. Use `list_dir` to scan the working directory of instructions (including the `ai_instrs/` folder and its contents).
3. Read the root rules and terminology files related to the subject of the request (using `view_file`), before accessing local files and drawing conclusions. This is a critical requirement to prevent context loss.

### Step 2: Conducting Checks

**If the subject is Instruction Execution:**
1. Read the target instruction file and the source code (or artifact) that was generated according to this instruction.
2. Inspect your own reasoning/thoughts (thinking log) during the execution of the task. Your goal is to understand exactly how the current phrasing of the instructions led the agent to an undesirable result.
3. Analyze the instruction files themselves to determine exactly where they were inaccurate, ambiguous, or flawed (which caused the faulty logic).
4. Document all identified shortcomings in the instructions: absence of crucial constraints, abstract concepts instead of strict steps, contradictions, or lack of context.

**If the subject is Instruction Formation:**
1. Read the generated instruction text.
2. Check the structure: whether formatting rules, completeness, and conciseness are followed.
3. Check for the presence of abstract philosophical concepts instead of strict imperative steps. Document these as critical errors.
4. Ensure there are no violations of basic prompt writing rules (redundant positive phrasing, incorrect level of generalization).

### Step 3: Generating Error Report and Proposals
1. Form a structured report for the operator.
2. **Justification of Instruction Vulnerability:** Based on the analysis of your reasoning, explain why the instructions led the agent to an erroneous result (for example, "the instruction contains a contradictory requirement", "the constraint was described too abstractly, allowing it to be ignored").
3. Rely only on facts from the file system. Provide exact links to files in the format `[name](<relative/path/to/file.md>)`.
4. **Proposals for Instruction Correction:** Provide specific text to correct the problematic instructions (translating abstract rules into clear steps, adding new negative prompts, etc.). IT IS STRICTLY FORBIDDEN to make modifications independently — only propose them to the operator as text insertions (code snippets or diff blocks).

## Strict Constraints
- It is STRICTLY FORBIDDEN to modify any files in the workspace or perform code corrections during the debugging process. The agent is only permitted to read, analyze, and generate a text report with justifications and a plan.
- It is prohibited to use general phrases or assume system behavior without confirmation by facts from logs or instruction files.
- Any claim of violation must be accompanied by a link to a specific rule described in the official instructions (for example, rules of style, execution context, or workspace restrictions).
