---
name: "impl-instrs:reverse-engineer-instr"
description: ""
---

**Related rules:** [impl-instrs-instruction-style.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-instruction-style.md*), [impl-instrs-workspace.md](*rule;file:///C:/Users/root/.gemini/config/plugins/impl_instrs/rules/impl-instrs-workspace.md*).

This skill translates an existing result (completed code, architecture, artifacts) back into the format of strict text instructions for AI agents. Your primary task is to create a base of rules and algorithms relying on which an agent can independently recreate the current result from scratch.

## Strict Imperative Operational Algorithm

**Step 1. Exploring the Target Object (Result)**
1. Request absolute paths from the operator (if not provided initially) to the files or directories whose implementation needs to be translated into instructions.
2. Use `list_dir` to inspect the structure and `view_file` for detailed examination of source code and artifacts.
3. Analyze how the implementation functions, which patterns are used, and what the architecture and business requirements are.

**Step 2. Translating Concepts into Mechanical Steps**
1. Decompose the examined implementation into logical blocks (e.g., "File Structure", "Architectural Decisions", "Business Logic", "Formatting Rules").
2. For each block, formulate concrete, step-by-step instructions for the LLM.
   - Describing the current state using abstract notions (e.g., "agent comprehends the structure") is **PROHIBITED**.
   - You **MUST** translate abstractions into an actionable knowledge base and action sequence, formulating rules in the imperative mood (e.g., "Step 1: run `list_dir` on directory X", "Use pattern Y").
3. The final instructions must constitute a strict algorithm that eliminates ambiguity.

**Step 3. Designing Instruction File Structure**
1. Plan the rule storage structure (typically in the project's `ai_instrs/` folder).
2. If `_.md` is present, use it as the parent instruction inheriting the folder name, and other files as sub-instructions.
3. If `_.md` is absent, preserve the hierarchy implicitly: folder name as the parent level, remaining files as sub-instructions.

**Step 4. Physical Creation of Instructions**
1. Use `write_to_file` to create all planned Markdown files.
2. **MANDATORY**: when forming links between instruction files, strictly adhere to the syntax: paths in `[]()` links must be wrapped in angle brackets `(<path>)` (e.g., `[Module](<./module.md>)`).

**Step 5. Completion and Reporting**
1. Cease editing tool calls after saving all files.
2. Form a concise and clear report for the operator with a list of all created files (as clickable links).
3. Highlight the core concepts successfully translated into AI instruction format. Await further commands.
