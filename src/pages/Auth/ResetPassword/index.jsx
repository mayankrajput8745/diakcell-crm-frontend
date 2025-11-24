import { Form, Input, Button, Typography, Card, message } from "antd";
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_PATH } from "../../../configs/slider";

const { Title, Text, Link } = Typography;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [form] = Form.useForm();
    
    // Get token from URL query params
    const token = searchParams.get('token');

    const onFinish = async (values) => {
        try {
            // TODO: Implement API call to reset password with token
            console.log('Reset password values:', { ...values, token });
            
            message.success('Password has been reset successfully!');
            
            // Redirect to login
            setTimeout(() => {
                navigate(ROUTE_PATH.LOGIN);
            }, 1500);
        } catch (error) {
            message.error('Failed to reset password. Please try again.');
            console.error("Reset password failed:", error);
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
                    Set a new password
                </Title>
                <Text style={{ color: '#6B7280', fontSize: '15px' }}>
                    Please enter a new password for your account.
                </Text>
            </div>

            {/* Reset Password Form */}
            <Form
                form={form}
                name="resetPassword"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                size="large"
            >
                {/* New Password Field */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            New Password
                        </Text>
                    }
                    name="password"
                    rules={[
                        { required: true, message: "Please enter your new password!" },
                        { min: 8, message: "Password must be at least 8 characters!" }
                    ]}
                    style={{ marginBottom: '20px' }}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#9CA3AF' }} />}
                        placeholder="Enter new password"
                        iconRender={(visible) => 
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{
                            borderRadius: '6px',
                            padding: '10px 12px'
                        }}
                    />
                </Form.Item>

                {/* Confirm Password Field */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            Confirm New Password
                        </Text>
                    }
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: "Please confirm your password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                    style={{ marginBottom: '24px' }}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#9CA3AF' }} />}
                        placeholder="Confirm new password"
                        iconRender={(visible) => 
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{
                            borderRadius: '6px',
                            padding: '10px 12px'
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
                            height: '44px',
                            fontSize: '16px',
                            fontWeight: 500,
                            borderRadius: '6px',
                            background: '#3B82F6',
                            borderColor: '#3B82F6'
                        }}
                    >
                        Reset Password
                    </Button>
                </Form.Item>

                {/* Return to Login Link */}
                <div style={{ textAlign: 'center' }}>
                    <Link 
                        onClick={() => navigate(ROUTE_PATH.LOGIN)}
                        style={{ 
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#3B82F6',
                            cursor: 'pointer'
                        }}
                    >
                        ← Back to Log In
                    </Link>
                </div>
            </Form>
        </Card>
    );
};

export default ResetPassword;