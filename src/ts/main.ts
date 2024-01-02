import { IProduct } from "../models/IProduct";
import { getMProducts, getWProducts } from "../services/productService";
import "./../scss/style.scss";


/* Shoppingcart ikonen ändras när man lägger till produkter*/
let cartValue:number = 1;
const cartValueTag = document.getElementById("cartValueTag") as HTMLElement;

const storedCartValue = localStorage.getItem("cartValue");

if (storedCartValue){
  cartValue=JSON.parse(storedCartValue);
}
/* Hämta produkter på woman sidan*/
const productsWContainer = document.getElementById("productsWContainer");

const productsW = await getWProducts();

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
  
  addToCartBtn.addEventListener("click", ()=>{
    shoppingCartList.push(productsW[i]);
    cartValueTag.innerHTML = "";
    cartValueTag.innerHTML = cartValue.toString();
    cartValue +=1;
    //localStorage.setItem("cartValue", JSON.stringify(cartValue));
    shoppingCartHtml();
    showShoppingCartValue();
  })
}

/* Hämta produkter på herr sidan*/
const productsMContainer = document.getElementById("productsMContainer");

const productsM = await getMProducts();

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
  
  addToCartBtn.addEventListener("click", ()=>{
    shoppingCartList.push(productsM[i]);
    cartValueTag.innerHTML = "";
    cartValueTag.innerHTML = cartValue.toString();
    cartValue +=1;
    shoppingCartHtml();
    showShoppingCartValue();
  })
  
}


/* Loop för varukorg lista */
const shoppingCartContainer = document.getElementById("shoppingCartContainer");

let shoppingCartList:IProduct[] = [];

const valueFromLs = localStorage.getItem("shoppingCartList");

if (valueFromLs) {
  shoppingCartList = JSON.parse(valueFromLs);
};

const shoppingCartHtml = () => {
  
  localStorage.setItem("shoppingCartList", JSON.stringify(shoppingCartList));
  
  console.log(shoppingCartList);
  
  const summaryOfValue = document.getElementById("summaryOfValue");
  let sum: number = 0;

  for(let i = 0; i < shoppingCartList.length; i++){

    sum += shoppingCartList[i].price;

    const productBox = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    const price = document.createElement("p");

    productBox.className = ("shoppingCartBox");
    imgContainer.className = ("imgContainerSC")
    img.className = ("imgContainerSC--img");
    title.className = ("shoppingCartBox--title");
    price.className = ("shoppingCartBox--price");
    
    img.src = shoppingCartList[i].image;
    title.innerHTML = shoppingCartList[i].title;
    price.innerHTML = shoppingCartList[i].price +" $".toString();

    if(summaryOfValue){
      summaryOfValue.innerHTML = "Total sum: " + sum.toString() +"$";
    }
    
    productBox.appendChild(img);
    productBox.appendChild(title);
    title.appendChild(price);
    shoppingCartContainer?.appendChild(productBox);
  };
  
};

shoppingCartHtml()

//Klick funktion nedan för att navigera till woman/mens sidor från hero
const imgContainerW = document.querySelector(".main--imgContainerW");
const imgContainerM = document.querySelector(".main--imgContainerM");

imgContainerW?.addEventListener("click", ()=>{
  window.open("womens.html", "_blank");
})

imgContainerM?.addEventListener("click", ()=>{
  window.open("mens.html", "_blank");
})


const showShoppingCartValue = ()=> {
  localStorage.setItem("cartValue", JSON.stringify(cartValue));
    cartValueTag.innerHTML = "";
    cartValueTag.innerHTML = cartValue.toString();
    cartValue +=1;
}

showShoppingCartValue();


