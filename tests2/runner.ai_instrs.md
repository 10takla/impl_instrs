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
agy --cwd <workspaceDir> chat --prompt <entrypoint> [params]
```

`codex`:
```
codex --cwd <workspaceDir> --prompt <entrypoint> [params]
```
