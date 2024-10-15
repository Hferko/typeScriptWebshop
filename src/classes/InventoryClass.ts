import { gadgets } from "../utils/httpRequest";
import IProduct from "../interfaces/IProduct";
import IInventory from "../interfaces/IInventory";
import { Product } from "./ProductClass";

//let products:IProduct[] = [...gadgets];

export default class Inventory implements IInventory {  
  public products: IProduct[];  

  constructor() {   
    this.products = [...gadgets];   
  }

  public get productAll():IProduct[]  {
    return this.products;
  }
 
  addItem(item: IProduct): void {
    this.products.push(item);        
    this.listAllItems();
  }

  removeItem(id: number): void {
    this.products = this.products.filter((elem) => elem.id !== id);    
    console.log(this.products);
    this.listAllItems();    
  }

  //Termék keresése ID vagy név alapján
  findItemById(id: number): IProduct | string {   
    let wantedStuff: IProduct | undefined = this.products.find(
      (elem) => elem.id === id
    );

    if (wantedStuff) {
      return wantedStuff;
    } 
    else {
      return "Nem található ilyen kütyü raktáron";
    }
  }

  findItemByTitle(title: string): IProduct | string {
    let wantedStuff: IProduct | undefined = this.products.find(
      (elem) => elem.id === title
    );

    if (wantedStuff) {
      return wantedStuff;
    } 
    else {
      return "Nem található ilyen kütyü raktáron";
    }
  }

  // Összes termék listázása
  listAllItems(): void {
    const productSection = document.getElementById("products") as HTMLDivElement;
    if (productSection) { 
      productSection.innerHTML = "";

      if (this.products.length > 0) {    

        this.products.map((elem) => {
          console.log(typeof elem.id);
          let item: Product = new Product(
            elem.id,
            elem.title,          
            elem.category,
            elem.thumbnail,
            elem.price,
            elem.stock,
            elem.description,
          );
          item.renderProduct();
        });
      } 
      else {
        productSection.innerHTML = "A raktár üres";
      }
    }
  }

  // A selector feltöltése
  gadgetSelector(): void {
    const select = document.querySelector("#removeItem") as HTMLSelectElement;

    if (this.products.length > 0) {
      
      select.innerHTML = "";
      const firstOpt: HTMLOptionElement = document.createElement("option");
      firstOpt.value = "";
      firstOpt.innerText = "- Válassz -";
      select.appendChild(firstOpt);

      this.products.map((item) => {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = item.id.toString();
        option.innerText = item.title;
        select.appendChild(option);
      });
    } else {
      select.innerHTML = "A raktár üres";
    }
  }
}