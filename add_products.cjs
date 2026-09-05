const fs = require('fs');

const generateProducts = (category, count, startId, basePrice, images) => {
    let newProducts = [];
    for (let i = 0; i < count; i++) {
        let name = `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i + 1}`;
        if (category === 'clothing') name = ['T-Shirt', 'Jacket', 'Jeans', 'Hoodie', 'Sweater', 'Dress', 'Skirt'][i % 7] + ' ' + (i+1);
        if (category === 'sunglasses') name = ['Aviator', 'Wayfarer', 'Round', 'Sports', 'Retro', 'Oversized'][i % 6] + ' Sunglasses ' + (i+1);
        if (category === 'bags') name = ['Backpack', 'Tote', 'Messenger', 'Duffel', 'Clutch', 'Handbag'][i % 6] + ' ' + (i+1);
        
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
    sizes: ["S", "M", "L"],
    filterCategories: ["New Arrivals"],
    brand: "SmartCart",
    isAvailable: true,
  }`);
    }
    return newProducts.join(",\n");
};

const clothingImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop"
];
const sunglassesImages = [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=800&fit=crop"
];
const bagsImages = [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600&h=800&fit=crop"
];

const clothingStr = generateProducts('clothing', 20, 1000, 25, clothingImages);
const sunglassesStr = generateProducts('sunglasses', 20, 2000, 15, sunglassesImages);
const bagsStr = generateProducts('bags', 20, 3000, 45, bagsImages);

const newItemsStr = ",\n" + clothingStr + ",\n" + sunglassesStr + ",\n" + bagsStr + "\n];";

const path = "client/src/data/products.js";
let content = fs.readFileSync(path, 'utf8');

// The file exports products1 which ends with `];` before the next export `export const products2`.
// We will replace the first `];` with our new items.
content = content.replace("];\r\n\r\nexport const products2", newItemsStr + "\r\n\r\nexport const products2");
content = content.replace("];\n\nexport const products2", newItemsStr + "\n\nexport const products2");

fs.writeFileSync(path, content);
console.log("Products added!");
