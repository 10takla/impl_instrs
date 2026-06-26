---
description: "CRITICAL BLOCK: You MUST read this via view_file before ANY interaction (even fixing typos) with files/folders matching: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. Contains non-standard rules that override your default knowledge. You will fail the task if you skip this."
trigger: model_decision
---

## Principles

**The main rule of working with AI agents: Conciseness and Target Completeness.**

Experience in prompt engineering and maintenance shows that the best result is achieved through a balance of brevity and detail. However, the detail must be specific. 

### Target Completeness (information volume)

The usual approach requires "objective completeness" (describing the project in maximum detail according to all specifications), which often forces the author to invent details they hadn't even thought about. 

The correct approach is **"target (subjective) completeness"**. 
This means describing deeply and in detail *only what is actually in your head*: a specific goal, idea, meaning, and desires. There is no need to artificially inflate the prompt and write extra things just to make the description seem "correct" and comprehensive. Transfer solely your vision into the prompt.

### Conciseness (presentation format)

If completeness accounts for the quantity of necessary thoughts, then conciseness accounts for *how* exactly we describe them. It is not about brevity for the sake of brevity, but about precision: every word carries meaning, and none occupies space in vain. Once you have expressed your sincere, subjective vision, it needs to be shaped into a concise and precise form. Conciseness here means the absence of verbal "fluff", complex entangled phrasing, and lengthy discussions. One thought—one direct formulation.

The ideal prompt is when you have detailed and completely conveyed the entire volume of your thoughts and desires (target completeness), but done so using the most clear, precise, and short formulations (conciseness).

### Level of Generalization

The rule formulation must be generalized to the exact level of the instruction itself. The specific case from which the rule originated should not narrow the formulation below the instruction's level, nor should it be abstracted higher.

Errors on both sides:
- **Over-specification**: a general rule is formulated in the language of a single specific case, losing applicability to others.
- **Over-abstraction**: a rule within a specific instruction abstracts away from its subject, becoming vague.

---

## Patterns

### Negative and Positive Prompts

2 options to avoid ruining the result:
- A positive prompt might be insufficient—since it could ruin the result, a negative prompt is required for framing.
- Positive + negative prompts require extra work and tokens. In this case, either do not write them at all, or write a neutral prompt that does not control the agent but notifies it about what not to do.
