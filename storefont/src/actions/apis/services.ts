

import {http} from "@/config/axiosClient";
import {Pets, Weights} from "@/types/weight";
import {ComboServiceResponse, Service, Services} from "@/types/service";
import {QUERY_KEYS} from "@/actions/queryKeys";


export const NewsAPI = {
    //=======  PETS  =======//
    CREATE: 'pets/new-pets',
    GET_ALL: 'pets/get-all',
    UPDATE:'pets/edit-pets',
    DELETE_PET:'pets/delete-pet',

    //=======  PETS WEIGHT  =======//
    CREATE_PETS_WEIGHT_DEFAULT: 'weight/new-weight-by-default',
    GET_ALL_PETS_WEIGHT: 'weight/get-all-weight',

    //=======  SERVICES  =======//
    CREATE_SERVICES:'services/new-service',
    GET_ALL_SERVICES:"services/get-all",
    SERVICES__GET_DETAIL_BY_ID: 'services/get-service-by-id',
    SERVICES__SET_SERVICE_PRICE_F0R_PET : "services/set-service-price-of-pet",
    SERVICES__GET_SERVICE_OF_PET : "services/get-service-of-pet",
    SERVICES__UPDATE_SERVICE_PRICE_F0R_PET : "services/update-service-of-pet",
    SERVICES__GET_SERVICE_OF_ALL_PETS : "services/get-service-of-all-pet",

    // [POST] /api/combo/new-combo-services
    SERVICES_COMBO__CREATE: 'combo/new-combo-services',
    SERVICES_COMBO__GET_ALL:'combo/get-all-combo-services'
}
export async function createNewPets(payload:any) {
    return await  http.post(NewsAPI.CREATE,payload)
}


export async function getALlPets() {
    const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}${NewsAPI.GET_ALL}`,
        {
            method: "GET",
        }
    );
    const data = await res2.json();
    if(data?.data) {
        return  data?.data ? data?.data as Pets[] : []
    }
}

export async function updatePets(payload:any) {
    return await  http.patch(NewsAPI.UPDATE,payload)
}
export async function deletePet(payload:string) {
    return await http.delete(`${NewsAPI.DELETE_PET}/${payload}`)
}

export async function createNewPetWeightDefault(payload:any) {
    return await  http.post(NewsAPI.CREATE_PETS_WEIGHT_DEFAULT,payload)
}

export async function getALlPetWeight():Promise<Weights[]> {
    const {data} = await http.get(NewsAPI.GET_ALL_PETS_WEIGHT);
    return data.data ? data.data : []
}

//======SERVICE======//
export async function createService(payload:any) {
    return await  http.post(NewsAPI.CREATE_SERVICES,payload)
}

export async function getAllServices():Promise<Services[]> {
    const {data} =  await  http.get(NewsAPI.GET_ALL_SERVICES);
    return  data.data ? data.data: []
}

export async function getDetailServiceById(serviceId:string):Promise<Service> {
    const {data} =  await  http.get(`${NewsAPI.SERVICES__GET_DETAIL_BY_ID}/${serviceId}`);
    return  data.data ? data.data: []
}

export async function setServicePriceForPet(payload:any) {
    return await  http.post(NewsAPI.SERVICES__SET_SERVICE_PRICE_F0R_PET,payload)
}
export async function updateServicePriceForPet(payload:any) {
    return await  http.patch(NewsAPI.SERVICES__UPDATE_SERVICE_PRICE_F0R_PET,payload)
}
export async function getServiceOfPet(petId:string):Promise<any> {
    const {data} =  await  http.get(`${NewsAPI.SERVICES__GET_SERVICE_OF_PET}/${petId}`);
    const petInfo = data?.data;


    return  data.data ? data.data: []
}

//====== SERVICE COMBO======//

export async function createComboService(payload:any) {
    return await  http.post(NewsAPI.SERVICES_COMBO__CREATE,payload)
}

export async function getAllComboService():Promise<ComboServiceResponse[]> {
    const {data} =  await  http.get(NewsAPI.SERVICES_COMBO__GET_ALL);
    return  data?.data ? data?.data : []
}



export async function getAllServiceOfAllPets () {
    const {data} = await http.get(NewsAPI.SERVICES__GET_SERVICE_OF_ALL_PETS);
    return  data?.data ? data?.data : []
}