//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const _ = require('lodash');

hexo.extend.filter.register('after_post_render', function(data) {
    const smilies = [
        'ambivalent',
        'angel',
        'angry',
        'blush',
        'confused',
        'crazy',
        'crying',
        'foot-in-mouth',
        'frown',
        'gasp',
        'grin',
        'halo',
        'heart',
        'hot',
        'kiss',
        'largegasp',
        'laugh',
        'lips-are-sealed',
        'money',
        'naughty',
        'nerd',
        'ohnoes',
        'pirate',
        'sarcastic',
        'sick',
        'smile',
        'thumbs-down',
        'thumbs-up',
        'tongue',
        'undecided',
        'veryangry',
        'wink',
        'yum',
    ];

    const regex = new RegExp('\\:(' + smilies.join('|') + ')\\:', 'g');
    data.content = data.content.replace(regex, (match, smiley) => {
        const name = _.startCase(smiley);
        const src = `${hexo.config.root}img/smilies/${smiley}.png`;

        return `<img class="smiley" src="${src}" alt="${name}">`;
    });

    return data;
});
