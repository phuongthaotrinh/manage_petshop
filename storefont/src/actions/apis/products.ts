import {http} from "@/config/axiosClient";
import {ProductAttribute} from "@/types/products"
import {ShareResponse} from "@/types";


const apiUrl = {

    //PRODUCT
    PD_PRODUCTS__CREATE:'product/create-product',
    PD_PRODUCTS__GET_ALL:'',
    PD_PRODUCTS__GET_ONE:'',

}


export async function createPd(payload:ProductAttribute):Promise<any[]> {
    return await http.post(apiUrl.PD_PRODUCTS__CREATE, payload);
}

