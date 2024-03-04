import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/actions/queryKeys";
import { ProductAttribute } from "@/types/products";
import * as ACTION from "@/actions/apis/products" ;
import * as POST_ACTION from "@/actions/apis/news";


 export const useCreateProductAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:ProductAttribute) => ACTION.createPdAttributes(payload),
        mutationKey:[QUERY_KEYS.PRODUCT_ATTRIBUTE__CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCT_ATTRIBUTE__GET_ALL],
            });
        },
    });
};

export const useGetProductAttributes = () => {
    return useQuery({
        queryFn: () => ACTION.getPdAttributes(),
        queryKey:[QUERY_KEYS.PRODUCT_ATTRIBUTE__GET_ALL]
    });
};

export const useGetOneProductAttributes = (id: string) => {
    return useQuery({
        queryFn: () => ACTION.getPdAttributes(),
        queryKey:[QUERY_KEYS.PRODUCT_ATTRIBUTE__GET_ONE, id],
        select:(data) => {
            return  data.find((i) => i._id === id);
        },
        enabled: !!id || id ==="create"
    });
};

export const useUpdateProductAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:ProductAttribute) => ACTION.updatePdAttributes(payload),
        mutationKey:[QUERY_KEYS.PRODUCT_ATTRIBUTE__UPDATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCT_ATTRIBUTE__GET_ALL],
            });
            // queryClient.invalidateQueries({
            //     queryKey: [QUERY_KEYS.PRODUCT_ATTRIBUTE__GET_ONE, id],
            // });
        },

    });
};