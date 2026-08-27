const fs = require('fs');
const path = require('path');

module.exports = async ({ workspaceDir, run, continueRun, checkpoint }) => {
  const prompt = [
    '/impl-instrs:instrs-write',
    '',
    'Прочитай актуальные требования из `requirements.md` и обнови существующую инструкцию `target.ai_instrs.md`.'
  ].join('\n');

  const session = await run(prompt);

  await checkpoint('первый запуск');

  fs.writeFileSync(
    path.join(workspaceDir, 'requirements.md'),
    [
      'Обнови `target.ai_instrs.md`:',
      '',
      '- замени `FIRST_FORMAT` на `CURRENT_FORMAT`;',
      '- добавь секцию `ADDED_SECTION`;',
      '- удали секцию `LEGACY_SECTION`;',
      '- сохрани `KEEP_SECTION`;',
      '- не изменяй другие файлы и не создавай новые.',
      ''
    ].join('\n'),
    'utf8'
  );

  return continueRun(session, prompt);
};
