const fs = require('fs');

let path23 = 'client/src/components/shopDetails/Details23.jsx';
let content = fs.readFileSync(path23, 'utf8');

content = content.replace(/Buy with\{" "\}\s*<img[^>]*>/, 'Buy now');
fs.writeFileSync(path23, content, 'utf8');
