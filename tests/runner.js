#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');

const DEFAULT_TIMEOUT_MS = 120000;

function parseParams(value) {
  if (!value) return [];
  const params = [];
  const pattern = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = pattern.exec(value)) !== null) {
    params.push(match[1] ?? match[2] ?? match[0]);
  }
  return params;
}

function parseArguments(argv) {
  const options = { testDir: null, agent: null, params: [] };
  const args = argv.slice(2);

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--agent' || argument === '-a') {
      options.agent = args[++index];
    } else if (argument.startsWith('--agent=')) {
      options.agent = argument.slice('--agent='.length);
    } else if (argument === '--params' || argument === '-p') {
      options.params = parseParams(args[++index]);
    } else if (argument.startsWith('--params=')) {
      options.params = parseParams(argument.slice('--params='.length));
    } else if (argument === '--help' || argument === '-h') {
      options.help = true;
    } else if (!argument.startsWith('-') && !options.testDir) {
      options.testDir = argument;
    } else {
      throw new Error('Неизвестный аргумент: ' + argument);
    }
  }
  return options;
}

function printUsage() {
  console.log('node runner.js <test-dir> --agent <adapter> [--params <string>]');
}

function killProcessTree(child) {
  if (!child.pid) return;
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true
    });
    return;
  }
  try {
    process.kill(-child.pid, 'SIGKILL');
  } catch {
    try {
      child.kill('SIGKILL');
    } catch {
      // Процесс уже завершён.
    }
  }
}

function printTool(toolName, detail) {
  console.log('• [Tool] ' + toolName + (detail ? ' -> "' + detail + '"' : ''));
}

function createVerdictReader() {
  const input = readline.createInterface({ input: process.stdin, terminal: false });
  let closed = false;
  input.once('close', function () {
    closed = true;
  });

  return {
    wait: function (label) {
      return new Promise(function (resolve, reject) {
        if (closed) {
          reject(new Error('Контрольная точка "' + label + '" не получила вердикт: stdin закрыт.'));
          return;
        }

        const cleanup = function () {
          input.removeListener('line', onLine);
          input.removeListener('close', onClose);
        };
        const onClose = function () {
          cleanup();
          reject(new Error('Контрольная точка "' + label + '" не получила вердикт: stdin закрыт.'));
        };
        const onLine = function (line) {
          const verdict = line.trim();
          if (verdict === 'CONTINUE') {
            cleanup();
            resolve();
            return;
          }

          const failure = /^FAIL\s+(.+)$/.exec(verdict);
          if (failure) {
            cleanup();
            reject(new Error('Контрольная точка "' + label + '": ' + failure[1]));
            return;
          }

          console.log('[runner] Введи CONTINUE или FAIL <причина>.');
        };

        input.on('line', onLine);
        input.once('close', onClose);
      });
    },
    close: function () {
      input.close();
    }
  };
}

async function parseAgyStream(stream) {
  const lines = readline.createInterface({ input: stream, terminal: false });
  const result = { sessionId: null, response: '', error: null };
  const responseDeltas = new Map();
  const activeTools = new Set();

  for await (const line of lines) {
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }

    const eventType = event.event || event.type;
    if (eventType === 'init') {
      const init = event.init || event;
      result.sessionId = event.conversation_id || init.conversation_id || result.sessionId;
    } else if (eventType === 'step_update') {
      const update = event.step_update || event;
      if (
        update.step_type === 'tool' &&
        update.state === 'ACTIVE' &&
        !activeTools.has(update.step_index)
      ) {
        activeTools.add(update.step_index);
        const parameters = update.tool_info?.parameters || {};
        const detail = Object.values(parameters).find(function (value) {
          return typeof value === 'string' || typeof value === 'number';
        });
        printTool(update.tool_name, detail == null ? '' : String(detail));
      }
      if (update.step_type === 'tool' && update.state === 'ERROR') {
        const message = update.tool_info?.error?.message;
        if (message) console.error('  └── [Error]: ' + message);
      }
      if (update.step_type === 'agent_response' && update.text_delta) {
        responseDeltas.set(
          update.step_index,
          (responseDeltas.get(update.step_index) || '') + update.text_delta
        );
      }
    } else if (eventType === 'result') {
      const completed = event.result || event;
      result.sessionId = completed.conversation_id || result.sessionId;
      result.response = String(completed.response || '').trim();
      result.error = completed.error || null;
    }
  }

  if (!result.response && responseDeltas.size > 0) {
    const lastStep = Math.max(...responseDeltas.keys());
    result.response = responseDeltas.get(lastStep).trim();
  }
  return result;
}

