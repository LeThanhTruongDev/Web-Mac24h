import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ramStore } from "../../../../stores/RamStore";
import ModalAdd from "./ModalRam/ModalAdd";
import ModalUpdate from "./ModalRam/ModalUpdate";

interface RamType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean | null;
}

const RamManager = () => {
  const columns: TableProps<RamType>["columns"] = [
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
      render: (_: string, record: RamType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => ramStore.handleUpdateLoadData(record)}
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
    ramStore.deleteRamById(id);
  };

  useEffect(() => {
    ramStore.fetchRamData();
  }, []);

  const data: RamType[] = Array.isArray(ramStore.listRamData)
    ? ramStore.listRamData.map((ram) => ({
        key: ram.id.toString(),
        id: ram.id,
        name: ram.name,
        createdAt: ram.createdAt,
        updatedAt: ram.updatedAt,
        isDeleted: ram.isDeleted,
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
        QUẢN LÍ RAM
      </h3>
      <Button
        onClick={ramStore.openModalAdd}
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
        Thêm mới RAM
      </Button>
      <Table<RamType> columns={columns} dataSource={data} />
      <ModalAdd /> {/* Modal để thêm RAM */}
      <ModalUpdate /> {/* Modal để cập nhật RAM */}
    </>
  );
};

export default observer(RamManager);
