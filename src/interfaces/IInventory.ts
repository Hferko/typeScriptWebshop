import IProduct from "./IProduct";

export default interface IInventory {
  products: IProduct[];  

  addItem(item: IProduct): void
  removeItem(id: number): void;
  findItemById(id: number): IProduct|string;
  findItemByTitle(title: string): IProduct|string;
  listAllItems(): void;  
}
