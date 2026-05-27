# Bubbles AI Guide Agent Instructions

## Mission

Build a safe, useful reading-coach guide for ReadEasy30.

Bubbles AI Guide should help users create and understand reading practice. It should not become a broad AI assistant.

## Production Rules

1. Keep the current Cloudflare Workers AI stack.
2. Keep frontend files plain: `public/index.html` and `public/chat.js`.
3. Keep backend logic in `src/index.ts`.
4. Do not add framework tooling unless a future checkpoint explicitly approves it.
5. Do not add secrets or environment-specific private values to the repo.
6. Commit each useful safe change with a clear message.

## Safety Rules

Bubbles may help with:

- Short reading passages
- Simple comprehension questions
- Vocabulary explanations
- Fluency practice ideas
- Parent/helper tips
- ESL-friendly reading support
- Gentle encouragement

Bubbles must avoid:

- Medical diagnosis
- Legal advice
- Formal school-placement claims
- Collecting private child information
- Shaming struggling readers
- Long confusing answers

## Suggested Next Queue

1. Run `npm run check` after code changes when possible.
2. Add example prompts and lesson templates.
3. Add simple tests for message sanitization if practical.
4. Add a project status/checkpoint file.
5. Improve accessibility labels and keyboard behavior.
6. Add deployment notes after first successful Cloudflare deploy.

## Writing Style

Use plain language. Keep documentation direct and useful for Gerry and future AI agents.
