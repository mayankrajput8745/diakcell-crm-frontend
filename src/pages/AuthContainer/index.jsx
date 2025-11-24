import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const AuthContainer = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Outlet />
        </Layout>
    );
};

export default AuthContainer;