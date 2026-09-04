const fs = require("fs");
const path = "client/src/components/headers/Nav.jsx";
let content = fs.readFileSync(path, "utf8");

const inject = `
      <li className="menu-item">
        <Link to="/blog-grid" className={\`item-link \${Linkfs} \${textColor} \${isActive("/blog-grid")}\`}>
          Blog
        </Link>
      </li>`;

if (!content.includes('/blog-grid')) {
    content = content.replace('<li className="menu-item position-relative">', inject + '\n      <li className="menu-item position-relative">');
    fs.writeFileSync(path, content, "utf8");
    console.log("Nav.jsx updated");
} else {
    console.log("Already updated");
}
