/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductDataResponse {
    id: number
    name: string
    code: string
    imageUrl: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    category: Category
    productDetails: ProductDetail[]
  }
  
  export interface Category {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface ProductDetail {
    id: number
    name: string
    quantity: any
    price: number
    status: any
    code: any
    imageUrl: any
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    product: Product
    ram: Ram
    memory: Memory
    displaySize: DisplaySize
    color: Color
  }
  
  export interface Product {
    id: number
    name: string
    code: string
    imageUrl: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    category: Category2
  }
  
  export interface Category2 {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface Ram {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface Memory {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface DisplaySize {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }
  
  export interface Color {
    id: number
    name: string
    createdAt: number
    updatedAt: number
    isDeleted: boolean
  }