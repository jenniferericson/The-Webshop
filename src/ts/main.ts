import { getProducts } from "../services/productService";
import "./../scss/style.scss";

const products = await getProducts()

console.log(products)







