import React from 'react';
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import BlogGrid from "@/components/blogs/BlogGrid";

export default function BlogGridPage() {
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
                  <a href="/">Home</a>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogGrid />
      <Footer1 />
    </>
  );
}
