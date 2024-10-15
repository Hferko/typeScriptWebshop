import IProduct from "../interfaces/IProduct";
import Order from "./OrderClass";

export class Product implements IProduct {
  addCartGomb: NodeListOf<HTMLButtonElement> 

  constructor(
    public readonly id: string | number,
    public title: string,    
    public category: string,
    public thumbnail: string,
    public price: number,
    public stock: number,
    public description: string,
  ) {    
    this.addCartGomb = document.querySelectorAll(".addToCart") as NodeListOf<HTMLButtonElement>
  }

  public get stuffId(): string | number {
    return this.id;
  }

  renderProduct(): void {   
    this.category = this.category.slice(0, -1);
    this.price = this.price * 400;
    const cost =  this.price.toLocaleString("hu-HU", { maximumFractionDigits: 0 }) + " HUF";
      
    const productSection = document.getElementById("products")! as HTMLDivElement;
    const div: HTMLDivElement = document.createElement("div");    
    div.classList.add("card");
    
    div.innerHTML = `
    <h2>${this.title}</h2>      
            <p><b>${this.category}</b></p>        
            <p>${this.description}</p>
            <p><b>Ár: <span> ${cost} </span></b></p>            
            <figure>          
                <img src="${this.thumbnail}" title="${this.title}">
                <figcaption>Raktáron: ${this.stock} db</figcaption> 
            </figure> 
            <button class="addToCart" id="${this.id}">Kosárba</button>
            <p class="tiny">${this.id}</p>     
    `;    
    productSection.appendChild(div);

    // Ha nincs raktáron...
    let hozzaadGomb = document.getElementById(`${this.id}`) as HTMLButtonElement;        
    if (this.stock === 0) {
        hozzaadGomb.disabled = true;
        hozzaadGomb.innerText = "Nincs raktáron, nem rendelhető"
    }  
    const order = new Order();   

    for (let i = 0; i < this.addCartGomb.length; i++) {
      //this.addCartGomb[i].addEventListener('click', order.addToCart)     
      this.addCartGomb[i].addEventListener('click', (event: any) => {
        order.addToCart(event)
      });
    }
  }
}
