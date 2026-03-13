const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
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
  eleventyConfig.addPassthroughCopy("src/blog/**/assets/**/*");

  eleventyConfig.addFilter("datePath", datePath);
  eleventyConfig.addFilter("readableDate", (value) =>
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(value))
  );

  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
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
