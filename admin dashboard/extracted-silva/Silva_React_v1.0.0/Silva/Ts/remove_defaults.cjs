const fs = require('fs');

const loginPath = 'src/app/(pages)/auth/login/components/Login.tsx';
let login = fs.readFileSync(loginPath, 'utf8');

login = login.replace(/defaultValue="shahidabdullah15042@gmail\.com"/g, '');
login = login.replace(/defaultValue="abdullah1215"/g, '');

fs.writeFileSync(loginPath, login, 'utf8');
console.log('Removed default values from login form');
