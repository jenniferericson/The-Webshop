import { IProduct } from "../models/IProduct";
import { get } from "./serviceBase";

export const getProducts = async ():Promise <IProduct[]> => {
    const url = "https://fakestoreapi.com/products/category/women's%20clothing";
    const data = await get<IProduct[]>(url);

    return data;
};



