import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/actions/queryKeys";
import { INewPost } from "@/types/post";
import * as POST_ACTION from "@/actions/apis/news"


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: INewPost) => POST_ACTION.createNewPost(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
        },
    });
};

export const useGetPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POSTS],
        queryFn: () => POST_ACTION.getALlPost(),
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QUERY_KEYS.DELETE_POST],
        mutationFn: ({ postId }: { postId: string }) =>
            POST_ACTION.deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
        },

    });
};
export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => POST_ACTION.getPostById(postId),
        enabled: !!postId && postId !== "create",
    });
};

export const useUpdatePost = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) =>
            POST_ACTION.updatePost(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID,postId],
            });
        },
        mutationKey:[QUERY_KEYS.UPDATE_POST, postId]

    });
};