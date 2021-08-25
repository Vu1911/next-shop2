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
import { useEffect, useState } from "react";
import UserForm from "../../components/user-form/user-form.component";
import UserTable from "../../components/user-table/user-table.component";
import { useFetch } from "../../hooks/useAccountApi.hook";
import { IAccount, Role } from "../../interfaces/account.interface";
import { getAllUsers } from "../../services/account.service";
import guardRoute from "../../services/guard.service";
import { useRouter } from "next/dist/client/router";
import { signOut } from "next-auth/client";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function UserDashboard() {
  const [data, setData] = useState(new Array<any>())

  const [collapsed, setCollapsed] = useState(true);

  const [closeCreateForm, setCloseCreateForm] = useState({data: {}, isClose: true});

  const [closeEditForm, setCloseEditForm] = useState({data: {}, isClose: true});
  
  const router = useRouter()

  useEffect(() => {
    let mount = true
    getAllUsers( "/api/auth/account").then(data => {
      console.log(data)
      setData(data)
    })
    return () => {
      mount = false
    }
  }, [])

  const handleFinishCreate = (account: any) => {
    account["key"] = account._id;
    setData((oldData: any) => oldData.concat(account))
    setCloseCreateForm({data: account, isClose: true});
  };

  const handleOpenCreateForm = () => {
    setCloseCreateForm({data: {}, isClose: false});
  };

  const handleCloseCreate = () => {
    setCloseCreateForm({data: {}, isClose: true});
  };

  const handleFinishEdit = (account: any) => {
    const newData = [...data]
    for(let i = 0; i < newData.length; i++) {
      if (account._id == newData[i]._id){
        newData[i] = account
        break
      }
    }
    setData(newData)
    setCloseEditForm({data: {}, isClose: true});
  };

  const handleDelete = (data: any) => {
    setData((oldData: any) => oldData.filter((item: any) => item.username != data.username))
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
    router.replace("user-dashboard")
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
            User Dashboard
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader className="site-page-header" title="User Dashboard" />
        <Content style={{ margin: "0 16px" }} >
          <Button type="primary" onClick={handleOpenCreateForm}>
            Create User
          </Button>
          {!closeCreateForm.isClose && (
            <div className={globalStyle.formContainer}>
              <UserForm
                title="Create"
                data={null}
                onFinish={handleFinishCreate}
                onCancel={handleCloseCreate}
              />
            </div>
          )}
          {!closeEditForm.isClose && (
            <div className={globalStyle.formContainer}>
              <UserForm
                title="Edit"
                data={closeEditForm.data}
                onFinish={handleFinishEdit}
                onCancel={handleCloseEdit}
              />
            </div>
          )}
          <UserTable accounts={[...data]} onEdit={handleOpenEditForm} onDelete={handleDelete}/>
        </Content>
        <Footer style={{ textAlign: "center" }}>@NextShop.me</Footer>
      </Layout>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  return await guardRoute(context, Role.ADMIN, "/admin/signin");
}
