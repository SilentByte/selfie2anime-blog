//
// Selfie2Anime Blog
// Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
//

const fs = require('fs');
const path = require('path');

const relative = filename => path.join(__dirname, '../', filename);

const dependencies = {
    'source/css/deps.scss': [
        'node_modules/ekko-lightbox/dist/ekko-lightbox.css',
    ],
    'source/js/deps.js': [
        'node_modules/jquery/dist/jquery.slim.js',
        // 'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/ekko-lightbox/dist/ekko-lightbox.js',
    ],
};

Object.keys(dependencies).forEach(dep => {
    const file = fs.openSync(relative(dep), 'w');
    try {
        dependencies[dep].forEach(d => {
            fs.writeSync(file, fs.readFileSync(relative(d)));
        });
    }
    finally {
        fs.close(file);
    }
});
