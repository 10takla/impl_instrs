## Реализация runner

Напиши скрипт запуска тестов.

**Интерфейс:**
- Команда: `node runner.js <test-dir> --agent <adapter> [--params <string>]`

**Алгоритм:**
1. Копирует содержимое `<test-dir>/workspace/` в `<test-dir>/output/` (если `workspace/` существует).
2. Копирует [](<../ai_artifacts/integrated_with_other_en/codex/skills/>) в `<test-dir>/output/.agents/skills/`.
3. Запускает сессию агента через адаптер: `workspaceDir` = `<test-dir>/output/`, `entrypoint` = содержимое `<test-dir>/run.md`.
4. Прерывает процесс по тайм-ауту.

**Требования:**
- Единый [](<./runner.js>) без сторонних зависимостей (только стандартная библиотека).
- Тайм-аут по умолчанию — 120 секунд.
- Адаптеры определяются прямо в скрипте. Запрети вызовы CLI конкретных менеджеров вне блока адаптеров.
- Возвращай код `0` при успехе и `1` при ошибке.

**Адаптеры:**

`agy`:
```
cd <workspaceDir> && agy --prompt <entrypoint> --dangerously-skip-permissions [params]
```

`codex`:
```
codex exec --cd <workspaceDir> --dangerously-bypass-approvals-and-sandbox [params] <entrypoint>
```
