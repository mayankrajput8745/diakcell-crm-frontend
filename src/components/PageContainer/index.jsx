import { Layout, Menu, Avatar, Badge, Typography } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RiBox3Line, RiLogoutBoxLine } from "@remixicon/react";
import { logout } from "../../store/authReducer";
import { ROUTE_PATH, SLIDER_LIST } from "../../configs/slider";
import { COMPANY_NAME } from "../../utils/constants";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

const PageContainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    
    // State to manage which submenus are open
    const [openKeys, setOpenKeys] = useState([]);

    // Get current selected key from location
    const getSelectedKey = () => {
        const currentPath = location.pathname;

        // Check main routes
        for (const item of SLIDER_LIST) {
            if (item.routepath === currentPath) {
                return item.key;
            }
            // Check children routes
            if (item.children) {
                for (const child of item.children) {
                    if (child.routepath === currentPath) {
                        return child.key;
                    }
                }
            }
        }

        return 'dashboard';
    };

    // Get initial open keys for submenu based on current route
    useEffect(() => {
        const currentPath = location.pathname;

        for (const item of SLIDER_LIST) {
            if (item.children) {
                for (const child of item.children) {
                    if (child.routepath === currentPath) {
                        setOpenKeys([item.key]);
                        return;
                    }
                }
            }
        }
    }, [location.pathname]);

    // Handle submenu open/close
    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate(ROUTE_PATH.LOGIN);
        } catch (error) {
            console.error("Logout failed:", error);
            navigate(ROUTE_PATH.LOGIN);
        }
    };

    // Transform SLIDER_LIST to Ant Design Menu items format
    const menuItems = SLIDER_LIST.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: item.children ? undefined : () => navigate(item.routepath),
        children: item.children ? item.children.map(child => ({
            key: child.key,
            label: child.label,
            onClick: () => navigate(child.routepath),
            icon: child.icon
        })) : undefined
    }));

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar - Fixed width, no collapse */}
            <Sider
                width={260}
                style={{
                    background: '#334155',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    overflow: 'auto',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
                }}
            >
                {/* Logo Section */}
                <div style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minHeight: '72px'
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <RiBox3Line size={20} color="#334155" />
                    </div>
                    <Text style={{
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em'
                    }}>
                        {COMPANY_NAME}
                    </Text>
                </div>

                {/* Menu */}
                <Menu
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    items={menuItems}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '16px 12px',
                        marginBottom: '80px'
                    }}
                    theme="dark"
                    className="custom-sidebar-menu"
                />

                {/* Logout Button */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: '#334155'
                }}>
                    <div
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'background 0.3s',
                            color: 'rgba(255, 255, 255, 0.85)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <RiLogoutBoxLine size={20} />
                        <Text style={{
                            color: 'inherit',
                            fontSize: '15px'
                        }}>
                            Logout
                        </Text>
                    </div>
                </div>

                {/* Enhanced Custom CSS - BEST OF BOTH WORLDS */}
                <style>{`
                    /* Main Menu Items */
                    .custom-sidebar-menu .ant-menu-item {
                        border-radius: 8px !important;
                        margin: 4px 0 !important;
                        height: 44px !important;
                        line-height: 44px !important;
                        padding-left: 16px !important;
                        transition: all 0.3s ease !important;
                    }
                    
                    /* Submenu Title */
                    .custom-sidebar-menu .ant-menu-submenu-title {
                        border-radius: 8px !important;
                        margin: 4px 0 !important;
                        height: 44px !important;
                        line-height: 44px !important;
                        padding-left: 16px !important;
                        transition: all 0.3s ease !important;
                    }
                    
                    /* Selected Menu Item */
                    .custom-sidebar-menu .ant-menu-item-selected {
                        background: #3B82F6 !important;
                        color: white !important;
                    }
                    
                    /* Menu Item Hover */
                    .custom-sidebar-menu .ant-menu-item:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: white !important;
                    }
                    
                    /* Submenu Title Hover */
                    .custom-sidebar-menu .ant-menu-submenu-title:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: white !important;
                    }
                    
                    /* Base submenu container - allows collapse animation */
                    .custom-sidebar-menu .ant-menu-sub.ant-menu-inline {
                        background: rgba(0, 0, 0, 0.3) !important;
                        border-radius: 8px !important;
                        padding: 8px 0 !important;
                        overflow: hidden !important;
                        /* Don't set display here - let Ant Design control it */
                    }
                    
                    .custom-sidebar-menu .ant-menu-submenu-open > .ant-menu-sub.ant-menu-inline:not([style*="height"]) {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    
                    /* Submenu Items - adjusted for centered layout */
                    .custom-sidebar-menu .ant-menu-sub .ant-menu-item {
                        padding-left: 48px !important;
                        height: 40px !important;
                        line-height: 40px !important;
                        margin: 2px 8px !important;
                        border-radius: 6px !important;
                        width: calc(100% - 16px) !important;
                    }
                    
                    /* Selected Submenu Item */
                    .custom-sidebar-menu .ant-menu-sub .ant-menu-item-selected {
                        background: #3B82F6 !important;
                        color: white !important;
                    }
                    
                    /* Submenu Item Hover */
                    .custom-sidebar-menu .ant-menu-sub .ant-menu-item:hover {
                        background: rgba(255, 255, 255, 0.15) !important;
                        color: white !important;
                    }
                    
                    /* Remove default Ant Design submenu padding */
                    .custom-sidebar-menu.ant-menu-inline .ant-menu-sub.ant-menu-inline {
                        padding-inline-start: 0 !important;
                    }
                    
                    /* Submenu Arrow Icon */
                    .custom-sidebar-menu .ant-menu-submenu-arrow {
                        color: rgba(255, 255, 255, 0.65) !important;
                        transition: transform 0.3s ease !important;
                    }
                    
                    /* Open Submenu Arrow Rotation */
                    .custom-sidebar-menu .ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-submenu-arrow {
                        transform: rotate(180deg) !important;
                    }
                    
                    /* Submenu Title when Open */
                    .custom-sidebar-menu .ant-menu-submenu-open > .ant-menu-submenu-title {
                        background: rgba(255, 255, 255, 0.05) !important;
                        color: white !important;
                    }
                    
                    /* Menu Item Icon */
                    .custom-sidebar-menu .ant-menu-item-icon {
                        font-size: 20px !important;
                        color: inherit !important;
                    }
                    
                    /* Submenu Title Icon */
                    .custom-sidebar-menu .ant-menu-submenu-title .ant-menu-item-icon {
                        font-size: 20px !important;
                        color: inherit !important;
                    }
                    
                    /* Remove default borders */
                    .custom-sidebar-menu.ant-menu-inline,
                    .custom-sidebar-menu.ant-menu-inline .ant-menu-item,
                    .custom-sidebar-menu.ant-menu-inline .ant-menu-submenu-title {
                        border: none !important;
                    }
                    
                    /* Smooth transitions for all menu interactions */
                    .custom-sidebar-menu * {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    }
                `}</style>
            </Sider>

            {/* Main Layout */}
            <Layout style={{ marginLeft: 260 }}>
                {/* Header */}
                <Header style={{
                    background: 'white',
                    padding: '0 32px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    height: '72px'
                }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Notifications */}
                        <Badge count={5} size="small">
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    background: '#F3F4F6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#E5E7EB'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#F3F4F6'}
                            >
                                <span style={{ fontSize: '20px' }}>🔔</span>
                            </div>
                        </Badge>

                        {/* User Avatar */}
                        <Avatar
                            size={44}
                            style={{
                                background: '#F59E0B',
                                cursor: 'pointer',
                                fontSize: '18px',
                                fontWeight: 600
                            }}
                        >
                            {userInfo?.name?.charAt(0).toUpperCase() ||
                                userInfo?.email?.charAt(0).toUpperCase() ||
                                'U'}
                        </Avatar>
                    </div>
                </Header>

                {/* Content */}
                <Content style={{
                    padding: '32px',
                    background: '#F9FAFB',
                    minHeight: 'calc(100vh - 72px)'
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default PageContainer;