const fs = require("fs");
const files = [
    "client/src/components/shop/ShopFilter.jsx",
    "client/src/components/shop/SidebarFilter.jsx"
];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        // Replace useState([10, 20]) with useState([0, 150])
        content = content.replace(/useState\(\[10,\s*20\]\)/g, "useState([0, 150])");
        content = content.replace(/setPrice\(\[10,\s*20\]\)/g, "setPrice([0, 150])");
        // Replace min={5} with min={0}
        content = content.replace(/min=\{5\}/g, "min={0}");
        // Replace max={22} with max={150}
        content = content.replace(/max=\{22\}/g, "max={150}");
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
