function renderer(): void {
  const hambi = document.getElementById("hamburger")! as HTMLElement;
  const cartIcon = document.getElementById("cart-icon")! as HTMLElement;
  const kosar = document.getElementById("kosar")! as HTMLAreaElement;
  const nav = document.getElementById("nav")! as HTMLMenuElement;
  


  // MENÜ icon *************************************
  hambi.addEventListener("click", () => {
    nav.classList.toggle("menu-active");    
    hambi.classList.toggle("fi-align-justify");
    hambi.classList.toggle("fi-arrow-left");
  });

  // KOSÁR icon *************************************
  cartIcon.addEventListener("click", () => {
    kosar.classList.toggle("cart-active");
    cartIcon.classList.toggle("fi-shopping-cart");
    cartIcon.classList.toggle("fi-arrow-up");

    //refreshCart();
  });

  nav.addEventListener("mouseleave", () => {
    nav.classList.remove("menu-active");
    hambi.classList.remove("fi-arrow-left");
    hambi.classList.add("fi-align-justify");
  }); 

  
  const p = document.getElementById("user2")! as HTMLParagraphElement;
  const username = localStorage.getItem("username");
  if (username) {
    const user:string = JSON.parse(username);
    p.innerHTML = `Belépve, mint: ${user}`;        
  } 
  else {
    p.innerHTML = "";      
  }

}
export default renderer;
