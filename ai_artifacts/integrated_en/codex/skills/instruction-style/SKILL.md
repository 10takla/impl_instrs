---
name: "instruction-style"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** $impl-instrs:instr-context.

When creating or editing any instruction files, YOU MUST execute the following algorithm line by line:

### STEP 1: Ensure "Target Completeness"
1. Analyze input requirements.
2. Exclude any fabricated details added for the sake of perceived "objective completeness" or an idealized spec template.
3. Retain ONLY those facts, meanings, and constraints that directly convey the vision of the task.

### STEP 2: Compress to "Conciseness"
1. Rewrite all retained thoughts as directly and concisely as possible.
2. Eliminate filler words, introductory phrases, and lengthy deliberations.
3. Ensure that each semantic unit has exactly one unambiguous formulation. Not a single word should occupy space in vain.

### STEP 3: Calibrate the Level of Generalization
For each rule being formed, verify its abstraction level:
1. **Check for over-concretization:** Ensure that a general rule is NOT described using terms of a specific example. If so, generalize the wording.
2. **Check for over-abstraction:** Ensure that the rule is NOT disconnected from the real context of the instruction. If it has become vague, concretize it.
*The rule must be generalized to precisely the level at which the instruction itself resides.*

### STEP 4: Configure Framing (Positive / Negative Prompts)
1. Evaluate the risk of critical agent error during instruction execution.
2. If the risk is high, add a strict negative prompt (prohibition) as an operational boundary.
3. DO NOT duplicate the same meaning in both positive and negative framings (this wastes tokens).
4. If strict control is not required, use neutral notices instead of directive prompts.

### STEP 5: Use Imperative Style
1. Formulate all directives in the imperative mood (e.g., "Execute...", "Write...", "Verify...").
2. Avoid passive, neutral, or descriptive constructions such as "It is necessary to execute..." or "It is recommended to verify...".
