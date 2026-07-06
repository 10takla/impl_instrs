---
name: "instruction-style"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Strict Algorithm for Writing and Formatting Instructions

When creating or editing any instruction files, YOU MUST execute the following algorithm line by line:

## STEP 1: Ensure "Target Completeness"
1. Analyze the input requirements.
2. Exclude any fabricated details added for the sake of perceived "objective completeness" or an ideal specification template.
3. Keep ONLY those facts, meanings, and constraints that directly convey the vision of the task.

## STEP 2: Compress to "Conciseness"
1. Rewrite all retained thoughts as directly and briefly as possible.
2. Remove verbal "fluff", introductory words, and lengthy reasoning.
3. Ensure that for each semantic unit, there is exactly one unambiguous formulation. Not a single word should take up space unnecessarily.

## STEP 3: Calibrate the Level of Generalization
For each formulated rule, check its level of abstraction:
1. **Search for over-specification:** Ensure that a general rule is NOT described using terms of a specific example. If it is — generalize the formulation.
2. **Search for over-abstraction:** Ensure that the rule is NOT disconnected from the actual context of the instruction. If it has become vague — make it more specific.
*The rule must be generalized to exactly the level at which the instruction itself resides.*

## STEP 4: Adjust the Boundaries (Positive / Negative prompts)
1. Assess the risk of a critical agent error when executing the instruction.
2. If the risk is high, add a strict negative prompt (prohibition) as a boundary of what is allowed.
3. IT IS FORBIDDEN to duplicate the same meaning in both a positive and negative way (this wastes tokens).
4. If strict control is not required, use neutral notifications instead of directive prompts.

## STEP 5: Use Imperative Style
1. Formulate all instructions in the imperative mood (e.g., "Execute...", "Write...", "Verify...").
2. Avoid neutral or descriptive constructions like "You need to execute..." or "It is recommended to check...".

