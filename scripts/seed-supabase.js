/**
 * SmartCart - Supabase Database Seed Script
 *
 * Usage:
 *   node scripts/seed-supabase.js
 *
 * Requires environment variables:
 *   VITE_SUPABASE_URL (or SUPABASE_URL)
 *   VITE_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Support loading from .env if present
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.trim().split("=");
    if (key && rest.length > 0 && !process.env[key]) {
      process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
    }
  });
}

const supabaseUrl =
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Supabase URL and Key are required.");
  console.error("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Starting SmartCart Supabase database seed...");

  try {
    // 1. Load Demo Products
    const productsModule = await import("../src/data/products.js");
    const demoProducts = productsModule.allProducts || [];
    console.log(`📦 Found ${demoProducts.length} demo products to seed.`);

    // Batch products in chunks of 50
    const chunkSize = 50;
    for (let i = 0; i < demoProducts.length; i += chunkSize) {
      const chunk = demoProducts.slice(i, i + chunkSize).map((p) => ({
        id: p.id,
        title: p.title || "SmartCart Product",
        price: p.price || 0,
        compare_at_price: p.compareAtPrice || null,
        description: p.description || "",
        brand: p.brand || "SmartCart",
        img_src: p.imgSrc || "/images/placeholder.png",
        img_hover_src: p.imgHoverSrc || p.imgSrc || "/images/placeholder.png",
        colors: p.colors || [],
        sizes: p.sizes || [],
        filter_categories: p.filterCategories || [],
        is_available: p.isAvailable !== false,
      }));

      const { error } = await supabase
        .from("products")
        .upsert(chunk, { onConflict: "id" });

      if (error) {
        console.warn(`⚠️ Error inserting product chunk ${i / chunkSize + 1}:`, error.message);
      } else {
        console.log(`  ✓ Inserted products ${i + 1} - ${Math.min(i + chunkSize, demoProducts.length)}`);
      }
    }

    // 2. Load Demo Categories
    const categoriesModule = await import("../src/data/categories.js");
    const demoCategories = (categoriesModule.categories || []).slice(0, 30);
    console.log(`📁 Found ${demoCategories.length} demo categories to seed.`);

    const categoryRows = demoCategories.map((c, index) => ({
      id: c.id || index + 1,
      title: c.title || c.name || "Category",
      img_src: c.imgSrc || c.image || "/images/placeholder.png",
      item_count: c.count || c.itemCount || 0,
    }));

    const { error: catError } = await supabase
      .from("categories")
      .upsert(categoryRows, { onConflict: "id" });

    if (catError) {
      console.warn("⚠️ Error seeding categories:", catError.message);
    } else {
      console.log(`  ✓ Successfully seeded ${categoryRows.length} categories.`);
    }

    console.log("✅ Seed completed successfully!");
  } catch (err) {
    console.error("❌ Fatal error during seed:", err);
    process.exit(1);
  }
}

seed();
