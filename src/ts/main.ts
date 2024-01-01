import { getMProducts, getWProducts } from "../services/productService";
import "./../scss/style.scss";

const productsWContainer = document.getElementById("productsWContainer");

let cartValue:number = 1;
const cartValueTag = document.getElementById("cartValueTag") as HTMLElement;

const productsW = await getWProducts();

for (let i = 0; i < productsW.length; i++) {
  const productBox = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");

  productBox.className = ("productBox");
  img.className = ("productBox--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");

  img.src = productsW[i].image;
  title.innerHTML = productsW[i].title;
  price.innerHTML = productsW[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";
  
  productBox.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsWContainer?.appendChild(productBox);

  addToCartBtn.addEventListener("click", ()=>{
    cartValueTag.innerHTML = "";
    cartValueTag.innerHTML = cartValue.toString();
    cartValue +=1;
  })
}


const productsMContainer = document.getElementById("productsMContainer");

const productsM = await getMProducts();

for (let i = 0; i < productsM.length; i++) {
  const productBox = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");

  productBox.className = ("productBox");
  img.className = ("productBox--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");

  img.src = productsM[i].image;
  title.innerHTML = productsM[i].title;
  price.innerHTML = productsM[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";
  
  productBox.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsMContainer?.appendChild(productBox);

  addToCartBtn.addEventListener("click", ()=>{
    cartValueTag.innerHTML = "";
    cartValueTag.innerHTML = cartValue.toString();
    cartValue +=1;
  })
}





