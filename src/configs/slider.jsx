import { RiReceiptLine } from "@remixicon/react";

export const ROUTE_PATH = Object.freeze({
    // ----------------- AUTH ROUTES -----------------
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",

    // ----------------- APP ROUTES ----------------
    ORDERS: "/",
    MANUAL_ORDER: "/orders/manual"
});

export const APP_PAGES = Object.freeze({
    LOGIN: "login",
    FORGOT_PASSWORD: "Forgot Password",
    RESET_PASSWORD: "Reset Password",
    ORDERS: "Orders",
    MANUAL_ORDER: "Create Manual Order"
});

export const SLIDER_LIST = [{
    type: "group",
    label: "Build",
    key: "build",
    children: [
        {
            key: APP_PAGES.ORDERS,
            label: APP_PAGES.ORDERS,
            routepath: ROUTE_PATH.ORDERS,
            icon: <RiReceiptLine size={16} />,
            children: [

            ]
        }
    ]
}]