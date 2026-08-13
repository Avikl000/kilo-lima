export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "content/media": "media", "content/css": "css" });

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("excludeUrl", (items, url) =>
    (items || []).filter((item) => item.url !== url)
  );

  eleventyConfig.addFilter("limit", (items, n) => (items || []).slice(0, n));

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  };
}
