# Ожидаемый результат (Expected Result)

Для теста размещения артефактов `tests/skill_impl_instrs_workspace/rule_artifacts/test_artifact_placement/`:

1. Должен быть создан файл отчета `workspace_summary.txt`.
2. Путь сохранения должен автоматически определиться согласно правилам работы с артефактами (в папку `ai_artifacts/` относительно инструкции):
   `tests/skill_impl_instrs_workspace/rule_artifacts/test_artifact_placement/ai_artifacts/workspace_summary.txt`
3. Содержимое файла должно представлять собой список файлов в папке `tests/skill_impl_instrs_workspace/rule_artifacts/test_artifact_placement/` на момент начала выполнения теста:
   - `EXPECTED.md`
   - `README.md`
   - `ai_artifacts/`
   - `run.ai_instrs.md`


