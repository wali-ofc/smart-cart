const fs = require('fs');

let loginPath = 'src/app/(pages)/auth/login/components/Login.tsx';
let login = fs.readFileSync(loginPath, 'utf8');

if (!login.includes('import axios')) {
    login = "import axios from 'axios';\n" + login;
}

const handlerCode = `
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = (document.getElementById('emailaddress') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // Assuming backend returns success: true and a user object
            if (response.data.success) {
                // Ensure the user has the 'seller' role
                if (response.data.user && response.data.user.role === 'seller') {
                    // Set token manually for API calls
                    localStorage.setItem('adminToken', response.data.token);
                    localStorage.setItem('adminAuth', 'true');
                    setAuthError("");
                    navigate('/dashboard/ecommerce');
                } else {
                    setAuthError("Unauthorized: You must be a seller to access this dashboard.");
                }
            } else {
                setAuthError("Invalid email or password");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setAuthError(error.response.data.error);
            } else {
                setAuthError("Invalid email or password");
            }
        }
    };
`;
// Replace the old handleSubmit code
login = login.replace(/const handleSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/, handlerCode);

fs.writeFileSync(loginPath, login, 'utf8');
console.log('Login modified with Axios API call');
