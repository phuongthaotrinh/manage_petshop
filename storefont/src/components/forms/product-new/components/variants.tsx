'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import React, { forwardRef, useRef } from "react";
import {type FormItems, initialValues} from "@/components/forms/product-new/index2";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import MultipleSelector, {MultipleSelectorRef, Option} from "@/components/common/multi-select/fancy-multi-and-combobox";
import {Button} from "@/components/ui/button";
import {Plus, Trash} from "lucide-react";
import {clsx} from "clsx";


type IGeneralInfomation = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems,
    setFormData:React.Dispatch<React.SetStateAction<FormItems>>,
    limit?: number
};


export const Variants = forwardRef<HTMLDivElement, IGeneralInfomation>(
    ({ updateForm, formData, setFormData, limit }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const selectorRef = useRef<MultipleSelectorRef>(null);
        const [message, setMessage] = React.useState("")

        const {register, control, handleSubmit, reset, trigger, setError} = useForm({
            defaultValues: initialValues
        });
        const {fields, append, remove} = useFieldArray({
            control,
            name: "variants"
        });
        // Component logic

        return (
            <div ref={ref} id="content2" className="my-5 space-y-5">
                <div id="content2" className={clsx("my-5 ", {
                    "flex items-center gap-5":!formData.variants?.length,
                    "grid space-y-5 mt-5":formData.variants?.length
                })}>
                <span>Variant</span>
                    <ul>
                        {fields.map((item, index) => (
                            <li className="flex gap-3" key={item.id}>
                                <Input
                                    autoFocus
                                    type="text"
                                    id={`variants.${index}.name`}
                                    name={`variants.${index}.name`}
                                    ref={index === fields.length - 1 ? inputRef : null}
                                    placeholder="Warm and cozy"
                                    onChange={(e) => {
                                        updateForm({
                                            variants: formData?.variants?.map((variant, i) => {
                                                if (i === index) {
                                                    return { ...variant, name: e.target.value };
                                                }
                                                return variant;
                                            }),
                                        });

                                    }}
                                    className="w-full"
                                    required
                                />
                                <Controller
                                    render={({ field }) => (
                                        <MultipleSelector
                                            {...field}
                                            ref={selectorRef}
                                            creatable={true}
                                            value={formData?.variants[index]?.value || []}
                                            onChange={(e: Option[]) => {
                                                updateForm({
                                                    variants: formData.variants?.map((variant, i) => {
                                                        if (i === index) {
                                                            return { ...variant, value: e };
                                                        }
                                                        return variant;
                                                    }),
                                                });
                                            }}
                                        />
                                    )}
                                    // name={`variants.${index}.value`}
                                    {...register(`variants.${index}.value`)}
                                    control={control}
                                />
                                <Button variant="secondary" type="button"
                                        onClick={() => {
                                            remove(index);
                                            const updatedVariants = [...formData.variants];
                                            updatedVariants.splice(index, 1);
                                            setFormData({
                                                ...formData,
                                                variants: updatedVariants,
                                            });
                                        }}
                                >
                                    <Trash  className="w-4 h-4"/>
                                </Button>
                            </li>
                        ))}
                    </ul>

                    {limit && formData.variants.length < limit ? (
                        <Button variant="secondary" type="button" className="w-64"
                                onClick={() => {
                                    const data = formData.variants.push({
                                        name: "",
                                        value: []
                                    }) as any;
                                        append(data)
                                }}
                        >
                            <Plus  className="w-4 h-4 mr-2 "/><span className="font-medium">
                            Add an option
                        </span>
                        </Button>
                    ):null}

                </div>
            </div>
        );
    }
);

Variants.displayName = 'Variants';
export default Variants;