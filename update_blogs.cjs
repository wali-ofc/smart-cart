const fs = require("fs");
const path = "client/src/data/blogs.js";
let content = fs.readFileSync(path, "utf8");

// find `export const blogPosts = [` and replace it
const newBlogPosts = `export const blogPosts = [
  {
    id: 1,
    imgSrc: "/images/blog/blog-1.jpg",
    alt: "E-Commerce Future",
    category: "Technology",
    title: "The Future of E-Commerce in 2026",
  },
  {
    id: 2,
    imgSrc: "/images/blog/blog-2.jpg",
    alt: "Smart Cart",
    category: "Updates",
    title: "Introducing Smart Cart 2.0 Features",
  },
  {
    id: 3,
    imgSrc: "/images/blog/blog-3.jpg",
    alt: "Shopping Experience",
    category: "Tips",
    title: "How to Maximize Your Shopping Experience",
  },
  {
    id: 4,
    imgSrc: "/images/blog/blog-4.jpg",
    alt: "Seller Guide",
    category: "Business",
    title: "Top 5 Tips for Smart Cart Sellers",
  },
  {
    id: 5,
    imgSrc: "/images/blog/blog-5.jpg",
    alt: "Mobile Commerce",
    category: "Technology",
    title: "Why Mobile Responsiveness is Crucial",
  },
  {
    id: 6,
    imgSrc: "/images/blog/blog-6.jpg",
    alt: "Holiday Sales",
    category: "Marketing",
    title: "Preparing for the Holiday Sales Rush",
  },
];`;

content = content.replace(/export const blogPosts = \[[\s\S]*?\];/g, newBlogPosts);
fs.writeFileSync(path, content, "utf8");
console.log("Updated blogPosts");
