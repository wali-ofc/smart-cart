import React from "react";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import { useParams, Link } from "react-router-dom";

const blogPostsData = {
  1: {
    title: "The Future of E-Commerce in 2026",
    category: "Technology",
    date: "August 15, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-detail.jpg",
    content: [
      "The e-commerce landscape is evolving at an unprecedented pace. In 2026, we're seeing a convergence of AI, augmented reality, and seamless payment systems that are transforming how consumers shop online.",
      "One of the biggest trends is the rise of personalized shopping experiences. AI-powered recommendation engines now understand individual preferences better than ever, curating product selections that feel handpicked for each customer.",
      "Augmented reality try-on features have moved from novelty to necessity. Customers can now virtually place furniture in their rooms, try on clothing, and test makeup shades — all from the comfort of their homes. This technology has significantly reduced return rates across the industry.",
      "Mobile commerce continues to dominate, with over 75% of online purchases now made through smartphones. Progressive web apps and one-tap payment solutions have made mobile shopping faster and more convenient than ever before.",
      "Looking ahead, the integration of voice commerce and social shopping will further blur the lines between browsing and buying, creating a truly omnichannel experience for consumers worldwide."
    ]
  },
  2: {
    title: "Introducing Smart Cart 2.0 Features",
    category: "Updates",
    date: "August 10, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-detail-1.jpg",
    content: [
      "We're excited to announce the launch of Smart Cart 2.0, packed with features designed to enhance both the shopping and selling experience on our platform.",
      "The new seller dashboard provides real-time analytics, order management, and inventory tracking all in one place. Sellers can now monitor their revenue, track order statuses, and manage their product catalog with unprecedented ease.",
      "For shoppers, we've introduced a smarter recommendation system that learns from your browsing patterns and purchase history. The more you shop, the better Smart Cart understands your preferences.",
      "Our revamped checkout process now supports multiple payment methods and features a streamlined one-page design that reduces cart abandonment. We've also added real-time delivery tracking so customers always know where their orders are.",
      "Smart Cart 2.0 also brings improved mobile responsiveness, ensuring a seamless shopping experience across all devices. Whether you're on a desktop, tablet, or smartphone, Smart Cart adapts perfectly to your screen."
    ]
  },
  3: {
    title: "How to Maximize Your Shopping Experience",
    category: "Tips",
    date: "August 5, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-detail-2.jpg",
    content: [
      "Online shopping should be enjoyable, efficient, and rewarding. Here are our top tips to help you get the most out of your Smart Cart shopping experience.",
      "First, create a wishlist. Smart Cart's wishlist feature lets you save items you're interested in and get notified when prices drop. It's the perfect way to plan your purchases and never miss a deal.",
      "Take advantage of product filters and sorting options. Whether you're looking for items in a specific price range, brand, or category, our advanced filtering system helps you find exactly what you need in seconds.",
      "Read product reviews before purchasing. Our community of verified buyers shares honest feedback that can help you make informed decisions. Look for reviews with photos for the most authentic insights.",
      "Finally, keep an eye on seasonal sales and special promotions. Smart Cart regularly offers exclusive discounts and bundle deals that can save you significant amounts on your favorite products."
    ]
  },
  4: {
    title: "Top 5 Tips for Smart Cart Sellers",
    category: "Business",
    date: "July 28, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-1.jpg",
    content: [
      "Selling on Smart Cart offers incredible opportunities to reach customers worldwide. Here are five essential tips to help you succeed as a seller on our platform.",
      "Tip 1: High-quality product images are non-negotiable. Studies show that listings with professional, well-lit photos receive up to 3x more views and 2x more conversions than those with low-quality images.",
      "Tip 2: Write detailed, honest product descriptions. Include dimensions, materials, care instructions, and any other relevant details. The more information you provide, the fewer returns you'll experience.",
      "Tip 3: Price competitively by researching similar products on the platform. Smart Cart's seller dashboard provides market insights to help you understand pricing trends in your category.",
      "Tip 4: Respond to customer inquiries promptly. Sellers with fast response times earn higher trust ratings and appear more prominently in search results. Aim to respond within 24 hours.",
      "Tip 5: Use the analytics dashboard to track your performance. Monitor which products are selling best, identify seasonal trends, and adjust your inventory and pricing strategy accordingly."
    ]
  },
  5: {
    title: "Why Mobile Responsiveness is Crucial",
    category: "Technology",
    date: "July 20, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-2.jpg",
    content: [
      "In today's digital world, mobile responsiveness isn't just a nice-to-have — it's essential for any e-commerce business that wants to stay competitive.",
      "Over 70% of global e-commerce traffic now comes from mobile devices. If your online store doesn't provide a seamless mobile experience, you're potentially losing the majority of your customers.",
      "Mobile-responsive design ensures that your website adapts to any screen size, providing optimal viewing and interaction experiences. This means easy navigation, readable text, and properly sized images on every device.",
      "Google's mobile-first indexing means that the mobile version of your website is the primary version used for ranking and indexing. A non-responsive site will rank lower in search results, reducing your organic traffic.",
      "At Smart Cart, we've invested heavily in mobile optimization. Every page, from product browsing to checkout, is designed to work flawlessly on smartphones and tablets, ensuring our customers can shop anytime, anywhere."
    ]
  },
  6: {
    title: "Preparing for the Holiday Sales Rush",
    category: "Marketing",
    date: "July 15, 2026",
    author: "Abdullah",
    imgSrc: "/images/blog/blog-3.jpg",
    content: [
      "The holiday season is the biggest opportunity for e-commerce businesses. Here's how Smart Cart sellers can prepare to maximize their sales during this crucial period.",
      "Start planning early. The most successful sellers begin their holiday preparation months in advance. This includes stocking up inventory, creating promotional materials, and planning your discount strategy.",
      "Optimize your product listings for holiday keywords. Shoppers search for gift ideas, holiday deals, and seasonal products. Make sure your titles and descriptions include relevant holiday-related terms.",
      "Offer bundle deals and gift sets. Holiday shoppers love the convenience of pre-packaged gift options. Create attractive bundles that combine complementary products at a slight discount.",
      "Ensure your shipping and fulfillment processes are ready for increased demand. Nothing damages customer trust faster than delayed deliveries during the holiday season. Consider offering express shipping options and clearly communicate delivery timelines.",
      "Finally, leverage Smart Cart's promotional tools to create limited-time offers, flash sales, and loyalty rewards that drive urgency and encourage repeat purchases throughout the holiday season."
    ]
  }
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const post = blogPostsData[id] || blogPostsData[1];

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Blog</div>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>
                  <Link to="/blog-grid">Blog</Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>{post.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="blog-detail">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <article className="tf-blog-detail">
                <div className="blog-detail-main">
                  <div className="blog-detail-thumb" style={{ marginBottom: "30px" }}>
                    <img
                      src={post.imgSrc}
                      alt={post.title}
                      style={{ width: "100%", borderRadius: "12px", objectFit: "cover", maxHeight: "450px" }}
                    />
                  </div>

                  <div className="blog-detail-info" style={{ marginBottom: "20px" }}>
                    <ul style={{ display: "flex", gap: "20px", listStyle: "none", padding: 0, flexWrap: "wrap" }}>
                      <li style={{ display: "flex", alignItems: "center", gap: "6px", color: "#666", fontSize: "14px" }}>
                        <i className="icon-calendar" style={{ fontSize: "16px" }} />
                        {post.date}
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "6px", color: "#666", fontSize: "14px" }}>
                        <i className="icon-user" style={{ fontSize: "16px" }} />
                        {post.author}
                      </li>
                      <li>
                        <span
                          style={{
                            background: "#f0f0f0",
                            padding: "4px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          {post.category}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "24px",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h2>

                  <div className="blog-detail-content">
                    {post.content.map((paragraph, index) => (
                      <p
                        key={index}
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.8,
                          color: "#444",
                          marginBottom: "18px",
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #eee",
                      marginTop: "40px",
                      paddingTop: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <Link
                      to="/blog-grid"
                      className="tf-btn btn-fill animate-hover-btn"
                      style={{ borderRadius: "4px" }}
                    >
                      <i className="icon-arrow-left" /> Back to Blog
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
