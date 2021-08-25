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
import globalStyle from "../styles/global.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/dist/client/router";
import { signOut } from "next-auth/client";
import guardRoute from "../services/guard.service";
import { Role } from "../interfaces/account.interface";
import ProductForm from "../components/product-form/product-form.component";
import { getAllProducts } from "../services/product.service";
import ProductTable from "../components/product-table/product-table.component";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function ProductDashboard() {
  const [data, setData] = useState(new Array<any>())

  const [collapsed, setCollapsed] = useState(true);

  const [closeCreateForm, setCloseCreateForm] = useState({data: {}, isClose: true});

  const [closeEditForm, setCloseEditForm] = useState({data: {}, isClose: true});
  
  const router = useRouter()

  useEffect(() => {
    let mount = true
    getAllProducts( "/api/product").then(data => {
      console.log(data)
      setData(data)
    })
    return () => {
      mount = false
    }
  }, [])

  const handleFinishCreate = (product: any) => {
    product["key"] = product._id;
    setData((oldData: any) => oldData.concat(product))
    setCloseCreateForm({data: product, isClose: true});
  };

  const handleOpenCreateForm = () => {
    setCloseCreateForm({data: {}, isClose: false});
  };

  const handleCloseCreate = () => {
    setCloseCreateForm({data: {}, isClose: true});
  };

  const handleFinishEdit = (product: any) => {
    const newData = [...data]
    for(let i = 0; i < newData.length; i++) {
      if (product._id == newData[i]._id){
        newData[i] = product
        break
      }
    }
    setData(newData)
    setCloseEditForm({data: {}, isClose: true});
  };

  const handleDelete = (data: any) => {
    setData((oldData: any) => oldData.filter((item: any) => item._id != data._id))
  }

  function handleOpenEditForm (this: any) {
    console.log(this)
    setCloseEditForm({data: this, isClose: false});
  };

  const handleCloseEdit = () => {
    setCloseEditForm({data: {}, isClose: true});
  };

  const onCollapse = (collapse: boolean) => {
    setCollapsed((oldState: any) => !oldState);
  };

  // const handleDelete = () => {
  //   setOnDelete((oldState: boolean) => !oldState)
  // }

  if (data == []) {
    return <h1>Loading ...</h1>;
  }

  const navToHome = () => {
    router.replace("homepage")
  }

  const navToDashboard = () => {
    router.replace("product-dashboard")
  }

  const logout = async () => {
    await signOut()
  }

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={navToHome}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />} onClick={navToDashboard}>
            Product Dashboard
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader className="site-page-header" title="Product Dashboard" />
        <Content style={{ margin: "0 16px" }} >
          <Button type="primary" onClick={handleOpenCreateForm}>
            Create Product
          </Button>
          {!closeCreateForm.isClose && (
            <div className={globalStyle.formContainer}>
              <ProductForm
                title="Create"
                data={null}
                onFinish={handleFinishCreate}
                onCancel={handleCloseCreate}
              />
            </div>
          )}
          {!closeEditForm.isClose && (
            <div className={globalStyle.formContainer}>
              <ProductForm
                title="Edit"
                data={closeEditForm.data}
                onFinish={handleFinishEdit}
                onCancel={handleCloseEdit}
              />
            </div>
          )}
          <ProductTable products={[...data]} onEdit={handleOpenEditForm} onDelete={handleDelete}/>
        </Content>
        <Footer style={{ textAlign: "center" }}>@NextShop.me</Footer>
      </Layout>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  return await guardRoute(context, Role.USER, "/");
}
