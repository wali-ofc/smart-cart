const fs = require("fs");
const path = require("path");

const headersDir = "client/src/components/headers";
const files = fs.readdirSync(headersDir).filter(f => f.startsWith("Header") && f.endsWith(".jsx"));

files.forEach(file => {
    const fullPath = path.join(headersDir, file);
    let content = fs.readFileSync(fullPath, "utf8");

    // We want to replace:
    // color: "#111111",
    // textShadow: "0px 0px 8px rgba(255,255,255,0.9), 0px 0px 15px rgba(255,255,255,0.8)"
    
    // We can just use a regex
    content = content.replace(/color:\s*"#111111",\s*textShadow:\s*"0px 0px 8px rgba\(255,255,255,0\.9\), 0px 0px 15px rgba\(255,255,255,0\.8\)"/g, 'color: "inherit"');
    
    fs.writeFileSync(fullPath, content);
});
console.log("Updated headers!");
