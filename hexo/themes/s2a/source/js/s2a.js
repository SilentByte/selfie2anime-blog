//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$(document).on('click', '[data-target="random-post"]', function(event) {
    event.preventDefault();

    // noinspection ES6ConvertVarToLetConst
    var post = s2a.posts[(Math.random() * s2a.posts.length) | 0];
    window.location.href = post.url;
});

$(document).ready(function() {
    // noinspection ES6ConvertVarToLetConst
    var adLocation = $('#content[data-content-type=post] h1:first');
    if(adLocation.length) {
        $('<p class="mt-5"><ins'
            + ' class="adsbygoogle"'
            + ' style="display:block;text-align:center;"'
            + ' data-ad-layout="in-article"'
            + ' data-ad-format="fluid"'
            + ' data-ad-client="ca-pub-XXXX"'
            + ' data-ad-slot="XXXX">'
            + '</ins></p>',
        ).insertBefore(adLocation);
        (window.adsbygoogle || []).push({});
    }
});

