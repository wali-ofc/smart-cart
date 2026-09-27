import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import MetaComponent from "@/components/common/MetaComponent";
import SellerNav from "@/components/othersPages/dashboard/SellerNav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const metadata = {
  title: "AI Predictions || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

const TREND_COLOR = { rising: "#198754", falling: "#dc3545", stable: "#6c757d" };
const RISK_COLOR = {
  out: "#dc3545",
  critical: "#dc3545",
  low: "#fd7e14",
  ok: "#198754",
  over: "#6c757d",
};
const riskLabel = (p) => {
  switch (p.risk) {
    case "out": return "Out of stock";
    case "critical": return "Stock-out risk";
    case "low": return "Low stock";
    case "over": return p.daysOfStock === null ? "No recent sales" : "Overstocked";
    default: return "Healthy";
  }
};
const trendLabel = (p) =>
  p.trend === "rising" && p.trendPct > 0 ? `Rising +${p.trendPct}%` :
  p.trend === "falling" ? `Falling ${p.trendPct}%` : "Stable";

const badge = (color, text) => (
  <span
    className="badge"
    style={{ backgroundColor: color, color: "#fff", fontSize: "0.7rem", padding: "3px 6px" }}
  >
    {text}
  </span>
);

export default function SellerAiPredictionsPage() {
  const { user } = useAuth();
  const isSeller = user?.role === "seller";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSeller) {
      setLoading(false);
      return;
    }
    let active = true;
    api
      .get("/seller/predictions")
      .then(({ data: res }) => {
        if (active) setData(res.data || null);
      })
      .catch(() => {
        if (active) setError("Could not load your predictions.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isSeller]);

  let content;

  if (!isSeller) {
    content = (
      <div className="text-center">
        <h5 className="fw-5 mb_20">AI Predictions</h5>
        <p className="mb-0">
          This dashboard is for sellers. Please sign in with a seller account.
        </p>
      </div>
    );
  } else if (loading) {
    content = <p className="mb-0">Loading demand forecasts…</p>;
  } else if (error) {
    content = <p className="mb-0 text-danger">{error}</p>;
  } else if (!data) {
    content = <p className="mb-0">No forecast data available.</p>;
  } else {
    const { summary, products, insights, aiAvailable, aiSummary, generatedAt } = data;

    const cards = [
      { label: "30-Day Forecast", value: `${summary.totalForecast30} units` },
      { label: "7-Day Forecast", value: `${summary.totalForecast7} units` },
      { label: "Est. Revenue (30d)", value: `$${summary.totalRevenueForecast30.toFixed(2)}` },
      { label: "At-Risk Products", value: summary.atRiskCount },
    ];

    const chartData = products
      .filter((p) => p.forecast30 > 0)
      .slice(0, 10)
      .map((p) => ({
        name: p.name.length > 24 ? `${p.name.slice(0, 24)}…` : p.name,
        units: p.forecast30,
      }))
      .reverse();

    const updatedAt = generatedAt
      ? new Date(generatedAt).toLocaleString()
      : "";

    content = (
      <>
        <div className="mb_30">
          <h5 className="fw-5 mb_20">AI Predictions</h5>
          <p className="mb-0 small text-secondary">
            Demand forecasts computed from your orders over the last 28 days
            {updatedAt ? ` · updated ${updatedAt}` : ""}.
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="mb_30">
          <div className="row g-3">
            {cards.map((card) => (
              <div className="col-6 col-lg-3" key={card.label}>
                <div className="p-3 border rounded-3 text-center h-100">
                  <div className="fs-4 fw-6">{card.value}</div>
                  <div className="small text-secondary">{card.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI insights panel */}
        <div className="mb_30">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb_20">
            <h6 className="fw-5 mb-0">AI Insights</h6>
            {aiAvailable && aiSummary && badge("#000000", "AI-GENERATED")}
          </div>
          <div className="p-3 border rounded-3">
            {aiSummary && (
              <p className="mb-3 fst-italic">{aiSummary}</p>
            )}
            <ul className="mb-0 ps-3 small">
              {insights.map((line, i) => (
                <li key={i} className="mb-1">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Forecast chart */}
        {chartData.length > 0 ? (
          <div className="mb_30">
            <h6 className="fw-5 mb_20">Predicted Demand — Next 30 Days (Top 10)</h6>
            <div className="p-3 border rounded-3" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} units`, "Predicted demand (30d)"]}
                  />
                  <Bar dataKey="units" fill="#000000" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="mb_30 p-3 border rounded-3 text-center">
            <p className="mb-0 text-secondary">
              No sales data yet — forecasts will appear once customers place orders.
            </p>
            <Link className="tf-btn btn-fill animate-hover-btn radius-3 mt-3 d-inline-flex" to="/seller/products">
              <span>View Products</span>
            </Link>
          </div>
        )}

        {/* Per-product forecast table */}
        <div className="mb_30">
          <h6 className="fw-5 mb_20">Product Forecasts</h6>
          {products.length === 0 ? (
            <div className="p-3 border rounded-3 text-center">
              <p className="mb-0 text-secondary">
                You have no products yet.{" "}
                <Link className="text_primary" to="/seller/products">
                  Add your first product
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th className="fw-6">Product</th>
                    <th className="fw-6 text-end">Price</th>
                    <th className="fw-6 text-end">Avg/Day</th>
                    <th className="fw-6">Trend</th>
                    <th className="fw-6 text-end">7-Day</th>
                    <th className="fw-6 text-end">30-Day</th>
                    <th className="fw-6 text-end">Stock</th>
                    <th className="fw-6">Stock Health</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {p.image && (
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{ width: 40, height: 40, objectFit: "cover" }}
                              className="rounded"
                              loading="lazy"
                            />
                          )}
                          <div>
                            <div className="fw-6">{p.name}</div>
                            <div className="small text-secondary">{p.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">${(p.price || 0).toFixed(2)}</td>
                      <td className="text-end">{p.avgDailyUnits || 0}</td>
                      <td>{badge(TREND_COLOR[p.trend] || "#6c757d", trendLabel(p))}</td>
                      <td className="text-end">{p.forecast7}</td>
                      <td className="text-end fw-6">{p.forecast30}</td>
                      <td className="text-end">{p.stock}</td>
                      <td>
                        {badge(RISK_COLOR[p.risk] || "#6c757d", riskLabel(p))}
                        {p.daysOfStock !== null && p.daysOfStock !== undefined && (
                          <div className="small text-secondary mt-1">
                            ~{Math.round(p.daysOfStock)} days of stock
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">AI Predictions</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SellerNav />
            </div>
            <div className="col-lg-9">
              <div className={`my-account-content ${isSeller ? "account-dashboard" : ""}`}>
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}