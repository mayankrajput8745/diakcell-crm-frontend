import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, Card, Typography, Breadcrumb, Space } from "antd";
import { RiArrowLeftLine } from "@remixicon/react";
import toast from "react-hot-toast";
import { getProductById, updateProduct } from "../../../store/productReducer";
import { ROUTE_PATH } from "../../../configs/slider";

const { Title, Text } = Typography;

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { currentProduct, loading: fetchingProduct } = useSelector(state => state.product);

    // Fetch product details on mount
    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    // Update form when product data is loaded
    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue({
                name: currentProduct.name,
                unit: currentProduct.unit,
                sku: currentProduct.sku,
                price: currentProduct.price,
            });
        }
    }, [currentProduct, form]);

    const fetchProduct = async () => {
        try {
            await dispatch(getProductById(id)).unwrap();
        } catch (error) {
            toast.error("Failed to fetch product details");
            console.error("Error fetching product:", error);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await dispatch(updateProduct({ id, data: values })).unwrap();
            toast.success("Product updated successfully!");
            navigate(ROUTE_PATH.PRODUCTS);
        } catch (error) {
            toast.error("Failed to update product");
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(ROUTE_PATH.PRODUCTS);
    };

    if (fetchingProduct) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Text>Loading product...</Text>
            </div>
        );
    }

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
                    minWidth: '720px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
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
                        style={{ marginBottom: '24px' }}
                    >
                        <Text style={{ fontSize: '18px', fontWeight: 600, color: '#1F2937' }}>
                            {currentProduct?.name || 'Loading...'}
                        </Text>
                    </Form.Item>

                    {/* Unit */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>Unit</Text>}
                        style={{ marginBottom: '24px' }}
                    >
                        <Text style={{ fontSize: '16px', color: '#6B7280' }}>
                            {currentProduct?.unit || 'Loading...'}
                        </Text>
                    </Form.Item>

                    {/* SKU */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>SKU</Text>}
                        name="sku"
                        rules={[
                            { required: true, message: 'Please enter SKU!' },
                        ]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Input
                            placeholder="e.g., WNH-001"
                            style={{
                                borderRadius: '6px',
                                background: '#F9FAFB'
                            }}
                        />
                    </Form.Item>

                    {/* Price */}
                    <Form.Item
                        label={<Text strong style={{ fontSize: '14px' }}>Price</Text>}
                        name="price"
                        rules={[
                            { required: true, message: 'Please enter price!' },
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
                                style={{
                                    background: '#3B82F6',
                                    borderColor: '#3B82F6',
                                    borderRadius: '6px',
                                    height: '44px',
                                    padding: '0 24px',
                                    fontWeight: 500
                                }}
                            >
                                Save Changes
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default EditProduct;