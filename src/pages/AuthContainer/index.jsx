import { Card, Row, Col, theme as themeConfig, Layout, Typography } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import { ROUTE_PATH } from "../../configs/slider";

const { Content } = Layout;
const { Text } = Typography;

const AuthContainer = () => {
    const { token } = themeConfig.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const userId = localStorage.getItem('user-id'); 
    const tokenData = localStorage.getItem('auth-tokens');

    useEffect(() => {0
        const isAuthRoute = location.pathname.includes('auth');

        if (userId && tokenData && !isAuthRoute) {
            navigate(ROUTE_PATH.ORDERS);
        }
    }, [userId, tokenData, location.pathname]);

    return (
        <Layout
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >
            <Content>
                <Row
                    style={{
                        justifyContent: "center",
                        position: "relative",
                        backgroundColor: "none",
                    }}
                >
                    <Col xs={24} md={12}>
                        <Row
                            justify="center"
                            align="middle"
                        >
                            <Outlet />
                        </Row>
                        <Row
                            justify="center"
                            style={{
                                position: "absolute",
                                width: "100%",
                                bottom: "8px",
                            }}
                        >
                            {import.meta.env.REACT_APP_VERSION && (
                                <Text
                                    style={{
                                        fontSize: token.fontSizeSM,
                                        color: token.colorTextDescription,
                                    }}
                                >
                                    V{import.meta.env.REACT_APP_VERSION}
                                </Text>
                            )}
                        </Row>
                    </Col>
                    <Col xs={0} md={12} style={{ overflow: "hidden" }}>
                        <Row
                            justify="center"
                            align="middle"
                            style={{ height: "100%", padding: "16px" }}
                        >
                            <Card
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    border: "none",
                                    overflow: "hidden",
                                    boxShadow: "0px 1px 10px 0.2px #888",
                                    borderRadius: "none",
                                    background: token.colorPrimary
                                }}
                                styles={{
                                    body: {
                                        height: "100%",
                                        padding: 0,
                                        borderRadius: "none",
                                    },
                                }}
                            >
                                <img
                                    src={SIDER_IMG}
                                    alt="auth-bg"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                        display: "block",
                                    }}
                                />
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}