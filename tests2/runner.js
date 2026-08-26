#!/usr/bin/env node

/**
 * Test runner script for executing isolated AI agent test cases.
 *
 * Interface:
 *   node runner.js <test-dir> --agent <adapter> [--params <string>]
 */

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const DEFAULT_TIMEOUT_SEC = 120;

// ============================================================================
// 1. Adapters Block (CLI manager commands are defined strictly here)
// ============================================================================

// --- agy stream parser (инлайн из antigravity-cli/scripts/index.js) ---
function extractAgyToolDetail(params) {
  if (!params || typeof params !== 'object') return '';
  for (const val of Object.values(params)) {
    if (typeof val === 'string' || typeof val === 'number') {
      return `-> "${val}"`;
    }
  }
  return '';
}

async function parseAgyStream(readable) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: readable, terminal: false });

  const processedSteps = new Set();
  const seenToolErrors = new Set();
  let finalResponse = null;
  let sessionError = null;
  let conversationId = null;
  let headerPrinted = false;
  let logHeaderPrinted = false;
  const deltaBuffer = new Map();

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let data;
    try { data = JSON.parse(trimmed); } catch { continue; }

    const eventType = data.event || data.type;

    if (eventType === 'init') {
      const initData = data.init || data;
      conversationId = data.conversation_id || initData.conversation_id || null;
      if (conversationId && !headerPrinted) {
        process.stdout.write(`[Conversation ID]: ${conversationId}\n`);
        headerPrinted = true;
      }
    } else if (eventType === 'step_update') {
      const update = data.step_update || data;
      const stepIdx = update.step_index;

      if (update.step_type === 'tool' && update.tool_name) {
        const detail = extractAgyToolDetail((update.tool_info || {}).parameters || {});
        if (!logHeaderPrinted) {
          process.stdout.write('\n=== CHRONOLOGICAL ACTION LOG ===\n');
          logHeaderPrinted = true;
        }
        if (update.state === 'ACTIVE' && !processedSteps.has(stepIdx)) {
          processedSteps.add(stepIdx);
          process.stdout.write(`• [Tool] ${update.tool_name} ${detail}`.trim() + '\n');
        }
        if (update.state === 'ERROR' && update.tool_info?.error?.message) {
          const errMsg = update.tool_info.error.message;
          seenToolErrors.add(errMsg);
          process.stdout.write(`  └── [Error]: ${errMsg}\n`);
        }
      }

      if (update.step_type === 'agent_response' && update.text_delta) {
        const prev = deltaBuffer.get(stepIdx) || '';
        deltaBuffer.set(stepIdx, prev + update.text_delta);
      }
    } else if (eventType === 'result') {
      const res = data.result || data;
      finalResponse = (res.response || '').trim();
      const rawError = res.error || null;
      sessionError = rawError && !seenToolErrors.has(rawError) ? rawError : null;
      conversationId = conversationId || res.conversation_id || null;
      if (!headerPrinted && conversationId) {
        process.stdout.write(`[Conversation ID]: ${conversationId}\n`);
        headerPrinted = true;
      }
      if (!finalResponse && deltaBuffer.size > 0) {
        const lastKey = Math.max(...deltaBuffer.keys());
        finalResponse = (deltaBuffer.get(lastKey) || '').trim();
      }
    }
  }

  if (sessionError) process.stdout.write(`\n[Session Error]: ${sessionError}\n`);
  if (finalResponse) {
    process.stdout.write('\n=== FINAL RESULT ===\n');
    process.stdout.write(finalResponse + '\n');
  }
}

// --- codex stream parser (инлайн из codex-cli/scripts/index.js) ---
function extractCodexCommandLabel(command) {
  if (!command) return '';
  const match = command.match(/-Command\s+"?(.+?)(?:"|$)/s) || command.match(/-Command\s+'(.+?)(?:'|$)/s);
  if (match) {
    const inner = match[1].replace(/\\"/g, '"').trim();
    return `-> "${inner.slice(0, 120)}${inner.length > 120 ? '...' : ''}"`;
  }
  return `-> "${String(command).slice(0, 120)}"`;
}

