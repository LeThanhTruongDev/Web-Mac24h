import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:8080/api/v1/category";

interface ParamFilterCategory {
    supplier:string
}

// API để lấy danh sách danh mục
export const getAllCategory = async (param:ParamFilterCategory) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=0&size=1000` , {
      params:param
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching category data:", error);
    message.error("Lỗi khi lấy danh sách danh mục!");
    throw error;
  }
};


export const getAllCategoryApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?page=0&size=1000`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching category data:", error);
    message.error("Lỗi khi lấy danh sách danh mục!");
    throw error;
  }
};


// API để thêm mới danh mục
export const addCategory = async (data: { name: string; parentId?: number }) => {
  try {
    const response = await axios.post(BASE_URL, data);
    message.success("Thêm danh mục thành công!");
    return response.data; // Trả về dữ liệu danh mục mới
  } catch (error) {
    console.error("Error adding category:", error);
    message.error("Lỗi khi thêm danh mục!");
    throw error;
  }
};

// API để xóa danh mục theo ID
export const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    message.success("Xóa danh mục thành công!");
  } catch (error) {
    console.error("Error deleting category:", error);
    message.error("Lỗi khi xóa danh mục!");
    throw error;
  }
};

// API để cập nhật thông tin danh mục theo ID
export const updateCategory = async (
  id: number,
  data: { name: string; parentId?: number }
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    message.success("Cập nhật danh mục thành công!");
    return response.data; // Trả về dữ liệu danh mục đã cập nhật
  } catch (error) {
    console.error("Error updating category:", error);
    message.error("Lỗi khi cập nhật danh mục!");
    throw error;
  }
};
