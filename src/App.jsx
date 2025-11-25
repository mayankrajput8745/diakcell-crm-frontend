import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

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
                <Route path={ROUTE_PATH.CREATE_ORDER} element={<div>Create Order Page</div>} />
                <Route path={ROUTE_PATH.ORDER_STATUS} element={<div>Order Status Page</div>} />
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