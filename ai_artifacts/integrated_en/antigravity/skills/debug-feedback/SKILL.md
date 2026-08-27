---
name: "impl-instrs:debug-feedback"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

This skill is designed for step-by-step reasoning justification of agent decisions, providing feedback, and debugging errors in the processes of instruction file **execution** and **authoring**.

## Execution Algorithm

Upon explicit invocation by the operator, strictly execute the following steps in the specified order:

### Step 1: Initialization and Context Gathering
1. Analyze the operator's request and determine the debugging subject: the process of *executing* existing instructions or the process of *authoring* (creating/updating) instructions.
2. Use `list_dir` to scan the current directory with instructions (including the `ai_instrs/` folder and its contents).
3. Read the root rule and terminology files relevant to the subject of the request (using `view_file`) before accessing local files and drawing conclusions. This is a critical prerequisite to prevent loss of context.

### Step 2: Conducting Checks

**If the subject is Instruction Execution:**
1. Read the target instruction file and the source code (or artifact) generated according to this instruction.
2. Analyze your own reasoning/thinking log when executing the task. Your goal is to understand exactly how the current instruction wording led the agent to an undesirable result.
3. Analyze the instruction files themselves to identify where they were inaccurate, ambiguous, or erroneous (which caused the faulty logic).
4. Record all identified deficiencies in the instructions: missing critical constraints, abstract concepts instead of strict steps, contradictions, or lack of context.

**If the subject is Instruction Authoring:**
1. Read the generated instruction text.
2. Verify structure: check whether formatting rules, completeness, and conciseness are maintained.
3. Check for abstract philosophical concepts instead of strict imperative steps. Record them as critical errors.
4. Ensure there are no violations of base prompt authoring rules (redundant positive phrasing, incorrect level of generalization).

### Step 3: Error Report and Proposal Generation
1. Generate a structured report for the operator.
2. **Justification of instruction vulnerability:** Based on the reasoning analysis, explain why the instructions led the agent to an erroneous result (e.g., "the instruction contains a contradictory requirement", "the constraint was described too abstractly, allowing it to be ignored").
3. Rely strictly on facts from the file system. Provide exact file links in the format `[name](<relative/path/to/file.md>)`.
4. **Proposals for instruction fixes:** Provide concrete formulations to fix problematic instructions (translating abstract rules into clear steps, adding new negative prompts, etc.). Self-modifying files is STRICTLY PROHIBITED — only propose changes to the operator as text inserts (code templates or diff blocks).

## Strict Constraints
- Making any modifications to project files or fixing code directly during the debugging process is STRICTLY PROHIBITED. Only reading, analysis, and generating a textual report with rationale and a plan are permitted.
- Using generic phrases or assuming system behavior without factual confirmation from logs or instruction files is prohibited.
- Any statement regarding a violation must be accompanied by a reference to a specific rule described in the official instructions (e.g., style rules, execution context, or workspace constraints).
