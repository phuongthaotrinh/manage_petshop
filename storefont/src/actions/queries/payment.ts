import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/actions/queryKeys";
import axios from "axios";
import {ProductAttribute} from "@/types/products";
import {http} from "@/config/axiosClient";



 async function createShippingFee(payload:any):Promise<number> {
     const url = `${process.env.NEXT_PUBLIC_API_BACKEND!}payment/calc-shipping-fee`;
     const {data} =  await http.post(url,payload)
     return data.data
}

export async function paymentFn(payload:any){
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND!}order/createPaymentUrl`;
    const {data} =  await http.post(url,payload)
    return data
}

export async function getVnpayIpn(query:any) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND!}order/order_vnpay_return`;
    const {data} =  await http.get(url,{
        params:query
    })
    return data
}


export const useGetShipFee  = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.GET_SHIPPING_FEE],
        mutationFn: (payload:any) => createShippingFee(payload)
    })
}


