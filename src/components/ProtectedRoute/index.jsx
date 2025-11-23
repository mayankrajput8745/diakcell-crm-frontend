import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTE_PATH } from '../../configs/slider';

const ProtectedRoute = ({ children }) => {
    const { accessToken, refreshToken } = useSelector(state => state.auth);

    // If no tokens at all, redirect to login
    if (!accessToken && !refreshToken) {
        return <Navigate to={ROUTE_PATH.LOGIN} replace />;
    }

    // If we have tokens (either access or refresh), allow access
    // The API interceptor will handle token refresh if access token is expired
    return children;
};

export default ProtectedRoute;