import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import AdminDashboard from "@/components/dashboard-new/AdminDashboard";

const metadata = {
  title: "My Account || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function MyAccountPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <AdminDashboard />
    </>
  );
}
