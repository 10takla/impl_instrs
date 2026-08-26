---
name: "instruction-style"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

I will view the contents of the `temp_in.md` file to understand what needs to be translated.
# Instruction Style

## Invocation Conditions
- [Without explicit invocation](<./main.md#без-явного-вызова>)
- [Reacts to instruction files](<./main.md#реагирует-на-файлы-инструкций>)

## Content
When creating or editing any instruction files, YOU MUST execute the following algorithm line by line:

### STEP 1: Ensure "Target Completeness"
1. Analyze the input requirements.
2. Exclude any fabricated details added for the sake of perceived "objective completeness" or a template of an ideal task description.
3. Keep ONLY those facts, meanings, and constraints that directly convey the vision of the task.

### STEP 2: Compress to "Conciseness"
1. Rewrite all kept thoughts as directly and briefly as possible.
2. Remove verbal "padding", introductory words, and long reasoning.
3. Ensure that there is exactly one unambiguous formulation for each semantic unit. Not a single word should waste space.

### STEP 3: Calibrate the Level of Generalization
For each rule being formed, check its level of abstraction:
1. **Search for over-concretization:** Ensure that a general rule is NOT described in terms of a specific example. If it is, generalize the formulation.
2. **Search for over-abstraction:** Ensure that the rule is NOT detached from the real context of the instruction. If it has become vague, concretize it.
*The rule should be generalized exactly to the level of the instruction itself.*

### STEP 4: Configure the Framing (Positive / Negative Prompts)
1. Assess the risk of a critical agent error when executing the instruction.
2. If the risk is high, add a strict negative prompt (prohibition) as a boundary of what is allowed.
3. IT IS FORBIDDEN to duplicate the same meaning in both positive and negative ways (this wastes tokens).
4. If strict control is not required, use neutral notifications instead of directive prompts.

### STEP 5: Use Imperative Style
1. Formulate all instructions in the imperative mood (e.g., "Execute...", "Write down...", "Check...").
2. Avoid neutral or descriptive constructions like "It is necessary to execute..." or "It is recommended to check...".