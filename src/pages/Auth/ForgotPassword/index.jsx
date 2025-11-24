import { Form, Input, Button, Typography, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../configs/slider";
import { RiBox3Line } from "@remixicon/react";

// Constants for branding
import { COMPANY_NAME } from "../../../utils/constants";

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            // TODO: Implement API call to send reset password email
            console.log('Forgot password email:', values);
            
            message.success('Password reset link has been sent to your email!');
            
            // Optionally redirect to login after a short delay
            setTimeout(() => {
                navigate(ROUTE_PATH.LOGIN);
            }, 2000);
        } catch (error) {
            message.error('Failed to send reset link. Please try again.');
            console.error("Forgot password failed:", error);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#F9FAFB',
            padding: '20px',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '460px',
            }}>
                {/* Logo and Company Name */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    marginBottom: '32px',
                }}>
                    <div style={{
                        background: '#3B82F6',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px'
                    }}>
                        <RiBox3Line size={28} color="white" />
                    </div>
                    <Title 
                        level={2} 
                        style={{ 
                            margin: 0,
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#1F2937',
                            textAlign: 'center'
                        }}
                    >
                        {COMPANY_NAME}
                    </Title>
                </div>

                <Card
                    style={{
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        border: 'none'
                    }}
                    styles={{
                        body: {
                            padding: '36px 32px'
                        }
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <Title 
                            level={2} 
                            style={{ 
                                fontSize: '24px',
                                fontWeight: 700,
                                marginBottom: '8px',
                                color: '#1F2937'
                            }}
                        >
                            Reset Your Password
                        </Title>
                        <Text style={{ color: '#6B7280', fontSize: '14px' }}>
                            Enter your email address to receive a password reset link.
                        </Text>
                    </div>

                    {/* Forgot Password Form */}
                    <Form
                        form={form}
                        name="forgotPassword"
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                    >
                        {/* Email Address Field */}
                        <Form.Item
                            label={
                                <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                                    Email Address
                                </Text>
                            }
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email address!" },
                                { type: "email", message: "Please enter a valid email address!" }
                            ]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                placeholder="you@company.com"
                                style={{
                                    borderRadius: '6px',
                                }}
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item style={{ marginBottom: '20px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block
                                style={{
                                    height: '42px',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    borderRadius: '6px',
                                    background: '#3B82F6',
                                    borderColor: '#3B82F6'
                                }}
                            >
                                Send Password Reset Link
                            </Button>
                        </Form.Item>

                        {/* Return to Login Link */}
                        <div style={{ textAlign: 'center' }}>
                            <Link 
                                onClick={() => navigate(ROUTE_PATH.LOGIN)}
                                style={{ 
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: '#6B7280',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <ArrowLeftOutlined style={{ fontSize: '12px' }} />
                                Return to Login
                            </Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;