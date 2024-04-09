import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import http  from '@/lib/http'
import { QUERY_KEYS } from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/products" ;
import {NewsAPI} from "@/actions/apis/services";


export const useGetScheduleList = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.DISCOUNT_VOUCHER_ALL],
        queryFn: async() =>{
            const {payload} = await http.get('schedule/all-schedule') as any;
            return payload?.data ? payload?.data: []
        }
    })

}
