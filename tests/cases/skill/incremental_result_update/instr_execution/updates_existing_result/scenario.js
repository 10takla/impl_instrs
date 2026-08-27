const fs = require('fs');
const path = require('path');

module.exports = async ({ workspaceDir, run, continueRun, checkpoint }) => {
  const prompt = [
    '/impl-instrs:instr-execution',
    '',
    'Выполни актуальную инструкцию из `requirements.ai_instrs.md`.'
  ].join('\n');

  const session = await run(prompt);

  await checkpoint('первый запуск');

  fs.writeFileSync(
    path.join(workspaceDir, 'requirements.ai_instrs.md'),
    [
      'В `result.txt` замени `FIRST_STATE` на `CURRENT_STATE`.',
      '',
      'Добавь `ADDED_STATE`, удали `LEGACY_STATE` и сохрани `KEEP`.',
      'Не изменяй другие файлы и не создавай новые.',
      ''
    ].join('\n'),
    'utf8'
  );

  return continueRun(session, prompt);
};
