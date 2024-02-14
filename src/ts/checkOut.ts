import { shoppingCartList ,showShoppingCartValue, checkIfEmpty, 
    increaseCartValue, decreaseCartValue, decreaseCartValueOnDelete } from "./main";
import { shoppingCartHtml, shoppingCartContainer } from "./shoppingCart";
 
export const checkoutHTML =()=>{

// Html för summeringen
    const orderSummaryContainer = document.getElementById("orderSummaryContainer");
    const summaryContainer = document.querySelector(".summaryContainer");

    if(summaryContainer){
      summaryContainer.innerHTML= "";
    }

    const summaryOfValue = document.createElement("p");
    summaryOfValue.className = ("summaryContainer--summaryOfValue");

    let sum: number = 0;

    summaryContainer?.appendChild(summaryOfValue);
    

    if(orderSummaryContainer){
      orderSummaryContainer.innerHTML= "";
    }
    //Funktion för checkOutLoop
    for (let i=0; i< shoppingCartList.length; i++){
      sum += shoppingCartList[i].product.price * shoppingCartList[i].qty;
      summaryOfValue.innerHTML = "Sum: " + sum.toString() +"$";

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
    
      productBox.className = ("checkOut--productBox");
      imgContainer.className = ("checkOut--imgContainer")
      img.className = ("checkOut--img");
      title.className = ("checkOut--title");
      price.className = ("checkOut--price");
      removeBtn.className = ("checkOut--removeBtn");
      minusBtn.className = ("checkOut--minusBtn");
      plusBtn.className = ("checkOut--plusBtn");
      qtyContainer.className = ("checkOut--qty");
    
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
          console.log(shoppingCartList[i])
          shoppingCartList.splice(i,1);
          productBox.remove();
          
          checkIfEmpty();
          shoppingCartHtml(); 
          showShoppingCartValue();
          checkoutHTML();  
          
      });
      
      imgContainer.appendChild(img);
      productBox.appendChild(imgContainer)
      productBox.appendChild(title);
      title.appendChild(price);
      orderSummaryContainer?.appendChild(productBox);
      qtyContainer.appendChild(minusBtn);
      qtyContainer.appendChild(qty);
      qtyContainer.appendChild(plusBtn);
      title.appendChild(qtyContainer);
      qtyContainer.appendChild(removeBtn);
    
     // plusknapp för varorna i checkouten
       plusBtn.addEventListener ("click", ()=>{
        if(shoppingCartContainer){
          shoppingCartContainer.innerHTML ="";
        } 
        shoppingCartList[i].qty++;
        increaseCartValue();
        qty.innerHTML = shoppingCartList[i].qty.toString();
        
        shoppingCartHtml();
        showShoppingCartValue();
        checkoutHTML();
      });
    
      //Minus knapp för varorna i checkouten
      minusBtn.addEventListener ("click", ()=>{
        if(shoppingCartList[i].qty === 1){ 
          decreaseCartValue(); 
          productBox.remove();
          shoppingCartList.splice(i,1);
        
          shoppingCartHtml();
          showShoppingCartValue();
          checkoutHTML();
    
        } else{
          shoppingCartList[i].qty--;
          qty.innerHTML = shoppingCartList[i].qty.toString();
            
          decreaseCartValue();
          shoppingCartHtml();
          showShoppingCartValue();
          checkoutHTML();
        }
      });
    
      //skapande av html för att visualisera val av betalning/konto/leverans
      const paymentChoice = document.getElementById("paymentChoice");
      const card = document.getElementById("card");
      const swish = document.getElementById("swish");
      
      
      card?.addEventListener("click", ()=>{
        if(paymentChoice){
          paymentChoice.innerHTML = "";
        }
        const cardNumberDiv = document.createElement("div");
        const cardNumberInput = document.createElement("input");
        const cardExtraNumberDiv = document.createElement("div");
        const cardExpireInput = document.createElement("input");
        const cardCvc = document.createElement("input");
      
        cardNumberInput.placeholder = "xxxx xxxx xxxx xxxx";
        cardExpireInput.placeholder = "M/Y";
        cardCvc.placeholder = "CVC";
      
        cardNumberInput.className = ("cardNumber");
        cardExtraNumberDiv.className = ("monthCvcDiv");
        cardExpireInput.className = ("monthCvc");
        cardCvc.className = ("monthCvc");
      
      
        paymentChoice?.appendChild(cardNumberDiv);
        cardNumberDiv.appendChild(cardNumberInput);
        paymentChoice?.appendChild(cardExtraNumberDiv);
        cardExtraNumberDiv.appendChild(cardExpireInput);
        cardExtraNumberDiv.appendChild(cardCvc);
      });
      
      swish?.addEventListener("click", ()=>{
        if(paymentChoice){
          paymentChoice.innerHTML = "";
        }
      
        const cardNumberDiv = document.createElement("div");
        const cardNumberInput = document.createElement("input");
      
        cardNumberInput.placeholder = "+46 ";
        cardNumberInput.className = ("cardNumber");
      
        paymentChoice?.appendChild(cardNumberDiv);
        cardNumberDiv.appendChild(cardNumberInput);
      });
    };
};

