//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const url = require("url");
const _ = require("lodash");

hexo.extend.tag.register("page_link", args => {
    const name = args.shift();

    if(!name) {
        return "";
    }

    const page = hexo.model("Page").findOne({
        path: name + "/index.html",
    });

    if(!page) {
        return "";
    }

    const text = _.escape(args.length ? args.join(" ") : page.title);
    const href = _.escape(hexo.config.root + page.path.replace(/\/index.html$/, "/"));

    return `<a href="${href}" title="${text}">${text}</a>`;
});

hexo.extend.tag.register("home_link", args => {
    const text = _.escape(args.join(" "));
    const href = hexo.config.root;

    return `<a href="${href}" title="${text}">${text}</a>`;
});

hexo.extend.tag.register("intro", args => {
    const intro = _.escape(args.join(" "));
    return `<!-- more --><div class="intro">${intro}</div>`;
});

hexo.extend.tag.register("closing", args => {
    const closing = _.escape(args.join(" "))
        .replace("...", "…");

    return `<div class="closing">${closing}</div>`;
});

hexo.extend.tag.register("explanation", args => {
    const word = _.escape(args.shift());
    const explanation = _.escape(args.join(" "));

    return `<span class="explanation" title="${explanation}">${word}</span>`;
});

hexo.extend.tag.register("shoutout", (args, content) => {
    const safe = args.shift();
    content = safe === "safe" ? content : _.escape(content);
    return `<div class="shoutout">${content}</div>`;
}, {ends: true});

hexo.extend.tag.register("floater", function(args) {
    const slug = args.shift();
    const alt = _.escape(args.join(" "));

    const asset = hexo.model("PostAsset").findOne({
        post: this._id,
        slug: slug,
    });

    if(!asset) {
        return "";
    }
    const src = url.resolve("/", hexo.config.root + asset.path);
    return `<a href="${src}" data-toggle="lightbox"><img class="floating" src="${src}" alt="${alt}"></a>`;
});

hexo.extend.tag.register("figure", function(args) {
    const slug = args.shift();
    const alt = _.escape(args.join(" "));

    const asset = hexo.model("PostAsset").findOne({
        post: this._id,
        slug: slug,
    });

    if(!asset) {
        return "";
    }

    const src = url.resolve("/", hexo.config.root + asset.path);
    return `<a href="${src}" data-toggle="lightbox"><img class="figure" src="${src}" alt="${alt}"></a>`;
});

hexo.extend.tag.register("tweet", function(args) {
    const tweet = args.shift();
    let alt = _.escape(args.join(" "));

    if(!alt) {
        alt = tweet;
    }

    return `<div class="twitter-container">
                <blockquote class="twitter-tweet tw-align-center"
                            data-theme="light"
                            data-link-color="#f06292">
                    <a href="${tweet}">
                        ${alt}
                    </a>
                </blockquote>
            </div>`
});
