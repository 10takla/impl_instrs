---
name: "ai-orch:antigravity-cli"
description: ""
---


# Antigravity CLI (`agy`) — Patched Orchestration

Operator guide for the Antigravity CLI, invoked as `agy`. Run all `agy` commands through the terminal tool; inspect its config and logs with `read_file`.

## When to Use

- Installing, updating, or smoke-testing the `agy` binary
- Driving non-interactive `agy --print` / `agy -p` one-shots with `--output-format=stream-json`
- Real-time event streaming and inline parsing for orchestrators
- Debugging Antigravity auth, sandbox, permissions, or plugin state
- Reading Antigravity settings, keybindings, conversations, or logs

## Prerequisites

- The `agy` binary on PATH. Verify through the terminal tool: `command -v agy && agy --version`.
- Node.js installed to execute the stream parser script (`scripts/index.js`).

## Mandatory Execution Rule

> ⛔ **CRITICAL RULE**: ALL executions of `agy` for prompts MUST strictly use the single-line pipeline syntax piping `--output-format=stream-json` into `node <skill_path>/scripts/index.js`. Running `agy` directly without the pipeline is STRICTLY FORBIDDEN.

## On Tool Failure

> ⛔ If `agy` fails for any reason — report the error and stop. Do not work around the failure using other tools.

## Single-line Cross-Platform Execution Pipeline

> **IMPORTANT (PATCHED)**: Use `--output-format=stream-json` piped directly into `node <skill_path>/scripts/index.js` without creating intermediate files. Ensure UTF-8 encoding across operating systems.

### Pipeline Syntax

#### Windows:
```cmd
cmd /c "chcp 65001 > nul && agy -p ""Your prompt here"" --output-format=stream-json --model ""<model>"" --dangerously-skip-permissions | node <skill_path>/scripts/index.js"
```

#### POSIX (Linux / macOS):
```bash
agy -p "Your prompt here" --output-format=stream-json --model "<model>" --dangerously-skip-permissions | node <skill_path>/scripts/index.js
```

## Stream Parsing & Output Format

The parser script in `scripts/index.js` processes NDJSON events from `agy` in real time and formats the output:

```text
[Conversation ID]: <uuid>

=== CHRONOLOGICAL ACTION LOG ===
• [Tool] <tool_name> -> "<main_parameter>"
  └── [Error]: <error_message>

=== FINAL RESULT ===
<agent_response_text>
```

## Quick Reference

### Useful flags
- `--output-format=stream-json` (patched: enables NDJSON event streaming)
- `--add-dir`
- `--continue` / `-c`
- `--conversation`
- `--dangerously-skip-permissions`
- `--print` / `-p`
- `--print-timeout`
- `--model`
