const fs = require('fs');

const path = 'src/app/(admin)/dashboard/ecommerce/components/OrderReport.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import { useState, useEffect }')) {
    content = "import { useState, useEffect } from 'react';\nimport api from '@/helpers/api';\n" + content;
}

const customHooks = `
    const [stats, setStats] = useState({ delivered: 0, cancelled: 0, total: 100 });
    
    useEffect(() => {
        api.get('/admin/analytics').then(res => {
            if(res.data.success) {
                setStats({
                    delivered: res.data.data.deliveredOrders || 0,
                    cancelled: res.data.data.cancelledOrders || 0,
                    total: res.data.data.totalOrders || 1
                });
            }
        });
    }, []);
`;
content = content.replace('const OrderReport = () => {', 'const OrderReport = () => {' + customHooks);

content = content.replace('<h4 className="mb-1 fw-medium text-black">7854</h4>', '<h4 className="mb-1 fw-medium text-black">{stats.delivered}</h4>');
content = content.replace('<h4 className="mb-1 fw-medium text-black">2480</h4>', '<h4 className="mb-1 fw-medium text-black">{stats.cancelled}</h4>');
content = content.replace('<p className="text-muted mb-0 fs-13">Last 6 months</p>', '<p className="text-muted mb-0 fs-13">All Time</p>');
content = content.replace('<p className="text-muted mb-0 fs-13">Last 6 months</p>', '<p className="text-muted mb-0 fs-13">All Time</p>');

// Since the Apex chart uses static getOrderReportChart, we can't easily dynamically change its numbers unless we rewrite getOrderReportChart, but the UI constraint is we keep UI changes minimal, so we'll leave the chart alone and just update the numbers below it.

fs.writeFileSync(path, content, 'utf8');
console.log('OrderReport wired!');
