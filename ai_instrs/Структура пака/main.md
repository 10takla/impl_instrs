## Черновики

**Ссылки:**
- [Формат черновиков](<../../../ai_drafts/ai_instrs/Формат черновиков.md>)
- [Условия вызова](<../../../ai_drafts/ai_instrs/Условия вызова.md>)
- [Формирование содержимого](<../../../ai_drafts/ai_instrs/Формирование содержимого.md>)


### Перечень черновиков

#### instr-context - Контекст инструкций
Общий контекст работы с инструкциями: понятийный слой и проактивный сбор контекста.

**На основе:**
- [Концепт](</ai_instrs.concept/Состав пака/main.md#контекст-инструкций>)
- [Проактивный сбор контекста](</ai_instrs.concept/Состав пака/main.md#проактивный-сбор-контекста>)
- [Термины](</ai_instrs.concept/Термины и основные понятия.md>)

**Обязательные условия вызова:**
- Режим: [`implicit_invocation`](<#implicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)

#### instruction-style - Стиль инструкций
[Концепт](</ai_instrs.concept/Стиль инструкций.md>). Кроме:
- [](</ai_instrs.concept/Стиль инструкций.md#функциональные-инструкции>)
- [](</ai_instrs.concept/Стиль инструкций.md#комбинирование-инструкций>)

**Связи:**
- `@draft(instr-context)`

**Обязательные условия вызова:**
- Режим: [`implicit_invocation`](<#implicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### instr-execution - Выполнение инструкций
[Концепт](</ai_instrs.concept/Состав пака/main.md#выполнение-инструкций>)

В него входит:
- [Инкрементальное обновление результата](</ai_instrs.concept/Состав пака/main.md#инкрементальное-обновление-результата>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### workspace - Рабочее пространство
[Концепт](</ai_instrs.concept/Состав пака/main.md#структура-файлов-и-рабочее-пространство>)

**Связи:**
- `@draft(instr-context)`

**Обязательные условия вызова:**
- Режим: [`implicit_invocation`](<#implicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### instrs-write - Формирование промптов
[Концепт](</ai_instrs.concept/Состав пака/main.md#формирование-промптов>)

В него входит:
- [Инкрементальное обновление результата](</ai_instrs.concept/Состав пака/main.md#инкрементальное-обновление-результата>)
- [Изоляция контекста](</ai_instrs.concept/Общие/Изоляция контекста.md>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### reverse-engineer-instr - Реверс-инжиниринг
[Концепт](</ai_instrs.concept/Состав пака/main.md#реверс-инжиниринг>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)


#### refactor-instrs - Рефакторинг инструкций
[Концепт](</ai_instrs.concept/Состав пака/main.md#рефакторинг-инструкций>)

На основе:
- [структуры файлов](</ai_instrs.concept/Состав пака/main.md#структура-файлов-и-рабочее-пространство>)
- [Изоляция контекста](</ai_instrs.concept/Общие/Изоляция контекста.md>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### simultaneous-update-instrs-result - Одновременное обновление инструкций и результата

[Концепт](</ai_instrs.concept/Состав пака/main.md#одновременное-обновление-инструкций-и-результата>)
Здесь очень важно ["Выполнение инструкций"](<#instr-execution---выполнение-инструкций>)

Скомбинируй черновики:
1. `@draft(instrs-write)` — сформируй или обнови инструкцию.
2. `@draft(instr-execution)` — выполни актуальную инструкцию.

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### debug-feedback - Дебаг и обратная связь
[Концепт](</ai_instrs.concept/Состав пака/main.md#дебаг-и-обратная-связь>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)


#### meta-instructions - Мета-инструкции
[Концепт](</ai_instrs.concept/Состав пака/main.md#мета-инструкции>)

**Связи:**
- `@draft(instruction-style)`
- `@draft(workspace)`

**Обязательные условия вызова:**
- Режим: [`explicit_invocation`](<#explicit_invocation>)
- Область применения: [`reacts_to_instruction_files`](<#reacts_to_instruction_files>)

### Переиспользуемые условия

#### reacts_to_instruction_files
**Название:** Реагирует на файлы инструкций

В `manifest.yaml` объяви условие:

```yaml
custom_conditions:
  reacts_to_instruction_files: "КРИТИЧЕСКАЯ БЛОКИРОВКА: ВЫ ОБЯЗАНЫ прочитать это перед ЛЮБЫМ взаимодействием (даже при простом исправлении опечаток) с файлами и папками по паттернам: 'ai_instrs/', '*.ai_instrs/', 'ai_instrs.*/', 'ai_instrs.*', '*.ai_instrs.*'. Файл содержит нестандартные правила, которые отменяют ваши базовые знания по умолчанию. Вы провалите задачу, если проигнорируете это."
```

---
#### explicit_invocation
[](<../../../ai_drafts/ai_instrs/Условия вызова.md#explicit_invocation>)

---
#### implicit_invocation
[](<../../../ai_drafts/ai_instrs/Условия вызова.md#implicit_invocation>)
