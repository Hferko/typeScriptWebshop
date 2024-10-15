import Inventory from "./InventoryClass";
import IProduct from "../interfaces/IProduct";
//import IOrder from "../interfaces/IOrder";

export default class Order {
  public products: IProduct[];
  cart: {[k: string]: any};
  cartItemNumber:number;   

  constructor() {
    const inventory = new Inventory();
    this.products = inventory.productAll; // inventory Getter
    this.cartItemNumber = 0;
    this.cart ={};    
  }

  get _cart():object{
    return this.cart;
  }

  set _cart(newCart: object) {
    if (newCart) {
        this.cart = newCart;
    } else {
        console.error("Nincs ilyen készülék");
    }
  }

  get _cartItemNumber():number{
    return this.cartItemNumber;
  }

  printCart() {
    console.log(this.cart);
  }

  
  // -  Kosár tartalmát kiíró függvény **
  refreshCart() {
    const cartItems = document.getElementById("cart-items" )! as HTMLUListElement;
    let sum = 0;
    let maxDarab = 0;  
   
    cartItems.innerHTML = "";

    if (Object.keys(this.cart).length === 0) {
      cartItems.innerHTML = `<p>Még nincs árú a kosarában.</p>`;
    } 
    else {
      for (const id in this.cart) {      
        const currentGadget: IProduct | undefined = this.products.find((gadget) => gadget.id === parseInt(id));

        if (currentGadget) {
          let ar = currentGadget.price * 400;
          let arStr = ar.toLocaleString("hu-HU", { maximumFractionDigits: 0 }) + " HUF/db";

          let totalPrice = ar * parseFloat(this.cart[id]);
          
          let totalPriceStr = totalPrice.toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
          });

          cartItems.innerHTML += `
          <li>            
              <h4>${currentGadget.title}:</h4>    
              <button   class="pluszGomb" data-id="${currentGadget.id}">+</button>
              <p class="customPrice">${arStr}</p>
              <p><span><b>${this.cart[id]}</b></span>db összesen:</p>
              <p class="customPrice"><span> ${totalPriceStr} Ft</span></p>          
          </li>`;
          sum += totalPrice;
          maxDarab = this.cart[id] > maxDarab ? this.cart[id] : maxDarab;
        }
      }

      sum = sum;
      cartItems.innerHTML += `
      <p>
        <b>Mindösszesen fizetendő:</b>
      </p> 
      <h5>
        ${sum.toLocaleString("hu-HU", { maximumFractionDigits: 0 } )} HUF
      </h5>`;
    }
  }

  addToCart(e: any) {       
    let target: string;
    const kosarbanVan = document.getElementById("kosarbanVan") as HTMLParagraphElement;    

    if (e.target.id) {
      target = e.target.id;      
    } 
    else {
      target = e.target.dataset.id;
    }  

    !this.cart[target] ? this.cart[target] = 1 : this.cart[target] += 1;
    
    this.cartItemNumber += 1;
    kosarbanVan.style.display = 'block';
    kosarbanVan.innerText = "Kosárban: " + this.cartItemNumber + ' db.';   
    
    this.refreshCart();
  }

 eventListener(): void{
  
  const cartItems = document.getElementById('cart-items') as HTMLUListElement;
  cartItems.addEventListener('click', (e) => {
    console.log(this._cart);
    
    this.addToCart(e);
    this.refreshCart();
    })
  }
  
}
