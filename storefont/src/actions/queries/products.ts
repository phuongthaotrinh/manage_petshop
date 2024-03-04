import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/products" ;


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

