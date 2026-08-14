export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "content/media": "media", "content/css": "css" });

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("excludeUrl", (items, url) =>
    (items || []).filter((item) => item.url !== url)
  );

  eleventyConfig.addFilter("limit", (items, n) => (items || []).slice(0, n));

  eleventyConfig.addFilter("startsWith", (str, prefix) => (str || "").startsWith(prefix));

  // Itineraries carry no `date` front matter, so Eleventy's default collection
  // order falls back to file dates; sort explicitly by startDate instead.
  eleventyConfig.addFilter("sortByStartDate", (items) =>
    [...(items || [])].sort(
      (a, b) => new Date(b.data.startDate || 0) - new Date(a.data.startDate || 0)
    )
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  };
}
