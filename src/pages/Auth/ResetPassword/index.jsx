import { Form, Input, Button, Typography, Card, message, Progress } from "antd";
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATH } from "../../../configs/slider";
import { RiShieldCheckLine } from "@remixicon/react";

const { Title, Text } = Typography;

// Edit this constant to change company name
const COMPANY_NAME = "Inventory Pro";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [form] = Form.useForm();
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: '',
        color: '#E5E7EB'
    });
    
    // Get token from URL query params
    const token = searchParams.get('token');

    // Password strength calculation
    const calculatePasswordStrength = (pwd) => {
        let score = 0;
        const checks = {
            length: pwd.length >= 8,
            number: /[0-9]/.test(pwd),
            uppercase: /[A-Z]/.test(pwd),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        };

        if (checks.length) score += 25;
        if (checks.number) score += 25;
        if (checks.uppercase) score += 25;
        if (checks.special) score += 25;

        let label = '';
        let color = '#E5E7EB';

        if (score === 0) {
            label = '';
            color = '#E5E7EB';
        } else if (score <= 25) {
            label = 'Weak';
            color = '#EF4444';
        } else if (score <= 50) {
            label = 'Fair';
            color = '#F59E0B';
        } else if (score <= 75) {
            label = 'Good';
            color = '#F59E0B';
        } else {
            label = 'Strong';
            color = '#10B981';
        }

        return { score, label, color, checks };
    };

    useEffect(() => {
        const strength = calculatePasswordStrength(password);
        setPasswordStrength(strength);
    }, [password]);

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

    const strength = calculatePasswordStrength(password);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#F9FAFB',
            padding: '20px',
            overflow: 'auto'
        }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    maxHeight: '95vh',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    border: 'none',
                    overflow: 'auto'
                }}
                styles={{
                    body: {
                        padding: '32px 28px'
                    }
                }}
            >
                {/* Icon */}
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        background: '#DBEAFE',
                        borderRadius: '50%',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <RiShieldCheckLine size={28} color="#3B82F6" />
                    </div>
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
                        Reset Your Password
                    </Title>
                    <Text style={{ color: '#6B7280', fontSize: '13px' }}>
                        Create a new, strong password. Make sure it meets the requirements below.
                    </Text>
                </div>

                {/* Reset Password Form */}
                <Form
                    form={form}
                    name="resetPassword"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    {/* New Password Field */}
                    <Form.Item
                        label={
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                                New Password
                            </Text>
                        }
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your new password!" },
                            { min: 8, message: "Password must be at least 8 characters!" }
                        ]}
                        style={{ marginBottom: '12px' }}
                    >
                        <Input.Password
                            placeholder="Enter new password"
                            onChange={(e) => setPassword(e.target.value)}
                            iconRender={(visible) => 
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            style={{
                                borderRadius: '6px',
                            }}
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label={
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
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
                        style={{ marginBottom: '16px' }}
                    >
                        <Input.Password
                            placeholder="Confirm new password"
                            iconRender={(visible) => 
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            style={{
                                borderRadius: '6px',
                            }}
                        />
                    </Form.Item>

                    {/* Password Strength Indicator */}
                    {password && (
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <Text style={{ fontSize: '12px', color: '#6B7280' }}>
                                    Password Strength
                                </Text>
                                <Text style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 600,
                                    color: passwordStrength.color
                                }}>
                                    {passwordStrength.label}
                                </Text>
                            </div>
                            <Progress 
                                percent={passwordStrength.score} 
                                strokeColor={passwordStrength.color}
                                showInfo={false}
                                size="small"
                                style={{ marginBottom: '12px' }}
                            />
                            
                            {/* Password Requirements Checklist */}
                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px',
                                fontSize: '12px'
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: strength.checks.length ? '#10B981' : '#6B7280'
                                }}>
                                    {strength.checks.length ? (
                                        <CheckCircleFilled style={{ fontSize: '14px', color: '#10B981' }} />
                                    ) : (
                                        <CloseCircleFilled style={{ fontSize: '14px', color: '#9CA3AF' }} />
                                    )}
                                    <span>At least 8 characters</span>
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: strength.checks.uppercase ? '#10B981' : '#6B7280'
                                }}>
                                    {strength.checks.uppercase ? (
                                        <CheckCircleFilled style={{ fontSize: '14px', color: '#10B981' }} />
                                    ) : (
                                        <CloseCircleFilled style={{ fontSize: '14px', color: '#9CA3AF' }} />
                                    )}
                                    <span>At least one uppercase</span>
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: strength.checks.number ? '#10B981' : '#6B7280'
                                }}>
                                    {strength.checks.number ? (
                                        <CheckCircleFilled style={{ fontSize: '14px', color: '#10B981' }} />
                                    ) : (
                                        <CloseCircleFilled style={{ fontSize: '14px', color: '#9CA3AF' }} />
                                    )}
                                    <span>At least one number</span>
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: strength.checks.special ? '#10B981' : '#6B7280'
                                }}>
                                    {strength.checks.special ? (
                                        <CheckCircleFilled style={{ fontSize: '14px', color: '#10B981' }} />
                                    ) : (
                                        <CloseCircleFilled style={{ fontSize: '14px', color: '#9CA3AF' }} />
                                    )}
                                    <span>At least one special char</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Form.Item style={{ marginBottom: '0' }}>
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
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPassword;