import {ShareResponse} from "@/types/index";

export interface Customers extends ShareResponse {
    email:string,
    phoneNumber:string,
    password:string,
    fullName:string,
    username:string,
    dob:any,
    images:any,
    role:"Admin" | "Customers",
    bio:string,
    isVerified:boolean,
    socials:Array<string[]>,
    status:string,

}