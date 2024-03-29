const CleanCSS = require("clean-css")
module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget(".")
  eleventyConfig.addPassthroughCopy({ "./static": "." })
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles
  })
}
