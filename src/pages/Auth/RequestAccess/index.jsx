import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ROUTE_PATH } from "../../../configs/slider";
import { requestAccess } from "../../../store/authReducer";

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const RequestAccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await dispatch(requestAccess(values)).unwrap();
            navigate(ROUTE_PATH.LOGIN, { 
                state: { 
                    message: 'Your access request has been submitted successfully! We will get back to you soon.',
                    type: 'success'
                } 
            });
            
        } catch (error) {
            toast.error('Failed to submit request. Please try again.');
            console.error("Request access failed:", error);
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
                    Request Access
                </Title>
                <Text style={{ color: '#6B7280', fontSize: '15px' }}>
                    Enter your details below to request an account.
                </Text>
            </div>

            {/* Request Access Form */}
            <Form
                form={form}
                name="requestAccess"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                size="large"
            >
                {/* Full Name Field */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            Full Name
                        </Text>
                    }
                    name="fullName"
                    rules={[
                        { required: true, message: "Please enter your full name!" },
                        { min: 2, message: "Name must be at least 2 characters!" }
                    ]}
                    style={{ marginBottom: '20px' }}
                >
                    <Input 
                        prefix={<UserOutlined style={{ color: '#9CA3AF' }} />}
                        placeholder="e.g., John Doe"
                        disabled={loading}
                        style={{
                            borderRadius: '6px',
                            padding: '10px 12px'
                        }}
                    />
                </Form.Item>

                {/* Work Email Field */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            Work Email
                        </Text>
                    }
                    name="workEmail"
                    rules={[
                        { required: true, message: "Please enter your work email!" },
                        { type: "email", message: "Please enter a valid email address!" }
                    ]}
                    style={{ marginBottom: '20px' }}
                >
                    <Input 
                        prefix={<MailOutlined style={{ color: '#9CA3AF' }} />}
                        placeholder="you@example.com"
                        disabled={loading}
                        style={{
                            borderRadius: '6px',
                            padding: '10px 12px'
                        }}
                    />
                </Form.Item>

                {/* Message Field (Optional) */}
                <Form.Item
                    label={
                        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                            Help us out
                        </Text>
                    }
                    name="message"
                    style={{ marginBottom: '24px' }}
                >
                    <TextArea
                        rows={3}
                        placeholder="e.g., Sales, http://yoururl"
                        disabled={loading}
                        style={{
                            borderRadius: '6px',
                        }}
                        maxLength={500}
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
                        Submit Request
                    </Button>
                </Form.Item>

                {/* Login Link */}
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#6B7280', fontSize: '14px' }}>
                        Already have an account?{' '}
                        <Link 
                            onClick={() => !loading && navigate(ROUTE_PATH.LOGIN)}
                            style={{ 
                                fontWeight: 500,
                                color: loading ? '#9CA3AF' : '#3B82F6',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                pointerEvents: loading ? 'none' : 'auto'
                            }}
                        >
                            Sign in
                        </Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default RequestAccess;