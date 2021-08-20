import { Table, Input, Button} from "antd";

import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AccountStatus, Role } from "../../interfaces/account.interface";


const data = [
  {
    id: 0,
    username: "vunl",
    email: "vunl@example.com",
    password: "123456789",
    dob: new Date("19-11-2000"),
    status: "Activated",
    role: "Admin",
  },
  {
    id: 1,
    username: "hant",
    email: "hant@example.com",
    password: "123456789",
    dob: new Date("19-11-2000"),
    status: "Activated",
    role: "User",
  },
  {
    id: 2,
    username: "hoad",
    email: "hoad@example.com",
    password: "123456789",
    dob: new Date("19-11-2000"),
    status: "Deactivated",
    role: "Admin",
  },
  {
    id: 3,
    username: "ame",
    email: "ame@example.com",
    password: "123456789",
    dob: new Date("19-11-2000"),
    status: "Deactivated",
    role: "User",
  },
];

export default function UserTable() {
  function handleChange(pagination: any, filters: any, sorter: any) {
  }

  const handleSearch = (
    selectedKeys: any,
    confirmation: any,
    dataIndex: any
  ) => {
    confirmation();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  function getColumnSearchProps(dataIndex: string): any {
    return {
      filterDropdown: function filterDrop(request: {
        setSelectedKeys: any;
        selectedKeys: any;
        confirm: any;
        clearFilters: any;
      }) {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={request.selectedKeys[0]}
              onChange={(e) => {
                request.setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() =>
                handleSearch(request.selectedKeys, request.confirm, dataIndex)
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() =>
                handleSearch(request.selectedKeys, request.confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(request.clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: function fil(filtered: any) {
        return (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );
      },
      onFilter: (value: any, record: any) => {
        const isMatch = record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
        return isMatch;
      },
    };
  }

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
      
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        filters: [
          { text: `${Role.USER}`, value: `${Role.USER}` },
          { text: `${Role.ADMIN}`, value: `${Role.ADMIN}` },
        ],
        onFilter: (value: string, record: any) => record.role.includes(value),
      },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: `${AccountStatus.ACTIVATED}`, value: `${AccountStatus.ACTIVATED}` },
        { text: `${AccountStatus.DEACTIVATED}`, value: `${AccountStatus.DEACTIVATED}` },
      ],
      onFilter: (value: string, record: any) => record.status.includes(value),
    },
    {
      title: "Options",
      key: "key",
      dataIndex: "key",
      render: function displayBtn(text: any, record: any) {
        return (
          <>
            <Button icon={<EditOutlined />} />
            <Button danger icon={<DeleteOutlined />} />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      pagination={{
        defaultPageSize: 2,
        showSizeChanger: true,
        pageSizeOptions: ["2", "10", "30"],
      }}
    />
  );
}