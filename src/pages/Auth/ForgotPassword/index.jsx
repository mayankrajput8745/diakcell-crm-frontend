import { Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ROUTE_PATH } from "../../../configs/slider";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../store/authReducer";

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await dispatch(forgotPassword(values)).unwrap();
            navigate(ROUTE_PATH.LOGIN, {
                state: {
                    message: 'Password reset link has been sent to your email!',
                    type: 'success'
                }
            });
        } catch (error) {
            // Show error toast immediately on this page
            toast.error('Failed to send reset link. Please try again.');
            console.error("Forgot password failed:", error);
        } finally {
            setLoading(false);
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
                    Forgot your password?
                </Title>
                <Text style={{ color: '#6B7280', fontSize: '15px' }}>
                    No worries, we'll send you reset instructions.
                </Text>
            </div>

            {/* Forgot Password Form */}
            <Form
                form={form}
                name="forgotPassword"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                size="large"
            >
                {/* Email Address Field */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            Email
                        </Text>
                    }
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email address!" },
                        { type: "email", message: "Please enter a valid email address!" }
                    ]}
                    style={{ marginBottom: '24px' }}
                >
                    <Input
                        prefix={<MailOutlined style={{ color: '#9CA3AF' }} />}
                        placeholder="you@example.com"
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
                        loading={loading}
                        disabled={loading}
                        style={{
                            height: '44px',
                            fontSize: '16px',
                            fontWeight: 500,
                            borderRadius: '6px',
                            background: '#3B82F6',
                            borderColor: '#3B82F6'
                        }}
                    >
                        Send Reset Link
                    </Button>
                </Form.Item>

                {/* Return to Login Link */}
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#6B7280', fontSize: '14px' }}>
                        Remember your password?{' '}
                        <Link
                            onClick={() => navigate(ROUTE_PATH.LOGIN)}
                            style={{
                                fontWeight: 500,
                                color: '#3B82F6',
                                cursor: 'pointer'
                            }}
                        >
                            Back to Log In
                        </Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default ForgotPassword;