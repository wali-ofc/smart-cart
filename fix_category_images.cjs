const fs = require("fs");
const file = "client/src/data/categories.js";

const oldCollections = `export const collections = [
  {
    imgSrc: "/images/collections/collection-17.jpg",
    altText: "collection-img",
    title: "Clothing",
  },
  {
    imgSrc: "/images/collections/collection-14.jpg",
    altText: "collection-img",
    title: "Sunglasses",
  },
  {
    imgSrc: "/images/collections/collection-18.jpg",
    altText: "collection-demo-1",
    title: "Bags",
  },
  {
    imgSrc: "/images/collections/collection-15.jpg",
    altText: "collection-demo-1",
    title: "Fashion",
  },
  {
    imgSrc: "/images/collections/collection-20.jpg",
    altText: "collection-demo-1",
    title: "Accessories",
  },
];`;

const newCollections = `export const collections = [
  {
    imgSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    altText: "Clothing",
    title: "Clothing",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
    altText: "Sunglasses",
    title: "Sunglasses",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
    altText: "Bags",
    title: "Bags",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
    altText: "Fashion",
    title: "Fashion",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop",
    altText: "Accessories",
    title: "Accessories",
  },
];`;

let content = fs.readFileSync(file, "utf8");
content = content.replace(oldCollections, newCollections);
content = content.replace(oldCollections.replace(/\n/g, "\r\n"), newCollections);
fs.writeFileSync(file, content);
console.log(`Updated ${file}`);
