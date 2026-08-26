## Реализация runner

Напиши скрипт запуска тестов.

**Интерфейс:**
- Команда: `node runner.js <test-dir> --agent <adapter> [--params <string>]`

**Алгоритм:**
1. Очищает содержимое `<test-dir>/output/`.
2. Копирует содержимое `<test-dir>/workspace/` в `<test-dir>/output/` (если `workspace/` существует).
3. Копирует [](<../ai_artifacts/integrated_with_other_en/codex/skills/>) в `<test-dir>/output/.agents/skills/`.
4. Запускает сессию агента через адаптер: `workspaceDir` = `<test-dir>/output/`, `entrypoint` = содержимое `<test-dir>/run.md`.
5. Прерывает процесс по тайм-ауту.

**Требования:**
- Единый [](<./runner.js>) без сторонних зависимостей (только стандартная библиотека).
- Тайм-аут по умолчанию — 120 секунд.
- Адаптеры определяются прямо в скрипте. Запрети вызовы CLI конкретных менеджеров вне блока адаптеров.
- Возвращай код `0` при успехе и `1` при ошибке.
- Кроссплатформенный скрипт

**Адаптеры:**

`agy`:
Прочитай [](../.agent/skills/antigravity-cli/). Пойми pipeline вызова `agy` и схему парсинга потока через `index.js`. Сформируй на этой основе команду запуска `agy`.

Проброс параметров (обязательно):
- `cd <workspaceDir> && <agy from index.js>` - сместить папку.
- `--add-dir <workspaceDir>` — добавь рабочую директорию.
- `--prompt <entrypoint>`
- `agy ... [params]`


`codex`:
Прочитай [](../.agent/skills/codex-cli). Пойми pipeline вызова `codex` и схему парсинга потока через `index.js`. Сформируй на этой основе команду запуска `codex` и логику чтения `stdout` внутри адаптера `codex` в `runner.js`.

Проброс параметров (обязательно):
- `--cd <workspaceDir>`
- `agy ... [params] <entrypoint>` - в конце
