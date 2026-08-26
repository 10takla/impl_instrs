const fs = require('fs');
const path = require('path');

module.exports = async ({ workspaceDir, run, continueRun }) => {
  const prompt = [
    '/impl-instrs:instr-execution',
    '',
    'Выполни актуальную инструкцию из requirements.ai_instrs.md.',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(workspaceDir, 'result.txt'), 'KEEP\nINITIAL_STATE\n', 'utf8');
  fs.writeFileSync(
    path.join(workspaceDir, 'requirements.ai_instrs.md'),
    [
      'В файле result.txt замени INITIAL_STATE на FIRST_STATE.',
      '',
      'Сохрани строку KEEP без изменений. Не изменяй другие файлы и не создавай новые.',
      ''
    ].join('\n'),
    'utf8'
  );

  return run(prompt).then((session) => {
    if (fs.readFileSync(path.join(workspaceDir, 'result.txt'), 'utf8').trim() !== 'KEEP\nFIRST_STATE') {
      throw new Error('Первый запуск не сформировал FIRST_STATE.');
    }

    fs.writeFileSync(
      path.join(workspaceDir, 'requirements.ai_instrs.md'),
      [
        'В файле result.txt замени FIRST_STATE на CURRENT_STATE.',
        '',
        'Сохрани строку KEEP без изменений. Не изменяй другие файлы и не создавай новые.',
        ''
      ].join('\n'),
      'utf8'
    );

    return continueRun(session, prompt);
  });
};
