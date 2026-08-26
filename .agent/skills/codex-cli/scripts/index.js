process.stdin.setEncoding('utf8');
if (process.stdout.setDefaultEncoding) process.stdout.setDefaultEncoding('utf8');

const readline = require('readline');

function extractCommandLabel(command) {
  if (!command) return '';
  const match = command.match(/-Command\s+"?(.+?)(?:"|$)/s)
    || command.match(/-Command\s+'(.+?)(?:'|$)/s);
  if (match) {
    const inner = match[1].replace(/\\"/g, '"').trim();
    return `-> "${inner.slice(0, 120)}${inner.length > 120 ? '...' : ''}"`;
  }
  return `-> "${String(command).slice(0, 120)}"`;
}

async function parseCodexStream() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

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
    try {
      data = JSON.parse(trimmed);
    } catch {
      continue;
    }

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
        const label = extractCommandLabel(item.command || item.name || '');

        if (!logHeaderPrinted) {
          process.stdout.write('\n=== CHRONOLOGICAL ACTION LOG ===\n');
          logHeaderPrinted = true;
        }

        process.stdout.write(`• [Tool] ${itemType} ${label}`.trim() + '\n');

        if (item.status === 'failed' || (item.exit_code !== null && item.exit_code !== undefined && item.exit_code !== 0)) {
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
      if (err && !seenToolErrors.has(err)) {
        sessionError = String(err).slice(0, 300);
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

parseCodexStream().catch((err) => {
  process.stderr.write('Parser error: ' + err.message + '\n');
  process.exit(1);
});
