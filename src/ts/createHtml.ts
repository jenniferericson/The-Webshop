import { productsW, productsM,increaseCartValue,shoppingCartList,showShoppingCartValue } from "./main";
import { CartItem } from "../models/CartItem";
import { shoppingCartHtml } from "./shoppingCart";

//Skapar html för våra dam produkter
export const htmlForProductsW = () => {
const productsWContainer = document.getElementById("productsWContainer");

for (let i = 0; i < productsW.length; i++) {
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");
  
  productBox.className = ("productBox");
  imgContainer.className = ("imgContainer")
  img.className = ("imgContainer--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");
  
  img.src = productsW[i].image;
  title.innerHTML = productsW[i].title;
  price.innerHTML = productsW[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";

  
  productBox.appendChild(imgContainer);
  imgContainer.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsWContainer?.appendChild(productBox);
  
  // Kollar ifall produkten finns i shopping cart och då ändras qty på produkten, annars läggs den till i shopping cart listan
  addToCartBtn.addEventListener("click", () => {
    let check = (shoppingCartList:CartItem[], id:number) => {
        return shoppingCartList.findIndex((obj) => obj.id === id)
      }
      const index = check(shoppingCartList, productsW[i].id)
      
      if(index === -1) {
        const cartItem:CartItem = new CartItem(0,productsW[i], productsW[i].id);
        cartItem.qty = 1;
        shoppingCartList.push(cartItem);
      }
      else{
        shoppingCartList[index].qty++;
      } 

      shoppingCartHtml();
      increaseCartValue();
      showShoppingCartValue(); 
  });
};
};


//Skapar html för våra herr produkter
export const htmlForProductsM = () => {
const productsMContainer = document.getElementById("productsMContainer");

for (let i = 0; i < productsM.length; i++) {
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");
  
  productBox.className = ("productBox");
  imgContainer.className = ("imgContainer")
  img.className = ("imgContainer--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");
  
  img.src = productsM[i].image;
  title.innerHTML = productsM[i].title;
  price.innerHTML = productsM[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";
  
  productBox.appendChild(imgContainer);
  imgContainer.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsMContainer?.appendChild(productBox);
  
 // Kollar ifall produkten finns i shopping cart och då ändras qty på produkten, annars läggs den till i shopping cart listan
  addToCartBtn.addEventListener("click", ()=>{
    let check = (shoppingCartList:CartItem[], id:number) => {
      return shoppingCartList.findIndex((obj) => obj.id === id)
    }
   const index = check(shoppingCartList, productsM[i].id)
    if(index === -1) {
      const cartItem:CartItem = new CartItem(0,productsM[i], productsM[i].id);
      cartItem.qty = 1;
      shoppingCartList.push(cartItem);
    }
    else{
      shoppingCartList[index].qty++;
    } 

    shoppingCartHtml();
    increaseCartValue();
    showShoppingCartValue(); 
  });
};
};

