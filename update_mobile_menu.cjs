const fs = require("fs");
const path = "client/src/components/modals/MobileMenu.jsx";
let content = fs.readFileSync(path, "utf8");

const inject = `
            <li className="nav-mb-item">
              <Link to="/blog-grid" className={\`mb-menu-link \${isActive("/blog-grid")}\`}>
                Blog
              </Link>
            </li>`;

if (!content.includes('/blog-grid')) {
    content = content.replace('            <li className="nav-mb-item">\r\n              <a\r\n                href="#accountMenu"', inject + '\r\n            <li className="nav-mb-item">\r\n              <a\r\n                href="#accountMenu"');
    fs.writeFileSync(path, content, "utf8");
    console.log("MobileMenu.jsx updated");
} else {
    console.log("Already updated");
}
