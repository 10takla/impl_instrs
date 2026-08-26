#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DESCRIPTION_REACTS_TO_INSTRUCTIONS =
  "КРИТИЧЕСКАЯ БЛОКИРОВКА: ВЫ ОБЯЗАНЫ прочитать это перед ЛЮБЫМ взаимодействием (даже при простом исправлении опечаток) с файлами и папками по паттернам: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. Файл содержит нестандартные правила, которые отменяют ваши базовые знания по умолчанию. Вы провалите задачу, если проигнорируете это.";

function parseMeta(content) {
  const conditions = [];
  let description = undefined;
  let trigger = undefined;
  let globs = undefined;

  const lines = content.split(/\r?\n/);
  let inConditions = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const descMatch = trimmed.match(/^description:\s*(.*)$/);
    if (descMatch) {
      inConditions = false;
      let val = descMatch[1].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      description = val;
      continue;
    }

    const trigMatch = trimmed.match(/^trigger:\s*(.*)$/);
    if (trigMatch) {
      inConditions = false;
      let val = trigMatch[1].trim().replace(/^['"]|['"]$/g, '');
      trigger = val;
      continue;
    }

    const globsMatch = trimmed.match(/^globs:\s*(.*)$/);
    if (globsMatch) {
      inConditions = false;
      let val = globsMatch[1].trim().replace(/^['"]|['"]$/g, '');
      globs = val;
      continue;
    }

    if (trimmed.startsWith('conditions:')) {
      inConditions = true;
      const inlineMatch = trimmed.match(/conditions:\s*\[(.*?)\]/);
      if (inlineMatch) {
        inlineMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean)
          .forEach((c) => conditions.push(c));
        inConditions = false;
      }
      continue;
    }

    if (inConditions) {
      if (trimmed.startsWith('-')) {
        const cond = trimmed
          .replace(/^-\s*/, '')
          .split('#')[0]
          .trim()
          .replace(/^['"]|['"]$/g, '');
        if (cond) conditions.push(cond);
      } else if (/^[a-zA-Z0-9_]+:/.test(trimmed)) {
        inConditions = false;
      }
    }
  }

  return { conditions, description, trigger, globs };
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function getDrafts(dir) {
  if (!fs.existsSync(dir)) return [];
  const drafts = [];

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(currentDir, entry.name);
        const metaPath = path.join(fullPath, 'meta.yaml');
        const contentPath = path.join(fullPath, 'content.md');

        if (fs.existsSync(metaPath) && fs.existsSync(contentPath)) {
          const meta = parseMeta(fs.readFileSync(metaPath, 'utf8'));
          const content = fs.readFileSync(contentPath, 'utf8');
          drafts.push({ name: entry.name, meta, content, path: fullPath });
        } else {
          scan(fullPath);
        }
      }
    }
  }

  scan(dir);
  return drafts;
}

function compile(sourceDir, outputDir) {
  const drafts = getDrafts(sourceDir);
  if (drafts.length === 0) {
    console.log(`[!] В директории "${sourceDir}" не найдено модульных черновиков ({name}/meta.yaml + content.md).`);
    return;
  }

  console.log(`[+] Найдено черновиков: ${drafts.length} в "${sourceDir}"`);

  let hasExplicit = false;

  for (const draft of drafts) {
    const { name, meta, content } = draft;
    const isExplicit = meta.conditions.includes('explicit_invocation');
    const isImplicit = meta.conditions.includes('implicit_invocation');
    const reacts = meta.conditions.includes('reacts_to_instruction_files');
    const hasCustomTrigger = Boolean(meta.trigger || meta.globs);

    if (isExplicit) hasExplicit = true;

    const description = meta.description !== undefined
      ? meta.description
      : (reacts ? DESCRIPTION_REACTS_TO_INSTRUCTIONS : '');

    // 1. Antigravity
    if (isImplicit || hasCustomTrigger) {
      const lines = ['---'];
      if (!hasCustomTrigger) {
        lines.push(`name: "impl-instrs-${name}"`);
      }
      lines.push(`description: ${JSON.stringify(description)}`);
      lines.push(`trigger: ${JSON.stringify(meta.trigger || 'model_decision')}`);
      if (meta.globs) {
        lines.push(`globs: ${JSON.stringify(meta.globs)}`);
      }
      lines.push('---', '', content);
      writeFile(path.join(outputDir, 'antigravity', 'rules', `impl-instrs-${name}.md`), lines.join('\n'));
    } else {
      const frontmatter = [
        '---',
        `name: "impl-instrs:${name}"`,
        `description: ${JSON.stringify(description)}`,
        '---',
        '',
        content
      ].join('\n');
      writeFile(path.join(outputDir, 'antigravity', 'skills', name, 'SKILL.md'), frontmatter);
    }

    // 2. Codex
    {
      const frontmatter = [
        '---',
        `name: "${name}"`,
        `description: ${JSON.stringify(description)}`,
        '---',
        '',
        content
      ].join('\n');
      writeFile(path.join(outputDir, 'codex', 'skills', name, 'SKILL.md'), frontmatter);
    }

    // 3. Claude Code
    {
      const lines = [
        '---',
        `name: "${name}"`,
        `description: ${JSON.stringify(description)}`
      ];
      if (isExplicit) {
        lines.push('disable-model-invocation: true');
      }
      if (isImplicit && !hasCustomTrigger) {
        lines.push('user-invocable: false');
      }
      lines.push('---', '', content);
      writeFile(path.join(outputDir, 'claude-code', 'skills', name, 'SKILL.md'), lines.join('\n'));
    }

    // 4. OpenCode
    if (isImplicit || hasCustomTrigger) {
      const frontmatter = [
        '---',
        `name: "impl-instrs-${name}"`,
        `description: ${JSON.stringify(description)}`,
        '---',
        '',
        content
      ].join('\n');
      writeFile(path.join(outputDir, 'opencode', 'skills', `impl-instrs-${name}`, 'SKILL.md'), frontmatter);
    } else {
      const frontmatter = [
        '---',
        `name: "impl-instrs-${name}"`,
        `description: ${JSON.stringify(description)}`,
        '---',
        '',
        content
      ].join('\n');
      writeFile(path.join(outputDir, 'opencode', 'commands', `impl-instrs-${name}.md`), frontmatter);
    }
  }

  // Манифесты
  writeFile(
    path.join(outputDir, 'antigravity', 'plugin.json'),
    JSON.stringify({ name: 'impl-instrs', version: '1.0.0' }, null, 2) + '\n'
  );

  writeFile(
    path.join(outputDir, 'codex', '.codex-plugin', 'plugin.json'),
    JSON.stringify({ name: 'impl-instrs', version: '1.0.0' }, null, 2) + '\n'
  );

  if (hasExplicit) {
    writeFile(
      path.join(outputDir, 'codex', 'agents', 'openai.yaml'),
      'policy:\n  allow_implicit_invocation: false\n'
    );
  }

  writeFile(
    path.join(outputDir, 'claude-code', '.claude-plugin', 'plugin.json'),
    JSON.stringify({ name: 'impl-instrs', version: '1.0.0', type: 'skills-directory' }, null, 2) + '\n'
  );

  console.log(`[✓] Успешно скомпилировано в "${outputDir}" для 4 менеджеров агентов.`);
}

function watchDrafts(sourceDir, outputDir) {
  compile(sourceDir, outputDir);
  console.log(`[👁️] Отслеживание изменений в "${sourceDir}"...`);

  let debounceTimer = null;
  fs.watch(sourceDir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[↻] Изменение обнаружено (${filename}), повторная компиляция...`);
      compile(sourceDir, outputDir);
    }, 200);
  });
}

function main() {
  const args = process.argv.slice(2);
  const isWatch = args.includes('--watch') || args.includes('-w');
  const positionalArgs = args.filter((arg) => arg !== '--watch' && arg !== '-w');

  const root = __dirname;
  const sourceDir = positionalArgs[0] ? path.resolve(positionalArgs[0]) : path.join(root, 'drafts');
  const outputDir = positionalArgs[1] ? path.resolve(positionalArgs[1]) : path.join(root, 'integrated');

  if (isWatch) {
    watchDrafts(sourceDir, outputDir);
  } else {
    compile(sourceDir, outputDir);
  }
}

if (require.main === module) {
  main();
}
