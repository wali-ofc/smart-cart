const fs = require('fs');

const widgetCardsPath = 'src/app/(admin)/dashboard/ecommerce/components/WidgetCards.tsx';
let widgetCards = fs.readFileSync(widgetCardsPath, 'utf8');

if (!widgetCards.includes('import { useState, useEffect }')) {
    widgetCards = "import { useState, useEffect } from 'react';\nimport api from '@/helpers/api';\n" + widgetCards;
}

const hookCode = `
    const [stats, setStats] = useState({
        totalOrders: 0,
        monthlyOrders: 0,
        totalRevenue: 0,
        outOfStock: 0
    });

    useEffect(() => {
        api.get('/admin/analytics').then(res => {
            if(res.data.success) {
                setStats({
                    totalOrders: res.data.data.totalOrders || 0,
                    monthlyOrders: res.data.data.totalOrders || 0,
                    totalRevenue: res.data.data.totalRevenue || 0,
                    outOfStock: res.data.data.outOfStock || 0
                });
            }
        }).catch(err => console.error("Error fetching analytics", err));
    }, []);
`;
widgetCards = widgetCards.replace('const WidgetCards = () => {', 'const WidgetCards = () => {' + hookCode);

widgetCards = widgetCards.replace('>25,894</h3>', '>{stats.totalOrders}</h3>');
widgetCards = widgetCards.replace('>57,800</h3>', '>{stats.monthlyOrders}</h3>');
widgetCards = widgetCards.replace('>$637,254</h3>', '>${stats.totalRevenue.toLocaleString()}</h3>');
widgetCards = widgetCards.replace('>142 Items</h3>', '>{stats.outOfStock} Items</h3>');

fs.writeFileSync(widgetCardsPath, widgetCards, 'utf8');

const recentOrderPath = 'src/app/(admin)/dashboard/ecommerce/components/RecentOrder.tsx';
let recentOrder = fs.readFileSync(recentOrderPath, 'utf8');

if (!recentOrder.includes('import { useState, useEffect }')) {
    recentOrder = "import { useState, useEffect } from 'react';\nimport api from '@/helpers/api';\n" + recentOrder;
}

const roHookCode = `
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/admin/analytics').then(res => {
            if(res.data.success && res.data.data.recentOrders) {
                setOrders(res.data.data.recentOrders);
            }
        }).catch(err => console.error("Error fetching orders", err));
    }, []);
`;
// Replace recentOrder data mapping
recentOrder = recentOrder.replace('const RecentOrder = () => {', 'const RecentOrder = () => {' + roHookCode);
// The template uses `recentOrder.map`. Let's replace the import `recentOrder` with our state
recentOrder = recentOrder.replace('import { recentOrder } from "../data"', '');
recentOrder = recentOrder.replace('recentOrder.map', 'orders.map');
recentOrder = recentOrder.replace('item.customer.name', 'item.customerId?.username || "Unknown"');
recentOrder = recentOrder.replace('item.customer.avatar', 'item.customerId?.profileImage || "/images/default-avatar.png"');
recentOrder = recentOrder.replace('item.amount', 'item.totalAmount');

fs.writeFileSync(recentOrderPath, recentOrder, 'utf8');

console.log("Dashboard analytics data wired!");
