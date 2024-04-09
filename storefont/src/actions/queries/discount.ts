import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import http  from '@/lib/http'
import { QUERY_KEYS } from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/products" ;
import {NewsAPI} from "@/actions/apis/services";


export const useGetDiscounts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.DISCOUNT_VOUCHER_ALL],
        queryFn: async() =>{
            const {payload} = await http.get('discount/get-list') as any;
            return payload?.data ? payload?.data: []
        }
    })

}

export const useDelDiscount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEYS.DISCOUNT_VOUCHER_REMOVE],
        mutationFn:async (id: string)=> {
            return  await http.delete(`discount/delete-voucher/${id}`, );
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.DISCOUNT_VOUCHER_ALL]})
        }
    })
}


export const useCreateDiscount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QUERY_KEYS.DISCOUNT_VOUCHER_REMOVE],
        mutationFn:async (payload:any)=> {
            const response =   await http.post("discount/new-discount", payload);
            return response
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.DISCOUNT_VOUCHER_ALL]})
        }
    })

}


export const useGetDetailDiscount = (id:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.DISCOUNT_VOUCHER_DETAIL, id],
        queryFn: async() =>{
            const {payload} = await http.get(`discount/get-detail/${id}`) as any;
            return payload?.data ? payload?.data: []
        },
        enabled:!!id
    })
}