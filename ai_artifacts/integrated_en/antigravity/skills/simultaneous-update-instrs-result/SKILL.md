---
name: "impl-instrs:simultaneous-update-instrs-result"
description: ""
---

**Related rules:**
- [impl-instrs:instruction-style](rule;impl-instrs:instruction-style)
- [impl-instrs:workspace](rule;impl-instrs:workspace)

## Algorithm

1. Execute [impl-instrs:instrs-write](slashCommand;impl-instrs:instrs-write) to form or update the applicable instruction.
2. After formation is complete, execute [impl-instrs:instr-execution](slashCommand;impl-instrs:instr-execution) to execute the current instruction.
