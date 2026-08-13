export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("media");

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().slice(0, 10)
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  };
}
