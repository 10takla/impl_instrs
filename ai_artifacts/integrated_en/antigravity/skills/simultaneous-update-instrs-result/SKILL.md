---
name: "impl-instrs:simultaneous-update-instrs-result"
description: "CRITICAL BLOCK: You MUST read this before ANY interaction (even simple typo fixes) with files and folders matching patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

Execute `[impl-instrs:instrs-write](slashCommand;impl-instrs:instrs-write)` to generate or update the applicable instruction.

Then execute `[impl-instrs:instr-execution](slashCommand;impl-instrs:instr-execution)` to execute the up-to-date instruction.
