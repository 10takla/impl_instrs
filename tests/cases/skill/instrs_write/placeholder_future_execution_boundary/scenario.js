module.exports = async function ({ run }) {
  await run([
    '/impl-instrs:instrs-write',
    '',
    'Сформируй существующий файл `target.md`.',
    '',
    'Раскрой плейсхолдеры внутри файла по правилам `instrs-write`.'
  ].join('\n'));
};
