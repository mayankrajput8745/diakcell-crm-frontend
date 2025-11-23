import { Card, Row, Col, theme as themeConfig, Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const SIDER_IMG = "/vite.svg";

const AuthContainer = () => {
    const { token } = themeConfig.useToken();

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
                        minHeight: "100vh",
                    }}
                >
                    <Col xs={24} md={12}>
                        <Row
                            justify="center"
                            align="middle"
                            style={{ minHeight: "100vh" }}
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
    );
};

export default AuthContainer;