/**
 * SmartCart - Upload Local Media Assets to Supabase Storage
 *
 * Usage:
 *   node scripts/upload-assets-to-supabase.js
 *
 * Requires environment variables:
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY with storage upload policy)
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Support loading from .env
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

const BUCKET_NAME = "smartcart-assets";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Supabase credentials required in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}

async function uploadAssets() {
  console.log(`🚀 Starting asset upload to Supabase bucket: ${BUCKET_NAME}`);

  const publicImagesDir = path.resolve(process.cwd(), "public", "images");
  if (!fs.existsSync(publicImagesDir)) {
    console.error("❌ public/images directory not found.");
    return;
  }

  const allFiles = getAllFiles(publicImagesDir);
  console.log(`Found ${allFiles.length} files to upload.`);

  let uploaded = 0;
  let failed = 0;

  for (const filePath of allFiles) {
    const relativePath = path
      .relative(publicImagesDir, filePath)
      .replace(/\\/g, "/");
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);

    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(relativePath, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        console.warn(`  ⚠️ Upload failed for ${relativePath}:`, error.message);
        failed++;
      } else {
        uploaded++;
        if (uploaded % 25 === 0 || uploaded === allFiles.length) {
          console.log(`  ✓ Uploaded ${uploaded}/${allFiles.length} assets...`);
        }
      }
    } catch (err) {
      console.warn(`  ⚠️ Exception uploading ${relativePath}:`, err.message);
      failed++;
    }
  }

  console.log(`\n🎉 Upload Summary: ${uploaded} uploaded, ${failed} failed.`);
}

uploadAssets().catch(console.error);
