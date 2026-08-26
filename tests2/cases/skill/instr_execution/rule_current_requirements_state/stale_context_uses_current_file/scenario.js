const fs = require('fs');
const path = require('path');

module.exports = async function ({ workspaceDir, run, continueRun }) {
  const prompt = [
    '/impl-instrs:instr-execution',
    '',
    'Выполни актуальную инструкцию из requirements.ai_instrs.md.',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(workspaceDir, 'result.txt'), 'KEEP\nINITIAL_STATE\n', 'utf8');
  fs.writeFileSync(
    requirepath.join(workspaceDir, 'requirements.ai_instrs.md'),
    [
      'В файле result.txt замени INITIAL_STATE на FIRST_STATE.',
      '',
      'Сохрани строку KEEP без изменений. Не изменяй другие файлы и не создавай новые.',
      ''
    ].join('\n'),
    'utf8'
  );

  const session = await run(prompt);
  const firstResult = fs.readFileSync(resultPath, 'utf8').trim();
  if (firstResult !== 'KEEP\nFIRST_STATE') {
    throw new Error('Первый запуск не сформировал FIRST_STATE.');
  }

  fs.writeFileSync(
    requirementsPath,
    [
      'В файле result.txt замени FIRST_STATE на CURRENT_STATE.',
      '',
      'Сохрани строку KEEP без изменений. Не изменяй другие файлы и не создавай новые.',
      ''
    ].join('\n'),
    'utf8'
  );

  await continueRun(session, prompt);
};
