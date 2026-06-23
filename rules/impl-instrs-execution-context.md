---
description: "When executing instruction files. CRITICAL BLOCK: You MUST read this via view_file before ANY interaction (even fixing typos) with files/folders matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. Contains non-standard rules that override your default knowledge. You will fail the task if you skip this."
trigger: model_decision
---

## Execution Context

The agent must be aware of the global context of working with instructions.

### The Concept of an Instruction

Within this project, an **instruction** is a structural element of the system (the pack), formatted as a file and connected to other instructions in a hierarchical graph.

Instructions are not isolated, one-off prompts. They form a unified project context and serve as a strict single source of truth. Any agent actions must rely on this context and strictly align with the goals established in the instructions.

### Proactive Context Gathering

Before executing a task, the agent is required to proactively gather context. Relying on the file structure of the instructions, the agent must thoughtfully analyze the names of directories and instruction files to assess their relevance. It is necessary to find useful information in adjacent instructions and root reference files, making well-weighed decisions about whether to read them. This allows the agent to navigate without explicit links and avoid blind scanning, thereby preventing context pollution.

To implement this rule, the agent **must primarily use file system exploration tools** (e.g., `list_dir`) to obtain the overall structure of working directories (such as `ai_instrs/`).

Before executing a task, the agent is strictly required to proactively gather context, starting from the root level, regardless of how specific the request is.

1. **Mandatory Root Exploration:** Even if the operator has provided an exact path to a file or a specific line, the agent **MUST primarily use file system exploration tools** (e.g., `list_dir`) to obtain the structure of the root instruction directory (e.g., `ai_instrs/`).
2. **Reading Basic Terminology:** The agent must identify and read root reference files (primarily those related to terms, concepts, and structure) **before** proceeding to the local files specified in the task.
3. **No Skimping on Context:** The perceived simplicity of a task cannot serve as an excuse for skipping the reading of global terminology and root files. The agent has no right to make decisions about ignoring them.

## Updating Instructions

The agent's work and the instructions are inextricably linked. Any key **decisions** made by the agent during the process must be reflected in the instructions in a timely manner. 

When making decisions, the agent must:
1. Keep the instruction workflow format in mind.
2. Update the corresponding instructions if the project's logic or architecture changes.
3. Document new requirements or agreements established during the session.
