/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import axios from "axios";

// API gọi để lấy danh sách người dùng
export const getAllUser = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/user");
        console.log(response.data);
        return response.data;  // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;  // Ném lại lỗi nếu có
    }
}

// API gọi để thêm một người dùng mới
export const addUser = async (userData: any) => {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/user", userData);
        console.log('User added successfully:', response.data);
        return response.data;  // Trả về dữ liệu người dùng mới được thêm
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;  // Ném lại lỗi nếu có
    }
}

interface LoginReq  {
    username:string
    password:string
}

export const login = async (loginReq : LoginReq) => {
    try {
        const res = await axios.post("http://localhost:8080/api/v1/user/login" , loginReq)
        return res.data
    } catch (error) {
        Promise.reject(error)
    }
}

// API Delete
export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
        message.info('User deleted successfully');
    } catch (error) {
        console.error("Error deleting user:", error);
        message.info('User deleted flase' + error);
    }
};

// API Update
export const updateUser = async (id: number, userData: { 
    username?: string; 
    password?: string; 
    fullName?: string; 
    phoneNumber?: string; 
    address?: string 
}) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/user/${id}`, userData);
        console.log('User updated successfully:', response.data);
        message.success('User updated successfully');
        return response.data;  // Trả về dữ liệu người dùng sau khi cập nhật
    } catch (error) {
        console.error("Error updating user:", error);
        message.error('Error updating user: ' + error);
        throw error;  // Ném lại lỗi nếu có
    }
};







