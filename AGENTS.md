# Repository Guidelines

These guidelines help contributors work consistently in this repository. The repo currently hosts Markdown docs and a GitHub Pages configuration; adapt the conventions below as code is introduced.

## Project Structure & Module Organization
- Root: `README.md` (project overview).
- Docs: `docs/` (site content and assets). Keep public documentation, images, and static files here.
- Domain: `docs/CNAME` (custom domain for GitHub Pages). Do not edit unless the domain changes.
- Future code: place application code in `src/` and tests in `tests/` when added.

## Build, Test, and Development Commands
- No build system is required for Markdown-only changes.
- Typical workflow:
  - Create a branch: `git checkout -b feat/<topic>`
  - Stage/commit: `git add -A && git commit -m "feat: …"`
  - Push/PR: `git push -u origin HEAD` and open a PR.
- If a build tool is added later, document commands in `README.md` and package/config files.

## Coding Style & Naming Conventions
- Markdown: use ATX headings (`#`), wrap lines near 100 chars, prefer relative links, and fenced code blocks with language hints.
- Filenames: kebab-case for docs/assets (e.g., `docs/getting-started.md`, `docs/img/hero.png`).
- Indentation: 2 spaces for JSON/YAML/JS; 4 spaces for Python. Avoid tabs.
- If formatters/linters are introduced (e.g., Prettier, Ruff, ESLint), run them before committing.

## Testing Guidelines
- No tests exist yet. When adding code:
  - Structure tests under `tests/` mirroring `src/`.
  - Naming: Python `test_*.py`; JS/TS `*.test.{js,ts}`.
  - Aim for fast unit tests and include edge cases. Provide minimal fixtures.

## Commit & Pull Request Guidelines
- History is informal; prefer Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Use imperative mood, ≤72-char subject, and a rationale in the body if needed.
- Pull Requests: include a clear summary, linked issues (`Closes #123`), screenshots for UI/docs visuals, and note any docs updates in `docs/`.

## Docs & Pages
- Public scope: everything under `docs/` is published as static files. Do not commit secrets, access tokens, or server-side code here.
- Entry points: use `docs/index.html` (or Markdown rendered by Pages). Keep asset links relative (e.g., `./img/hero.png`).
- Assets: store images and files in `docs/img/` or `docs/assets/` and reference them relatively.
- Configuration: keep `docs/CNAME` intact. Add `docs/.nojekyll` if you need to disable Jekyll processing.

## Security & Publishing Tips
- Secrets: never store credentials anywhere in the repo, especially under `docs/`.
- Links: prefer relative paths to support subpath hosting.
- Indexing: add `docs/robots.txt` if you need to limit search engine indexing.
