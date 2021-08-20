import { Table, Input, Button} from "antd";

import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProductStatus } from "../../interfaces/product.interface";
import { useState } from "react";


const data = [
  {
    key: 0,
    imgUrl: "imageLink",
    title: "product 0",
    quantity: 1,
    price: 1000000,
    description: "bla",
    status: ProductStatus.OPEN,
    viewNumber: 0,
    buyNumber: 0,
  },
  {
    key: 1,
    imgUrl: "imageLink",
    title: "product 1",
    quantity: 1,
    price: 2000000,
    description: "bla",
    status: ProductStatus.OPEN,
    viewNumber: 0,
    buyNumber: 0,
  },
  {
    key: 2,
    imgUrl: "imageLink",
    title: "product 2",
    quantity: 1,
    price: 3000000,
    description: "bla",
    status: ProductStatus.CLOSE,
    viewNumber: 0,
    buyNumber: 0,
  },
  {
    key: 3,
    imgUrl: "imageLink",
    title: "product 3",
    quantity: 1,
    price: 4000000,
    description: "bla",
    status: ProductStatus.CLOSE,
    viewNumber: 0,
    buyNumber: 0,
  },
];

export default function ProductTable(props: any) {
  const [searchState, setSearchState] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const [filterState, setFilterState] = useState({ status: null });

  function handleChange(pagination: any, filters: any, sorter: any) {
    setFilterState(filters);
  }

  const handleSearch = (
    selectedKeys: any,
    confirmation: any,
    dataIndex: any
  ) => {
    confirmation();
    setSearchState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchState({
      searchText: "",
      searchedColumn: "",
    });
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
      title: "Product name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",

      sorter: (a: any, b: any) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      sorter: (a: any, b: any) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: `${ProductStatus.OPEN}`, value: `${ProductStatus.OPEN}` },
        { text: `${ProductStatus.CLOSE}`, value: `${ProductStatus.CLOSE}` },
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
            <Button icon={<EyeOutlined />} />
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