async function parseCodexStream(readable) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: readable, terminal: false });

  const processedItems = new Set();
  const seenToolErrors = new Set();
  let finalResponse = null;
  let sessionError = null;
  let threadId = null;
  let headerPrinted = false;
  let logHeaderPrinted = false;

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let data;
    try { data = JSON.parse(trimmed); } catch { continue; }

    const eventType = data.type;

    if (eventType === 'thread.started') {
      threadId = data.thread_id || null;
      if (threadId && !headerPrinted) {
        process.stdout.write(`[Thread ID]: ${threadId}\n`);
        headerPrinted = true;
      }
    } else if (eventType === 'item.completed') {
      const item = data.item || {};
      const itemId = item.id;
      const itemType = item.type;

      if ((itemType === 'command_execution' || itemType === 'tool_call') && !processedItems.has(itemId)) {
        processedItems.add(itemId);
        const label = extractCodexCommandLabel(item.command || item.name || '');
        if (!logHeaderPrinted) {
          process.stdout.write('\n=== CHRONOLOGICAL ACTION LOG ===\n');
          logHeaderPrinted = true;
        }
        process.stdout.write(`• [Tool] ${itemType} ${label}`.trim() + '\n');
        if (item.status === 'failed' || (item.exit_code != null && item.exit_code !== 0)) {
          const errSummary = (item.aggregated_output || item.error || '').split('\n')[0].trim();
          if (errSummary) {
            seenToolErrors.add(errSummary);
            process.stdout.write(`  └── [Error]: exit ${item.exit_code || 1} — ${errSummary.slice(0, 200)}\n`);
          }
        }
      }

      if (itemType === 'agent_message' && item.text && !processedItems.has(itemId)) {
        processedItems.add(itemId);
        finalResponse = item.text.trim();
      }
    } else if (eventType === 'turn.failed') {
      const err = data.error && (data.error.message || JSON.stringify(data.error));
      if (err && !seenToolErrors.has(err)) sessionError = String(err).slice(0, 300);
    }
  }

  if (sessionError) process.stdout.write(`\n[Session Error]: ${sessionError}\n`);
  if (finalResponse) {
    process.stdout.write('\n=== FINAL RESULT ===\n');
    process.stdout.write(finalResponse + '\n');
  }
}

// --- Адаптеры ---
const ADAPTERS = {
  agy: {
    name: 'agy',
    parseStream: parseAgyStream,
    buildCommand({ workspaceDir, entrypointPath, params }) {
      const entrypointContent = fs.readFileSync(entrypointPath, 'utf8');
      const args = [
        '--add-dir', workspaceDir,
        '-p', entrypointContent,
        '--output-format=stream-json',
        '--dangerously-skip-permissions'
      ];
      if (params) args.push(...parseParams(params));
      return { command: 'agy', args };
    }
  },
  codex: {
    name: 'codex',
    parseStream: parseCodexStream,
    buildCommand({ workspaceDir, entrypointPath, params }) {
      const entrypointContent = fs.readFileSync(entrypointPath, 'utf8');
      // stdin закрывается через echo "" | для корректной работы codex
      const args = ['exec', '--json', '--cd', workspaceDir];
      if (params) args.push(...parseParams(params));
      args.push(entrypointContent);
      return { command: 'codex', args, stdinData: '' };
    }
  }
};

function getAdapter(adapterName) {
  const adapter = ADAPTERS[adapterName];
  if (!adapter) {
    const available = Object.keys(ADAPTERS).join(', ');
    throw new Error(`Unknown agent adapter: "${adapterName}". Available adapters: ${available}`);
  }
  return adapter;
}

// ============================================================================
// 2. Helper Functions
// ============================================================================

function parseParams(paramsStr) {
  if (!paramsStr || typeof paramsStr !== 'string') return [];
  const args = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = regex.exec(paramsStr)) !== null) {
    if (match[1] !== undefined) {
      args.push(match[1]);
    } else if (match[2] !== undefined) {
      args.push(match[2]);
    } else {
      args.push(match[0]);
    }
  }
  return args;
}

function parseCliArgs(argv) {
  const args = argv.slice(2);
  const options = {
    testDir: null,
    agent: null,
    params: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--agent' || arg === '-a') {
      options.agent = args[++i];
    } else if (arg.startsWith('--agent=')) {
      options.agent = arg.slice('--agent='.length);
    } else if (arg === '--params' || arg === '-p') {
      options.params = args[++i];
    } else if (arg.startsWith('--params=')) {
      options.params = arg.slice('--params='.length);
    } else if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (!arg.startsWith('-') && !options.testDir) {
      options.testDir = arg;
    } else {
      console.warn(`[runner] Warning: unrecognized argument: ${arg}`);
    }
  }

  return options;
}

function printUsage() {
  console.log(`
Usage:
  node runner.js <test-dir> --agent <adapter> [--params <string>]

Options:
  <test-dir>           Path to test directory containing run.md and optional workspace/
  --agent, -a          Agent adapter to use (agy, codex) [required]
  --params, -p         Additional parameters to append to agent CLI
  --help, -h           Show this help message
`);
}

function killProcessTree(pid) {
  if (process.platform === 'win32') {
    try {
      execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
    } catch {
      // Process might have already terminated
    }
  } else {
    try {
      process.kill(-pid, 'SIGKILL');
    } catch {
      try {
        process.kill(pid, 'SIGKILL');
      } catch {
        // Process might have already terminated
      }
    }
  }
}

