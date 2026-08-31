---
name: "impl-instrs:refactor-instrs"
description: ""
---

**Related rules:**
- [impl-instrs:instruction-style](rule;impl-instrs:instruction-style)
- [impl-instrs:workspace](rule;impl-instrs:workspace)

# Instruction Refactoring

Rework existing instructions, preserving their semantics and improving the agent's focus during subsequent execution.

## Algorithm

1. Read the instructions to be refactored and extract all requirements, constraints, connections, and action sequences they contain.
2. Check whether a single instruction combines complex stages with differing contexts. Treat splitting as justified only when the details of one stage prevent the agent from focusing on another; do not split tasks mechanically.
3. If splitting is justified, extract stages into separate instructions following the file model from [impl-instrs:workspace](rule;impl-instrs:workspace). Organize them so the operator can pass each subsequent stage only after the previous one has been fully executed in an isolated context.
4. If splitting is not justified, keep the instruction as a single unit and improve only its structure and formulations.
5. Apply changes without adding, removing, or substituting any original meanings.
6. Compare the result against the original instructions. Complete refactoring only after verifying that every original meaning is preserved, the new structure conforms to [impl-instrs:workspace](rule;impl-instrs:workspace), and the file separation serves context isolation.
