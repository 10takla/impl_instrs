---
name: "debug-feedback"
description: "CRITICAL BLOCK: YOU MUST read this before ANY interaction (even a simple typo fix) with files and folders matching these patterns: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. This file contains non-standard rules that override your default knowledge. You will fail the task if you ignore this."
disable-model-invocation: true
---

**Related rules:**
- /impl-instrs:instruction-style
- /impl-instrs:workspace

# Debug and Feedback

Explain the unsatisfactory result of instruction execution or formation and propose corrections to the instructions themselves.

## Algorithm

1. Determine whether the problem relates to executing an existing instruction or to forming its text.
2. Collect available facts: the operator's request, applicable instructions, the obtained result, error messages, logs, and artifacts. Do not fill in missing data with assumptions.
3. Reconstruct from available data the sequence of decisions that led to the result. Do not expose hidden internal reasoning; present only verifiable grounds and concise causal connections.
4. If the problem occurred during instruction execution:
   - compare the actual result against the instruction requirements;
   - find formulations, omissions, ambiguities, or contradictions that directed execution toward the unwanted result;
   - separate the instruction deficiency from an error not caused by its text.
5. If the problem occurred during instruction formation:
   - compare the source requirements against the produced instruction text;
   - check target completeness, conciseness, abstraction level, imperativeness, and absence of semantic repetition;
   - indicate which editorial decisions distorted, weakened, or supplemented the original requirements without justification.
6. For each conclusion, provide a specific fact and a reference to a file or rule. If confirmation is unavailable, mark the conclusion as unconfirmed and do not present it as the cause of the error.
7. Produce a report with the following sections:
   - subject of analysis and expected result;
   - confirmed facts;
   - causes of the unsatisfactory result;
   - proposals for correcting the instructions;
   - missing data, if it prevents an accurate conclusion.
8. For each proposal, indicate which cause it addresses. Provide a ready-made formulation, a Markdown fragment, or a diff block, but do not apply the proposed change.

## Constraints

- Do not modify instructions, code, configuration, artifacts, or other project files.
- Do not fix code and do not substitute instruction debugging with implementation debugging.
- Do not assert that an instruction caused an error without a confirmed connection between its wording and the result.
- Do not propose expanding the instruction's scope unless it is required to eliminate the identified cause.
- Return the report to the operator. Save it to a file only upon the operator's direct instruction and only at the specified path.
