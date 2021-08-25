import { getSession, signOut } from "next-auth/client";

import { Layout, Menu, Breadcrumb, Button, PageHeader } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import globalStyle from "../../styles/global.module.css";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import guardRoute from "../services/guard.service";
import { Role } from "../interfaces/account.interface";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function UserHomepage() {
  // useSessionCustom(true, Role.ADMIN)

  const [collapsed, setCollapsed] = useState(true);

  const router = useRouter();

  const onCollapse = (collapse: boolean) => {
    setCollapsed((oldState: any) => !oldState);
  };

  const navToHome = () => {
    router.replace("homepage");
  };

  const navToDashboard = () => {
    router.replace("product-dashboard");
  };

  const logout = async () => {
    await signOut();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh", position: "relative" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={navToHome}>
              Home
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<DesktopOutlined />}
              onClick={navToDashboard}
            >
              User Dashboard
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <PageHeader className="site-page-header" title="User Homepage" />
          <Content style={{ margin: "0 16px" }}>
            <h1>Welcome User!</h1>
          </Content>
          <Footer style={{ textAlign: "center" }}>@NextShop.me</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
    return await guardRoute(context, Role.USER, "/")
}