export interface ColorType {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean | null; // Đảm bảo isDeleted tồn tại và kiểu dữ liệu đúng
}
