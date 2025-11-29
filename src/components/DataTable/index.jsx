import { Table, Input, Button, Space, Spin, Empty } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

const DataTable = ({ 
    columns, 
    data, 
    loading, 
    pagination = true,
    searchPlaceholder = "Search...",
    onSearch,
    actionButton,
    rowKey = "id",
    showSearch = true,
    pageSize = 10,
    emptyText = "products", // Customizable empty state text (e.g., "products", "orders", "warehouses")
}) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (value) => {
        setSearchText(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClearSearch = () => {
        setSearchText("");
        if (onSearch) {
            onSearch("");
        }
    };

    const paginationConfig = pagination ? {
        pageSize: pageSize,
        showSizeChanger: true,
        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
        pageSizeOptions: ['10', '20', '50', '100'],
        style: { marginTop: '16px' }
    } : false;

    // Custom Loading State
    const LoadingState = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            minHeight: '400px'
        }}>
            <Spin 
                indicator={<LoadingOutlined style={{ fontSize: 48, color: '#3B82F6' }} />}
                size="large"
            />
            <h3 style={{
                marginTop: '24px',
                fontSize: '18px',
                fontWeight: 600,
                color: '#1F2937',
                marginBottom: '8px'
            }}>
                Searching for {emptyText}...
            </h3>
            <p style={{
                fontSize: '14px',
                color: '#6B7280',
                margin: 0
            }}>
                Please wait while we fetch the results.
            </p>
        </div>
    );

    // Custom Empty State
    const EmptyState = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            minHeight: '400px'
        }}>
            {/* Search Icon */}
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
            }}>
                <SearchOutlined style={{ fontSize: 40, color: '#9CA3AF' }} />
            </div>

            <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1F2937',
                marginBottom: '8px'
            }}>
                No {emptyText.charAt(0).toUpperCase() + emptyText.slice(1)} Found
            </h3>
            
            {searchText ? (
                <>
                    <p style={{
                        fontSize: '14px',
                        color: '#6B7280',
                        marginBottom: '24px',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}>
                        Your search for "<strong>{searchText}</strong>" did not match any {emptyText}.
                    </p>
                    <Button 
                        onClick={handleClearSearch}
                        style={{
                            borderRadius: '6px',
                            height: '40px',
                            padding: '0 24px',
                            fontWeight: 500
                        }}
                    >
                        Clear Search
                    </Button>
                </>
            ) : (
                <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: 0
                }}>
                    No {emptyText} available at the moment.
                </p>
            )}
        </div>
    );

    return (
        <div style={{ 
            background: 'white', 
            borderRadius: '8px', 
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
            {/* Header with Search and Action Button */}
            {(showSearch || actionButton) && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '24px',
                    gap: '16px',
                    flexWrap: 'wrap'
                }}>
                    {showSearch && (
                        <Input
                            placeholder={searchPlaceholder}
                            prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{
                                maxWidth: '320px',
                                borderRadius: '6px',
                            }}
                            size="large"
                            allowClear
                        />
                    )}
                    {actionButton && (
                        <div style={{ marginLeft: 'auto' }}>
                            {actionButton}
                        </div>
                    )}
                </div>
            )}

            {/* Table with Custom Loading and Empty States */}
            {loading ? (
                <LoadingState />
            ) : data.length === 0 ? (
                <EmptyState />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={false} // We handle loading with custom component
                    pagination={paginationConfig}
                    rowKey={rowKey}
                    scroll={{ x: 'max-content' }}
                    style={{
                        borderRadius: '8px'
                    }}
                    className="custom-table"
                />
            )}

            {/* Custom Table Styles */}
            <style>{`
                .custom-table .ant-table {
                    border-radius: 8px;
                }
                
                .custom-table .ant-table-thead > tr > th {
                    background: #F9FAFB;
                    color: #374151;
                    font-weight: 600;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    padding: 16px;
                    border-bottom: 2px solid #E5E7EB;
                }
                
                .custom-table .ant-table-tbody > tr > td {
                    padding: 16px;
                    color: #1F2937;
                    font-size: 14px;
                }
                
                .custom-table .ant-table-tbody > tr:hover > td {
                    background: #F9FAFB;
                    cursor: pointer;
                }
                
                .custom-table .ant-pagination {
                    margin-top: 24px;
                }
                
                .custom-table .ant-pagination-item-active {
                    border-color: #3B82F6;
                    background: #3B82F6;
                }
                
                .custom-table .ant-pagination-item-active a {
                    color: white;
                }
                
                .custom-table .ant-pagination-item:hover {
                    border-color: #3B82F6;
                }
                
                .custom-table .ant-pagination-item:hover a {
                    color: #3B82F6;
                }
            `}</style>
        </div>
    );
};

export default DataTable;