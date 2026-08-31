---
name: "reverse-engineer-instr"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

**Related rules:**
- $impl-instrs:instruction-style
- $impl-instrs:workspace

# Instruction Reverse Engineering

1. Use the provided final result as the source for reverse transformation.
2. Extract only the reproducible requirements, decisions, constraints, and sequence of actions expressed in the result.
3. Translate the extracted content into an instruction, preserving the meaning of the result.
4. Do not add information that cannot be derived from the result.
5. Verify that the instruction describes how to produce the provided result and does not require modifying that result.
