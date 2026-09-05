const fs = require("fs");
const files = [
    "client/src/components/shopCards/ProductCard.jsx",
    "client/src/components/homes/home-1/Products.jsx"
];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        content = content.replace(/border: "1px solid #ebebeb", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fafafa"/g, 'border: "1px solid #d4d4d4", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f5f5f5"');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
