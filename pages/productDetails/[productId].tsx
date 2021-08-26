import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { getProduct } from "../../services/product.service";
import { Layout, Menu, PageHeader } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import globalStyle from "../../styles/global.module.css";
import { signOut } from "next-auth/client";
import ProductCard from "../../components/product-card/product-card.component";
import TransactionForm from "../../components/transaction-form/transaction-form.component";
import { IProduct } from "../../interfaces/product.interface";
import ProductChart from "../../components/chart/product-chart.component";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function ProductDetails() {
  const router = useRouter();

  const { productId } = router.query;

  const [currentProduct, setCurrentProduct] = useState({
    _id: 0,
    imgUrl: "",
    title: "",
    quantity: 0,
    price: 0,
    description: "",
    status: "",
    transaction: new Array<any>()
  });

  const [collapsed, setCollapsed] = useState(true);

  const [closeTransForm, setCloseTransForm] = useState(true)

  useEffect(() => {
    let mount = true;

    getProduct(productId).then((product: any) => {
      console.log(product)
      if(product){
        setCurrentProduct(product);
      } else {
        setCurrentProduct((oldProduct: any) => { oldProduct._id = -1; return JSON.parse(JSON.stringify(oldProduct))})
      }

      
    });

    return () => {
      mount = false;
    };
  }, [productId]);

  function handleOpenTransaction() {
    setCloseTransForm(false)
  }

  function handleCloseTransaction() {
    setCloseTransForm(true)
  }

  function handleFinishTransaction(product: IProduct) {
    setCurrentProduct(product)
    setCloseTransForm(true)
  }

  const onCollapse = (collapse: boolean) => {
    setCollapsed((oldState: any) => !oldState);
  };

  const navToHome = () => {
    router.replace("../homepage");
  };

  const navToDashboard = () => {
    router.replace("../product-dashboard");
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
        <PageHeader className="site-page-header" title="Product Details" />
        <Content style={{ margin: "0 16px" }}>
            {(currentProduct._id == 0) && 
                <h1>Loading...</h1>
            }
            {(currentProduct._id == -1) &&
                <h1>No such product!</h1>
            }
            {(currentProduct._id != 0 && currentProduct._id != -1) &&
              <ProductCard product={currentProduct} onCreateTransaction={handleOpenTransaction}/>
            }
            {!closeTransForm && (
                <div className={globalStyle.formContainer}>
                  <TransactionForm
                    title="Edit"
                    product={currentProduct}
                    onFinish={handleFinishTransaction}
                    onCancel={handleCloseTransaction}
                  />
                </div>
            )}
            {currentProduct.transaction.length > 0 && 
              <ProductChart transaction={currentProduct.transaction}/>
            }
        
        
        </Content>
        <Footer style={{ textAlign: "center" }}>@NextShop.me</Footer>
      </Layout>
    </Layout>
  );
}
