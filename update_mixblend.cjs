const fs = require("fs");
const files = [
    "client/src/components/shopCards/ProductCard.jsx",
    "client/src/components/homes/home-1/Products.jsx",
    "client/src/components/homes/home-1/Categories.jsx"
];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");

        // 1. Update ProductCard.jsx
        if (file.includes("ProductCard.jsx")) {
            content = content.replace(/border: "1px solid #d4d4d4", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f5f5f5"/g, 'border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0"');
            // Add mixBlendMode to img-product and img-hover
            content = content.replace(/className="lazyload img-product"\s*\n\s*data-src=\{product.imgSrc\}/g, 'className="lazyload img-product"\n            style={{ mixBlendMode: "multiply" }}\n            data-src={product.imgSrc}');
            content = content.replace(/className="lazyload img-hover"\s*\n\s*data-src=\{/g, 'className="lazyload img-hover"\n            style={{ mixBlendMode: "multiply" }}\n            data-src={');
        }

        // 2. Update Products.jsx
        if (file.includes("Products.jsx")) {
            content = content.replace(/border: "1px solid #d4d4d4", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f5f5f5"/g, 'border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0"');
            content = content.replace(/className="lazyload img-product"\s*\n\s*src=\{cat.imgSrc\}/g, 'className="lazyload img-product"\n                        style={{ mixBlendMode: "multiply" }}\n                        src={cat.imgSrc}');
            content = content.replace(/className="lazyload img-hover"\s*\n\s*src=\{cat.imgSrc\}/g, 'className="lazyload img-hover"\n                        style={{ mixBlendMode: "multiply" }}\n                        src={cat.imgSrc}');
        }

        // 3. Update Categories.jsx
        if (file.includes("Categories.jsx")) {
            // Add background to the wrapper
            content = content.replace(/className="collection-image img-style"\s*>/g, 'className="collection-image img-style"\n                        style={{ backgroundColor: "#f0f0f0", borderRadius: "8px", border: "1px solid #e0e0e0" }}\n                      >');
            // Add mixBlendMode to the image
            content = content.replace(/className="lazyload"\s*\n\s*data-src=\{item.imgSrc\}/g, 'className="lazyload"\n                          style={{ mixBlendMode: "multiply" }}\n                          data-src={item.imgSrc}');
        }

        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
