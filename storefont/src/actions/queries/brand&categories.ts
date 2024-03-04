import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {INewPost} from "@/types/post";
import * as ACTION from "@/actions/apis/brand&categories";
import {QUERY_KEYS} from "@/actions/queryKeys";


//======== BRANDS ========//
export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.createNewBrand(payload),
        mutationKey:[QUERY_KEYS.BRANDS_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.BRANDS_GET_ALL],
            });
        },
    });
};


export const useGetBrands = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.BRANDS_GET_ALL],
        queryFn: () => ACTION.getAllBrands(),
    });
};



export const useGetBrandsDetail = (brandId:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.BRANDS_GET_DETAIL, brandId],
        queryFn: () => ACTION.getDetailBrand(brandId),
        enabled: !!brandId && brandId !=="create"
    });
};



export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.updateBrand(payload),
        mutationKey:[QUERY_KEYS.BRANDS_UPDATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.BRANDS_GET_ALL],
            });
        },

    });
};


//======== CATEGORIES ========//

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.createNewCategory(payload),
        mutationKey:[QUERY_KEYS.CATEGORIES_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CATEGORIES_GET_ALL],
            });
        },
    });
};


export const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORIES_GET_ALL],
        queryFn: () => ACTION.getAllCategories(),
    });
};



export const useGetCategoryDetail = (id:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORIES_GET_DETAIL, id],
        queryFn: () => ACTION.getDetailCategory(id),
        enabled: !!id && id !=="create"
    });
};



export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.updateCategory(payload),
        mutationKey:[QUERY_KEYS.CATEGORIES_UPDATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CATEGORIES_GET_ALL],
            });
        },

    });
};
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => ACTION.deleteCategory(payload),
        mutationKey:[QUERY_KEYS.CATEGORIES_DELETE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CATEGORIES_GET_ALL],
            });
        },

    });
};
//useQueriesGetCateAndBrands

