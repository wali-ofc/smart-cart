const fs = require('fs');
let jsx = fs.readFileSync('client/src/App.jsx', 'utf8');

if (!jsx.includes('AdminIframe')) {
    jsx = jsx.replace(
        'import PaymentFailurePage from "./pages/otherPages/payment-failure";', 
        'import PaymentFailurePage from "./pages/otherPages/payment-failure";\nimport AdminIframe from "./pages/dashboard/AdminIframe";'
    );
    jsx = jsx.replace(
        '<Route path="profile" element={<MyAccountPage />} />', 
        '<Route path="admin/*" element={<AdminIframe />} />\n                  <Route path="profile" element={<MyAccountPage />} />'
    );
    fs.writeFileSync('client/src/App.jsx', jsx, 'utf8');
    console.log('Added AdminIframe to App.jsx');
}
