import { makeAutoObservable } from "mobx";
import { getAllMemory, addMemory, deleteMemory, updateMemory } from "../api/memoryApi";

export interface MemoryType {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

class MemoryStore {
  listMemoryData: MemoryType[] = [];
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;
  selectedMemory: MemoryType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Mở và đóng Modal
  openModalAdd = () => (this.isModalAdd = true);
  closeModalAdd = () => (this.isModalAdd = false);
  openModalUpdate = () => (this.isModalUpdate = true);
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedMemory = null;
  };

  // Lấy danh sách Memory
  fetchMemoryData = async () => {
    try {
      const res = await getAllMemory();
      this.listMemoryData = res.content;
    } catch (error) {
      console.error("Error fetching Memory data:", error);
    }
  };

  getMemoryNameById = (id: number): string => {
    const memory = this.listMemoryData.find((item) => item.id === id);
    return memory ? memory.name : "Không xác định";
  };

  // Thêm Memory
  addMemoryStore = async (data: { name: string }) => {
    try {
      const newMemory = await addMemory(data);
      this.listMemoryData.unshift(newMemory);
    } catch (error) {
      console.error("Error adding Memory:", error);
    }
  };

  // Xóa Memory
  deleteMemoryById = async (id: number) => {
    try {
      await deleteMemory(id);
      this.fetchMemoryData();
    } catch (error) {
      console.error("Error deleting Memory:", error);
    }
  };

  // Cập nhật Memory
  updateMemoryStore = async (id: number, data: { name: string }) => {
    try {
      const updatedMemory = await updateMemory(id, data);
      this.listMemoryData = this.listMemoryData.map((memory) =>
        memory.id === id ? { ...memory, ...updatedMemory } : memory
      );
    } catch (error) {
      console.error("Error updating Memory:", error);
    }
  };

  // Chọn Memory để cập nhật
  handleUpdateLoadData = (memory: MemoryType) => {
    this.selectedMemory = memory;
    this.openModalUpdate();
  };
}

export const memoryStore = new MemoryStore();

  