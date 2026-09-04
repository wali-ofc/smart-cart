import axios from 'axios';
import { useState } from 'react';
import authImg from "@/assets/images/auth-images.svg"
import { useEffect } from 'react'

import logoDark from "@/assets/images/logo-dark.png"
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
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
            } else if (error.message === "Network Error" || !error.response) {
                // FALLBACK FOR VERCEL DEMO: If backend is unreachable, but credentials match, let them in
                if (email === 'shahidabdullah15042@gmail.com' && password === 'abdullah1215') {
                    localStorage.setItem('adminToken', 'demo_offline_token');
                    localStorage.setItem('adminAuth', 'true');
                    setAuthError("");
                    navigate('/dashboard/ecommerce');
                } else {
                    setAuthError("Cannot connect to backend server. Is it running?");
                }
            } else {
                setAuthError("Invalid email or password");
            }
        }
    };

    useEffect(() => {
        document.body.classList.add('bg-primary-subtle');
        return () => {
            document.body.classList.remove('bg-primary-subtle');
        };
    }, []);
    return (
        <div className="account-page">
            <Container fluid className="p-0">
                <Row className="align-items-center g-0">

                    <Col xl={5}>
                        <Row>
                            <Col md={8} className="mx-auto">
                                <Card className="p-3 mb-0">
                                    <CardBody>
                                        <div className="mb-0 border-0 p-md-5 p-lg-0 p-4">
                                            <div className="mb-4 p-0 text-center">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={logoDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="auth-title-section mb-3 text-center">
                                                <h3 className="text-dark fs-20 fw-medium mb-2">Welcome back</h3>
                                                <p className="text-dark text-capitalize fs-14 mb-0">Sign in to continue to silve.</p>
                                            </div>

                                            <Row>
                                                <Col xs={6} className="mt-2">
                                                    <Link to="" className="btn text-dark border fw-normal d-flex align-items-center justify-content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="me-2">
                                                            <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                                            <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                                                        </svg>
                                                        <span>Google</span>
                                                    </Link>
                                                </Col>

                                                <Col xs={6} className="mt-2">
                                                    <Link to="" className="btn text-dark border fw-normal d-flex align-items-center justify-content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" className="me-2">
                                                            <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" /><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" />
                                                        </svg>
                                                        <span>Facebook</span>
                                                    </Link>
                                                </Col>
                                            </Row>

                                            <div className="saprator my-4"><span>or continue with email</span></div>

                                            <div className="pt-0">
                                                <form onSubmit={handleSubmit} className="my-4">
                                                    
{authError && <div className="alert alert-danger">{authError}</div>}
<div className="form-group mb-3">

                                                        <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                        <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email"  />
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="password" className="form-label">Password</label>
                                                        <input className="form-control" type="password" required id="password" placeholder="Enter your password"  />
                                                    </div>

                                                    <div className="form-group d-flex mb-3">
                                                        <Col sm={6}>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                                                                <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                                            </div>
                                                        </Col>
                                                        <Col sm={6} className="text-end">
                                                            <Link className='text-muted fs-14' to='/auth/ecover-password'>Forgot password?</Link>
                                                        </Col>
                                                    </div>

                                                    <div className="form-group mb-0 row">
                                                        <Col xs={12}>
                                                            <div className="d-grid">
                                                                <button className="btn btn-primary" type="submit"> Log In </button>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </form>

                                                <div className="text-center text-muted mb-4">
                                                    
                                                </div>

                                            </div>
                                        </div>

                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Col>

                    <Col xl={7}>
                        <div className="account-page-bg p-md-5 p-4">
                            <div className="text-center">
                                <div className="auth-image">
                                    <img src={authImg} className="mx-auto img-fluid" alt="images" />
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Login
