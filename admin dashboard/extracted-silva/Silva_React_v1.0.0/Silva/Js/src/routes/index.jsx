import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { initialRoutes, pages } from "./Routes";
import AppWrappersProvider from "@/component/AppWrappersProvider";
const AppRoutes = () => {
  return <Suspense>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/index" replace />} />

                {initialRoutes.map(route => <Route key={route.name} path={route.path} element={<AppWrappersProvider>
                               {route.element}
                            </AppWrappersProvider>} />)}

                {pages.map(route => <Route key={route.name} path={route.path} element={route.element} />)}

                <Route path="*" element={<Navigate to="/error/404" replace />} />
            </Routes>
        </Suspense>;
};
export default AppRoutes;