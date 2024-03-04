import {ShareResponse} from "@/types/index";
import {Weights, Pets} from "@/types/weight";



export interface Services extends ShareResponse {
    name:string,
    status:boolean,
    desc: string,
    dataService:Array<string>
}

export interface PriceOfPet {
    petId:string,
    petData:Pets,
    price:number,
    _id:string
}
export interface DataServiceInfo extends ShareResponse{
    weightId:string,
    weightInfo:Weights,
    data:PriceOfPet[]
}

export interface Service extends Services {
    dataServiceInfos:DataServiceInfo
}


export interface Combos extends ShareResponse{
    name:string,
    price:string,
    images:any,
    desc:string,
    status:boolean
}


export interface ComboData extends ShareResponse{
    comboId:string,
    serviceId:Omit<Services, "dataService">
}

export interface ComboDataResponse extends Combos{
    comboData:ComboData[]
}

export interface ComboServiceResponse {
    combo:ComboDataResponse
}
