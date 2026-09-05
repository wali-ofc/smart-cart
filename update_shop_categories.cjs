const fs = require("fs");
const filesToUpdate = [
    "client/src/components/shop/ShopFilter.jsx",
    "client/src/components/shop/SidebarFilter.jsx",
    "client/src/components/shop/Sidebar.jsx"
];

const targetStr = `const categories = [
  { id: 1, name: "Fashion", isActive: true, link: "/shop-default" },
  { id: 2, name: "Men", isActive: false, link: "/shop-men" },
  { id: 3, name: "Women", isActive: false, link: "/shop-women" },
  { id: 4, name: "Denim", isActive: false, link: "/shop-default" },
  { id: 5, name: "Dress", isActive: false, link: "/shop-default" },
];`;

const newStr = `const categories = [
  { id: 1, name: "Clothing", isActive: false, link: "/category/clothing" },
  { id: 2, name: "Sunglasses", isActive: false, link: "/category/sunglasses" },
  { id: 3, name: "Bags", isActive: false, link: "/category/bags" },
  { id: 4, name: "Fashion", isActive: false, link: "/category/fashion" },
  { id: 5, name: "Accessories", isActive: false, link: "/category/accessories" },
];`;

for (let file of filesToUpdate) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        content = content.replace(targetStr, newStr);
        // Sometimes line endings differ
        content = content.replace(targetStr.replace(/\n/g, "\r\n"), newStr);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
