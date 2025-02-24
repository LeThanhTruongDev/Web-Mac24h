import { message } from "antd";
import axios from "axios";
import { AddProductData } from "../types/product";

interface paramsFilter {
    page: number,
    size: number,
    code: string,
    name: string
    categoryId: number
}


// API gọi để lấy danh sách sản phẩm
export const getAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/product");
        console.log(response.data);
        return response.data;  // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;  // Ném lại lỗi nếu có
    }
}

// API Thêm sản phẩm mới
export const addProduct = async (productData: AddProductData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/product', productData);
      return response.data; // Đảm bảo trả về dữ liệu từ API
    } catch (error) {
      console.error('Error in addProduct API:', error);
      throw error;
    }
  };

// API Delete
export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/v1/product/${id}`);
        message.info('Product deleted successfully');
    } catch (error) {
        console.error("Error deleting product:", error);
        message.info('Error deleting product: ' + error);
    }
};

// API Update
export const updateProduct = async (id: number, productData: { 
    name?: string; 
    description?: string; 
    price?: number; 
    stock?: number 
}) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/product/${id}`, productData);
        console.log('Product updated successfully:', response.data);
        message.success('Product updated successfully');
        return response.data;  // Trả về dữ liệu sản phẩm sau khi cập nhật
    } catch (error) {
        console.error("Error updating product:", error);
        message.error('Error updating product: ' + error);
        throw error;  // Ném lại lỗi nếu có
    }
};


export const fetchProductById = async (id : number) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/product/${id}`)
        return res.data
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

export const filterProduct = async (param: paramsFilter ) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/product` , {
            params:param
        })
        return res.data
    } catch (error) {
        Promise.reject(error)
    }
}
