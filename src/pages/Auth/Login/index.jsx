import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { login } from "../../../store/authReducer";
import { ROUTE_PATH } from "../../../configs/slider";

const { Title, Text, Link } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading } = useSelector(state => state.auth);
    const toastShownRef = useRef(false); // Track if toast has been shown

    useEffect(() => {
        if (location.state?.message && !toastShownRef.current) {
            toastShownRef.current = true; // Mark as shown
            
            const messageType = location.state.type || 'info';
            
            if (messageType === 'success') {
                toast.success(location.state.message, {
                    duration: 4000,
                    position: 'top-center',
                });
            } else if (messageType === 'error') {
                toast.error(location.state.message, {
                    duration: 4000,
                    position: 'top-center',
                });
            } else if (messageType === 'warning') {
                toast(location.state.message, {
                    duration: 4000,
                    position: 'top-center',
                    icon: '⚠️',
                });
            } else {
                toast(location.state.message, {
                    duration: 4000,
                    position: 'top-center',
                    icon: 'ℹ️',
                });
            }
            
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, location.pathname, navigate]);

    const onFinish = async (values) => {
        try {
            await dispatch(login(values)).unwrap();
            navigate(ROUTE_PATH.ORDERS);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
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
                        placeholder="Enter email (username)"
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
                        Forgot Password?
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
    );
};

export default Login;