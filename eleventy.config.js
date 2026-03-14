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

  eleventyConfig.setLibrary("md", md);

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
