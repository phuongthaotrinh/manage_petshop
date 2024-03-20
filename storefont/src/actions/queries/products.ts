import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import http  from '@/lib/http'
import { QUERY_KEYS } from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/products" ;
import {NewsAPI} from "@/actions/apis/services";


 export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.createPd(payload),
        mutationKey:[QUERY_KEYS.PRODUCT__CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCT__GET_ALL],
            });
        },
    });
};



 export const useGetListProduct = () => {
     return useQuery({
         queryKey: [QUERY_KEYS.PRODUCT__GET_ALL],
         queryFn: async() =>{
          const {payload} = await http.get('product/get-list') as any;
             return payload?.data ? payload?.data: []
         }
     })

 }

 export const useGetDetailPage = (productId: string) => {
     return useQuery({
         queryKey: [QUERY_KEYS.PRODUCT__GET_DETAIL,productId],
         queryFn: async() =>{
             const url =  `${process.env.NEXT_PUBLIC_API_BACKEND!}/product/get-detail/${productId}`
             const data = (await(await fetch(url)).json());
             return data? data?.data : []
         },
         enabled: !!productId
     })

 }


