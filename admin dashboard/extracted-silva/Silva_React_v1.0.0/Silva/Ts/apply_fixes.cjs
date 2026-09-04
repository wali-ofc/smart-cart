const fs = require('fs');

let vite = fs.readFileSync('vite.config.ts', 'utf8');
if (!vite.includes('base: "/admin-build/"')) {
    vite = vite.replace('export default defineConfig({', 'export default defineConfig({\n  base: "/admin-build/",');
    fs.writeFileSync('vite.config.ts', vite, 'utf8');
}
let pkg = fs.readFileSync('package.json', 'utf8');
pkg = pkg.replace('"build": "tsc -b && vite build"', '"build": "vite build"');
fs.writeFileSync('package.json', pkg, 'utf8');
let main = fs.readFileSync('src/main.tsx', 'utf8');
if (!main.includes('basename=')) {
    main = main.replace('<BrowserRouter>', '<BrowserRouter basename="/admin-build">');
    fs.writeFileSync('src/main.tsx', main, 'utf8');
}

const menuContent = `
import type { MenuItemType } from "@/component/types/menu";
export const MENU_ITEMS: MenuItemType[] = [
  { key: "menu", label: "Menu", isTitle: true },
  { key: "dashboard-ecommerce", label: "Dashboard", icon: "feather:home", url: "/dashboard/ecommerce" },
  { key: "pages", label: "Store Management", isTitle: true },
  { key: "products", label: "Products", icon: "feather:box", url: "/dashboard/ecommerce" },
  { key: "orders", label: "Orders", icon: "feather:shopping-cart", url: "/dashboard/ecommerce" },
  { key: "customers", label: "Customers", icon: "feather:users", url: "/dashboard/ecommerce" }
];
`;
fs.writeFileSync('src/layout/data/menu-item.ts', menuContent.trim(), 'utf8');

let routeIndex = fs.readFileSync('src/routes/index.tsx', 'utf8');
routeIndex = routeIndex.replace(/"\/dashboard\/index"/g, '"/auth/login"');
routeIndex = routeIndex.replace(
    '<Route path="/" element={<Navigate to="/auth/login" replace />} />',
    '<Route path="/" element={<Navigate to="/auth/login" replace />} />\n                <Route path="/index.html" element={<Navigate to="/auth/login" replace />} />'
);

const protectedRouteCode = `
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};
`;
routeIndex = routeIndex.replace('import { Navigate, Route, Routes } from "react-router-dom"', protectedRouteCode);
routeIndex = routeIndex.replace(
    /<AppWrappersProvider>\s*\{route\.element\}\s*<\/AppWrappersProvider>/g,
    '<ProtectedRoute><AppWrappersProvider>\n                               {route.element}\n                            </AppWrappersProvider></ProtectedRoute>'
);
fs.writeFileSync('src/routes/index.tsx', routeIndex, 'utf8');

let sidebar = fs.readFileSync('src/component/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(/"\/dashboard\/index"/g, '"/dashboard/ecommerce"');
fs.writeFileSync('src/component/Sidebar.tsx', sidebar, 'utf8');

let loginPath = 'src/app/(pages)/auth/login/components/Login.tsx';
let login = fs.readFileSync(loginPath, 'utf8');
if (!login.includes('useNavigate')) {
    login = login.replace(/import \{ Link \} from .react-router-dom./, 'import { Link, useNavigate } from "react-router-dom"');
}
if (!login.includes('useState')) {
    login = "import { useState } from 'react';\n" + login;
}
const handlerCode = `
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = (document.getElementById('emailaddress') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        
        if (email === 'shahidabdullah15042@gmail.com' && password === 'abdullah1215') {
            localStorage.setItem('adminAuth', 'true');
            setAuthError("");
            navigate('/dashboard/ecommerce');
        } else {
            setAuthError("Invalid email or password");
        }
    };
`;
login = login.replace('const Login = () => {', 'const Login = () => {' + handlerCode);

const errorUI = `
{authError && <div className="alert alert-danger">{authError}</div>}
<div className="form-group mb-3">
`;
login = login.replace('<div className="form-group mb-3">', errorUI);
login = login.replace(/<form[^>]*>/, '<form onSubmit={handleSubmit} className="my-4">');
login = login.replace(
    '<input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />',
    '<input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" defaultValue="shahidabdullah15042@gmail.com" />'
);
login = login.replace(
    '<input className="form-control" type="password" required id="password" placeholder="Enter your password" />',
    '<input className="form-control" type="password" required id="password" placeholder="Enter your password" defaultValue="abdullah1215" />'
);
fs.writeFileSync(loginPath, login, 'utf8');

let topbarPath = 'src/component/topbar/ProfileNotification.tsx';
if (fs.existsSync(topbarPath)) {
    let topbar = fs.readFileSync(topbarPath, 'utf8');
    
    if (!topbar.includes('useNavigate')) {
        topbar = `import { useNavigate } from "react-router-dom";\n` + topbar;
    }
    
    const logoutCode = `
    const navigate = useNavigate();
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('adminAuth');
        navigate('/auth/login');
    };
    `;
    topbar = topbar.replace('const ProfileNotification = () => {', 'const ProfileNotification = () => {' + logoutCode);
    
    topbar = topbar.replace(/<Link to="\/auth\/login" className="dropdown-item">[\s\S]*?<\/Link>/g, '<a href="#" onClick={handleLogout} className="dropdown-item"><i className="feather-log-out me-2"></i><span>Logout</span></a>');
    topbar = topbar.replace(/<Link to="\/auth\/lock-screen" className="dropdown-item">[\s\S]*?<\/Link>/g, '<a href="#" onClick={handleLogout} className="dropdown-item"><i className="feather-lock me-2"></i><span>Logout</span></a>');
    
    fs.writeFileSync(topbarPath, topbar, 'utf8');
}
console.log('All modifications ready!');
