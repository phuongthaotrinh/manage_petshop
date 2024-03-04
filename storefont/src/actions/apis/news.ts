import {http} from "@/config/axiosClient";


export const NewsAPI = {
    CREATE: 'news/new-post',
    GET_ALL: 'news/get-all',
    DELETE_POST: 'news/delete-post',
    GET_POST_BY_ID: 'news/get-by-id',
    UPDATE_POST: 'news/edit-post'
}
export async function createNewPost(payload:any) {
    return await  http.post(NewsAPI.CREATE,payload)
}

export async function getALlPost() {
    const {data} = await http.get(NewsAPI.GET_ALL);
    return data.data ? data.data : []
}

export async function deletePost(payload:string) {
    return await http.delete(`${NewsAPI.DELETE_POST}/${payload}`)
}

export async function getPostById(payload:string) {
    const {data} = await http.get(`${NewsAPI.GET_POST_BY_ID}/${payload}`);
    return data.data ? data.data : null
}

export async function updatePost(payload:any) {
    const {data} = await http.patch(`${NewsAPI.UPDATE_POST}`,payload);
    return data.data ? data.data : null
}