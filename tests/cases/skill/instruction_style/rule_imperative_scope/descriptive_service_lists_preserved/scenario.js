module.exports = async function ({ run }) {
  await run([
    '/impl-instrs:instrs-write',
    '',
    'Сформируй существующий файл `target.md`.',
    '',
    'Сохрани смысл и границы исходного требования.'
  ].join('\n'));
};
