import "./../scss/style.scss";
import { CartItem } from "../models/CartItem";
import { getMProducts, getWProducts } from "../services/productService";
import { htmlForProductsW, htmlForProductsM } from "./createHtml";
import { shoppingCartHtml, summaryAside, shoppingCartContainer } from "./shoppingCart";
import { checkoutHTML } from "./checkOut";

//Klick funktion nedan för att navigera till woman/mens sidor från hero
const imgContainerW = document.querySelector(".main--imgContainerW");
const imgContainerM = document.querySelector(".main--imgContainerM");

imgContainerW?.addEventListener("click", ()=>{
  window.open("womens.html", "_self");
})

imgContainerM?.addEventListener("click", ()=>{
  window.open("mens.html", "_self");
})


// Skapande av varukorg lista och local storage för den
export let shoppingCartList:CartItem[] = [];

const valueFromLs = localStorage.getItem("shoppingCartList");

if (valueFromLs) {
  shoppingCartList = JSON.parse(valueFromLs);
}

shoppingCartHtml();
checkoutHTML();

//Skapar variabel för varukorgs ikonen och hämtar p tagen som ska visa detta i domen senare
export let cartValue:number = 0;
export const cartValueTag = document.getElementById("cartValueTag") as HTMLElement;

// Skapar local storage för varukorgs ikonen
const cartValueLs = localStorage.getItem("cartValue");

if (cartValueLs) {
  cartValue = JSON.parse(cartValueLs);
}


//Sparar ändringar för varukorgs ikon till local storage
  export const showShoppingCartValue = ()=> {
    localStorage.setItem("cartValue", JSON.stringify(cartValue));
    if (cartValueTag){
      cartValueTag.innerHTML = "";
      cartValueTag.innerHTML = cartValue.toString();
    }
  }
  
showShoppingCartValue();


//Minksar cart value vid tryck på delete knapp
export const decreaseCartValueOnDelete = (deletedProduct:CartItem) => {
  cartValue = cartValue - deletedProduct.qty; 
  showShoppingCartValue();
};

// Ökar cart value
export const increaseCartValue = () => {
  cartValue ++; 
  showShoppingCartValue();
}

//Minksar cart value
export const decreaseCartValue = () => {
  cartValue --; 
  showShoppingCartValue();
}

//Kollar ifall varukorgen är tom och visar html för det
export const checkIfEmpty = () => {

  if(shoppingCartList.length === 0){
    const emtpyTitle = document.createElement("h3");
    const continueShoppingBtn = document.createElement("btn");
    
    emtpyTitle.className = ("emptyTitle");
    continueShoppingBtn.className = ("continueShoppingBtn");
    
    emtpyTitle.innerHTML = "Your shopping bag is empty!";
    continueShoppingBtn.innerHTML = "Continue shopping";
    continueShoppingBtn.addEventListener("click", ()=>{
      window.open("index.html", "_self");
    });
    
    shoppingCartContainer?.appendChild(emtpyTitle);
    shoppingCartContainer?.appendChild(continueShoppingBtn);
    
    summaryAside.className = ("sumAside__empty");
  };
};

checkIfEmpty();

// Hämtar dam produkterna från vårat api
export const productsW = await getWProducts();

htmlForProductsW();


// Hämtar herr produkterna från vårat api
export const productsM = await getMProducts();

htmlForProductsM(); 



//Knapp för att simulera köp
const purchaseBtn = document.querySelector(".purchaseBtn");

purchaseBtn?.addEventListener("click", () => {
  window.open("purchase.html", "_self");
});

//Knapp för att ta sig tillbaka till startsidan efter genomfört köp
const continueShoppingBtn = document.getElementById("continueShopBtn");
continueShoppingBtn?.addEventListener("click", () => {
  shoppingCartList.splice(0,shoppingCartList.length)
  cartValue = 0;
  shoppingCartHtml();
  showShoppingCartValue();
});


