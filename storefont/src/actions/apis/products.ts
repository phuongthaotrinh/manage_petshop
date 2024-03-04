import {http} from "@/config/axiosClient";
import {ProductAttribute} from "@/types/products"
import {ShareResponse} from "@/types";


const apiUrl = {
    //PRODUCT ATTRIBUTE
    PD_ATTRIBUTE__CREATE :'products-attribute/create-attribute',
    PD_ATTRIBUTE__GET_ALL: 'products-attribute/get-attributes',
    PD_ATTRIBUTE__UPDATE :'products-attribute/update-attribute',

    //PRODUCT
    PD_PRODUCTS__CREATE:'',
    PD_PRODUCTS__GET_ALL:'',
    PD_PRODUCTS__GET_ONE:'',

}

export async function getPdAttributes():Promise<ProductAttribute[]> {
    const {data} =  await http.get(apiUrl.PD_ATTRIBUTE__GET_ALL);
    return data
}

export async function createPdAttributes(payload:ProductAttribute):Promise<ProductAttribute> {
    const {data} =  await http.post(apiUrl.PD_ATTRIBUTE__CREATE, payload);
    return data
}

export async function updatePdAttributes(payload:any):Promise<any> {
    const data =  await http.patch(apiUrl.PD_ATTRIBUTE__UPDATE, payload);
    return data
}

export async function createProducts(payload:any) {
    return await http.post(apiUrl.PD_PRODUCTS__CREATE, payload)
}
