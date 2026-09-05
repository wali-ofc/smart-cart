const fs = require("fs");

const files = [
    "client/src/data/products.js",
    "client/src/components/homes/home-1/Products.jsx",
    "client/src/data/categories.js"
];

// Mappings of old "risky" or "undecent" images to clean, professional flatlays/hangers
const replacements = {
    "1515886657613-9f3515b0c78f": "1618354691373-d851c5c3a990",
    "1529139574466-a303027c1d8b": "1521572163474-6864f9cf17ab",
    "1503342217505-b0a15ec3261c": "1556821840-3a63f95609a7",
    "1576566588028-4147f3842f27": "1529374255404-311a2a4f1fd9"
};

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        for (let oldId in replacements) {
            let newId = replacements[oldId];
            let oldStr = `https://images.unsplash.com/photo-${oldId}?w=600&h=800&fit=crop`;
            let newStr = `https://images.unsplash.com/photo-${newId}?w=600&h=800&fit=crop`;
            content = content.split(oldStr).join(newStr);
        }
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
