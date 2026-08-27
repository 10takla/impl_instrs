module.exports = async ({ run, checkpoint }) => {
  await run([
    '/impl-instrs:simultaneous-update-instrs-result',
    '',
    'Актуализируй инструкцию `target.ai_instrs.md` по требованиям из `requirements.md` и получи соответствующий ей результат в `result.txt`.'
  ].join('\n'));

  return checkpoint('выполнение');
};
