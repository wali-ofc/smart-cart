const fs = require('fs');

const generateProducts = (category, count, startId, basePrice, images) => {
    let newProducts = [];
    for (let i = 0; i < count; i++) {
        let name = `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i + 1}`;
        if (category === 'fashion') name = ['Designer Dress', 'Chic Blazer', 'Trendy Top', 'Elegant Skirt', 'Vogue Coat', 'Couture Gown'][i % 6] + ' ' + (i+1);
        if (category === 'accessories') name = ['Necklace', 'Bracelet', 'Watch', 'Earrings', 'Ring', 'Scarf'][i % 6] + ' ' + (i+1);
        
        let img = images[i % images.length];
        
        newProducts.push(`  {
    id: ${startId + i},
    imgSrc: "${img}",
    imgHoverSrc: "${img}",
    title: "${name}",
    price: ${(basePrice + i * 2.5).toFixed(2)},
    category: "${category}",
    colors: [
      { name: "Black", colorClass: "bg_dark", imgSrc: "${img}" }
    ],
    sizes: ["One Size"],
    filterCategories: ["New Arrivals"],
    brand: "SmartCart",
    isAvailable: true,
  }`);
    }
    return newProducts.join(",\n");
};

const fashionImages = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
];
const accessoriesImages = [
    "https://images.unsplash.com/photo-1515562141207-7a8efd3dc7f8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1599643478514-4a5202302325?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop"
];

const fashionStr = generateProducts('fashion', 20, 4000, 50, fashionImages);
const accessoriesStr = generateProducts('accessories', 20, 5000, 10, accessoriesImages);

const newItemsStr = ",\n" + fashionStr + ",\n" + accessoriesStr + "\n];";

const path = "client/src/data/products.js";
let content = fs.readFileSync(path, 'utf8');
content = content.replace("];\r\n\r\nexport const products2", newItemsStr + "\r\n\r\nexport const products2");
content = content.replace("];\n\nexport const products2", newItemsStr + "\n\nexport const products2");

fs.writeFileSync(path, content);
console.log("More products added!");
