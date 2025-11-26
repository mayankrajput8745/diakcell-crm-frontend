import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Configs
import { ROUTE_PATH } from "./configs/slider";

// Component Imports
import PublicRoute from "./components/PublicRoute/index";
import ProtectedRoute from "./components/ProtectedRoute/index";
import Loading from "./components/Loading/index";
import ErrorBoundary from "./components/ErrorBoundary/index";
import PageContainer from "./components/PageContainer";
import AuthContainer from "./components/AuthContainer";

// Lazy Loaded Pages
const Login = React.lazy(() => import('./pages/Auth/Login'));
const RequestAccess = React.lazy(() => import('./pages/Auth/RequestAccess'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/Auth/ResetPassword'));
const ProductsPage = React.lazy(() => import('./pages/Products'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          {/* React Hot Toast Container */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Default options
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                fontSize: '14px',
                padding: '12px 20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              // Success Toast
              success: {
                duration: 4000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
                style: {
                  background: '#fff',
                  color: '#1F2937',
                  border: '1px solid #D1FAE5',
                },
              },
              // Error Toast
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
                style: {
                  background: '#fff',
                  color: '#1F2937',
                  border: '1px solid #FEE2E2',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes - Redirect to products if authenticated */}
            <Route path="/auth" element={
              <PublicRoute>
                <AuthContainer />
              </PublicRoute>
            }>
              <Route path="login" element={<Login />} />
              <Route path="request-access" element={<RequestAccess />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected Routes - Require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route element={<PageContainer />}>
                <Route path={ROUTE_PATH.DASHBOARD} element={<div>Dashboard Page</div>} />
                <Route path={ROUTE_PATH.PRODUCTS} element={<ProductsPage />} />
                <Route path={ROUTE_PATH.WAREHOUSE} element={<div>Warehouse Page</div>} />
                <Route path={ROUTE_PATH.INVENTORY} element={<div>Inventory Page</div>} />
                <Route path={ROUTE_PATH.ORDERS} element={<div>Orders Page</div>} />
                <Route path={ROUTE_PATH.ALERTS} element={<div>Alerts Page</div>} />
              </Route>
            </Route>

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