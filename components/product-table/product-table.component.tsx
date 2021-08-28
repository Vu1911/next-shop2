import { Table, Input, Button} from "antd";

import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProductStatus } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import { deleteProduct } from "../../services/product.service";
import { useRouter } from "next/dist/client/router";


export default function ProductTable(props: any) {

  const router = useRouter()

  const [data, setData] = useState(props.accounts)

  useEffect(() => {
    const clone  = JSON.parse(JSON.stringify(props.products))
    clone.forEach((element: any) => {
      if(typeof (element.price) == 'number')
      element.price = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(element.price);
    })
    setData(clone)
    return () => {
    
    }
  }, [props.products])

  async function handleDelete(this: any) {
    
    const result = await deleteProduct(this._id);
    console.log(result);

    if (result.status == 200) {
      props.onDelete(this)
    }
  }

  function handleView (this: any) {
    router.replace(`/productDetails/${this._id}`)
  }

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
            <Button icon={<EyeOutlined />} onClick={handleView.bind(record)}/>
            <Button icon={<EditOutlined />} onClick={props.onEdit.bind(record)}/>
            <Button danger icon={<DeleteOutlined />}  onClick={handleDelete.bind(record)}/>
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