async function parseCodexStream(stream) {
  const lines = readline.createInterface({ input: stream, terminal: false });
  const result = { sessionId: null, response: '', error: null };
  const completedItems = new Set();

  for await (const line of lines) {
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }

    if (event.type === 'thread.started') {
      result.sessionId = event.thread_id || result.sessionId;
    } else if (event.type === 'item.completed') {
      const item = event.item || {};
      if (completedItems.has(item.id)) continue;
      completedItems.add(item.id);
      if (item.type === 'command_execution' || item.type === 'tool_call') {
        printTool(item.type, String(item.command || item.name || '').slice(0, 160));
      } else if (item.type === 'agent_message') {
        result.response = String(item.text || '').trim();
      }
    } else if (event.type === 'turn.failed') {
      result.error = event.error?.message || JSON.stringify(event.error || event);
    }
  }
  return result;
}

const ADAPTERS = {
  agy: {
    parseStream: parseAgyStream,
    start: function ({ workspaceDir, prompt, params }) {
      return {
        command: 'agy',
        args: [
          '--add-dir', workspaceDir,
          '-p', prompt,
          '--output-format=stream-json',
          '--dangerously-skip-permissions'
        ].concat(params)
      };
    },
    continue: function ({ workspaceDir, sessionId, prompt, params }) {
      return {
        command: 'agy',
        args: [
          '--conversation', sessionId,
          '--add-dir', workspaceDir,
          '-p', prompt,
          '--output-format=stream-json',
          '--dangerously-skip-permissions'
        ].concat(params)
      };
    }
  },
  codex: {
    parseStream: parseCodexStream,
    start: function ({ workspaceDir, prompt, params }) {
      return {
        command: 'codex',
        args: ['exec', '--json', '--cd', workspaceDir].concat(params, [prompt]),
        stdin: ''
      };
    },
    continue: function ({ sessionId, prompt, params }) {
      return {
        command: 'codex',
        args: ['exec', 'resume', sessionId, '--json'].concat(params),
        stdin: prompt
      };
    }
  }
};

function executeAgent({ adapter, invocation, workspaceDir, step }) {
  return new Promise(function (resolve, reject) {
    console.log('\n[runner] Шаг ' + step + ': запуск ' + adapter.name);
    const child = spawn(invocation.command, invocation.args, {
      cwd: workspaceDir,
      detached: process.platform !== 'win32',
      shell: false,
      stdio: ['pipe', 'pipe', 'inherit'],
      windowsHide: true
    });
    const parsedResult = adapter.parseStream(child.stdout);
    let timedOut = false;
    const timer = setTimeout(function () {
      timedOut = true;
      killProcessTree(child);
    }, DEFAULT_TIMEOUT_MS);

    child.once('error', function (error) {
      clearTimeout(timer);
      reject(error);
    });
    child.once('exit', async function (code, signal) {
      clearTimeout(timer);
      try {
        const parsed = await parsedResult;
        if (timedOut) throw new Error('Шаг ' + step + ' превысил тайм-аут 120 секунд.');
        if (code !== 0) {
          throw new Error(
            'Шаг ' + step + ' завершился с кодом ' + code + (signal ? ' (' + signal + ')' : '') + '.'
          );
        }
        if (parsed.error) throw new Error('Шаг ' + step + ': ' + parsed.error);
        if (parsed.response) {
          console.log('\n=== FINAL RESULT ===');
          console.log(parsed.response);
        }
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });
    child.stdin.end(invocation.stdin ?? '');
  });
}

function prepareWorkspace(testDir, outputDir) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const workspaceDir = path.join(testDir, 'workspace');
  if (fs.existsSync(workspaceDir)) {
    fs.cpSync(workspaceDir, outputDir, { recursive: true });
  }

  const skillsSource = path.join(
    __dirname,
    '..',
    'ai_artifacts',
    'integrated_with_other_en',
    'codex',
    'skills'
  );
  if (fs.existsSync(skillsSource)) {
    const skillsTarget = path.join(outputDir, '.agents', 'skills');
    fs.mkdirSync(path.dirname(skillsTarget), { recursive: true });
    fs.cpSync(skillsSource, skillsTarget, { recursive: true });
  }
}

