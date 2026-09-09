/**
 * Map a server Product doc (spec §3.2.2) to the template UI's product shape.
 * The static catalog had template-only fields (colors, sizes, imgHoverSrc,
 * oldPrice, filterCategories, soldOut, countdown...) — none of them exist in
 * MongoDB and none should render. This mapper intentionally DROPS them so the
 * frozen UI renders only what the backend supports.
 */
export const normalizeProduct = (p) => {
  if (!p) return null;
  const stock = Number(p.stock ?? 0);
  const rating = p.rating && typeof p.rating === 'object'
    ? { stars: Number(p.rating.stars) || 0, count: Number(p.rating.count) || 0 }
    : { stars: 0, count: 0 };
  return {
    id: String(p._id),
    title: p.name || '',
    imgSrc: p.image || '',
    price: Number(p.price) || 0,
    rating,
    category: p.category || '',
    subCategory: p.subCategory || '',
    brand: p.subCategory || '',
    stock,
    isAvailable: stock > 0,
    keywords: Array.isArray(p.keywords) ? p.keywords : [],
    description: p.description || '',
    likeCount: p.likeCount ?? (Array.isArray(p.likes) ? p.likes.length : 0),
    _id: String(p._id)
  };
};

/** Server cart line → frozen-UI cart item shape (id is the Mongo _id string) */
export const normalizeCartItem = (entry) => {
  const p = entry && entry.product;
  if (!p || !p._id) return null;
  return {
    id: String(p._id),
    title: p.name,
    imgSrc: p.image,
    price: Number(p.price) || 0,
    quantity: Number(entry.quantity) || 1,
    stock: Number(p.stock) || 0,
    isServer: true
  };
};