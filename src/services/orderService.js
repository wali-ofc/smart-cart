import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const orderService = {
  /**
   * Create a new order in Supabase with order items.
   */
  async createOrder({ orderData, items }) {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback simulation
      const fakeOrderNumber = "SC-" + Date.now().toString().slice(-6);
      console.info("[orderService] Simulating local order completion:", fakeOrderNumber);
      return {
        success: true,
        data: {
          id: fakeOrderNumber,
          order_number: fakeOrderNumber,
          ...orderData,
          items,
        },
      };
    }

    try {
      const orderNumber = "SC-" + Date.now().toString().slice(-6);

      // Insert order record
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_number: orderNumber,
            user_id: orderData.userId || null,
            customer_email: orderData.email,
            customer_phone: orderData.phone || null,
            subtotal: orderData.subtotal || 0,
            tax: orderData.tax || 0,
            shipping_fee: orderData.shippingFee || 0,
            discount_amount: orderData.discount || 0,
            total_amount: orderData.totalAmount || 0,
            shipping_address: orderData.shippingAddress || {},
            billing_address: orderData.billingAddress || {},
            payment_method: orderData.paymentMethod || "credit_card",
            payment_status: orderData.paymentStatus || "unpaid",
            status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      if (items && items.length > 0) {
        const orderItemsData = items.map((item) => ({
          order_id: order.id,
          product_id: typeof item.id === "number" ? item.id : null,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          color: item.color || null,
          size: item.size || null,
          img_src: item.imgSrc || null,
          total: (item.price * (item.quantity || 1)),
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsData);

        if (itemsError) throw itemsError;
      }

      return { success: true, data: order };
    } catch (err) {
      console.error("[orderService] Error creating order in Supabase:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Fetch orders for the logged-in user.
   */
  async getUserOrders(userId) {
    if (!isSupabaseConfigured || !supabase || !userId) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("[orderService] Error fetching user orders:", err);
      return [];
    }
  },
};

export default orderService;
