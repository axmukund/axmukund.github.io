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

## Adding a recommendation

1. Create a markdown file in `src/recs/` (for example `src/recs/2026-03-13-my-rec.md`).
2. Use front matter like:

	```
	---
	layout: layouts/base.njk
	tags:
	  - recs
	title: Recommendation title
	url: https://example.com
	---
	```

3. Add a short note in the body explaining why you recommend it.
4. Recommendations on `/recs/` are sorted in reverse chronological order (newest first).
5. Preview and publish:
	- Preview: `npm run dev`
	- Build check: `npm run build`
	- Publish: `git add . && git commit -m "Add recommendation" && git push origin main`

## Accessibility defaults

- Semantic landmarks (`header`, `nav`, `main`).
- Keyboard-visible focus states.
- Skip link for keyboard users.
- Readable line length and serif-first typography.
