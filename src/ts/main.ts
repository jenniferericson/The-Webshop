import { getProducts } from "../services/productService";
import "./../scss/style.scss";

const productsContainer = document.getElementById("productsContainer");

const products = await getProducts();

for (let i = 0; i < products.length; i++) {
  const productBox = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");

  productBox.className = ("productBox");
  img.className = ("productBox--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");

  img.src = products[i].image;
  title.innerHTML = products[i].title;
  price.innerHTML = products[i].price +" $".toString();
  
  productBox.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);

  productsContainer?.appendChild(productBox);
}





