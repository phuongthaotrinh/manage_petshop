"use server"

import {revalidatePath, revalidateTag} from "next/cache";
import {QUERY_KEYS} from "@/actions/queryKeys";




export const createService = async (payload:any) => {
    (await( await fetch("http://localhost:5007/api/services/new-service",{
        method: "POST",
        body:JSON.stringify(payload),
    }))).json()
    revalidateTag(QUERY_KEYS.SERVICES__GET_ALL)
}