---
name: "simultaneous-update-instrs-result"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Simultaneous update of instructions and the result. CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

# Simultaneous Update of Instructions and Result

## Concept
Any agent decisions made during the modification of source code or other implementation results must be immediately reflected in the instruction files. The instructions form a unified project context and act as a strict source of truth. The agent is obliged to maintain the code and instructions in a fully synchronized state.

## Mandatory Step-by-Step Algorithm

You must strictly adhere to the following sequence of actions for every invocation:

**Step 1: Obtain Global Context.** Before starting any changes, use the `list_dir` tool to explore the root directory of the instructions (e.g., `ai_instrs/`). This action is mandatory, even if the operator provided exact paths. Do not skimp on context.

**Step 2: Read Base Terminology.** Based on the obtained directory tree, find and read the root reference files (glossaries, general rules, structures). Do this before proceeding to the local task files.

**Step 3: Study Target Files.** Read the target instruction files affected by the current task, as well as related instructions discovered in Steps 1 and 2.

**Step 4: Make Changes to the Result.** Complete the assigned task by modifying the target source code or other implementation artifact.

**Step 5: Analyze the Decisions Made.** Formulate for yourself what new decisions, approaches, or architectural nuances were applied when modifying the code in Step 4.

**Step 6: Update Instructions.** Immediately edit the relevant instruction files so that they accurately describe the current state of the implementation and include the decisions identified in Step 5. Update the instructions simultaneously with the code changes.

**Step 7: Final Validation.** Ensure that the updated code and updated instructions do not contradict the global context (Step 2) and form a single, consistent system.
