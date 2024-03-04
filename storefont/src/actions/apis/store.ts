import {http} from "@/config/axiosClient";


export const NewsAPI = {
    CREATE: 'store/create',
    GET_STORE: 'store/get-store',
    UPDATE_STORE: 'store/edit-store'
}
export async function createNewStore(payload:any) {
    return await  http.post(NewsAPI.CREATE,payload)
}

export async function getStore() {
    const {data} =  await http.get(NewsAPI.GET_STORE)
    return data?.data?.[0]
}

export async function updateStore(payload:any) {
    return await  http.patch(NewsAPI.UPDATE_STORE,payload)
}
