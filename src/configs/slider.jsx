import { 
    RiDashboardLine,
    RiBox3Line,
    RiStore2Line,
    RiStackLine,
    RiShoppingCartLine,
    RiNotificationLine
} from "@remixicon/react";

export const ROUTE_PATH = Object.freeze({
    // ----------------- AUTH ROUTES -----------------
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REQUEST_ACCESS: "/auth/request-access", 

    // ----------------- APP ROUTES ----------------
    DASHBOARD: "/",
    PRODUCTS: "/products",
    WAREHOUSE: "/warehouse",
    INVENTORY: "/inventory",
    ORDERS: "/orders",
    ALERTS: "/alerts",
});

export const APP_PAGES = Object.freeze({
    LOGIN: "Login",
    FORGOT_PASSWORD: "Forgot Password",
    RESET_PASSWORD: "Reset Password",
    DASHBOARD: "Dashboard",
    PRODUCTS: "Products",
    WAREHOUSE: "Warehouse",
    INVENTORY: "Inventory",
    ORDERS: "Orders",
    ALERTS: "Alerts",
});

export const SLIDER_LIST = [
    {
        key: "dashboard",
        label: APP_PAGES.DASHBOARD,
        routepath: ROUTE_PATH.DASHBOARD,
        icon: <RiDashboardLine size={20} />
    },
    {
        key: "products",
        label: APP_PAGES.PRODUCTS,
        routepath: ROUTE_PATH.PRODUCTS,
        icon: <RiBox3Line size={20} />
    },
    {
        key: "warehouse",
        label: APP_PAGES.WAREHOUSE,
        routepath: ROUTE_PATH.WAREHOUSE,
        icon: <RiStore2Line size={20} />
    },
    {
        key: "inventory",
        label: APP_PAGES.INVENTORY,
        routepath: ROUTE_PATH.INVENTORY,
        icon: <RiStackLine size={20} />
    },
    {
        key: "orders",
        label: APP_PAGES.ORDERS,
        routepath: ROUTE_PATH.ORDERS,
        icon: <RiShoppingCartLine size={20} />,
    },
    {
        key: "alerts",
        label: APP_PAGES.ALERTS,
        routepath: ROUTE_PATH.ALERTS,
        icon: <RiNotificationLine size={20} />
    }
];