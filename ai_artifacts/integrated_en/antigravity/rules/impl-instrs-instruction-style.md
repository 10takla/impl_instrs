---
name: "impl-instrs-instruction-style"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
trigger: "model_decision"
---

**Related rules:**
- [impl-instrs:instr-context](rule;impl-instrs:instr-context)

# Instruction Style

Execute the following steps when creating or modifying an instruction.

## 1. Ensure Target Completeness

1. Identify all goals, ideas, meanings, and intentions explicitly expressed in the source requirements.
2. Transfer each identified thought into the instruction with the level of detail it requires.
3. Do not add information for the sake of formal or comprehensive completeness.

## 2. Ensure Conciseness

1. Formulate each thought directly, precisely, and concisely.
2. Remove filler words, convoluted phrasing, and lengthy reasoning.
3. Express each thought in a single unambiguous formulation.
4. Preserve all target completeness while reducing the text.

## 3. Calibrate the Abstraction Level

1. Match each rule to the abstraction level of the target instruction.
2. Generalize the wording if the language of a specific case limits a broader rule.
3. Concretize the wording if it is detached from the subject of the instruction or allows vague interpretation.

## 4. Choose the Form of Directive

1. Use a positive directive if it unambiguously defines the required action.
2. Add a negative constraint if the positive directive is insufficient to prevent a critical error.
3. Do not duplicate the same meaning in both positive and negative directives simultaneously.
4. Use a neutral notice or omit the directive if guiding the agent's behavior is not required.

## 5. Use Imperative Style

1. Formulate directives in the imperative mood: "Execute", "Write", "Verify".
2. Replace descriptive constructions such as "needs to be done" and "it is recommended to check" with direct commands.

## 6. Verify the Result

1. Verify that the instruction conveys all original thoughts without invented details.
2. Verify that every word carries meaning and every thought is formulated unambiguously.
3. Verify that the abstraction level of each rule matches the level of the instruction.
4. Verify that all directives are imperative and that positive and negative formulations do not duplicate each other.
