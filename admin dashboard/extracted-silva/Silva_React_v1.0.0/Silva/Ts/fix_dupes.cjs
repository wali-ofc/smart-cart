const fs = require('fs');

const loginPath = 'src/app/(pages)/auth/login/components/Login.tsx';
let login = fs.readFileSync(loginPath, 'utf8');

login = login.replace('    const navigate = useNavigate();\n    const [authError, setAuthError] = useState("");\n\n    \n    const navigate = useNavigate();\n    const [authError, setAuthError] = useState("");', '    const navigate = useNavigate();\n    const [authError, setAuthError] = useState("");');

fs.writeFileSync(loginPath, login, 'utf8');
console.log('Fixed dupes');
