
// import {http} from "@/config/axiosClient";
import {Customers} from "@/types/customers";
import http  from '@/lib/http'

export const NewsAPI = {
    LOGIN:"auth/login",
     GET_ALL_CUSTOMERS:"customers/get-all",
}

export async function getALlCustomers():Promise<Customers[]> {
    const {payload}= await http.get(NewsAPI.GET_ALL_CUSTOMERS);
    return payload ? payload as any: []
}

export async function signInManual (body:{body: {email:string, password:string}}) {
    return await http.post(NewsAPI.LOGIN, body);
}