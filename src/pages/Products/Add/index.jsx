import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, Card, Typography, Breadcrumb, Space, Select } from "antd";
import { RiSaveLine } from "@remixicon/react";
import toast from "react-hot-toast";
import { createProduct } from "../../../store/productReducer";
import { ROUTE_PATH } from "../../../configs/slider";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await dispatch(createProduct(values)).unwrap();
            toast.success("Product added successfully!");
            navigate(ROUTE_PATH.PRODUCTS);
        } catch (error) {
            toast.error("Failed to add product");
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(ROUTE_PATH.PRODUCTS);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        }}>
            {/* Form Card */}
            <Card
                style={{
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    minWidth: '800px',
                }}
                title={
                    <div>
                        <Title level={4} style={{ margin: 0, marginBottom: '4px' }}>
                            Product Information
                        </Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>
                            Fill in the details for the new product.
                        </Text>
                    </div>
                }
                styles={{
                    header: {
                        borderBottom: '1px solid #E5E7EB',
                        padding: '20px 24px'
                    },
                    body: {
                        padding: '24px'
                    }
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                >
                    {/* Product Name */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>Product Name</Text>}
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter product name!' },
                            { min: 2, message: 'Product name must be at least 2 characters!' }
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input
                            placeholder="e.g., Wireless Noise-Cancelling Headphones"
                            style={{
                                borderRadius: '6px',
                                background: '#F9FAFB'
                            }}
                        />
                    </Form.Item>

                    {/* SKU and Category Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {/* SKU */}
                        <Form.Item
                            label={<Text strong style={{ fontSize: '14px' }}>SKU (Stock Keeping Unit)</Text>}
                            name="sku"
                            rules={[
                                { required: true, message: 'Please enter SKU!' },
                            ]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Input
                                placeholder="e.g., WNH-001"
                                style={{
                                    borderRadius: '6px',
                                    background: '#F9FAFB'
                                }}
                            />
                        </Form.Item>

                        {/* Category */}
                        <Form.Item
                            label={<Text strong style={{ fontSize: '14px' }}>Category</Text>}
                            name="category"
                            rules={[
                                { required: true, message: 'Please select a category!' },
                            ]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Select
                                placeholder="Select a category"
                                style={{
                                    borderRadius: '6px',
                                }}
                                options={[
                                    { label: 'Electronics', value: 'electronics' },
                                    { label: 'Clothing', value: 'clothing' },
                                    { label: 'Books', value: 'books' },
                                    { label: 'Food & Beverage', value: 'food' },
                                    { label: 'Home & Garden', value: 'home' },
                                    { label: 'Sports', value: 'sports' },
                                    { label: 'Other', value: 'other' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    {/* Description */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>Description</Text>}
                        name="description"
                        style={{ marginBottom: '20px' }}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Provide a detailed description of the product..."
                            style={{
                                borderRadius: '6px',
                                background: '#F9FAFB'
                            }}
                            maxLength={500}
                            showCount
                        />
                    </Form.Item>

                    {/* Unit Price */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>Unit Price</Text>}
                        name="price"
                        rules={[
                            { required: true, message: 'Please enter unit price!' },
                            { type: 'number', min: 0, message: 'Price must be positive!' }
                        ]}
                        style={{ marginBottom: '32px' }}
                    >
                        <InputNumber
                            prefix="$"
                            placeholder="0.00"
                            precision={2}
                            step={0.01}
                            style={{
                                width: '100%',
                                borderRadius: '6px',
                                background: '#F9FAFB'
                            }}
                        />
                    </Form.Item>

                    {/* Action Buttons */}
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                size="large"
                                onClick={handleCancel}
                                disabled={loading}
                                style={{
                                    borderRadius: '6px',
                                    height: '44px',
                                    padding: '0 24px'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                icon={<RiSaveLine size={20} />}
                                style={{
                                    background: '#3B82F6',
                                    borderColor: '#3B82F6',
                                    borderRadius: '6px',
                                    height: '44px',
                                    padding: '0 24px',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Save Product
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddProduct;