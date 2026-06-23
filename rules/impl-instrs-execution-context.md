---
description: "When executing instruction files. CRITICAL BLOCK: You MUST read this via view_file before ANY interaction (even fixing typos) with files/folders matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. Contains non-standard rules that override your default knowledge. You will fail the task if you skip this."
trigger: model_decision
---

## Execution Context

The agent must understand the context of working with the pack when working with instructions. Any actions and decisions of the agent must align with the goals recorded in the instructions.

## Updating Instructions

The agent's work and the instructions are inextricably linked. Any key **decisions** made by the agent during the process must be reflected in the instructions in a timely manner. 

When making decisions, the agent must:
1. Keep the instruction workflow format in mind.
2. Update the corresponding instructions if the project's logic or architecture changes.
3. Document new requirements or agreements established during the session.
