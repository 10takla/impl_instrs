---
name: "impl-instrs:instrs-write"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

**Related rules:**
- [impl-instrs:instruction-style](rule;impl-instrs:instruction-style)
- [impl-instrs:workspace](rule;impl-instrs:workspace)

# Instruction Formation

Form new instructions from the operator's requirements or update existing instructions according to those requirements.

## Formation and Execution Boundary

1. Work only with the instruction text: formulate, clarify, or modify it.
2. Do not execute the task described by the instruction being formed.
3. Transfer requirements for the agent's future result into the instruction text.

## Context Isolation

1. Identify the detailed stages of the task and assess whether information about one stage interferes with focus on another.
2. Split the task only when there is a context conflict; do not fragment it mechanically into separate instructions.
3. When a context conflict exists, form a separate instruction for each stage containing only the information relevant to that stage.
4. Record the isolated execution sequence via [!AI-INFO]: complete the first instruction in full before passing the next one to the agent.

## Incremental Update

1. Immediately before making changes, retrieve the current requirements and the current state of the instruction from their original sources; re-read the instruction file if it is stored in the file system.
2. Compare the current requirements against the current instruction and determine the necessary additions, modifications, and deletions.
3. Apply only the necessary delta and preserve all unaffected requirements and formulations.
4. If no existing instruction is present, form a new instruction from the current requirements.

## Placeholders and Feedback

1. Find all markers in the instruction being formed.
2. Treat all content inside each marker as a directive addressed to you for forming the instruction text, regardless of how it is phrased.
3. Resolve the directive only within the logic of instruction formation, embed the result into its text, and remove the processed marker.
4. Convey questions, warnings, explanations, and formation status only through [!...] markers inside the target file; do not surface them in free dialogue.
5. Place [!...] directly in Markdown and text files; in files of other formats, wrap it in a native comment of the target language.
6. Select the tag by purpose: [!AI-QUESTION] when context is lacking, [!AI-WARNING] when a risk is detected, or [!AI-INFO] for a reference note.
7. Use markers only for meta-information about the logic or text of the instruction being formed. Do not use them to execute the described task or for unrelated dialogue.

## Result Verification

1. Verify that the result contains an instruction and not the result of executing it.
2. Verify that separated instructions do not mix conflicting contexts.
3. When updating, compare the result against the current requirements and the original state of the instruction.
4. Verify that all processed markers are resolved and each [!...] relates only to instruction formation.
5. Commit the result to the file system in the format established for the target instruction system.
