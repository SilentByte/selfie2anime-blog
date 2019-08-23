//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const url = require('url');

hexo.extend.helper.register('debug', function(object) {
    return JSON.stringify(object);
});

hexo.extend.helper.register('absolute_url', function(relative) {
    return url.resolve(hexo.config.url, relative);
});

hexo.extend.helper.register('url_for_stripped', function(path) {
    return this.url_for(path).replace(/\/index.html$/, '/');
});
