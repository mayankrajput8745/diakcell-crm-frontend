import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from "./components/ErrorBoundary/index";

const AuthContainer = React.lazy(() => import('./pages/AuthContainer'));
const Login = React.lazy(() => import('./pages/Auth/Login'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      </ErrorBoundary>
      <Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;