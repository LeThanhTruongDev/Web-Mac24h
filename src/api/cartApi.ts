import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/carts'; // Thay URL theo backend

// 🛒 1️⃣ API: Lấy giỏ hàng
export const fetchCart = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.cart; // Giả sử API trả về { cart: [...] }
  } catch (error) {
    console.error('Lỗi khi tải giỏ hàng:', error);
    throw error;
  }
};

export interface CartReq {
  productDetailId: number;
  quantity: number;
  cartId: number;
}

// 🛒 2️⃣ API: Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req: CartReq) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      API_BASE_URL,
      req, // Gửi trực tiếp req thay vì `{ req }`
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
          'Content-Type': 'application/json',
        },
      }
    );

    return {data : response.data , status : response.status};
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    throw error;
  }
};

// 🛒 3️⃣ API: Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cartItemId: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/${cartItemId}`);
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    throw error;
  }
};

// 🛒 4️⃣ API: Cập nhật số lượng sản phẩm
export const updateCartItem = async (cartItemId: number, quantity: number) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${cartItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật giỏ hàng:', error);
    throw error;
  }
};

export const fetchCartByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/carts/${userId}`
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
