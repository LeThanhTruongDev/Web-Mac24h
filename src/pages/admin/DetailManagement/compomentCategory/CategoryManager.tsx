import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { categoryStore } from "../../../../stores/Category";
import ModalAdd from "./components/ModalAdd";
import ModalUpdate from "./components/ModalUpdate";






// Định nghĩa kiểu dữ liệu cho Category
interface CategoryType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

const CategoryManager = () => {
  // Cột cho Table
  const columns: TableProps<CategoryType>["columns"] = [
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
      render: (_: string, record: CategoryType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => categoryStore.handleUpdateLoadData(record)}
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

  // Xử lý xóa danh mục
  const handleDelete = (id: number) => {
    categoryStore.deleteCategoryById(id);
  };

  // Lấy danh sách danh mục khi component render
  useEffect(() => {
    categoryStore.fetchCategoryData();
  }, []);

  // Chuẩn bị data cho Table
  const data: CategoryType[] = Array.isArray(categoryStore.categoryList)
    ? categoryStore.categoryList.map((category) => ({
        key: category.id.toString(),
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
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
        QUẢN LÝ DANH MỤC
      </h3>
      <Button
        onClick={() => {
          categoryStore.openModalAdd();
          console.log("isModalAdd:", categoryStore.isModalAdd); // Log trạng thái mở modal
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
        Thêm mới danh mục
      </Button>
      <Table<CategoryType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <ModalAdd /> {/* Modal để thêm mới danh mục */}
      <ModalUpdate /> {/* Modal để cập nhật danh mục */}
    </>
  );
};

export default observer(CategoryManager);
