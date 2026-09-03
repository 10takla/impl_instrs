---
name: "ai-orch:codex-cli"
description: ""
---


# Codex CLI Orchestrator (Patched for Event Streaming)

**Role Positioning**: Orchestrator (Antigravity/Claude Code) is the manager, Codex is the executor.

**Core Value**: Real-time progress monitoring and final result parsing via single-line NDJSON pipelines without intermediate files.

---

## Mandatory Execution Rule

> ⛔ **CRITICAL RULE**: ALL executions of `codex` MUST strictly use the single-line pipeline syntax piping `--json` events into `node <skill_path>/scripts/index.js`. Running `codex` directly without the pipeline is STRICTLY FORBIDDEN.

## On Tool Failure

> ⛔ If `codex` fails for any reason — report the error and stop. Do not work around the failure using other tools.

## Single-Line Cross-Platform Execution Pipeline

> **IMPORTANT (PATCHED)**: Run `codex exec --json` in a single-line pipeline piped directly into `node <skill_path>/scripts/index.js`. Always ensure stdin closure (`<command> < NUL` on Windows, `echo "" |` on POSIX) and cross-platform UTF-8 encoding.

### Pipeline Syntax

#### Windows:
```cmd
cmd /c "chcp 65001 > nul && codex exec --json -m <model> ""Your prompt here"" < NUL | node <skill_path>/scripts/index.js"
```

#### POSIX (Linux / macOS):
```bash
echo "" | codex exec --json -m <model> "Your prompt here" | node <skill_path>/scripts/index.js
```


---

## Stream Parsing & Output Format

The parser script in `scripts/index.js` processes NDJSON events from `codex` in real time and formats the output:

```text
[Thread ID]: <id>

=== CHRONOLOGICAL ACTION LOG ===
• [Tool] command_execution -> "<command>"
  └── [Error]: exit 1 — <error_message>

=== FINAL RESULT ===
<agent_response_text>
```

---

## Quick Reference

### Commands

#### Windows:
```cmd
# Single-line execution with parser pipeline:
cmd /c "chcp 65001 > nul && codex exec --json ""prompt"" < NUL | node <skill_path>/scripts/index.js"

# Resume session with parser pipeline:
cmd /c "chcp 65001 > nul && echo fix issues | codex exec resume <thread_id> --full-auto --json | node <skill_path>/scripts/index.js"
```

#### POSIX:
```bash
# Single-line execution with parser pipeline:
echo "" | codex exec --json "prompt" | node <skill_path>/scripts/index.js

# Resume session with parser pipeline:
echo "fix issues" | codex exec resume <thread_id> --full-auto --json | node <skill_path>/scripts/index.js
```
