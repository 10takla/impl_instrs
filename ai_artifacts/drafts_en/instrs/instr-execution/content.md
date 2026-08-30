**Related rules:**
- @draft(instruction-style)
- @draft(workspace)

# Instruction Execution

Execute the task described in the instruction and produce the required result. Do not substitute execution with modifying, improving, analyzing, or debugging the instruction text.

## Incremental Result Update

1. Immediately before execution, retrieve the current state of the requirements from the original source.
2. Retrieve the current state of the existing result, if one exists.
3. Compare the current requirements against the existing result and determine the necessary additions, modifications, and deletions.
4. Form the new state of the result: apply only the necessary changes and preserve all other parts unchanged. If no result exists yet, create it from the current requirements.
5. Continue execution until the required result is obtained.
