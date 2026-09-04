
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

import { Suspense } from "react"
import { initialRoutes, pages } from "./Routes"
import AppWrappersProvider from "@/component/AppWrappersProvider"

const AppRoutes = () => {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />
                <Route path="/index.html" element={<Navigate to="/auth/login" replace />} />

                {initialRoutes.map((route) => (
                    <Route
                        key={route.name}
                        path={route.path}
                        element={
                            <ProtectedRoute><AppWrappersProvider>
                               {route.element}
                            </AppWrappersProvider></ProtectedRoute>
                        }
                    />
                ))}

                {pages.map((route) => (
                    <Route
                        key={route.name}
                        path={route.path}
                        element={route.element}
                    />
                ))}

                <Route path="*" element={<Navigate to="/error/404" replace />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
