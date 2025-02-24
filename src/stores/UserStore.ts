import { makeAutoObservable } from 'mobx';
import { UserType } from '../types/user';
import { addUser, deleteUser, getAllUser, updateUser } from '../api/userApi';

export class UserStore {
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;  // Thêm modal cho việc cập nhật
  listUserData: UserType[] = [];
  selectedUser: UserType | null = null;  // Khai báo selectedUser để lưu người dùng đang được chọn

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
    this.selectedUser = null;  // Đặt lại selectedUser khi đóng modal
  };

  // Thêm người dùng mới
  addUserStore = async (userData: {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    address: string;
  }) => {
    try {
      const newUser = await addUser(userData);
      this.listUserData.unshift(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Lấy danh sách người dùng
  fetchUserData = async () => {
    try {
      const res = await getAllUser();
      this.listUserData = res.content;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Xóa người dùng theo ID
  deleleUserById = async (id: number) => {
    try {
      deleteUser(id);
      this.listUserData = this.listUserData.filter((user) => user.id !== id);
    } catch (error) {
      console.log(error);
    }
  };

  // Cập nhật thông tin người dùng
  updateUserStore = async (
    id: number,
    updatedData: {
      username?: string;
      password?: string;
      fullName?: string;
      phoneNumber?: string;
      address?: string;
    }
  ) => {
    try {
      const updatedUser = await updateUser(id, updatedData);

      // Cập nhật user trong listUserData
      this.listUserData = this.listUserData.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      );

      console.log('User updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Chọn người dùng để sửa
  handelUpdateLoadData = (user: UserType) => {
    this.isModalUpdate = true;
    this.selectedUser = user;  // Lưu thông tin người dùng
       // Mở modal cập nhật
  };
}

export const userStore = new UserStore();
