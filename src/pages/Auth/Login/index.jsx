import { Form, Input, Button, Checkbox, Typography, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/authReducer";
import { ROUTE_PATH } from "../../../configs/slider";
import { RiBox3Line } from "@remixicon/react";

// Constants for branding
import { COMPANY_NAME, COMPANY_TAGLINE, COMPANY_DESCRIPTION } from "../../../utils/constants";

const { Title, Text, Link } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);

    const onFinish = async (values) => {
        try {
            await dispatch(login(values)).unwrap();
            navigate(ROUTE_PATH.ORDERS);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Row style={{ 
            minHeight: '100vh',
            width: '100%',
            margin: 0
        }}>
            {/* Left Side - Branding */}
            <Col 
                xs={0} 
                md={12} 
                style={{
                    background: '#2C3E50',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '60px',
                }}
            >
                <div style={{ maxWidth: '500px' }}>
                    {/* Logo */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '40px',
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

                    {/* Tagline */}
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
                        {COMPANY_TAGLINE}
                    </Title>

                    {/* Description */}
                    <Text 
                        style={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '16px',
                            lineHeight: '1.6'
                        }}
                    >
                        {COMPANY_DESCRIPTION}
                    </Text>
                </div>
            </Col>

            {/* Right Side - Login Form */}
            <Col 
                xs={24} 
                md={12}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    background: '#F9FAFB'
                }}
            >
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '440px',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        border: 'none'
                    }}
                    styles={{
                        body: {
                            padding: '48px 40px'
                        }
                    }}
                >
                    {/* Mobile Logo - Only visible on small screens */}
                    <div 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '32px',
                            gap: '12px'
                        }}
                        className="mobile-logo"
                    >
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
                                margin: 0,
                                fontSize: '24px',
                                fontWeight: 600,
                                color: '#2C3E50'
                            }}
                        >
                            {COMPANY_NAME}
                        </Title>
                    </div>

                    {/* Header */}
                    <div style={{ marginBottom: '32px' }}>
                        <Title 
                            level={2} 
                            style={{ 
                                fontSize: '28px',
                                fontWeight: 700,
                                marginBottom: '8px',
                                color: '#1F2937'
                            }}
                        >
                            Sign in to your account
                        </Title>
                        <Text style={{ color: '#6B7280', fontSize: '15px' }}>
                            Welcome back! Please enter your details.
                        </Text>
                    </div>

                    {/* Login Form */}
                    <Form
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        size="large"
                    >
                        {/* Username/Email Field */}
                        <Form.Item
                            label={
                                <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                                    Username or Email
                                </Text>
                            }
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                            ]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                prefix={<UserOutlined style={{ color: '#9CA3AF' }} />}
                                placeholder="you@example.com"
                                style={{
                                    borderRadius: '6px',
                                    padding: '10px 12px'
                                }}
                            />
                        </Form.Item>

                        {/* Password Field */}
                        <Form.Item
                            label={
                                <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                                    Password
                                </Text>
                            }
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                            style={{ marginBottom: '16px' }}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#9CA3AF' }} />}
                                placeholder="Enter your password"
                                iconRender={(visible) => 
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                style={{
                                    borderRadius: '6px',
                                    padding: '10px 12px'
                                }}
                            />
                        </Form.Item>

                        {/* Remember Me & Forgot Password */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <Form.Item 
                                name="remember" 
                                valuePropName="checked" 
                                style={{ margin: 0 }}
                            >
                                <Checkbox style={{ fontSize: '14px', color: '#374151' }}>
                                    Remember Me
                                </Checkbox>
                            </Form.Item>
                            <Link 
                                onClick={() => navigate(ROUTE_PATH.FORGOT_PASSWORD)}
                                style={{ 
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#3B82F6',
                                    cursor: 'pointer'
                                }}
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block 
                                loading={loading}
                                style={{
                                    height: '44px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    borderRadius: '6px',
                                    background: '#3B82F6',
                                    borderColor: '#3B82F6'
                                }}
                            >
                                Log In
                            </Button>
                        </Form.Item>

                        {/* Request Access Link */}
                        <div style={{ textAlign: 'center' }}>
                            <Text style={{ color: '#6B7280', fontSize: '14px' }}>
                                Don't have an account?{' '}
                                <Link 
                                    onClick={() => navigate(ROUTE_PATH.REQUEST_ACCESS)}
                                    style={{ 
                                        fontWeight: 500,
                                        color: '#3B82F6',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Request Access
                                </Link>
                            </Text>
                        </div>
                    </Form>
                </Card>
            </Col>

            {/* Custom CSS for mobile logo */}
            <style>{`
                @media (min-width: 768px) {
                    .mobile-logo {
                        display: none !important;
                    }
                }
            `}</style>
        </Row>
    );
};

export default Login;
