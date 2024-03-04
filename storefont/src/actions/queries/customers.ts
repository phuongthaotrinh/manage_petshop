import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/customers";

export const useGetCustomers= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CUSTOMERS_GET_ALL],
        queryFn: () => ACTION.getALlCustomers(),

    });
};
