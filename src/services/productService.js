import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { allProducts } from "@/data/products";

/**
 * Service to fetch products with transparent fallback to local demo data.
 */
export const productService = {
  /**
   * Fetch all products or filtered products.
   */
  async getProducts({ limit = 100, category = null, brand = null } = {}) {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("is_available", true)
          .limit(limit);

        if (brand) {
          query = query.ilike("brand", `%${brand}%`);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          // Map snake_case DB columns to camelCase expected by components
          return data.map((item) => ({
            id: item.id,
            title: item.title,
            price: Number(item.price),
            compareAtPrice: item.compare_at_price ? Number(item.compare_at_price) : null,
            description: item.description,
            brand: item.brand,
            imgSrc: item.img_src,
            imgHoverSrc: item.img_hover_src || item.img_src,
            colors: item.colors || [],
            sizes: item.sizes || [],
            filterCategories: item.filter_categories || [],
            isAvailable: item.is_available,
            rating: item.rating,
            reviewCount: item.review_count,
            badge: item.badge,
          }));
        }
      } catch (err) {
        console.warn("[productService] Supabase fetch failed, using local demo data:", err);
      }
    }

    // Default fallback to local demo products
    let results = [...allProducts];
    if (category) {
      results = results.filter((p) =>
        p.filterCategories?.some((c) => c.toLowerCase() === category.toLowerCase())
      );
    }
    if (brand) {
      results = results.filter(
        (p) => p.brand && p.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    return results.slice(0, limit);
  },

  /**
   * Fetch a single product by ID.
   */
  async getProductById(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          return {
            id: data.id,
            title: data.title,
            price: Number(data.price),
            compareAtPrice: data.compare_at_price ? Number(data.compare_at_price) : null,
            description: data.description,
            brand: data.brand,
            imgSrc: data.img_src,
            imgHoverSrc: data.img_hover_src || data.img_src,
            colors: data.colors || [],
            sizes: data.sizes || [],
            filterCategories: data.filter_categories || [],
            isAvailable: data.is_available,
            rating: data.rating,
            reviewCount: data.review_count,
            badge: data.badge,
          };
        }
      } catch (err) {
        console.warn("[productService] Supabase product fetch error:", err);
      }
    }

    // Fallback to local demo products
    return allProducts.find((p) => String(p.id) === String(id)) || allProducts[0];
  },

  /**
   * Search products by keyword.
   */
  async searchProducts(query) {
    if (!query || query.trim() === "") return [];
    const term = query.toLowerCase().trim();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .or(`title.ilike.%${term}%,description.ilike.%${term}%,brand.ilike.%${term}%`)
          .limit(20);

        if (!error && data && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            title: item.title,
            price: Number(item.price),
            imgSrc: item.img_src,
            imgHoverSrc: item.img_hover_src || item.img_src,
            brand: item.brand,
          }));
        }
      } catch (err) {
        console.warn("[productService] Supabase search error:", err);
      }
    }

    return allProducts.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.filterCategories?.some((c) => c.toLowerCase().includes(term))
    );
  },
};

export default productService;
