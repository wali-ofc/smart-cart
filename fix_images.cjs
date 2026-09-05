const fs = require("fs");

const files = [
    "client/src/data/products.js",
    "client/src/components/homes/home-1/Products.jsx"
];

const badUrl1 = "https://images.unsplash.com/photo-1515562141207-7a8efd3dc7f8?w=600&h=800&fit=crop";
const replacement1 = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop";

const badUrl2 = "https://images.unsplash.com/photo-1599643478514-4a5202302325?w=600&h=800&fit=crop";
const replacement2 = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop";

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        content = content.split(badUrl1).join(replacement1);
        content = content.split(badUrl2).join(replacement2);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
