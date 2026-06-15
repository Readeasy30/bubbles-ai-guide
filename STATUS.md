# STATUS.md

## Project status

This repository is active.

GitHub is the source of truth.

Claude must inspect the actual files before saying what is done, missing, broken, or pending.

## Current workflow

Gerry gives the task.

Claude reads:

1. CLAUDE.md
2. STATUS.md
3. Actual GitHub file tree

Then Claude edits files, commits changes, and gives a short report.

## Important rules

- Do not rely on old chat memory.
- Do not redo finished work unless the repo proves it is needed.
- Do not redesign unless asked.
- Preserve the current tech stack unless Gerry asks for a change.
- Report blockers clearly.
