# Stability Directive

Last updated: 2026-06-04

## Purpose

This directive establishes the standard operating rule for this repository and future AI-assisted work.

When Gerry or a project file says **lock**, **locked**, **checkpoint**, **production lock**, or **stable version**, it means more than preserving files. It means stabilize the project so the same work does not have to be repeated.

## Definition of lock

A locked project state means:

1. The current working version is protected.
2. Known working files are not casually replaced.
3. Known broken paths, duplicate files, and old experiments are removed or clearly marked as deprecated.
4. Future changes must preserve the working site, application, or campaign system.
5. Any fix must be recorded so the same issue is not rediscovered later.
6. New work must not begin until the existing production path is stable.

In short: **lock = stabilize, protect, document, and verify.**

## Required behavior

Before making changes, read the current project status and stability files, including any of the following if present:

- `README.md`
- `AGENTS.md`
- `PROJECT-STATUS.md`
- `CODEX-CURRENT-TASK.md`
- `CHANGELOG.md`
- `STABILITY-LOCK.md`
- `STABILITY-DIRECTIVE.md`
- `RELEASE-CHECKLIST.md`
- `QA-CHECKLIST.md`

## Stabilize before building

Do not start new feature work while the existing system is broken.

Priority order:

1. Restore the current working path.
2. Remove or isolate the cause of failure.
3. Confirm the correct files are in the repository, not only in a temporary deployment.
4. Record the fix in status or changelog files.
5. Add a guardrail if the same mistake could happen again.
6. Only then continue new work.

## Do not repeat work

Do not recreate files, pages, workflows, or fixes that already exist unless there is a documented reason.

Before creating a new file, check whether an equivalent file already exists.

Before replacing a working file, identify what is broken and why replacement is safer than a small fix.

## Preserve current stack

Do not change the project stack unless directly approved.

For static website repositories, do not convert to React, Vite, Next.js, TypeScript, Tailwind, or any build system unless the repo already uses that stack and the change is part of the locked plan.

## Production safety rules

Do not add private integrations, tracking, live ads, payment systems, affiliate links, user accounts, upload systems, public AI tools, major file deletion, or framework migration without direct approval.

## Required documentation after meaningful changes

After a meaningful fix or production change, update at least one appropriate project control file:

- `PROJECT-STATUS.md`
- `CHANGELOG.md`
- `CODEX-CURRENT-TASK.md`
- `STABILITY-LOCK.md`
- `QA-CHECKLIST.md`

The update should state what changed, why it changed, what should not be repeated, and what still needs browser or deployment testing.

## Release rule

A repo is not considered stable merely because files were edited. It is stable when the intended production path is clear, conflicting old files are removed or documented, the site/app/campaign has a defined QA path, deployment settings are known or documented, and future agents know what not to undo.

## Final instruction

When in doubt, stabilize first. Do not chase new features while the production path is unreliable.
