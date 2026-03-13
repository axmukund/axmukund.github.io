# Personal Site

## Local development

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`

## Content model

- Blog posts are self-contained folders under `src/blog`.
- Each post folder includes `index.md` and an `assets/` directory.
- Use relative links for media, e.g. `![Alt text](./assets/image.webp)`.

## Writing support

- Images: standard Markdown image syntax with required meaningful alt text.
- Code blocks: fenced blocks with language labels.
- Block quotes: standard Markdown `>`; include attribution where relevant.
- LaTeX: inline `$...$` and block `$$...$$`.

## Accessibility defaults

- Semantic landmarks (`header`, `nav`, `main`).
- Keyboard-visible focus states.
- Skip link for keyboard users.
- Readable line length and serif-first typography.
