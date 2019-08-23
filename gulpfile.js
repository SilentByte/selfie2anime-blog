//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const gulp = require("gulp");
const replace = require("gulp-replace");
const hash = require("gulp-hash");
const htmlmin = require("gulp-htmlmin");
const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const pretty = require("gulp-pretty-data");

const src = ".deploy/hexo/";
const dist = ".deploy/dist/";

// Pipe through all files that will not be modified.
gulp.task("copy:static", () => {
    console.log("Copying files that will not be touched");
    return gulp.src([
            "**/*",
            "!**/*.html",
            "!**/*.css",
            "!**/*.js",
            "!**/*.png",
            "!**/*.jpg",
            "!**/*.jpeg",
            "!**/*.gif",
            "!**/*sitemap.xml",
            "!**/*sitemap.xsl",
        ], {
            cwd: src,
        },
    ).pipe(gulp.dest(dist));
});

// Optimize & Minify CSS files.
gulp.task("optimize:css", () => {
    console.log("Optimizing CSS files");
    return gulp.src("**/*.css", {cwd: src})
        .pipe(cleancss())
        .pipe(hash({
            template: "<%= name %>.<%= hash %><%= ext %>",
            hashLength: 16,
        }))
        .pipe(gulp.dest(dist));
});

// Optimize & Minify JavaScript files.
gulp.task("optimize:js", () => {
    console.log("Optimizing JavaScript files");
    return gulp.src("**/*.js", {cwd: src})
        .pipe(uglify())
        .pipe(hash({
            template: "<%= name %>.<%= hash %><%= ext %>",
            hashLength: 16,
        }))
        .pipe(gulp.dest(dist));
});

// Optimize & Minify HTML files.
gulp.task("optimize:html", gulp.series(gulp.parallel("optimize:css", "optimize:js"), () => {
    console.log("Optimizing HTML files");

    let styleHash = /style.([0-9a-f]+).css/.exec(glob.sync(path.join(dist, "css/style.*.css"))[0]);
    let depsHash = /deps.([0-9a-f]+).js/.exec(glob.sync(path.join(dist, "js/deps.*.js"))[0]);
    let s2aHash = /s2a.([0-9a-f]+).js/.exec(glob.sync(path.join(dist, "js/s2a.*.js"))[0]);

    if(!styleHash || !depsHash || !s2aHash) {
        throw Error("Could not determine hashes for cache-busting files");
    }

    styleHash = styleHash[1];
    depsHash = depsHash[1];
    s2aHash = s2aHash[1];

    return gulp.src("**/*.html", {cwd: src})
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(replace(
            "<link rel=\"stylesheet\" href=\"/blog/css/style.css\">",
            `<link rel="stylesheet" href="/blog/css/style.${styleHash}.css">`),
        )
        .pipe(replace(
            "<script src=\"/blog/js/deps.js\">",
            `<script src="/blog/js/deps.${depsHash}.js">`),
        )
        .pipe(replace(
            "<script src=\"/blog/js/s2a.js\">",
            `<script src="/blog/js/s2a.${s2aHash}.js">`),
        )
        .pipe(gulp.dest(dist));
}));

// Optimize Image files.
gulp.task("optimize:images", () => {
    console.log("Optimizing image files");
    return gulp.src([
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.gif",
    ], {cwd: src})
        .pipe(imagemin([
            imagemin.optipng({
                optimizationLevel: 7,
            }),
            imagemin.jpegtran({
                progressive: true,
            }),
            imagemin.gifsicle({
                interlaced: true,
                optimizationLevel: 3,
            }),
        ], {
            verbose: true,
        }))
        .pipe(gulp.dest(dist));
});

// Optimize XML Sitemap Files.
gulp.task("optimize:sitemaps", () => {
    console.log("Optimizing sitemap files");
    return gulp.src([
        "**/*sitemap.xml",
    ], {cwd: src})
        .pipe(replace("<?xml-stylesheet type=\"text/xsl\" href=\"sitemap.xsl\"?>", ""))
        .pipe(pretty({
            type: "minify",
            preserveComments: false,
        }))
        .pipe(replace(/\s+$/, ""))
        .pipe(gulp.dest(dist));
});

// Verify that each post has an associated thumbnail.
gulp.task("lint:thumbnails", (done) => {
    const posts = glob.sync("./hexo/source/_posts/*.md");
    posts.forEach(p => {
        const thumbnail = path.join(
            "./hexo/source/_posts/",
            path.basename(p, ".md"),
            "thumbnail.png",
        );

        if(!fs.existsSync(thumbnail)) {
            throw Error(`Post ${p} has no thumbnail.`);
        }
    });

    done();
});

gulp.task("lint", gulp.series("lint:thumbnails"));

gulp.task("optimize-for-deployment", gulp.parallel(
    "copy:static",
    "optimize:html",
    "optimize:css",
    "optimize:js",
    "optimize:images",
    "optimize:sitemaps",
));
