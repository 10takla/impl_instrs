---
name: "debug-feedback"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** $impl-instrs:instruction-style, $impl-instrs:workspace.

This skill is designed for step-by-step justification of agent decisions, providing feedback, and debugging errors in the processes of **executing** and **authoring** instruction files.

## Execution Algorithm

When explicitly invoked by the operator, strictly perform the following steps in the specified order:

### Step 1: Initialization and Context Gathering
1. Analyze the operator's request and determine the subject of debugging: the process of *executing* existing instructions or the process of *authoring* (creating/updating) instructions.
2. Use `list_dir` to scan the current directory containing instructions (including the `ai_instrs/` directory and its contents).
3. Read the root rule and terminology files relevant to the subject of the request (using `view_file`) before accessing local files and drawing conclusions. This is a critical requirement to prevent context loss.

### Step 2: Conducting Checks

**If the subject is Instruction Execution:**
1. Read the target instruction file and the source code (or artifact) generated according to this instruction.
2. Analyze your own reasoning/thoughts (thinking log) during task execution. Your goal is to understand exactly how the current phrasing of the instructions led the agent to an undesirable result.
3. Analyze the instruction files themselves to determine exactly where they were inaccurate, ambiguous, or flawed (which caused the faulty logic).
4. Record all identified defects in the instructions: absence of critical constraints, abstract concepts instead of strict steps, contradictions, or lack of context.

**If the subject is Instruction Authoring:**
1. Read the generated instruction text.
2. Verify the structure: ensure formatting rules, completeness, and conciseness are adhered to.
3. Check for the presence of abstract philosophical concepts instead of strict imperative steps. Record them as critical errors.
4. Ensure there are no violations of basic prompt-writing rules (redundant positive phrasing, incorrect level of generalization).

### Step 3: Generating Error Report and Proposals
1. Form a structured report for the operator.
2. **Justification of Instruction Vulnerabilities:** Based on the analysis of your reasoning, explain why the instructions led the agent to an erroneous result (for example, "the instruction contains a contradictory requirement", "the constraint was described too abstractly, allowing it to be ignored").
3. Rely strictly on facts from the file system. Provide exact links to files in the format `[name](<relative/path/to/file.md>)`.
4. **Proposals for Instruction Correction:** Provide concrete phrasing to correct problematic instructions (translating abstract rules into clear steps, adding new negative prompts, etc.). IT IS STRICTLY FORBIDDEN to make modifications independently — only propose them to the operator as text insertions (code templates or diff blocks).

## Strict Constraints
- It is STRICTLY FORBIDDEN to modify any project files independently or perform code corrections during the debugging process. Only reading, analysis, and generating a text report with justifications and a plan are permitted.
- Prohibit using generic phrases or assuming system behavior without confirmation by facts from logs or instruction files.
- Accompany any claim of violation with a link to a specific rule described in the official instructions (for example, style rules, execution context, or workspace constraints).
