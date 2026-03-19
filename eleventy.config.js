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

    return `<sup class="sidenote-ref">${number}</sup><span class="sidenote">${rendered}</span>`;
  };

  // Hide the footnote list output (we render notes inline instead).
  md.renderer.rules.footnote_block_open = () => "";
  md.renderer.rules.footnote_block_close = () => "";
  md.renderer.rules.footnote_open = () => "";
  md.renderer.rules.footnote_close = () => "";
  md.renderer.rules.footnote_anchor = () => "";

  eleventyConfig.setLibrary("md", md);

  // Treat posts with `draft: true` as unpublished.
  // They can still be previewed directly via URL, but they won’t appear in the post list.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((item) => !item.data.draft);
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
