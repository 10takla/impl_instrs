---
name: "simultaneous-update-instrs-result"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

# Simultaneous Update of Instructions and Result

## Trigger Conditions
- [On explicit call](<./main.md#по-явному-вызову>)
- [Triggers on instruction files](<./main.md#реагирует-на-файлы-инструкций>)

## Contents
# Simultaneous Update of Instructions and Result

## Concept
Any decisions made by the agent during the modification of source code or other implementation results must be immediately reflected in the instruction files. Instructions form a single project context and act as a strict source of truth. The agent is obliged to keep the code and instructions in a fully synchronized state. 

## Mandatory Step-by-Step Algorithm

You are required to strictly follow the sequence of actions below on every call:

**Step 1: Retrieving Global Context.** Before proceeding with any changes, use the `list_dir` tool to inspect the root directory of the instructions (for example, `ai_instrs/`). This action is mandatory, even if the operator has provided exact paths. No economizing on context.

**Step 2: Reading Base Terminology.** Based on the obtained directory tree, find and read the root reference files (glossaries, general rules, structures). Do this before moving to the local task files.

**Step 3: Studying Target Files.** Read the target instruction files affected by the current task, as well as adjacent instructions discovered in steps 1 and 2.

**Step 4: Making Changes to the Result.** Perform the assigned task by modifying the target source code or other implementation artifact.

**Step 5: Analyzing Decisions Made.** Formulate for yourself what new decisions, approaches, or architectural nuances were applied when modifying the code in Step 4.

**Step 6: Updating Instructions.** Immediately edit the relevant instruction files so that they accurately describe the current state of implementation and include the decisions identified in Step 5. Update the instructions simultaneously with the code changes.

**Step 7: Final Validation.** Make sure that the updated code and updated instructions do not contradict the global context (Step 2) and form a single, consistent system.