const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',})
    eleventyConfig.addPassthroughCopy('src/images')

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
        process.env.ELEVENTY_PRODUCTION &&
        outputPath &&
        outputPath.endsWith(".html")
    ) {
        let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        });
        return minified;
    }
    return content;
    })

    return {
        dir: {
            input: "src",
            data: "data",
            layouts: "layouts",
            includes: "includes"
        },
        htmlTemplateEngine: "njk"
    };
};
