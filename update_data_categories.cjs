const fs = require("fs");
const file = "client/src/data/categories.js";

const targetStr = `export const categories = [
  { name: "Fashion", count: 31, className: "current" },
  { name: "Men", count: 9, className: "" },
  { name: "Women", count: 23, className: "" },
  { name: "Denim", count: 20, className: "" },
  { name: "Dress", count: 23, className: "" },
];`;

const newStr = `export const categories = [
  { name: "Clothing", count: 20, className: "current", link: "/category/clothing" },
  { name: "Sunglasses", count: 20, className: "", link: "/category/sunglasses" },
  { name: "Bags", count: 20, className: "", link: "/category/bags" },
  { name: "Fashion", count: 20, className: "", link: "/category/fashion" },
  { name: "Accessories", count: 20, className: "", link: "/category/accessories" },
];`;

let content = fs.readFileSync(file, "utf8");
content = content.replace(targetStr, newStr);
content = content.replace(targetStr.replace(/\n/g, "\r\n"), newStr);
fs.writeFileSync(file, content);
console.log(`Updated ${file}`);
