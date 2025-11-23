import { Layout, Button, Typography, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authReducer";
import { ROUTE_PATH } from "../../configs/slider";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const OrdersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate(ROUTE_PATH.LOGIN);
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if API fails, clear local state and redirect
            navigate(ROUTE_PATH.LOGIN);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ 
                background: '#fff', 
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <Title level={3} style={{ margin: 0 }}>Orders Dashboard</Title>
                <div>
                    <Text style={{ marginRight: 16 }}>
                        Welcome, {userInfo?.name || userInfo?.email || 'User'}
                    </Text>
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Card>
                    <Title level={4}>Orders List</Title>
                    <Text>Your orders will appear here.</Text>
                </Card>
            </Content>
        </Layout>
    );
};

export default OrdersPage;