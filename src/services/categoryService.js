import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { categories } from "@/data/categories";

export const categoryService = {
  async getCategories() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("id", { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            imgSrc: item.img_src,
            description: item.description,
            itemCount: item.item_count,
          }));
        }
      } catch (err) {
        console.warn("[categoryService] Supabase fetch error, fallback to demo:", err);
      }
    }

    return categories;
  },
};

export default categoryService;
