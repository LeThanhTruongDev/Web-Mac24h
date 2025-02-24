/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { fetchCartByUserId } from "../api/cartApi";

export class CartStore {
  
    listItemCart : any = []

  constructor() {
    makeAutoObservable(this);
  }

  

  getlistItemCartById = async (id: number) => {
     const res  =  await fetchCartByUserId(id)
     const formattedCartItems = res.cartItems.map((item: any) => ({
        id: item.id,
        name: item.productDetail.name, 
        price: item.productDetail.price, 
        quantity: item.quantity, 
        image: item.productDetail.product.imageUrl || '/placeholder.svg', // 🔥 Lấy hình ảnh từ product
      }));
     this.listItemCart = formattedCartItems
  };

  saveCartPush = (value: any) => {
    const existingItem = this.listItemCart.find((item:any) => item.id === value.id);
    
    if (existingItem) {
 
      existingItem.quantity += value.quantity;
    } else {
      this.listItemCart.push(value);
    }
  };
  


}

export const cartStore = new CartStore();
