import { Form, Input, Button, Typography, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../configs/slider";
import { RiBox3Line } from "@remixicon/react";

// Constants for branding
import { COMPANY_NAME } from "../../../utils/constants";

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const RequestAccess = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            // TODO: Implement API call to submit access request
            console.log('Request access values:', values);
            
            message.success('Your request has been submitted successfully! We will review it shortly.');
            
            // Redirect to login after a short delay
            setTimeout(() => {
                navigate(ROUTE_PATH.LOGIN);
            }, 2000);
        } catch (error) {
            message.error('Failed to submit request. Please try again.');
            console.error("Request access failed:", error);
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
            <Card
                style={{
                    width: '100%',
                    maxWidth: '580px',
                    maxHeight: '95vh',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    border: 'none',
                    overflow: 'auto'
                }}
                styles={{
                    body: {
                        padding: '32px 36px'
                    }
                }}
            >
                {/* Logo and Company Name */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    marginBottom: '24px',
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

                {/* Header */}
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <Title 
                        level={2} 
                        style={{ 
                            fontSize: '24px',
                            fontWeight: 700,
                            marginBottom: '6px',
                            color: '#1F2937'
                        }}
                    >
                        Request Access
                    </Title>
                    <Text style={{ color: '#6B7280', fontSize: '14px' }}>
                        Fill out the form below and our team will review your request.
                    </Text>
                </div>

                {/* Request Access Form */}
                <Form
                    form={form}
                    name="requestAccess"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    {/* Full Name Field */}
                    <Form.Item
                        label={
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                                Full Name
                            </Text>
                        }
                        name="fullName"
                        rules={[
                            { required: true, message: "Please enter your full name!" },
                            { min: 2, message: "Name must be at least 2 characters!" }
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input 
                            placeholder="Enter your full name"
                            style={{
                                borderRadius: '6px',
                            }}
                        />
                    </Form.Item>

                    {/* Work Email Field */}
                    <Form.Item
                        label={
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                                Work Email
                            </Text>
                        }
                        name="workEmail"
                        rules={[
                            { required: true, message: "Please enter your work email!" },
                            { type: "email", message: "Please enter a valid email address!" }
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input 
                            placeholder="Enter your work email"
                            style={{
                                borderRadius: '6px',
                            }}
                        />
                    </Form.Item>

                    {/* Message Field (Optional) */}
                    <Form.Item
                        label={
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                                Message (Optional)
                            </Text>
                        }
                        name="message"
                        style={{ marginBottom: '20px' }}
                    >
                        <TextArea
                            rows={3}
                            placeholder="Tell us why you need access..."
                            style={{
                                borderRadius: '6px',
                            }}
                            maxLength={500}
                            showCount
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
                            Submit Request
                        </Button>
                    </Form.Item>

                    {/* Login Link */}
                    <div style={{ textAlign: 'center' }}>
                        <Text style={{ color: '#6B7280', fontSize: '13px' }}>
                            Already have an account?{' '}
                            <Link 
                                onClick={() => navigate(ROUTE_PATH.LOGIN)}
                                style={{ 
                                    fontWeight: 500,
                                    color: '#3B82F6',
                                    cursor: 'pointer'
                                }}
                            >
                                Log In
                            </Link>
                        </Text>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RequestAccess;