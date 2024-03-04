
import FormWrapper from "./form-wrapper";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";
import {FormItems} from "@/components/forms/service-combo-form";

type stepProps = FormItems & {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    errors: Partial<FormItems>;
};

const AddonsForm = ({ updateForm, errors, name, desc }: stepProps) => {
    return (
        <FormWrapper
            title="Pick add-ons"
            description="Add-ons help enhance your gaming experience"
        >
            <div className="flex flex-col gap-3">
                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            autoFocus
                            type="text"
                            name="name"
                            id="name"
                            placeholder="e.g. Stephen King"
                            onChange={(e) =>{
                               updateForm({ name: e.target.value })
                            }}
                            value={name}
                            className="w-full"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                </div>

                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Desc</Label>
                        <Textarea
                            autoFocus
                            name="desc"
                            id="desc"
                            placeholder="e.g. Stephen King"
                            onChange={(e) =>{
                                updateForm({ desc: e.target.value })
                            }}
                            value={desc}
                            className="w-full"
                            required
                        />
                        {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}

                    </div>
                </div>
            </div>
        </FormWrapper>
    );
};

export {AddonsForm};