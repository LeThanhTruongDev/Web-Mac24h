import { message } from "antd";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/ram";

// API gọi để lấy danh sách RAM
export const getAllRam = async () => {
    try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error fetching RAM data:", error);
        message.error("Không thể lấy danh sách RAM. Vui lòng thử lại!");
        throw error; // Ném lại lỗi nếu có
    }
};

// API gọi để thêm mới RAM
export const addRam = async (ramData: { name: string }) => {
    try {
        const response = await axios.post(BASE_URL, ramData);
        message.success("Thêm mới RAM thành công!");
        return response.data; // Trả về dữ liệu RAM vừa thêm
    } catch (error) {
        console.error("Error adding RAM:", error);
        message.error("Không thể thêm mới RAM. Vui lòng thử lại!");
        throw error; // Ném lại lỗi nếu có
    }
};

// API gọi để xóa RAM theo ID
export const deleteRam = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        message.success("Xóa RAM thành công!");
    } catch (error) {
        console.error("Error deleting RAM:", error);
        message.error("Không thể xóa RAM. Vui lòng thử lại!");
        throw error; // Ném lại lỗi nếu có
    }
};

// API gọi để cập nhật RAM theo ID
export const updateRam = async (
    id: number,
    updatedData: Partial<{ name: string; createdAt: number; updatedAt: number }>
) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        message.success("Cập nhật RAM thành công!");
        return response.data; // Trả về dữ liệu RAM đã cập nhật
    } catch (error) {
        console.error("Error updating RAM:", error);
        message.error("Không thể cập nhật RAM. Vui lòng thử lại!");
        throw error; // Ném lại lỗi nếu có
    }
};

