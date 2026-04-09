const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItTexmath = require("markdown-it-texmath");
const katex = require("katex");

function datePath(value) {
  const date = new Date(value);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/posts/**/assets/**/*");

  eleventyConfig.addFilter("datePath", datePath);
  eleventyConfig.addFilter("readableDate", (value) =>
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(value))
  );

  eleventyConfig.addTransform("toc", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    // Build a TOC from <h2> headings. This runs on every HTML page.
    const headingRe = /<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
    const headings = [...content.matchAll(headingRe)];
    if (headings.length < 2) return content;
    const items = headings
      .map(([, id, inner]) => {
        const text = inner.replace(/<[^>]+>/g, "").trim();
        return `<li><a href="#${id}">${text}</a></li>`;
      })
      .join("");
    const toc = `<nav class="toc" aria-label="Table of contents"><ol>${items}</ol></nav>`;
    return content.replace("</h1>", `</h1>${toc}`);
  });

  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      slugify: (s) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[''""]/g, "")
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase(),
    })
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItTexmath, {
      engine: katex,
      delimiters: "dollars",
      katexOptions: {
        output: "html",
        throwOnError: false,
      },
    });

  // Support Pandoc-style inline footnotes: ^{...}
  // These are rendered as Tufte-style margin notes.
  md.inline.ruler.before("footnote_inline", "footnote_inline_curly", function (state, silent) {
    const max = state.posMax;
    const start = state.pos;

    // Expect ^{
    if (start + 2 >= max) return false;
    if (state.src.charCodeAt(start) !== 0x5E /* ^ */) return false;
    if (state.src.charCodeAt(start + 1) !== 0x7B /* { */) return false;

    let pos = start + 2;
    let level = 1;

    while (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (ch === 0x7B /* { */) {
        level++;
      } else if (ch === 0x7D /* } */) {
        level--;
        if (level === 0) break;
      }
      pos++;
    }

    if (level !== 0) return false;

    if (!silent) {
      const labelStart = start + 2;
      const labelEnd = pos;

      if (!state.env.footnotes) state.env.footnotes = {};
      if (!state.env.footnotes.list) state.env.footnotes.list = [];

      const footnoteId = state.env.footnotes.list.length;
      const tokens = [];

      state.md.inline.parse(state.src.slice(labelStart, labelEnd), state.md, state.env, tokens);

      const token = state.push("footnote_ref", "", 0);
      token.meta = { id: footnoteId };

      state.env.footnotes.list[footnoteId] = {
        content: state.src.slice(labelStart, labelEnd),
        tokens,
      };
    }

    state.pos = pos + 1;
    state.posMax = max;
    return true;
  });

  // Render inline footnotes as margin notes (Tufte-style floating notes).
  md.renderer.rules.footnote_ref = function (tokens, idx, options, env, slf) {
    const id = tokens[idx].meta.id;
    if (!env.footnotes || !env.footnotes.list) return "";
    const note = env.footnotes.list[id];
    if (!note) return "";

    const rendered = slf.renderInline(note.tokens, options, env);
    const number = id + 1;

    return `<span class="sidenote-container"><a class="sidenote-link" href="#fn-${id}" id="snref-${id}"><sup class="sidenote-ref">${number}</sup></a><span class="sidenote" id="fn-${id}"><span class="sidenote-number">${number}.</span> ${rendered}</span></span>`;
  };

  // Hide the footnote list output (we render notes inline instead).
  // Wrap in a hidden <div> so that any block-level content inside
  // (from traditional [^ref]: ... definitions) doesn't leak as
  // unnumbered text at the bottom of the page.
  md.renderer.rules.footnote_block_open = () => '<div hidden aria-hidden="true" class="footnote-defs">';
  md.renderer.rules.footnote_block_close = () => '</div>';
  md.renderer.rules.footnote_open = () => "";
  md.renderer.rules.footnote_close = () => "";
  md.renderer.rules.footnote_anchor = () => "";

  eleventyConfig.setLibrary("md", md);

  // Treat posts with `draft: true` as unpublished, unless the dev server is
  // explicitly asked to show drafts (via `ELEVENTY_DRAFTS=1`).
  //
  // This lets you preview draft posts in `/posts/` locally while keeping them
  // hidden from production builds.
  const showDrafts =
    process.env.ELEVENTY_DRAFTS === "1" ||
    process.env.ELEVENTY_DRAFTS === "true";

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((item) => showDrafts || !item.data.draft);
  });

  // Tufte-style margin notes / sidenotes for markdown content.
  // Inline usage in markdown: Here is the main text {% sidenote "This is a margin note." %}.
  // Block usage in markdown: {% sidenoteBlock %}This is a longer note.{% endsidenoteBlock %}
  eleventyConfig.addShortcode("sidenote", function (content) {
    return `<span class="sidenote">${content}</span>`;
  });

  eleventyConfig.addPairedShortcode("sidenoteBlock", function (content) {
    return `<span class="sidenote">${content}</span>`;
  });

  // Figure shortcode with auto-numbered captions and optional 2-panel layout.
  // Also supports markdown shorthand syntax: !{fig}{src}{caption}{alt?}
  // Usage examples:
  // {% figure "/assets/img.png", "Caption text" %}
  // {% figure "/assets/a.png||/assets/b.png", "Caption text" %}

  function renderFigure(src, caption = "", alt = "", page = {}) {
    page.figureCounter = (page.figureCounter || 0) + 1;
    const figureNumber = page.figureCounter;

    const sources = (typeof src === "string" ? src.split("||") : [src])
      .map((path) => path.trim())
      .filter(Boolean);
    const isTwoPanel = sources.length > 1;

    const panelHtml = sources
      .map((imageSrc, index) => {
        const panelAlt = sources.length > 1 ? `${alt} (${index + 1})` : alt;
        return `<div class="figure-panel"><img src="${imageSrc}" alt="${panelAlt}" loading="lazy" decoding="async"></div>`;
      })
      .join("");

    return `
<figure class="figure ${isTwoPanel ? "figure--two-panel" : "figure--single-panel"}">
  <figcaption class="figure-caption"><span class="figure-label">Figure ${figureNumber}.</span> ${caption}</figcaption>
  <div class="figure-grid">${panelHtml}</div>
</figure>
`;
  }

  eleventyConfig.addShortcode("figure", function (src, caption = "", alt = "") {
    return renderFigure(src, caption, alt, this.page || {});
  });

  md.inline.ruler.before("emphasis", "figure_syntax", function (state, silent) {
    const start = state.pos;
    const srcText = state.src.slice(start);
    const match = /^!\{fig\}\{([^}]+)\}\{([^}]+)\}(?:\{([^}]+)\})?/.exec(srcText);
    if (!match) return false;
    if (silent) return true;

    const imageSrc = match[1].trim();
    const caption = match[2].trim();
    const alt = (match[3] || "").trim();
    const page = (state.env && state.env.page) || {};

    const token = state.push("html_inline", "", 0);
    token.content = renderFigure(imageSrc, caption, alt, page);

    state.pos += match[0].length;
    return true;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
