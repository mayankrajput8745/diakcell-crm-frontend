import { Layout, Typography } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { RiBox3Line } from "@remixicon/react";
import { COMPANY_NAME } from "../../utils/constants";
import { ROUTE_PATH } from "../../configs/slider";

const { Title, Text } = Typography;

const AuthContainer = () => {
    const location = useLocation();

    // Dynamic content based on route
    const getLeftSidebarContent = () => {
        switch (location.pathname) {
            case ROUTE_PATH.LOGIN:
                return {
                    title: "Efficiently Manage Your Inventory.",
                    description: "Gain control and visibility over your stock with our intuitive and powerful inventory management system."
                };
            case ROUTE_PATH.FORGOT_PASSWORD:
                return {
                    title: "Efficiently Manage Your Inventory.",
                    description: "Gain control and visibility over your stock with our intuitive and powerful inventory management system."
                };
            case ROUTE_PATH.RESET_PASSWORD:
                return {
                    title: "Securely Reset Your Password.",
                    description: "Create a fresh, strong password to regain access to your inventory management dashboard."
                };
            case ROUTE_PATH.REQUEST_ACCESS:
                return {
                    title: "Join the Team.",
                    description: "Request access to the inventory system by filling out your details. Your request will be reviewed by an administrator."
                };
            default:
                return {
                    title: "Efficiently Manage Your Inventory.",
                    description: "Gain control and visibility over your stock with our intuitive and powerful inventory management system."
                };
        }
    };

    const content = getLeftSidebarContent();

    return (
        <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
            {/* Left Sidebar - Common for all auth pages */}
            <div
                style={{
                    width: "45%",
                    minHeight: "100vh",
                    background: "#2C3E50",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "60px",
                    position: "relative"
                }}
                className="auth-left-sidebar"
            >
                <div style={{ maxWidth: "500px" }}>
                    {/* Logo */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '48px',
                        gap: '12px'
                    }}>
                        <div style={{
                            background: '#3B82F6',
                            borderRadius: '8px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <RiBox3Line size={24} color="white" />
                        </div>
                        <Title 
                            level={2} 
                            style={{ 
                                color: 'white',
                                margin: 0,
                                fontSize: '28px',
                                fontWeight: 600
                            }}
                        >
                            {COMPANY_NAME}
                        </Title>
                    </div>

                    {/* Dynamic Title */}
                    <Title 
                        level={1} 
                        style={{ 
                            color: 'white',
                            fontSize: '42px',
                            fontWeight: 700,
                            lineHeight: '1.2',
                            marginBottom: '20px'
                        }}
                    >
                        {content.title}
                    </Title>

                    {/* Dynamic Description */}
                    <Text 
                        style={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            display: 'block'
                        }}
                    >
                        {content.description}
                    </Text>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div
                style={{
                    flex: 1,
                    minHeight: "100vh",
                    background: "#F9FAFB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "35px 20px"
                }}
            >
                <Outlet />
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .auth-left-sidebar {
                        display: none !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default AuthContainer;