'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import React from "react";
import {type FormItems} from "@/components/forms/product-new";


type IGeneralInfomation = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems

};
export function GeneralInfomation ({updateForm,formData}:IGeneralInfomation)  {
    return (
        <>
            <div id="content" className="my-5 space-y-5">
                <div id="name_n_sub" className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                            Title
                        </Label>
                        <Input
                            autoFocus
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Winter Jacket"
                            onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,name: e.target.value}})}
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold text-muted-foreground">
                            Subtitle
                        </Label>
                        <Input
                            autoFocus
                            type="text"
                            name="sub_title"
                            id="sub_title"
                            placeholder="Warm and cozy"
                            onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,sub_title: e.target.value}})}
                            className="w-full"
                            required
                        />
                    </div>
                </div>
                <div id="handle_n_meterial" className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label className="font-semibold text-muted-foreground">
                            Handle
                        </Label>
                        <Input
                            autoFocus
                            type="text"
                            name="handle"
                            id="handle"
                            placeholder="/ winter-jacket"
                            onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,handle: e.target.value}})}
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold text-muted-foreground">
                            Meterial
                        </Label>
                        <Input
                            autoFocus
                            type="text"
                            name="meterial"
                            id="meterial"
                            placeholder="Warm and cozy"
                            onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,meterial: e.target.value}})}
                            className="w-full"
                            required
                        />
                    </div>
                </div>
                <div id="desc">
                    <div className="space-y-2">
                        <Label className="font-semibold text-muted-foreground">
                            Description
                        </Label>
                        <Textarea  placeholder="A warm and cozy jacket"
                                   name="description" id="description"
                                   onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,description: e.target.value}})}
                        />

                    </div>
                </div>
                <div id="discount_able">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Discountable</span>
                        <Switch name="discount_able"
                                onCheckedChange={(e) => {
                                    updateForm({ generalInfo:{...formData.generalInfo,discount_able: e}})
                                }}

                        />
                    </div>
                    <span>When unchecked discounts will not be applied to this product.</span>

                </div>
            </div>

        </>
    )
}