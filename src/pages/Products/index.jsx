import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { getProducts } from "../../store/productReducer";
import { ROUTE_PATH } from "../../configs/slider";

const { Title } = Typography;

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, pagination } = useSelector(state => state.product);
    const [searchText, setSearchText] = useState("");

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts({ page: pagination.current, limit: pagination.pageSize, search: searchText});
    }, [pagination.current, pagination.pageSize, searchText]);

    const fetchProducts = async (params = {}) => {
        try {
            await dispatch(getProducts(params)).unwrap();
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    };

    // Handle search
    const handleSearch = (value) => {
        setSearchText(value);
        // You can implement debounced search here
        // For now, just filter locally
    };

    // Filter products based on search text
    const filteredProducts = searchText
        ? products.filter(product =>
            product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchText.toLowerCase())
        )
        : products;

    // Handle Add New Product
    const handleAddProduct = () => {
        navigate(ROUTE_PATH.PRODUCTS_ADD);
    };

    // Handle Edit Product
    const handleEditProduct = (productId) => {
        navigate(ROUTE_PATH.PRODUCTS_EDIT.replace(':id', productId));
    };

    // Table columns configuration
    const columns = [
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            width: 280,
            fixed: 'left',
            render: (text) => (
                <span style={{ 
                    fontWeight: 500, 
                    color: '#1F2937',
                    fontSize: '14px'
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
            width: 150,
            render: (text) => (
                <span style={{ 
                    color: '#6B7280',
                    fontSize: '13px',
                    fontFamily: 'monospace'
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: 120,
            align: 'right',
            render: (price) => (
                <span style={{ 
                    fontWeight: 600, 
                    color: '#059669',
                    fontSize: '14px'
                }}>
                    ${Number(price).toFixed(2)}
                </span>
            ),
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 100,
            render: (unit) => (
                <Tag 
                    color="blue" 
                    style={{ 
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500
                    }}
                >
                    {unit}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            fixed: 'right',
            align: 'center',
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => handleEditProduct(record.id)}
                    style={{
                        color: '#3B82F6',
                        fontWeight: 500,
                        padding: 0
                    }}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredProducts}
                loading={loading}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total || filteredProducts.length,
                }}
                searchPlaceholder="Search by name, SKU..."
                onSearch={handleSearch}
                actionButton={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddProduct}
                        size="large"
                        style={{
                            background: '#3B82F6',
                            borderColor: '#3B82F6',
                            borderRadius: '6px',
                            fontWeight: 500,
                            height: '44px',
                            padding: '0 24px'
                        }}
                    >
                        Add New Product
                    </Button>
                }
                rowKey="id"
                showSearch={true}
                pageSize={10}
                emptyText="products"
            />
        </div>
    );
};

export default Products;