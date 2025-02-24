import { message } from "antd";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/displaysize";

// API gọi để lấy danh sách kích thước
export const getAllSize = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log("Fetched size list successfully:", response.data);
    return response.data; // Trả về danh sách kích thước
  } catch (error) {
    console.error("Error fetching size list:", error);
    message.error("Lỗi khi lấy danh sách kích thước!");
    throw error; // Ném lại lỗi nếu có
  }
};

// API gọi để thêm mới kích thước
export const addSize = async (sizeData: { name: string }) => {
  try {
    const response = await axios.post(BASE_URL, sizeData);
    console.log("Size added successfully:", response.data);
    message.success("Thêm kích thước thành công!");
    return response.data; // Trả về kích thước mới được thêm
  } catch (error) {
    console.error("Error adding size:", error);
    message.error("Lỗi khi thêm kích thước!");
    throw error; // Ném lại lỗi nếu có
  }
};

// API gọi để xóa kích thước theo ID
export const deleteSize = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    console.log("Size deleted successfully");
    message.success("Xóa kích thước thành công!");
  } catch (error) {
    console.error("Error deleting size:", error);
    message.error("Lỗi khi xóa kích thước!");
    throw error; // Ném lại lỗi nếu có
  }
};

// API gọi để cập nhật thông tin kích thước
export const updateSize = async (
  id: number,
  sizeData: { name?: string }
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, sizeData);
    console.log("Size updated successfully:", response.data);
    message.success("Cập nhật kích thước thành công!");
    return response.data; // Trả về kích thước đã cập nhật
  } catch (error) {
    console.error("Error updating size:", error);
    message.error("Lỗi khi cập nhật kích thước!");
    throw error; // Ném lại lỗi nếu có
  }
};
