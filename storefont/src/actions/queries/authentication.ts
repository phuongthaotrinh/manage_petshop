import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


import {IRegisterForm} from "@/validations/auth-form";
import http from "@/lib/http";
import * as ACTION from "@/actions/apis/brand&categories";
import {QUERY_KEYS} from "@/actions/queryKeys";



const beLink = process.env.NEXT_PUBLIC_API_BACKEND!;




export const useCreateCustomers = async() => {
    return useMutation({
        mutationKey:['signin'],
        mutationFn:async(payload:IRegisterForm) => {
            const data= await http.post(`customers/new-account`, payload);
            return data
        }
    })

}
