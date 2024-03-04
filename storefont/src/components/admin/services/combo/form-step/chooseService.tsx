'use client'

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import * as React from "react";
import {Services} from "@/types/service";
import FormWrapper  from "./form-wrapper"

export function ChooseService ({selectedId,setSelectedId,services, updateForm, errors}:{
    selectedId:any[],
    setSelectedId: React.Dispatch<React.SetStateAction<any[]>>,
    services:Services[] | undefined,
    updateForm: (fieldToUpdate: Partial<any>) => void;
    errors: Partial<any>;
}) {

    return (
        <FormWrapper  title="Choose services"
                      description="Please choose more than 2 service">
            <section>
                <div

                    className="w-full h-full"
                >
                    <div >
                        <p className="font-bold px-2 text-orange-500">Services:</p>
                        <div className="flex h-full items-center  p-6">
                            <section className="grid grid-cols-3 grid-flow-row gap-3 cursor-pointer">
                                {services && services?.map((i, j) => (
                                    <div key={j} className="p-3 border border-slate-300 rounded-lg"
                                         onClick={() => {
                                             const checkExist = selectedId.find((ii) => ii._id === i._id);
                                             if(!checkExist) {
                                                 updateForm({combo:[...selectedId, i]});
                                                 setSelectedId([...selectedId, i]);
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
                                {selectedId?.map((i, j) => (
                                    <div key={j} className=" p-3 relative border border-slate-300 rounded-lg"
                                    >
                                        {i?.name}
                                        <button type="button" className="absolute -top-1 -right-1 bg-slate-200 w-4 h-4 rounded-full after:content-['x'] after:text-red-600 after:relative after:-top-1" onClick={() => {
                                            const remove = selectedId?.filter((item) => item._id !== i?._id);
                                            updateForm({combo:remove});
                                            setSelectedId(remove)
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