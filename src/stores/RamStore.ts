import { makeAutoObservable } from "mobx";
import { RamType } from "../types/ram";
import { addRam, deleteRam, getAllRam, updateRam } from "../api/RamApi";
import { message } from "antd";

export class RamStore {
  isModalAdd: boolean = false; // Trạng thái mở modal thêm mới
  isModalUpdate: boolean = false; // Trạng thái mở modal cập nhật
  listRamData: RamType[] = []; // Danh sách RAM
  selectedRam: RamType | null = null; // RAM đang được chọn để cập nhật

  constructor() {
    makeAutoObservable(this);
  }

  // Mở modal thêm mới
  openModalAdd = () => {
    this.isModalAdd = true;
  };

  // Đóng modal thêm mới
  closeModalAdd = () => {
    this.isModalAdd = false;
  };

  // Mở modal cập nhật
  openModalUpdate = () => {
    this.isModalUpdate = true;
  };

  // Đóng modal cập nhật
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedRam = null; // Reset RAM được chọn khi đóng modal
  };

  // Lấy danh sách RAM
  fetchRamData = async () => {
    try {
      const res = await getAllRam();
      this.listRamData = res.content; // Giả định API trả về danh sách trong `content`
    } catch (error) {
      console.error("Error fetching RAM data:", error);
    }
  };

  // Thêm RAM mới
  addRamStore = async (ramData: { name: string }) => {
    try {
      const newRam = await addRam(ramData);
      this.listRamData.unshift(newRam); // Thêm RAM mới vào đầu danh sách
    } catch (error) {
      console.error("Error adding RAM:", error);
    }
  };

  // Xóa RAM theo ID
  deleteRamById = async (id: number) => {
    try {
      await deleteRam(id);
      message.success("Xóa RAM thành công!");
      this.fetchRamData(); // Gọi lại fetch để đồng bộ dữ liệu từ server
    } catch (error) {
      console.error("Error deleting RAM:", error);
      message.error("Xóa RAM thất bại! Vui lòng thử lại.");
    }
  };

  getRamNameById = (id: number): string => {
    const ram = this.listRamData.find((item) => item.id === id);
    return ram ? ram.name : "Không xác định";
  };
  

  // Cập nhật thông tin RAM
  updateRamStore = async (id: number, updatedData: { name?: string }) => {
    try {
      const updatedRam = await updateRam(id, updatedData);

      // Cập nhật RAM trong danh sách
      this.listRamData = this.listRamData.map((ram) =>
        ram.id === id ? { ...ram, ...updatedRam } : ram
      );

      console.log("RAM updated successfully:", updatedRam);
    } catch (error) {
      console.error("Error updating RAM:", error);
    }
  };

  // Chọn RAM để sửa
  handleUpdateLoadData = (ram: RamType) => {
    this.isModalUpdate = true;
    this.selectedRam = ram; // Lưu thông tin RAM được chọn
  };
}

export const ramStore = new RamStore();
