import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { colorStore } from "../../../../stores/ColorStore";
import ModalAdd from "./components/ModalAdd";
import ModalUpdate from "./components/ModalUpdate";


// Định nghĩa kiểu dữ liệu cho Color
interface ColorType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

const ColorManager = () => {
  // Cột cho Table
  const columns: TableProps<ColorType>["columns"] = [
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
      render: (_: string, record: ColorType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => colorStore.handleUpdateLoadData(record)}
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

  // Xử lý xóa màu sắc
  const handleDelete = (id: number) => {
    colorStore.deleteColorById(id);
  };

  // Lấy danh sách màu sắc khi component render
  useEffect(() => {
    colorStore.fetchColorData();
  }, []);

  // Chuẩn bị data cho Table
  const data: ColorType[] = Array.isArray(colorStore.listColorData)
    ? colorStore.listColorData.map((color) => ({
        key: color.id.toString(),
        id: color.id,
        name: color.name,
        createdAt: color.createdAt,
        updatedAt: color.updatedAt,
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
        QUẢN LÝ MÀU SẮC
      </h3>
      <Button
        onClick={() => {
          colorStore.openModalAdd();
          console.log("isModalAdd:", colorStore.isModalAdd); // Log trạng thái mở modal
        }}
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
        Thêm mới màu sắc
      </Button>
      <Table<ColorType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <ModalAdd /> {/* Modal để thêm mới màu sắc */}
      <ModalUpdate /> {/* Modal để cập nhật màu sắc */}
    </>
  );
};

export default observer(ColorManager);
