import { makeAutoObservable } from "mobx";
import { getAllColor, addColor, deleteColor, updateColor } from "../api/colorApi";

// Định nghĩa kiểu dữ liệu cho Color
export interface ColorType {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

class ColorStore {
  listColorData: ColorType[] = [];
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;
  selectedColor: ColorType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Mở và đóng Modal
  openModalAdd = () => (this.isModalAdd = true);
  closeModalAdd = () => (this.isModalAdd = false);
  
  openModalUpdate = () => (this.isModalUpdate = true);
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedColor = null;
  };

  getColorNameById = (id: number): string => {
    const color = this.listColorData.find((item) => item.id === id); // Tìm Color theo ID
    return color ? color.name : "Không xác định"; // Nếu tìm thấy trả về tên, nếu không trả về mặc định
  };
  

  // Lấy danh sách Color
  fetchColorData = async () => {
    try {
      const res = await getAllColor();
      this.listColorData = res.content; // Lấy dữ liệu từ key 'content'
    } catch (error) {
      console.error("Error fetching Color data:", error);
    }
  };

  // Thêm Color
  addColorStore = async (data: { name: string }) => {
    try {
      const newColor = await addColor(data);
      this.listColorData.unshift(newColor); // Thêm mới vào đầu danh sách
    } catch (error) {
      console.error("Error adding Color:", error);
    }
  };

  // Xóa Color
  deleteColorById = async (id: number) => {
    try {
      await deleteColor(id);
      this.fetchColorData(); // Gọi lại fetch để cập nhật danh sách
    } catch (error) {
      console.error("Error deleting Color:", error);
    }
  };

  // Cập nhật Color
  updateColorStore = async (id: number, data: { name: string }) => {
    try {
      const updatedColor = await updateColor(id, data);
      this.listColorData = this.listColorData.map((color) =>
        color.id === id ? { ...color, ...updatedColor } : color
      );
    } catch (error) {
      console.error("Error updating Color:", error);
    }
  };

  // Chọn Color để cập nhật
  handleUpdateLoadData = (color: ColorType) => {
    this.selectedColor = color;
    this.openModalUpdate();
  };
}

// Tạo instance của ColorStore và export
export const colorStore = new ColorStore();
