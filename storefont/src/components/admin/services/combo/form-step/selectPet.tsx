'use client'

import * as React from "react";
import {Pets} from "@/types/weight";
import FormWrapper  from "./form-wrapper"
import {FormItems} from "@/components/forms/service-combo-form";

export function SelectPet ({selectedPetsId,setSelectedPetsId,pets, updateForm, errors}:{
    selectedPetsId:any[],
    setSelectedPetsId: React.Dispatch<React.SetStateAction<any[]>>,
    pets:Pets[] | undefined,
    updateForm: (fieldToUpdate: Partial<any>) => void;
    errors: Partial<FormItems>;
}) {

    return (
        <FormWrapper  title="Choose pet"
                      description="Please select pet">
            <section>
                <div

                    className="w-full h-full"
                >
                    <div >
                        <p className="font-bold px-2 text-orange-500">Services:</p>
                        <div className="flex h-full items-center  p-6">
                            <section className="grid grid-cols-3 grid-flow-row gap-3 cursor-pointer">
                                {pets && pets?.map((i, j) => (
                                    <div key={j} className="p-3 border border-slate-300 rounded-lg"
                                         onClick={() => {
                                             const checkExist = selectedPetsId.find((ii) => ii._id === i._id);
                                             if(!checkExist) {
                                                 updateForm({
                                                     pets:[...selectedPetsId, i]
                                                 });
                                                 setSelectedPetsId([...selectedPetsId, i]);
                                             }

                                         }}
                                    >
                                        {i?.name}
                                    </div>
                                ))}
                            </section>
                        </div>

                    </div>
                    {/*<ResizableHandle withHandle />*/}
                    <div>
                        <p className="font-bold px-2 text-orange-500">Selected services:</p>
                        <div className="relative flex h-full items-center  p-6">

                            <div className="font-semibold grid grid-cols-3 gap-3">
                                {selectedPetsId?.map((i, j) => (
                                    <div key={j} className=" p-3 relative border border-slate-300 rounded-lg"
                                    >
                                        {i?.name}
                                        <button type="button" className="absolute -top-1 -right-1 bg-slate-200 w-4 h-4 rounded-full after:content-['x'] after:text-red-600 after:relative after:-top-1" onClick={() => {
                                            const remove = selectedPetsId?.filter((item) => item._id !== i?._id);
                                            updateForm({pets:remove});
                                            setSelectedPetsId(remove)
                                        }}></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FormWrapper>
    )
}