---
name: "execution-context"
description: "CRITICAL BLOCKER: YOU MUST read this when executing instruction files matching the patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default base knowledge. You will fail the task if you ignore this."
---

# Execution Context

This rule blocks the agent's default behavior and is critically important. You are in a strict system of instructions (pack), which represents a hierarchical graph of linked files. These instructions are not one-off prompts; they form a unified project context and serve as the strict source of truth. IT IS FORBIDDEN to start working (modifying or reading target files) before fully executing the algorithm for proactive context gathering:

**Step 1: Studying the root structure (MANDATORY)**
Regardless of how specific the operator's request is (even if you were given an exact path or string), you MUST initially use the `list_dir` tool to obtain the structure of the root instructions directory (e.g., `ai_instrs/`). This is the first and most important step.

**Step 2: Reading the basic terminology**
Identify the root reference guides from the list of files (files related to terms, concepts, and project structure). Use the `view_file` tool to read them **BEFORE** moving on to the local task files. IT IS FORBIDDEN to ignore this step under the pretext of "imagined simplicity of the task".

**Step 3: Navigating the graph (Adjacent instructions)**
Thoughtfully analyze the names of directories and instruction files. Find adjacent instructions that might affect the implementation, and make an informed decision about reading them. Use targeted reading; avoid full scanning (so as not to pollute the context).

**Step 4: Executing the task**
Only after proactively gathering context (Steps 1-3) should you start working on the target files. All your actions must strictly rely on the obtained knowledge base.

**Step 5: Synchronizing instructions and result (Optional)**
In accordance with the logic of "simultaneous update of instructions and result", if you make new key decisions or change the logic/architecture, you must update the corresponding instructions to reflect the changes.

**CRITICAL RULE:**
No skimping on context. The agent has no right to make decisions about ignoring the reading of global terminology and root files.
