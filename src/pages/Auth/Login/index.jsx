import { Form, Input, Button, Card, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/authReducer";
import { ROUTE_PATH } from "../../../configs/slider";

const { Title } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);

    const onFinish = async (values) => {
        try {
            await dispatch(login(values)).unwrap();
            message.success('Login successful!');
            navigate(ROUTE_PATH.ORDERS);
        } catch (error) {
            message.error(error?.message || 'Login failed. Please check your credentials.');
            console.error("Login failed:", error);
        }
    };

    return (
        <Card style={{ width: 400, margin: "50px auto" }}>
            <Title level={2} style={{ textAlign: "center" }}>Login</Title>
            <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                        { type: "email", message: "Please enter a valid email!" }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
