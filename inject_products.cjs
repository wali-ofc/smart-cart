const fs = require('fs');
let content = fs.readFileSync('client/src/data/products.js', 'utf8');

// The new items string from my previous logic
const generateProducts = (category, count, startId, basePrice, images) => {
    let newProducts = [];
    for (let i = 0; i < count; i++) {
        let name = `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i + 1}`;
        if (category === 'clothing') name = ['T-Shirt', 'Jacket', 'Jeans', 'Hoodie', 'Sweater', 'Dress', 'Skirt'][i % 7] + ' ' + (i+1);
        if (category === 'sunglasses') name = ['Aviator', 'Wayfarer', 'Round', 'Sports', 'Retro', 'Oversized'][i % 6] + ' Sunglasses ' + (i+1);
        if (category === 'bags') name = ['Backpack', 'Tote', 'Messenger', 'Duffel', 'Clutch', 'Handbag'][i % 6] + ' ' + (i+1);
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

const clothingStr = generateProducts('clothing', 20, 1000, 25, clothingImages);
const sunglassesStr = generateProducts('sunglasses', 20, 2000, 15, sunglassesImages);
const bagsStr = generateProducts('bags', 20, 3000, 45, bagsImages);
const fashionStr = generateProducts('fashion', 20, 4000, 50, fashionImages);
const accessoriesStr = generateProducts('accessories', 20, 5000, 10, accessoriesImages);

const newItemsStr = ",\n" + clothingStr + ",\n" + sunglassesStr + ",\n" + bagsStr + ",\n" + fashionStr + ",\n" + accessoriesStr;

// Find the exact closing bracket of products1
// products1 is defined as: export const products1 = [ ... ];
// The next export is: export const products2 = [
const targetStr = `  },
];
export const products2 = [`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, `  }` + newItemsStr + `\n];\nexport const products2 = [`);
    fs.writeFileSync('client/src/data/products.js', content);
    console.log("Products successfully injected!");
} else {
    // try different line endings
    const targetStr2 = "  },\r\n];\r\nexport const products2 = [";
    if (content.includes(targetStr2)) {
        content = content.replace(targetStr2, `  }` + newItemsStr + `\r\n];\r\nexport const products2 = [`);
        fs.writeFileSync('client/src/data/products.js', content);
        console.log("Products successfully injected (CRLF)!");
    } else {
        console.log("Could not find insertion point!");
    }
}
