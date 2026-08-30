---
name: "impl-instrs-instr-context"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

# Instruction Context

## Conceptual Layer

- Treat the pack as a set of system prompts, and a skill as a logically structured block of the pack formatted according to strict rules.
- Treat the operator as the agent's user, and the agent as the AI executor of the operator's instructions.
- Treat the project as a combination of file structure and agent work results, the working directory as the current task execution directory, and an agent artifact as a reflection of instruction execution results in the file system.
- Treat a prompt and instruction as a directive to the agent for execution, a functional instruction as a transformation of input context into a result, and a meta-instruction as an instruction for instructions.
- Treat the instruction hierarchy as movement from general rules to more specific ones that refine them, and graph navigation as traversal of a network of Markdown links between instructions.
- Treat a positive prompt as a directive of desired actions, a negative prompt as a restriction, target completeness as transferring only a subjective vision without artificial details, and conciseness as direct and precise wording without unnecessary words.
- Treat instruction formation as their creation or modification, instruction execution as execution to a final result, and a decision as the result of formation or execution.
- Treat reverse engineering of instructions as translating a result back into instructions, and instruction refactoring as their rework while preserving semantics to improve the result.

## Unified Instruction System

- Treat each instruction as a structural element of the pack, formatted as a file and included in a connected instruction system, not as a one-off isolated prompt.
- Maintain a shared instruction context regardless of how instructions are distributed across directories and root groups.
- Account for hierarchical, adjacent, and reference connections established by links, shared terminology, or context.
- Treat applicable instructions as the strict source of truth. Align actions with the goals, constraints, and terms they define.

## Proactive Context Gathering

1. Before navigating to the file or fragment specified by the operator, explore the instruction file structure using an available tool such as list_dir and retrieve the structure of the root instruction directory.
2. Perform this step even when an exact path or line is specified and regardless of the apparent simplicity of the task.
3. Analyze directory and file names to identify potentially relevant base references and adjacent instructions.
4. Read terminology, concept, and structure references before reading local task instructions.
5. Find related instructions through links, shared terminology, context, and relationship types. Read only the materials needed to understand the task; do not scan instructions in a full sweep without necessity.
6. Execute the task only after collecting the applicable context.

## Scope Boundary

- Use this instruction only as a common conceptual layer and algorithm for proactive context gathering.
- Do not substitute it for operational procedures for forming, executing, updating, refactoring, or debugging instructions.
