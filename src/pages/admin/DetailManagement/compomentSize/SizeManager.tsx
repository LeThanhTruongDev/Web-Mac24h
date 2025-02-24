import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { sizeStore } from "../../../../stores/SizeStore";
import ModalAdd from "./components/ModalAdd";
import ModalUpdate from "./components/ModalUpdate";

interface SizeType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

const SizeManager = () => {
  const columns: TableProps<SizeType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "UPDATED AT",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => new Date(updatedAt).toLocaleString(),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: string, record: SizeType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => sizeStore.handleUpdateLoadData(record)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#38B2AC",
              color: "#ffffff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#E53E3E",
              color: "#ffffff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    sizeStore.deleteSizeById(id);
  };

  useEffect(() => {
    sizeStore.fetchSizeData();
  }, []);

  const data: SizeType[] = Array.isArray(sizeStore.listSizeData)
    ? sizeStore.listSizeData.map((size) => ({
        key: size.id.toString(),
        id: size.id,
        name: size.name,
        createdAt: size.createdAt,
        updatedAt: size.updatedAt,
      }))
    : [];

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          color: "#38B2AC",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "20px 0",
        }}
      >
        QUẢN LÍ KÍCH THƯỚC
      </h3>
      <Button
        onClick={sizeStore.openModalAdd}
        style={{
          padding: "10px 20px",
          backgroundColor: "#38B2AC",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          margin: "20px",
        }}
      >
        Thêm mới kích thước
      </Button>
      <Table<SizeType> columns={columns} dataSource={data} />
      <ModalAdd /> {/* Modal để thêm kích thước */}
      <ModalUpdate /> {/* Modal để cập nhật kích thước */}
    </>
  );
};

export default observer(SizeManager);
