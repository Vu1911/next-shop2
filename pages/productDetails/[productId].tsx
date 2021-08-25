import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { getProduct } from "../../services/product.service";
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
import { signOut } from "next-auth/client";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function ProductDetails() {
  const router = useRouter();

  const { productId } = router.query;

  const [currentProduct, setCurrentProduct] = useState({imgUrl: ""});

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    let mount = true;

    getProduct(productId).then((product: any) => {
      if(product){
        setCurrentProduct(product);
      }

      
    });

    return () => {
      mount = false;
    };
  }, [productId]);

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

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={navToHome}>
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<DesktopOutlined />}
            onClick={navToDashboard}
          >
            Product Dashboard
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader className="site-page-header" title="Product Dashboard" />
        <Content style={{ margin: "0 16px" }}>
            {
                (currentProduct != {imgUrl: ""}) && 
                <img src={currentProduct.imgUrl} alt="product image"/>

            }
        

        </Content>
        <Footer style={{ textAlign: "center" }}>@NextShop.me</Footer>
      </Layout>
    </Layout>
  );
}
