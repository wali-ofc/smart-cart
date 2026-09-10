import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import api from '@/api/axios';

const PERIOD_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: '1m', label: '1 Month' },
  { value: '7d', label: '7 Days' },
  { value: '24h', label: '24 Hours' },
];

export default function OrderStatusChart() {
  const [period, setPeriod] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const { data: res } = await api.get('/seller/orders/stats', {
          params: { period },
        });
        if (active) setData(res.data?.frequency || []);
      } catch {
        if (active) setData([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [period]);

  const formatLabel = (val) => {
    if (!val) return '';
    // "2026-09-10 14:00" → "14:00", "2026-09-10" → "Sep 10"
    if (val.includes(' ')) {
      return val.split(' ')[1]; // hourly
    }
    const d = new Date(val + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mb_30">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb_20">
        <h6 className="fw-5 mb-0">Orders Frequency</h6>
        <select
          className="form-select form-select-sm w-auto"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          aria-label="Chart time period"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="p-3 border rounded-3" style={{ height: 300 }}>
        {loading ? (
          <p className="text-secondary mb-0 text-center pt-5">Loading chart…</p>
        ) : data.length === 0 ? (
          <p className="text-secondary mb-0 text-center pt-5">No order data for this period.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatLabel}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={formatLabel}
                formatter={(value) => [value, 'Orders']}
              />
              <Bar dataKey="count" fill="#4e7c58" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
