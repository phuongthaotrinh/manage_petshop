import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import http  from '@/lib/http'
import { QUERY_KEYS } from "@/actions/queryKeys";



export const useGetListPermissions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PERMISSIONS_GET_ALL],
        queryFn: async() =>{
            const {payload} = await http.get('permissions/get-permissions') as any;
            return payload?.data ? payload?.data: []
        }
    })
}


export const useCreateRole = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.ROLE_CREATE],
        mutationFn: async (payload) => {
            return await http.post('roles/createRole',payload)
        }
    })
}


export const useGetListRoles = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.ROLE_GET_ALL],
        queryFn: async() =>{
            const {payload} = await http.get('roles/get-roles') as any;
            return payload?.data ? payload?.data: []
        }
    })
}



export const useDeleteRole = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: [QUERY_KEYS.ROLE_DELETE],
        mutationFn:async (payload) => {
            return await http.delete(`/roles/delete-role/${payload}`)
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.ROLE_GET_ALL]})
        }
    })
}