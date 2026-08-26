module.exports = async function ({ run }) {
  await run([
    '[impl-instrs:instrs-write](slashCommand;impl-instrs:instrs-write)',
    '',
    'Сформируй существующий файл `target.md`.',
    '',
    'Сохрани смысл исходного требования.'
  ].join('\n'));
};
