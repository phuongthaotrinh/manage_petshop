
import {http} from "@/config/axiosClient";
import {Customers} from "@/types/customers";

export const NewsAPI = {
    GET_ALL_CUSTOMERS:"customers/get-all",
}

export async function getALlCustomers():Promise<Customers[]> {
    const {data} = await http.get(NewsAPI.GET_ALL_CUSTOMERS);
    return data ? data?.data : []
}