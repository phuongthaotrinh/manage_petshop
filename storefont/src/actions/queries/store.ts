import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/store"
import * as SERVICE_ACTION from "@/actions/apis/services";


export const useCreateStore = () => {
    return useMutation({
        mutationFn: (payload: any) => ACTION.createNewStore(payload),
        mutationKey: [QUERY_KEYS.STORE_CREATE]
    });
};
export const useGetStore = () => {
    return useQuery({
        queryFn: () => ACTION.getStore(),
        queryKey: [QUERY_KEYS.STORE_GET_STORE]
    });
};

export const useUpdateStore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: any) => ACTION.updateStore(payload),
        mutationKey: [QUERY_KEYS.STORE_UPDATE_STORE],
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.STORE_GET_STORE]
            })
        },
    });
};