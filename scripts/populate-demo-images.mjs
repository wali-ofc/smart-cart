import fs from "fs";
import path from "path";
import https from "https";
import sharp from "sharp";

// Curated high quality Unsplash product and fashion photos
const UNSPLASH_IMAGES = {
  fashion_women: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1000&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1000&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&q=80",
  ],
  fashion_men: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80",
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1000&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=80",
  ],
  products_clothing: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
    "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
  ],
  slider_hero: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=85",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&q=85",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=2000&q=85",
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=2000&q=85",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&q=85",
  ],
  categories: [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  ],
};

function downloadUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadUrl(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed with status ${res.statusCode}`));
        }
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => resolve(Buffer.concat(data)));
      })
      .on("error", reject);
  });
}

async function isSolidBlank(fileBuffer) {
  try {
    const stats = await sharp(fileBuffer).stats();
    return stats.channels.every((c) => c.min === c.max);
  } catch {
    return false;
  }
}

async function run() {
  console.log("🎨 Populating real, high-quality eCommerce images for demo placeholders...");

  const cache = {};
  for (const [key, list] of Object.entries(UNSPLASH_IMAGES)) {
    cache[key] = [];
    for (let i = 0; i < list.length; i++) {
      try {
        console.log(`Downloading source image [${key} #${i + 1}]...`);
        const buf = await downloadUrl(list[i]);
        cache[key].push(buf);
      } catch (e) {
        console.warn(`Failed to download ${list[i]}: ${e.message}`);
      }
    }
  }

  // Helper to process directory
  async function processDirectory(dir, width, height, pool, name) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jpg") || f.endsWith(".png"));
    let idx = 0;
    let replaced = 0;

    for (const f of files) {
      const fullPath = path.join(dir, f);
      try {
        const fileBuf = fs.readFileSync(fullPath);
        if (await isSolidBlank(fileBuf) && pool.length > 0) {
          const sourceBuf = pool[idx % pool.length];
          idx++;
          const out = await sharp(sourceBuf).resize(width, height, { fit: "cover" }).jpeg({ quality: 85 }).toBuffer();
          fs.writeFileSync(fullPath, out);
          replaced++;
        }
      } catch (err) {
        // Ignored
      }
    }
    console.log(`✓ Replaced ${replaced} ${name} images!`);
  }

  // 1. Sliders
  const heroPool = cache.slider_hero.length > 0 ? cache.slider_hero : cache.fashion_women;
  await processDirectory(path.join("public", "images", "slider"), 2000, 1125, heroPool, "slider");

  // 2. Collections / Categories
  const catPool = [...cache.categories, ...cache.fashion_women, ...cache.products_clothing];
  await processDirectory(path.join("public", "images", "collections"), 800, 1000, catPool, "collection");

  // 3. Products
  const prodPool = [...cache.products_clothing, ...cache.fashion_women, ...cache.fashion_men];
  await processDirectory(path.join("public", "images", "products"), 720, 1005, prodPool, "product");

  // 4. Items / Lookbook / Testimonials
  const itemPool = [...cache.fashion_women, ...cache.products_clothing];
  await processDirectory(path.join("public", "images", "item"), 800, 800, itemPool, "item");

  console.log("🎉 All solid dummy placeholders have been replaced with real eCommerce photos!");
}

run().catch(console.error);
