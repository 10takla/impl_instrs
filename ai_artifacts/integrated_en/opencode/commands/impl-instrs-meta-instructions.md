---
name: "impl-instrs-meta-instructions"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

**Related rules:**
- /impl-instrs-instruction-style
- /impl-instrs-workspace

# Meta-Instructions

Create and modify instructions at any level, including instructions that govern the formation and modification of other instructions.

## Algorithm

1. Determine the level of the target instruction and the object whose behavior it governs.
2. Study related instructions at the same, higher, and lower levels. Establish the boundary of responsibility for the target instruction and exclude overlaps with their logic.
3. Separate the requirements for the instruction text from the task described in it. Form the instruction without executing that task.
4. Transform each requirement into an unambiguous executable directive at the level of the target instruction.
5. For an instruction that governs other instructions, specify actions over their content, structure, connections, or verification. Do not substitute these actions with executing the tasks that the governed instructions describe.
6. Reference a related instruction instead of repeating its rules.
7. Verify that the result covers the specified level, maintains the established boundary of responsibility, and contains no requirements for unrelated levels.
