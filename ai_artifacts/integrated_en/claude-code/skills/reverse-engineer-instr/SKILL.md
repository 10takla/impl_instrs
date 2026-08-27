---
name: "reverse-engineer-instr"
description: ""
disable-model-invocation: true
---

**Related rules:** /impl-instrs:instruction-style, /impl-instrs:workspace.

This skill reverse-engineers an existing result (completed code, architecture, artifacts) back into the format of strict textual instructions for AI agents. Your primary objective is to create a foundation of rules and algorithms that enables an agent to independently recreate the current result from scratch.

## Strict Imperative Execution Algorithm

**Step 1. Study Target Object (Result)**
1. Request from the operator (if not provided initially) absolute paths to the files or directories whose implementation needs to be translated into instructions.
2. Use `list_dir` to inspect the structure and `view_file` to thoroughly study the source code and artifacts.
3. Analyze how the implementation operates, which patterns are used, the architecture, and business requirements.

**Step 2. Translate Concepts into Mechanical Steps**
1. Decompose the studied implementation into logical blocks (e.g., "File Structure", "Architectural Decisions", "Business Logic", "Styling Rules").
2. For each block, formulate concrete, step-by-step instructions for the LLM.
   - **DO NOT** describe the current state using abstract concepts (e.g., "agent understands the structure").
   - **MANDATORY**: Translate abstractions into an actionable knowledge base and actions; formulate rules in the imperative mood (e.g., "Step 1: Execute `list_dir` on directory X", "Use pattern Y").
3. Final instructions must represent a strict algorithm that eliminates ambiguity.

**Step 3. Design Instruction File Structure**
1. Plan the rule storage structure (typically in the project's `ai_instrs/` directory).
2. If `_.md` exists, use it as the parent instruction taking the directory name, and other files as its sub-instructions.
3. If `_.md` is absent, preserve the hierarchy implicitly: the directory name is the parent level, and other files are sub-instructions.

**Step 4. Physical Creation of Instructions**
1. Use `write_to_file` to create all planned Markdown files.
2. **MANDATORY**: When creating links between instruction files, strictly adhere to the syntax: paths in `[]()` links must be enclosed in angle brackets `(<path>)` (example: `[Module](<./module.md>)`).

**Step 5. Completion and Reporting**
1. Stop calling editing tools once all files are saved.
2. Form a concise and clear report for the operator with a list of all created files (as clickable links).
3. Specify the core concepts successfully translated into AI instruction format. Await further commands.
