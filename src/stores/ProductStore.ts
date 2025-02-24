/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction } from 'mobx';

import { addProduct, deleteProduct, fetchProductById, filterProduct, getAllProducts, updateProduct } from '../api/productApi';
import { AddProductData, DataType, UpdateProductData } from '../types/product';
import { ProductDataResponse } from '../types/product-filter';

export class ProductStore {
  // State quản lý modal
  isModalAdd: boolean = false;
  isModalUpdate: boolean = false;

  // Dữ liệu danh sách sản phẩm
  listProductData: DataType[] = [];
  selectedProduct: DataType | null = null;

  productDetail : any = {}

  isOpenModalGetById = false;

  params = {
    page:0,
    size:10,
    name:'',
    categoryId:0,
    code : ''
  }

  productDataFilters : ProductDataResponse[]  = []

  

  constructor() {
    makeAutoObservable(this);
    
    reaction (
      () => this.params , async (newParam) => {
        try {
           const res = await filterProduct(newParam)
           this.setProductDataFilters(res.content)
        } catch (error) {
          this.setProductDataFilters([])
          console.log(error);
        }
      }
    )

  }

  setParam = (value:any) => {
    this.params = value
  }

  setProductDataFilters = (value : any) => {
    this.productDataFilters = value
  }


  setisOpenModalGetById = (value: any) => {
    this.isOpenModalGetById = value
  }

  // Mở modal thêm mới sản phẩm
  openModalAdd = () => {
    this.isModalAdd = true;
  };

  // Đóng modal thêm mới sản phẩm
  closeModalAdd = () => {
    this.isModalAdd = false;
  };

  // Mở modal cập nhật sản phẩm
  openModalUpdate = () => {
    this.isModalUpdate = true;
  };

  setProductDetail = (value:any) => {
    this.productDetail = value
  }

  // Đóng modal cập nhật sản phẩm
  closeModalUpdate = () => {
    this.isModalUpdate = false;
    this.selectedProduct = null;
  };

  // Lấy danh sách sản phẩm
  fetchProductData = async () => {
    try {
      const res = await getAllProducts();
      this.listProductData = res.content; // Gán dữ liệu trả về từ API
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Thêm sản phẩm mới
  addProductStore = async (productData: AddProductData) => {
    try {
      const newProduct = await addProduct(productData);
      if (newProduct) {
        this.listProductData.unshift(newProduct); // Thêm sản phẩm mới vào danh sách
        console.log('Product added successfully:', newProduct);
      } else {
        console.error('API did not return a valid product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Cập nhật thông tin sản phẩm
  updateProductStore = async (id: number, updatedData: UpdateProductData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      this.listProductData = this.listProductData.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );
      console.log('Product updated successfully:', updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Xóa sản phẩm theo ID
  deleteProductById = async (id: number) => {
    try {
      await deleteProduct(id);
      this.listProductData = this.listProductData.filter((product) => product.id !== id);
      console.log(`Product with id ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Chọn sản phẩm để sửa
  handleUpdateLoadData = (product: DataType) => {
    this.isModalUpdate = true;
    this.selectedProduct = product;
    console.log('Product selected for update:', product);
  };


  fetchProductById = async (id : number) => {
      try {
         const rest = await fetchProductById(id)
         this.setProductDetail(rest)
      } catch (error) {
        console.log('Product selected for update:', error);
      }
  }
}

export const productStore = new ProductStore();
