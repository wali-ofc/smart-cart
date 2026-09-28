import React from 'react';
import PageHeader from "@/components/layout/PageHeader.jsx";
import Footer from "@/components/layout/Footer.jsx";
import BlogGrid from "@/components/blog/BlogGrid.jsx";

export default function BlogGridPage() {
  return (
    <>
      <PageHeader />
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
      <Footer />
    </>
  );
}
