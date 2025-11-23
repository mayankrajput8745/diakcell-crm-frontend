import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from "./components/ErrorBoundary/index";
import Loading from "./components/Loading/index";
import ProtectedRoute from "./components/ProtectedRoute/index";
import PublicRoute from "./components/PublicRoute/index";
import { ROUTE_PATH } from "./configs/slider";

const AuthContainer = React.lazy(() => import('./pages/AuthContainer'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const OrdersPage = React.lazy(() => import('./pages/Orders'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes - Redirect to orders if authenticated */}
            <Route path="/auth" element={
              <PublicRoute>
                <AuthContainer />
              </PublicRoute>
            }>
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<div>Forgot Password</div>} />
              <Route path="reset-password" element={<div>Reset Password</div>} />
            </Route>

            {/* Protected Routes - Require authentication */}
            <Route path={ROUTE_PATH.ORDERS} element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path={ROUTE_PATH.MANUAL_ORDER} element={
              <ProtectedRoute>
                <div>Manual Order Page</div>
              </ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to={ROUTE_PATH.LOGIN} replace />} />
            
            {/* 404 - Redirect to login */}
            <Route path="*" element={<Navigate to={ROUTE_PATH.LOGIN} replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
