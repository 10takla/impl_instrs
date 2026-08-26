module.exports = async ({ run }) => run([
    '/impl-instrs:instrs-write',
    '',
    'Сформируй существующий файл `target.md`.',
    '',
    'Учитывай контекст всего раздела, а не только отдельные строки списка.'
  ].join('\n'));
