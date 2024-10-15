import IProduct from "./IProduct";

// enum OrderStatus {
//   New,
//   InProcess,
//   Delivered,  
// }

export default interface IOrder {
  products: IProduct[];      
  cart: {[k: string]: any};
  cartItemNumber: number;
  addToCart(e: MouseEvent):object | string;
  //orderStatus: OrderStatus;  
 
}