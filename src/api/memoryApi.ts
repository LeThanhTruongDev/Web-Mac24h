import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:8080/api/v1/memory";

// Lấy danh sách Memory
export const getAllMemory = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // API trả về dữ liệu trong content
  } catch (error) {
    console.error("Error fetching Memory data:", error);
    message.error("Lỗi khi lấy danh sách bộ nhớ!");
    throw error;
  }
};

// Thêm mới Memory
export const addMemory = async (data: { name: string }) => {
  try {
    const response = await axios.post(BASE_URL, data);
    message.success("Thêm bộ nhớ thành công!");
    return response.data;
  } catch (error) {
    console.error("Error adding Memory:", error);
    message.error("Lỗi khi thêm bộ nhớ!");
    throw error;
  }
};

// Xóa Memory
export const deleteMemory = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    message.success("Xóa bộ nhớ thành công!");
  } catch (error) {
    console.error("Error deleting Memory:", error);
    message.error("Lỗi khi xóa bộ nhớ!");
    throw error;
  }
};

// Cập nhật Memory
export const updateMemory = async (id: number, data: { name: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    message.success("Cập nhật bộ nhớ thành công!");
    return response.data;
  } catch (error) {
    console.error("Error updating Memory:", error);
    message.error("Lỗi khi cập nhật bộ nhớ!");
    throw error;
  }
};
