import { makeAutoObservable } from "mobx";
import { getAllSize, addSize, deleteSize, updateSize } from "../api/sizeApi";

export interface SizeType {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

class SizeStore {
  listSizeData: SizeType[] = [];
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;
  selectedSize: SizeType | null = null;

  constructor() {
    makeAutoObservable(this);
  }



  // Mở và đóng modal
  openModalAdd = () => (this.isModalAdd = true);
  closeModalAdd = () => (this.isModalAdd = false);
  openModalUpdate = () => (this.isModalUpdate = true);
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedSize = null;
  };

  // Lấy danh sách kích thước
  fetchSizeData = async () => {
    try {
      const response = await getAllSize();
      this.listSizeData = response.content; // Giả định API trả về { content: [...] }
    } catch (error) {
      console.error("Error fetching size data:", error);
    }
  };

  // Thêm mới kích thước
  addSizeStore = async (sizeData: { name: string }) => {
    try {
      const newSize = await addSize(sizeData);
      this.listSizeData.unshift(newSize);
    } catch (error) {
      console.error("Error adding size:", error);
    }
  };

  // Xóa kích thước
  deleteSizeById = async (id: number) => {
    try {
      await deleteSize(id);
      this.listSizeData = this.listSizeData.filter((size) => size.id !== id);
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  // Cập nhật kích thước
  updateSizeStore = async (id: number, updatedData: { name: string }) => {
    try {
      const updatedSize = await updateSize(id, updatedData);
      this.listSizeData = this.listSizeData.map((size) =>
        size.id === id ? { ...size, ...updatedSize } : size
      );
    } catch (error) {
      console.error("Error updating size:", error);
    }
  };

  // Chọn kích thước để cập nhật
  handleUpdateLoadData = (size: SizeType) => {
    this.selectedSize = size;
    this.openModalUpdate();
  };

  getDisplaySizeNameById = (id: number): string => {
    const displaySize = this.listSizeData.find((item) => item.id === id);
    return displaySize ? displaySize.name : "Không xác định";
  };
}

export const sizeStore = new SizeStore();
