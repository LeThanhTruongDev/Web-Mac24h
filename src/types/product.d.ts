import { Category } from "../stores/Category";

interface DataType {
  key: string;
  id: number;
  name: string;
  code: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  category: Category;
}


export interface AddProductData {
  name: string;
  code: string;
  image_url: string;
  categoryId: number;
}

export interface UpdateProductData {
  name?: string;
  code?: string;
  image_url?: string;
  category_id?: number;
}
