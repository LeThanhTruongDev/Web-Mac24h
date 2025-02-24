import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { memoryStore } from "../../../../stores/MemoryStore";
import ModalAdd from "./components/ModalAdd";
import ModalUpdate from "./components/ModalUpdate";

interface MemoryType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

const MemoryManager = () => {
  const columns: TableProps<MemoryType>["columns"] = [
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
      render: (_: string, record: MemoryType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => memoryStore.handleUpdateLoadData(record)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#38B2AC",
              color: "#ffffff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#319795";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#38B2AC";
              e.currentTarget.style.transform = "scale(1)";
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
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C53030";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#E53E3E";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    memoryStore.deleteMemoryById(id);
  };

  useEffect(() => {
    memoryStore.fetchMemoryData();
  }, []);

  const data: MemoryType[] = Array.isArray(memoryStore.listMemoryData)
    ? memoryStore.listMemoryData.map((memory) => ({
        key: memory.id.toString(),
        id: memory.id,
        name: memory.name,
        createdAt: memory.createdAt,
        updatedAt: memory.updatedAt,
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
        QUẢN LÝ BỘ NHỚ
      </h3>
      <Button
        onClick={memoryStore.openModalAdd}
        style={{
          padding: "10px 20px",
          backgroundColor: "#38B2AC",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          margin: "20px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#319795";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#38B2AC";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Thêm mới bộ nhớ
      </Button>
      <Table<MemoryType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <ModalAdd /> {/* Modal để thêm bộ nhớ */}
      <ModalUpdate /> {/* Modal để cập nhật bộ nhớ */}
    </>
  );
};

export default observer(MemoryManager);
