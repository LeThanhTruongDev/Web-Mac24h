import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:8080/api/v1/color";

// API để lấy danh sách màu sắc
export const getAllColor = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // API trả về dữ liệu trong content hoặc mảng
  } catch (error) {
    console.error("Error fetching color data:", error);
    message.error("Lỗi khi lấy danh sách màu sắc!");
    throw error;
  }
};

// API để thêm mới màu sắc
export const addColor = async (data: { name: string }) => {
  try {
    const response = await axios.post(BASE_URL, data);
    message.success("Thêm màu sắc thành công!");
    return response.data; // Trả về dữ liệu màu mới
  } catch (error) {
    console.error("Error adding color:", error);
    message.error("Lỗi khi thêm màu sắc!");
    throw error;
  }
};

// API để xóa màu sắc theo ID
export const deleteColor = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    message.success("Xóa màu sắc thành công!");
  } catch (error) {
    console.error("Error deleting color:", error);
    message.error("Lỗi khi xóa màu sắc!");
    throw error;
  }
};

// API để cập nhật thông tin màu sắc theo ID
export const updateColor = async (id: number, data: { name: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    message.success("Cập nhật màu sắc thành công!");
    return response.data; // Trả về dữ liệu màu sắc đã cập nhật
  } catch (error) {
    console.error("Error updating color:", error);
    message.error("Lỗi khi cập nhật màu sắc!");
    throw error;
  }
};