async function main() {
  const options = parseArguments(process.argv);
  if (options.help) {
    printUsage();
    return;
  }
  if (!options.testDir || !options.agent) {
    printUsage();
    throw new Error('Укажи <test-dir> и --agent <adapter>.');
  }

  const adapterImplementation = ADAPTERS[options.agent];
  if (!adapterImplementation) throw new Error('Неизвестный адаптер: ' + options.agent + '.');
  const adapter = Object.assign({ name: options.agent }, adapterImplementation);

  const testDir = path.resolve(process.cwd(), options.testDir);
  const scenarioPath = path.join(testDir, 'scenario.js');
  const outputDir = path.join(testDir, 'output');
  if (!fs.existsSync(scenarioPath)) throw new Error('Не найден сценарий: ' + scenarioPath);

  prepareWorkspace(testDir, outputDir);
  let verdictReader = null;
  const scenario = require(scenarioPath);
  if (typeof scenario !== 'function') {
    throw new Error('scenario.js должен экспортировать асинхронную функцию.');
  }

  let step = 0;
  const invoke = async function (operation, session, prompt) {
    if (typeof prompt !== 'string' || !prompt.trim()) {
      throw new Error('Промпт запуска не должен быть пустым.');
    }
    if (
      operation === 'continue' &&
      (!session || session.adapter !== adapter.name || !session.sessionId)
    ) {
      throw new Error('Передан некорректный дескриптор сессии.');
    }

    step += 1;
    const invocation = operation === 'start'
      ? adapter.start({ workspaceDir: outputDir, prompt, params: options.params })
      : adapter.continue({
          workspaceDir: outputDir,
          sessionId: session.sessionId,
          prompt,
          params: options.params
        });
    const result = await executeAgent({
      adapter,
      invocation,
      workspaceDir: outputDir,
      step
    });
    const sessionId = result.sessionId || session?.sessionId;
    if (!sessionId) throw new Error('Шаг ' + step + ' не вернул идентификатор сессии.');
    return Object.freeze({
      adapter: adapter.name,
      sessionId,
      response: result.response
    });
  };

  const originalCwd = process.cwd();
  process.chdir(outputDir);
  try {
    await scenario({
      testDir,
      workspaceDir: outputDir,
      run: function (prompt) {
        return invoke('start', null, prompt);
      },
      continueRun: function (session, prompt) {
        return invoke('continue', session, prompt);
      },
      checkpoint: async function (label) {
        if (typeof label !== 'string' || !label.trim()) {
          throw new Error('Метка контрольной точки не должна быть пустой.');
        }

        console.log('\n=== CHECKPOINT: ' + label.trim() + ' ===');
        console.log('=== AWAITING VERDICT: CONTINUE | FAIL <причина> ===');
        verdictReader = verdictReader || createVerdictReader();
        await verdictReader.wait(label.trim());
      }
    });
  } finally {
    if (verdictReader) verdictReader.close();
    process.chdir(originalCwd);
  }

  console.log('\n[runner] Сценарий успешно завершён (' + step + ' шагов).');
}

main().catch(function (error) {
  console.error('\n[runner] Ошибка: ' + error.message);
  process.exitCode = 1;
});
