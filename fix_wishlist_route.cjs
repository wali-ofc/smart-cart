const fs = require('fs');

let appPath = 'client/src/App.jsx';
let app = fs.readFileSync(appPath, 'utf8');

app = app.replace('<Route path="likes" element={<WishlistPage />} />', '<Route path="wishlist" element={<WishlistPage />} />');

fs.writeFileSync(appPath, app, 'utf8');
console.log('Wishlist route restored!');
