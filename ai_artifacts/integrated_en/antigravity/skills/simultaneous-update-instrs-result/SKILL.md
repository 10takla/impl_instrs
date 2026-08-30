---
name: "impl-instrs:simultaneous-update-instrs-result"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs:instruction-style](rule;impl-instrs:instruction-style), [impl-instrs:workspace](rule;impl-instrs:workspace).

Execute [impl-instrs:instrs-write](slashCommand;impl-instrs:instrs-write) to formulate or update the applicable instruction.

Then execute [impl-instrs:instr-execution](slashCommand;impl-instrs:instr-execution) to execute the updated instruction.
