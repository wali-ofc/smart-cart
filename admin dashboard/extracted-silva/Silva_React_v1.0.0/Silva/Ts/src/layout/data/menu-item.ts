import type { MenuItemType } from "@/component/types/menu";
export const MENU_ITEMS: MenuItemType[] = [
  { key: "menu", label: "Menu", isTitle: true },
  { key: "dashboard-ecommerce", label: "Dashboard", icon: "feather:home", url: "/dashboard/ecommerce" },
  { key: "pages", label: "Store Management", isTitle: true },
  { key: "products", label: "Products", icon: "feather:box", url: "/dashboard/ecommerce" },
  { key: "orders", label: "Orders", icon: "feather:shopping-cart", url: "/dashboard/ecommerce" },
  { key: "customers", label: "Customers", icon: "feather:users", url: "/dashboard/ecommerce" }
];