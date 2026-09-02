import { supabase, isSupabaseConfigured } from "./supabase";

export const STORAGE_BUCKET = "smartcart-assets";

export const STORAGE_FOLDERS = {
  PRODUCTS: "products",
  BANNERS: "banners",
  SLIDERS: "sliders",
  CATEGORIES: "categories",
  LOGOS: "logos",
};

const DEFAULT_PLACEHOLDER = "/images/placeholder.png";

/**
 * Resolves an image path to either a local asset URL or a Supabase Storage public URL.
 *
 * @param {string} path - Image path, relative URL, absolute URL, or Supabase storage object key
 * @param {string} [bucket=STORAGE_BUCKET] - Supabase storage bucket name
 * @param {string} [fallback=DEFAULT_PLACEHOLDER] - Fallback placeholder image URL
 * @returns {string} Fully resolved image URL
 */
export function getStorageUrl(path, bucket = STORAGE_BUCKET, fallback = DEFAULT_PLACEHOLDER) {
  if (!path || typeof path !== "string" || path.trim() === "") {
    return fallback;
  }

  const trimmed = path.trim();

  // Already a full remote URL or data URI
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // Local static asset path from /public directory
  if (trimmed.startsWith("/") || trimmed.startsWith("./")) {
    return trimmed;
  }

  // Supabase Storage object key (e.g., "products/orange-1.jpg")
  if (isSupabaseConfigured && supabase) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(trimmed);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  }

  // If Supabase URL is available directly via env
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    const cleanUrl = supabaseUrl.replace(/\/+$/, "");
    return `${cleanUrl}/storage/v1/object/public/${bucket}/${trimmed}`;
  }

  // Fallback to local images path if structured as relative folder
  return `/images/${trimmed}`;
}

/**
 * Graceful error handler for <img> elements that prevents broken image icons.
 *
 * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - Image error event
 * @param {string} [fallback=DEFAULT_PLACEHOLDER] - Fallback image URL
 */
export function handleImageError(event, fallback = DEFAULT_PLACEHOLDER) {
  const target = event.currentTarget;
  if (!target.dataset.hasFailed) {
    target.dataset.hasFailed = "true";
    target.src = fallback;
  }
}
