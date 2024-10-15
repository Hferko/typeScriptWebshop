import User from "../classes/UserClass";
import Inventory from "../classes/InventoryClass";
import { Product } from "../classes/ProductClass";
import { nanoid } from "nanoid";
import IProduct from "../interfaces/IProduct";


function renderer2():void {  
  const hambi = document.getElementById("hamburger2")! as HTMLElement;
  const nav = document.getElementById("nav")! as HTMLMenuElement;

  // MENÜ icon *************************************

  hambi.addEventListener("click", () => {
    nav.classList.toggle("menu-active2");
    hambi.classList.toggle("fi-align-justify");
    hambi.classList.toggle("fi-arrow-left");
  });

  nav.addEventListener("mouseleave", () => {
    nav.classList.remove("menu-active2");
    hambi.classList.remove("fi-arrow-left");
    hambi.classList.add("fi-align-justify");
  });

  /////// -- Új felhasználó form --
  type FormUser = {
    name: string;
    email: string;
  };

  const form = document.getElementById("userForm") as HTMLFormElement;
  const n = document.getElementById("name") as HTMLInputElement;
  const e = document.getElementById("email") as HTMLInputElement;
  const message = document.getElementById("message") as HTMLDivElement;

  form.onsubmit = (event) => {
    event.preventDefault();
    const formUser: FormUser = {
      name: n.value,
      email: e.value,
    };

    if (!/^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ,.'-]+$/.test(formUser.name)) {
      message.style.display = "block";
      message.innerText = "Érvénytelen név megadása !!!!";
      return;
    }
    const user = new User(formUser.name, formUser.email);
    user.renderUser(); 
    localStorage.setItem('username', JSON.stringify(user.name));    
    
    message.style.display = "block";
    message.innerText = `Új Felhasználó Név: ${formUser.name} email: ${formUser.email}`;
    n.value = "";
    e.value = "";    
  };

  //////////////////////////////////////////////////

  const inventory = new Inventory();
  inventory.gadgetSelector();
  const select: HTMLSelectElement = document.getElementById("removeItem") as HTMLSelectElement;

  select.addEventListener("change", (event) => {
  const value = (event.target as HTMLSelectElement).value; 
  
  inventory.removeItem(parseInt(value));   // Elindítja a törlést a kiválasztott termék alapján

  let removed: IProduct | string = inventory.findItemById(parseInt(value)); 
  console.log(removed);
  
  const alert2 = document.querySelector<HTMLUListElement>("#alert2")!;

  if (typeof removed === "object") {
    alert2.innerText = `Törölted ${removed.title}-tól a ${removed.category} terméket`;
    alert2.style.display = "block";
  }
});

  // ---- Új termék hozzáadó form ******
  type FormProduct = {
    title: string;
    category: string;
    thumbnail: string;
    price: number;
    stock: number;
    description: string;
  };

  const t = document.getElementById("title") as HTMLInputElement;
  const c = document.getElementById("category") as HTMLInputElement;
  const img = document.getElementById("thumbnail") as HTMLInputElement;
  const p = document.getElementById("price") as HTMLInputElement;
  const s = document.getElementById("stock") as HTMLInputElement;
  const d = document.getElementById("description") as HTMLTextAreaElement;
  const registerbtn: HTMLButtonElement = document.getElementById(
    "registerbtn"
  ) as HTMLButtonElement;

  registerbtn.addEventListener("click", (event) => {
    event.preventDefault();
    const formProduct: FormProduct = {
      title: t.value,
      category: c.value,
      thumbnail: img.value,
      price: +p.value,
      stock: +s.value,
      description: d.value,
    };
    const { title, category, thumbnail, price, stock, description } =
      formProduct;
    const alert = document.querySelector<HTMLUListElement>("#alert")!;

    if (title === "" || category === "" || price === 0 || stock === 0) {
      alert.innerHTML = "Nem adtál meg minden adatot !!";
      alert.style.display = "block";
      return;
    }

    const id = nanoid();

    let newProduct = new Product(
      id,
      title,
      category,
      thumbnail,
      price,
      stock,
      description
    );
    inventory.addItem(newProduct);

    alert.style.display = "block";
    alert.innerHTML = "Az új eszköz felvéve a raktárba megtörtént.";

    t.value = "";
    c.value = "";
    p.value = "";
    s.value = "";
    d.value = "";
  });   
}

export default renderer2;
