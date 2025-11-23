import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTE_PATH } from '../../configs/slider';

const PublicRoute = ({ children }) => {
    const { accessToken, userInfo } = useSelector(state => state.auth);

    // If user is already authenticated, redirect to orders
    if (accessToken && userInfo) {
        return <Navigate to={ROUTE_PATH.ORDERS} replace />;
    }

    return children;
};

export default PublicRoute;