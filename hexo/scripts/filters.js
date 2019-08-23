//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const striptags = require('striptags');
const lunr = require('lunr');

hexo.extend.generator.register('lunr_index_generator', function() {
    const posts = hexo.database.model('Post')
        .find({
            published: true,
        })
        .map((p, i) => ({
            id: i.toString(16),
            url: p.permalink,
            title: p.title,
            tags: p.tags.map(t => t.name),
            content: striptags(p.content),
            excerpt: striptags(p.excerpt || p.content),
        }));

    const data = {};
    posts.forEach(p => {
        data[p.id] = {
            url: p.url,
            title: p.title,
            excerpt: p.excerpt,
        };
    });

    const index = lunr(function() {
        this.ref('id');
        this.field('title');
        this.field('content');
        this.field('tags');

        const self = this;
        posts.forEach(p => {
            self.add(p);
        });
    });

    return {
        path: 'index.lunr.json',
        data: JSON.stringify({
            data: data,
            index: index,
        }),
    };
});
