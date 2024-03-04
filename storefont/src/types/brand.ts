import {ShareResponse} from "@/types/index";


export interface BrandCreate {
    name:string,
    status:boolean,
    desc: string,
    images:any,
}

export interface Brands extends ShareResponse, BrandCreate {
    slug: string
}
