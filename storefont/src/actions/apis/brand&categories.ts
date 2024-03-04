import {http} from "@/config/axiosClient";
import {BrandCreate, Brands} from "@/types/brand";



export const apiUrl = {
    CREATE: 'brands/new-brand',
    GET_ALL: 'brands/get-all-brand',
    GET_DETAIL: 'brands/get-brand-by-id',
    UPDATE:'brands/update-by-id',
    DELETE: '',

    //CATEGORIES
    CATEGORIES_CREATE: 'categories/new-category',
    CATEGORIES_GET_ALL: 'categories/get-all-categories',
    CATEGORIES_GET_DETAIL: 'categories/get-category-by-id',
    CATEGORIES_UPDATE:'categories/update-by-id',
    CATEGORIES_DELETE: 'categories/remove'

}
export async function createNewBrand(payload:BrandCreate) {
    return await  http.post(apiUrl.CREATE,payload)
}

export async function getAllBrands():Promise<Brands[]> {
    const {data} = await http.get(apiUrl.GET_ALL);
    return data.data ? data.data : []
}

export async function updateBrand(payload:any) {
    return await  http.patch(apiUrl.UPDATE,payload)
}
export async function deleteBrand(payload:string) {
    return await http.delete(`${apiUrl.DELETE}/${payload}`)
}

export async function getDetailBrand(payload:string) {
   const {data} = await http.get(`${apiUrl.GET_DETAIL}/${payload}`);
   return data?.data
}


//CATEGORIES

export async function createNewCategory(payload:BrandCreate) {
    return await  http.post(apiUrl.CATEGORIES_CREATE,payload)
}

export async function getAllCategories():Promise<any[]> {
    const {data} = await http.get(apiUrl.CATEGORIES_GET_ALL);
    return data.data ? data.data : []
}

export async function updateCategory(payload:any) {
    return await  http.patch(apiUrl.CATEGORIES_UPDATE,payload)
}
export async function deleteCategory(payload:string) {
    return await http.delete(`${apiUrl.CATEGORIES_DELETE}/${payload}`)
}

export async function getDetailCategory(payload:string) {
    const {data} = await http.get(`${apiUrl.CATEGORIES_GET_DETAIL}/${payload}`);
    return data?.data
}