// ============================================================================
// 3. Main Runner Logic
// ============================================================================

async function main() {
  const cliOptions = parseCliArgs(process.argv);

  if (!cliOptions.testDir) {
    console.error('Error: <test-dir> is required.');
    printUsage();
    process.exit(1);
  }

  if (!cliOptions.agent) {
    console.error('Error: --agent <adapter> is required.');
    printUsage();
    process.exit(1);
  }

  const testDirPath = path.resolve(process.cwd(), cliOptions.testDir);
  if (!fs.existsSync(testDirPath) || !fs.statSync(testDirPath).isDirectory()) {
    console.error(`Error: Test directory not found: ${cliOptions.testDir}`);
    process.exit(1);
  }

  const entrypointPath = path.join(testDirPath, 'run.md');
  if (!fs.existsSync(entrypointPath)) {
    console.error(`Error: Entrypoint file not found: ${path.relative(process.cwd(), entrypointPath)}`);
    process.exit(1);
  }

  const workspaceDir = path.join(testDirPath, 'workspace');
  const outputDir = path.join(testDirPath, 'output');

  // 1. Очищает директорию <test-dir>/output/ (удаляет и создает заново).
  try {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (err) {
    console.error('Error clearing output directory:', err.message);
    process.exit(1);
  }

  // 2. Копирует содержимое <test-dir>/workspace/ в <test-dir>/output/ (если workspace/ существует).
  try {
    if (fs.existsSync(workspaceDir) && fs.statSync(workspaceDir).isDirectory()) {
      fs.cpSync(workspaceDir, outputDir, { recursive: true });
    }
  } catch (err) {
    console.error('Error copying workspace:', err.message);
    process.exit(1);
  }

  // 3. Копирует артефакты скиллов в <test-dir>/output/.agents/skills/.
  const skillsSrc = path.join(__dirname, '..', 'ai_artifacts', 'integrated_with_other_en', 'codex', 'skills');
  const skillsDst = path.join(outputDir, '.agents', 'skills');
  try {
    if (fs.existsSync(skillsSrc)) {
      fs.mkdirSync(skillsDst, { recursive: true });
      fs.cpSync(skillsSrc, skillsDst, { recursive: true });
    }
  } catch (err) {
    console.error('Error copying skills:', err.message);
    process.exit(1);
  }

  // 4. Запускает сессию агента через адаптер: workspaceDir = <test-dir>/output/, entrypoint = содержимое <test-dir>/run.md.
  let adapter;
  try {
    adapter = getAdapter(cliOptions.agent);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }


  return new Promise((resolve) => {
    let timedOut = false;
    const { command, args, stdinData } = adapter.buildCommand({
      workspaceDir: outputDir,
      entrypointPath,
      params: cliOptions.params
    });

    console.log(`[runner] Running test "${path.basename(testDirPath)}" via ${adapter.name}...`);
    console.log(`[runner] Workspace: ${path.relative(process.cwd(), outputDir)}`);
    console.log(`[runner] Command: ${command} ${args.map(a => (a.includes(' ') || a.includes('\n') ? `"${a.replace(/"/g, '\\"')}"` : a)).join(' ')}`);
    console.log(`[runner] Timeout: ${DEFAULT_TIMEOUT_SEC}s`);

    const child = spawn(command, args, {
      cwd: outputDir,
      shell: false,
      stdio: ['pipe', 'pipe', 'inherit'],
      detached: process.platform !== 'win32'
    });

    // Для codex: закрыть stdin через пустую строку
    if (stdinData !== undefined) {
      child.stdin.write(stdinData);
      child.stdin.end();
    } else {
      child.stdin.end();
    }

    const timer = setTimeout(() => {
      timedOut = true;
      console.error(`\n[runner] Error: Execution timed out after ${DEFAULT_TIMEOUT_SEC}s`);
      if (child.pid) killProcessTree(child.pid);
    }, DEFAULT_TIMEOUT_SEC * 1000);

    // Запуск парсера потока в фоне
    adapter.parseStream(child.stdout).catch((err) => {
      console.error('[runner] Stream parser error:', err.message);
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      console.error('[runner] Process error:', err.message);
      process.exit(1);
    });

    child.on('exit', (code, signal) => {
      clearTimeout(timer);
      if (timedOut) process.exit(1);
      if (code === 0) {
        console.log(`[runner] Agent session finished successfully (exit code 0).`);
        process.exit(0);
      } else {
        console.error(`[runner] Agent session failed with exit code ${code}${signal ? ` (signal: ${signal})` : ''}.`);
        process.exit(1);
      }
    });
  });
}

main().catch((err) => {
  console.error('[runner] Fatal error:', err.message);
  process.exit(1);
});
