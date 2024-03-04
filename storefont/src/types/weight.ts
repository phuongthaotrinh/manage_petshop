import {ShareResponse} from "@/types/index";

export interface Weights extends ShareResponse {
    name:string,
    value:string
}

export interface Pets extends ShareResponse {
    name:string,
    status:string,
    icon:string

}

