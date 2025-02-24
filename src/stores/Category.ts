/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { getAllCategory, addCategory, deleteCategory, updateCategory, getAllCategoryApi } from "../api/categoryApi";

// Định nghĩa kiểu dữ liệu cho Category
export interface Category {
  id: number;
  name: string;
  parentId?: number; // Tham chiếu đến danh mục cha (nếu có)
  createdAt: number;
  updatedAt: number;
}

class CategoryStore {
  categoryList: Category[] = [];
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;
  selectedCategory: Category | null = null;

  categoryListApple:Category[] = []

  constructor() {
    makeAutoObservable(this);
  }

  // Mở và đóng Modal
  openModalAdd = () => (this.isModalAdd = true);
  closeModalAdd = () => (this.isModalAdd = false);
  
  openModalUpdate = () => (this.isModalUpdate = true);
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedCategory = null;
  };

  setCategoryListApple = (value:any) => {
    this.categoryListApple = value
  }

  // Lấy danh sách Category
  fetchCategoryData = async () => {
    try {
      const res = await getAllCategoryApi();
      this.categoryList = res.content; // Lấy dữ liệu từ key 'content'
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  fetchCategoryDataApple = async () => {
    try {
      const res = await getAllCategory({
        supplier: 'apple'
      });
       this.setCategoryListApple(res.content)
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };


  // Thêm Category
  addCategoryStore = async (data: { name: string; parentId?: number }) => {
    try {
      const newCategory = await addCategory(data);
      this.categoryList.unshift(newCategory); // Thêm mới vào đầu danh sách
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Xóa Category
  deleteCategoryById = async (id: number) => {
    try {
      await deleteCategory(id);
      this.fetchCategoryData(); // Gọi lại fetch để cập nhật danh sách
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Cập nhật Category
  updateCategoryStore = async (id: number, data: { name: string; parentId?: number }) => {
    try {
      const updatedCategory = await updateCategory(id, data);
      this.categoryList = this.categoryList.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Chọn Category để cập nhật
  handleUpdateLoadData = (category: Category) => {
    this.selectedCategory = category;
    this.openModalUpdate();
  };
}

// Tạo instance của CategoryStore và export
export const categoryStore = new CategoryStore();
