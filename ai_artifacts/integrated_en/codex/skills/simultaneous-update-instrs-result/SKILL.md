---
name: "simultaneous-update-instrs-result"
description: "CRITICAL BLOCKER: YOU MUST read this before ANY interaction (even simple typo fixes) with files and folders matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. The file contains non-standard rules that override your default baseline knowledge. You will fail the task if you ignore this."
---

**Related rules:** $impl-instrs:instruction-style, $impl-instrs:workspace.

Execute `$impl-instrs:instrs-write` to author or update the applicable instruction.

Then execute `$impl-instrs:instr-execution` to execute the current instruction.
