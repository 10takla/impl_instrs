---
name: "impl-instrs:simultaneous-update-instrs-result"
description: "DO NOT TRIGGER AUTOMATICALLY. Workflow for explicit invocation only via /slash command. Simultaneous update of instructions and the result. CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even for simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

Execute `[impl-instrs:instrs-write](slashCommand;impl-instrs:instrs-write)` to formulate or update the applicable instruction.

Then execute `[impl-instrs:instr-execution](slashCommand;impl-instrs:instr-execution)` to carry out the current instruction.
