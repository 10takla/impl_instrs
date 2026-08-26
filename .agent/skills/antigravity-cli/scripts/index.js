process.stdin.setEncoding('utf8');
if (process.stdout.setDefaultEncoding) {
  process.stdout.setDefaultEncoding('utf8');
}
const readline = require('readline');

function extractToolDetail(params) {
  if (!params || typeof params !== 'object') return '';

  for (const val of Object.values(params)) {
    if (typeof val === 'string' || typeof val === 'number') {
      return `-> "${val}"`;
    }
  }
  return '';
}

async function parseAgyStream() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

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
    try {
      data = JSON.parse(trimmed);
    } catch {
      continue;
    }

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
        const toolName = update.tool_name;
        const toolInfo = update.tool_info || {};
        const params = toolInfo.parameters || {};
        const detail = extractToolDetail(params);

        if (!logHeaderPrinted) {
          process.stdout.write('\n=== CHRONOLOGICAL ACTION LOG ===\n');
          logHeaderPrinted = true;
        }

        if (update.state === 'ACTIVE' && !processedSteps.has(stepIdx)) {
          processedSteps.add(stepIdx);
          process.stdout.write(`• [Tool] ${toolName} ${detail}`.trim() + '\n');
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

  if (sessionError) {
    process.stdout.write(`\n[Session Error]: ${sessionError}\n`);
  }

  if (finalResponse) {
    process.stdout.write('\n=== FINAL RESULT ===\n');
    process.stdout.write(finalResponse + '\n');
  }
}

parseAgyStream().catch((err) => {
  process.stderr.write('Parser error: ' + err.message + '\n');
  process.exit(1);
});
