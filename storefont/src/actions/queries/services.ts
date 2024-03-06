import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import * as SERVICE_ACTION from "@/actions/apis/services";
import {QUERY_KEYS} from "@/actions/queryKeys";
import * as ACTION from "@/actions/apis/brand&categories";
import {deleteServices} from "@/actions/apis/services";


//=======  PETS  =======//

 const useCreatePets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.createNewPets(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PETS_GET_PETS],
            });
            queryClient.refetchQueries({
                queryKey: [QUERY_KEYS.PETS_GET_PETS],
            })
        },
    });
};

const useGetPets = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PETS_GET_PETS],
        queryFn: () => SERVICE_ACTION.getALlPets(),

    });
};

const useUpdatePets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.updatePets(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PETS_GET_PETS],
            });
        },
    });
};
const useDeletePet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ petId }: { petId: string }) =>
            SERVICE_ACTION.deletePet(petId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PETS_GET_PETS],
            });
        },

    });
};



//=======  PETS_WEIGHT =======//


const useCreatePetWeightDefault = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.createNewPetWeightDefault(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PETS_WEIGHT__GET_PETS],
            });
        },
    });
};

const useGetPetWeight= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PETS_WEIGHT__GET_PETS],
        queryFn: () => SERVICE_ACTION.getALlPetWeight()
    });
};


//=======  SERVICES  =======//


const useCreateServices = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.createService(payload),
        mutationKey:[QUERY_KEYS.SERVICES__CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SERVICES__GET_ALL],
            });
        },

    });
};


const useGetAllServices = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES__GET_ALL],
        queryFn: () => SERVICE_ACTION.getAllServices(),

    });
}

const useGetDetailServiceById = (serviceId:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES__GET_DETAIL_BY_ID,serviceId],
        queryFn: () => SERVICE_ACTION.getDetailServiceById(serviceId),
        enabled:!!serviceId
    });
}

const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:any) => SERVICE_ACTION.deleteServices(payload),
        mutationKey:[QUERY_KEYS.SERVICES__DELETE],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SERVICES__GET_ALL],
            });
        },

    });
}

const useSetServicesPrice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.setServicePriceForPet(payload),
        mutationKey:[QUERY_KEYS.SERVICES__SET_SERVICE_PRICE_F0R_PET],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SERVICES__GET_ALL_SERVICE_OF_PETS],
            });
        },

    });
};
const useUpdateServicesPrice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.updateServicePriceForPet(payload),
        mutationKey:[QUERY_KEYS.SERVICES__UPDATE_SERVICE_PRICE_F0R_PET],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SERVICES__GET_ALL_SERVICE_OF_PETS],
            });
        },
        onSettled:() => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SERVICES__GET_ALL_SERVICE_OF_PETS],
            });
        }

    });
};

const useGetServiceOfPets = (petId:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES__GET_ALL_SERVICE_OF_PETS],
        queryFn: () => SERVICE_ACTION.getServiceOfPet(petId),
        enabled:!!petId

    });
}

const useGetAllServiceOfAllPets = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES__GET_SERVICE_OF_ALL_PETS],
        queryFn: () => SERVICE_ACTION.getAllServiceOfAllPets(),
        placeholderData:true
    });
}

//=======  SERVICES_COMBO  =======//
export const useCreateServicesCombo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => SERVICE_ACTION.createComboService(payload),
        mutationKey:[QUERY_KEYS.SERVICES_COMBO__CREATE],

        // onSuccess: () => {
        //     queryClient.invalidateQueries({
        //         queryKey: [QUERY_KEYS.SERVICES__GET_ALL],
        //     });
        // },

    });
};


export const useGetAllServicesCombo = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES_COMBO__GET_ALL],
        queryFn: () => SERVICE_ACTION.getAllComboService(),

    });
}
export const useGetDetailServicesCombo = (id:string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SERVICES_COMBO__GET_ALL],
        queryFn: () => SERVICE_ACTION.getAllComboService(),
        enabled:!!id || id == "create",
        select:(data) => {
            const i =  data.find((i) => i.combo._id == id);
            return i?.combo
        }
    });
}
export {
    useGetPets,
    useUpdatePets,
    useCreatePets,
    useDeletePet,
    useCreatePetWeightDefault,
    useGetPetWeight,
    useCreateServices,
    useGetAllServices,
    useGetDetailServiceById,
    useSetServicesPrice,
    useGetServiceOfPets,
    useUpdateServicesPrice,
    useGetAllServiceOfAllPets,
    useDeleteService
}