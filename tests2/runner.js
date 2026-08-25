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
const ADAPTERS = {
  agy: {
    name: 'agy',
    buildCommand({ workspaceDir, entrypointPath, params }) {
      const entrypointContent = fs.readFileSync(entrypointPath, 'utf8');
      const args = ['--cwd', workspaceDir, 'chat', '--prompt', entrypointContent];
      if (params) {
        args.push(...parseParams(params));
      }
      return {
        command: 'agy',
        args
      };
    }
  },
  codex: {
    name: 'codex',
    buildCommand({ workspaceDir, entrypointPath, params }) {
      const entrypointContent = fs.readFileSync(entrypointPath, 'utf8');
      const args = ['--cwd', workspaceDir, '--prompt', entrypointContent];
      if (params) {
        args.push(...parseParams(params));
      }
      return {
        command: 'codex',
        args
      };
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

  // Step 1: Copy workspace/ into output/ (if workspace/ exists), otherwise create empty output/
  try {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    if (fs.existsSync(workspaceDir) && fs.statSync(workspaceDir).isDirectory()) {
      fs.cpSync(workspaceDir, outputDir, { recursive: true });
    }
  } catch (err) {
    console.error('Error preparing output directory:', err.message);
    process.exit(1);
  }

  // Step 2: Copy shared skills into output/.agents/skills/
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

  // Step 3: Build command via adapter and execute
  let adapter;
  try {
    adapter = getAdapter(cliOptions.agent);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const { command, args } = adapter.buildCommand({
    workspaceDir: outputDir,
    entrypointPath,
    params: cliOptions.params
  });

  console.log(`[runner] Running test "${path.basename(testDirPath)}" via ${adapter.name}...`);
  console.log(`[runner] Workspace: ${path.relative(process.cwd(), outputDir)}`);
  console.log(`[runner] Command: ${command} ${args.map(a => (a.includes(' ') || a.includes('\n') ? `"${a.replace(/"/g, '\\"')}"` : a)).join(' ')}`);
  console.log(`[runner] Timeout: ${DEFAULT_TIMEOUT_SEC}s`);

  return new Promise((resolve) => {
    let timedOut = false;
    const child = spawn(command, args, {
      shell: true,
      stdio: 'inherit',
      detached: process.platform !== 'win32'
    });

    const timer = setTimeout(() => {
      timedOut = true;
      console.error(`\n[runner] Error: Execution timed out after ${DEFAULT_TIMEOUT_SEC}s`);
      if (child.pid) {
        killProcessTree(child.pid);
      }
    }, DEFAULT_TIMEOUT_SEC * 1000);

    child.on('error', (err) => {
      clearTimeout(timer);
      console.error('[runner] Process error:', err.message);
      process.exit(1);
    });

    child.on('exit', (code, signal) => {
      clearTimeout(timer);
      if (timedOut) {
        process.exit(1);
      }
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
