import { shoppingCartList, checkIfEmpty, 
    decreaseCartValueOnDelete, increaseCartValue, decreaseCartValue  } from "./main";


export const shoppingCartContainer = document.getElementById("shoppingCartContainer");

// Skapa html för summeringen
const summaryContainer = document.getElementById("summaryContainer");

export const summaryAside = document.createElement("aside");
summaryAside.className = ("sumAside");
    
const summaryOfValue = document.createElement("p");
const checkOutBtn = document.createElement("button");
    
checkOutBtn.className = ("sumAside--Btn");
checkOutBtn.innerHTML = "Proceed to checkout";

checkOutBtn?.addEventListener("click", ()=>{
    window.open("checkOut.html", "_self");
});
    
summaryContainer?.appendChild(summaryAside);
summaryAside.appendChild(summaryOfValue);
summaryAside.appendChild(checkOutBtn);
  

export const shoppingCartHtml = () => {

    localStorage.setItem("shoppingCartList", JSON.stringify(shoppingCartList));
  
    let sum: number = 0;
  
    if(shoppingCartContainer){
    shoppingCartContainer.innerHTML= "";
  }
    /* Loop för varukorg listan */
    for(let i = 0; i < shoppingCartList.length; i++){
      sum += Math.trunc(shoppingCartList[i].product.price * shoppingCartList[i].qty);
  
      const productBox = document.createElement("div");
      const imgContainer = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const price = document.createElement("p");
      const qtyContainer = document.createElement("div");
      const plusBtn = document.createElement("button")
      const minusBtn = document.createElement("button")
      const removeBtn = document.createElement("button");
      const qty = document.createElement("p");
    
  
      productBox.className = ("shoppingCartBox");
      imgContainer.className = ("imgContainerSC");
      img.className = ("imgContainerSC--img");
      title.className = ("shoppingCartBox--title");
      price.className = ("shoppingCartBox--price");
      removeBtn.className = ("shoppingCartBox--removeBtn");
      
      qtyContainer.className =("qtyContainer");
      minusBtn.className = ("qtyContainer--changeQtyBtn");
      plusBtn.className = ("qtyContainer--changeQtyBtn");
      
      img.src = shoppingCartList[i].product.image;
      title.innerHTML = shoppingCartList[i].product.title;
      price.innerHTML = shoppingCartList[i].product.price +" $".toString();
      plusBtn.innerHTML = "+";
      qty.innerHTML = shoppingCartList[i].qty.toString();
      minusBtn.innerHTML = "-";
      removeBtn.innerHTML ="Remove";
  
      //Ta bort produkten ur listan och ändra varukorgs ikonen
      removeBtn.addEventListener("click", () => {
        decreaseCartValueOnDelete(shoppingCartList[i]);
        shoppingCartList.splice(i,1);
        productBox.remove();
        sum = 0;
  
        checkSum() 
        shoppingCartHtml();  
        checkIfEmpty(); 
      });
  
      //Plus knapp för varukorg
      plusBtn.addEventListener ("click", ()=>{
        if(shoppingCartContainer){
          shoppingCartContainer.innerHTML ="";
        };
        shoppingCartList[i].qty++;
        increaseCartValue()
        qty.innerHTML = shoppingCartList[i].qty.toString();
        shoppingCartHtml();  
      });
  
      //Minus knapp för varukorg, ifall det ligger qty 1 på produkten och vi klickar så tas den bort helt annars minskar qty
      minusBtn.addEventListener ("click", ()=>{
        if(shoppingCartList[i].qty === 1){ 
          decreaseCartValue(); 
          productBox.remove();
          shoppingCartList.splice(i,1);
          sum =0;
          checkSum(); 
          shoppingCartHtml(); 
          checkIfEmpty();  
  
        } else{
          shoppingCartList[i].qty--;
          qty.innerHTML = shoppingCartList[i].qty.toString();
          decreaseCartValue();
          checkSum(); 
          shoppingCartHtml(); 
      }
    });

    //Uppdatera total summan
    const checkSum = () => {
    if(summaryOfValue){
      summaryOfValue.innerHTML = "";
      summaryOfValue.innerHTML = "Sum: " + sum.toString() +"$";
     }
    };

    checkSum();

    imgContainer.appendChild(img);
    productBox.appendChild(imgContainer)
    productBox.appendChild(title);
    title.appendChild(price);
    qtyContainer.appendChild(minusBtn);
    qtyContainer.appendChild(qty);
    qtyContainer.appendChild(plusBtn);
    title.appendChild(qtyContainer);
    qtyContainer.appendChild(removeBtn);
    shoppingCartContainer?.appendChild(productBox);

  };
};

