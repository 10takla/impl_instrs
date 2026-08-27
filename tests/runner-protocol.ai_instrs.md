# Протокол runner

## Интерфейс

```text
node runner.js <test-dir> --agent <adapter> [--params <string>]
```

Сценарий теста — `<test-dir>/scenario.js`, асинхронная функция:

```js
module.exports = async ({ testDir, workspaceDir, run, continueRun, checkpoint }) => {
  const session = await run('Выполни инструкцию.');
  await checkpoint('первый запуск');
  await continueRun(session, 'Снова выполни актуальную инструкцию.');
};
```

## Подготовка

1. Очисти `<test-dir>/output/`.
2. Скопируй `<test-dir>/workspace/` в `<test-dir>/output/`, если папка существует.
3. Скопируй [](<../ai_artifacts/integrated_with_other_en/codex/skills/>) в `<test-dir>/output/.agents/skills/`.
4. Запусти `scenario.js`, передав `workspaceDir` = `<test-dir>/output/`.

## API сценария

- `run(prompt)` — запусти новую сессию агента в `workspaceDir` с параметрами `--params` и верни её дескриптор.
- `continueRun(session, prompt)` — продолжи указанную сессию в том же `workspaceDir` с параметрами `--params` и верни обновлённый дескриптор.
- `checkpoint(label)` — приостанови сценарий для внешней проверки `workspaceDir` и дождись вердикта.

## Контрольная точка

При вызове `checkpoint(label)` runner:

1. Выводит метку и маркер: `=== AWAITING VERDICT: CONTINUE | FAIL <причина> ===`.
2. Читает вердикт из stdin (без тайм-аута).
3. При `CONTINUE` продолжает сценарий.
4. При `FAIL <причина>` завершает процесс с кодом `1`, выводя метку и причину.
5. При некорректном вводе повторяет запрос.
