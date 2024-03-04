'use client'

import * as React from "react";
import {useMultiplestepForm} from "@/hooks/useMultiplestepForm";
import {SideBar } from "@/components/admin/services/combo/form-step/sidebar";
import {SuccessMessage } from "@/components/admin/services/combo/form-step/success-message";
import {AnimatePresence} from "framer-motion";
import {ChooseService} from "@/components/admin/services/combo/form-step/chooseService";
import {SelectPet} from "@/components/admin/services/combo/form-step/selectPet";
import {AddonsForm} from "@/components/admin/services/combo/form-step/combo-info";
import {FinalStep} from "@/components/admin/services/combo/form-step/final-step";
import {Button} from "@/components/ui/button";
import {useGetAllServiceOfAllPets, useGetAllServices, useGetPets} from "@/actions/queries/services";
import {ArrowLeft, ArrowRight} from "lucide-react"
import {useMemo} from "react";

export type FormItems = {
    name: string;
    desc:string;
    pets: any[];
    combo:any[]
};

const initialValues: FormItems = {
    name:"",
    desc:"",
    pets:[],
    combo:[]
}

export function ServiceComboForm () {
    const {data:services, isPending} = useGetAllServices();
    const {data:pets, isPending:petSpin} = useGetPets();
    const {data: allData, isPending: allDataStt} = useGetAllServiceOfAllPets();

    const [selectedId, setSelectedId]  = React.useState<any[]>([])
    const [selectedPetsId, setSelectedPetsId]  = React.useState<any[]>([])

    const [formData, setFormData] = React.useState<FormItems>(initialValues);
    const [errors, setErrors] = React.useState<Record<string, string>>({});


    const filterTodos = () => {
        // const uxi = {}
        //   if(allData && !allDataStt) {
        //       const pets =  allData?.filter((item:any) => formData?.pets?.includes(item?.petId));
        //       console.log("pets",pets)
        //   }
        const filteredFormDataPets = formData?.pets.filter(formDataPet => !allData.some((allDataItem:any) => allDataItem.petId._id === formDataPet._id));


        console.log("allData",filteredFormDataPets)
        return  <div>

        </div>
    }

    const visibleTodos = useMemo(
        () => filterTodos(),
        [formData.pets, formData.combo]
    );

    console.log("formData", formData.pets, formData.combo)

    const {
        previousStep,
        nextStep,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        steps,
        goTo,
        showSuccessMsg,
    } = useMultiplestepForm(4);


    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) {
            return;
        }

        if(currentStepIndex < steps -1) {
            nextStep()
        }else{
            console.log("submit", formData)
        }

    };


    const updateForm = (fieldToUpdate: Partial<FormItems>) => {
        const {name, combo,pets, desc} = fieldToUpdate

        if (name && name.trim().length < 3) {
            setErrors((prevState) => ({
                ...prevState,
                name: "Name should be at least 3 characters long",
            }));
        } else if (name && name.trim().length > 15) {
            setErrors((prevState) => ({
                ...prevState,
                name: "Name should be no longer than 15 characters",
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                name: "",
            }));
        }
        if (desc && desc.trim().length < 3) {
            setErrors((prevState) => ({
                ...prevState,
                name: "Desc should be at least 3 characters long",
            }));
        } else if (desc && desc.trim().length > 15) {
            setErrors((prevState) => ({
                ...prevState,
                name: "Desc should be no longer than 15 characters",
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                name: "",
            }));
        }




        const payload = { ...formData, ...fieldToUpdate };
        setFormData(payload);

    }

        return (
           <>
               <div
                   className={`flex justify-between  relative m-1 rounded-lg h-[80vh] `}
               >
                   {!showSuccessMsg ? (
                       <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
                   ) : (
                       ""
                   )}
                   <main
                       className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[80%]"}`}
                   >
                       {showSuccessMsg ? (
                           <AnimatePresence mode="wait">
                               <SuccessMessage />
                           </AnimatePresence>
                       ) : (
                           < >
                               {visibleTodos}
                           <form
                               onSubmit={handleOnSubmit}
                               className="w-full flex flex-col justify-between h-full"
                           >
                               <AnimatePresence mode="wait">
                                   {currentStepIndex === 0 && (
                                       <ChooseService
                                           key="step1" {...formData}  updateForm={updateForm}  errors={errors}
                                           services={services}
                                           selectedId={selectedId}
                                           setSelectedId={setSelectedId}

                                       />
                                   )}
                                   {currentStepIndex === 1 && (
                                       <SelectPet key="step2" {...formData} updateForm={updateForm}
                                                  errors={errors}
                                                  pets={pets}
                                                  setSelectedPetsId={setSelectedPetsId}
                                                  selectedPetsId={selectedPetsId}


                                       />
                                   )}
                                   {currentStepIndex === 2 && (
                                       <AddonsForm key="step3" {...formData} updateForm={updateForm} errors={errors}    />
                                   )}
                                   {currentStepIndex === 3 && (
                                       <FinalStep key="step4" {...formData} goTo={goTo} />
                                   )}
                               </AnimatePresence>
                               <div className="w-full flex items-center gap-3">
                                   <div className="">
                                       <Button
                                           onClick={previousStep}
                                           type="button"
                                           variant="default"
                                           className={`${
                                               isFirstStep
                                                   ? "invisible"
                                                   : "visible p-2  hover:text-white"
                                           }`}
                                       >
                                          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                                       </Button>
                                   </div>
                                   <div className="relative">
                                       <div className="relative top-0 right-0  grid place-items-center after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                                           <Button
                                               type="submit"
                                               className="relative w-full h-full  text-neutral-200 bg-neutral-900 border border-black/20   hover:text-white"
                                           >
                                               {isLastStep ? "Confirm" :  <>
                                                   <ArrowRight className="w-4 h-4 mr-2" />Next
                                               </>}
                                           </Button>
                                       </div>
                                   </div>
                               </div>
                           </form>
                           </>
                       )}
                   </main>
               </div>
           </>
        )
}