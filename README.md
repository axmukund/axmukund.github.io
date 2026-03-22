# Personal Site

## Local development

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`

## Content model

- Posts are self-contained folders under `src/posts`.
- Each post folder includes `index.md` and an `assets/` directory.
- Use relative links for media, e.g. `![Alt text](./assets/image.webp)`.

## Writing support

- Images: standard Markdown image syntax with required meaningful alt text.
- Code blocks: fenced blocks with language labels.
- Block quotes: standard Markdown `>`; include attribution where relevant.
- LaTeX: inline `$...$` and block `$$...$$`.

## Writing a new post

1. Create a new folder at `src/posts/YYYY/MM/DD/your-slug/`.
2. Add `index.md` inside that folder.
3. Add an `assets/` folder for post-local images/files.
4. Use front matter in `index.md`:

	```
	---
	layout: layouts/base.njk
	tags:
	  - posts
	title: Your Post Title
	description: One-line summary
	---
	```

5. Write content in Markdown:
	- Image: `![Alt text](./assets/figure.svg)`
	- Code block: fenced triple backticks with language label
	- Block quote: `> quote`
	- LaTeX: inline `$...$`, display `$$...$$`
	- Embed: raw HTML (for example iframe) is supported

6. Preview and publish:
	- Preview: `npm run dev`
	- Build check: `npm run build`
	- Publish: `git add . && git commit -m "Add new post" && git push origin main`

## The site now has dark/light theming + favicons

- Theme dropdown control in nav: System/Light/Dark.
- System mode uses `prefers-color-scheme` with a night-time fallback.
- Favicons are configured for both light and dark theme variants in head links.

## Accessibility defaults

- Semantic landmarks (`header`, `nav`, `main`).
- Keyboard-visible focus states.
- Skip link for keyboard users.
- Readable line length and serif-first typography.
