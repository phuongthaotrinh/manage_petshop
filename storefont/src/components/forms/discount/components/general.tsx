'use client';

import {Input} from "@/components/ui/input"
import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {UseFormReturn} from "react-hook-form";
import { DiscountInfer} from "@/validations/discount";

type IDiscountGeneral ={
    form:UseFormReturn<DiscountInfer>
}

export const DiscountGeneral = ({form}:IDiscountGeneral) => {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="general.code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="general.amount"
                        render={({ field }) => {
                            const formVal = form.getValues()
                            return (
                                <FormItem>
                                    <FormLabel>Amount ({formVal?.discountType === "1" ? "%" : "vnd"})</FormLabel>
                                    <FormControl>
                                            <Input type="number" min={1} {...field}
                                            onChange={event => {
                                                const  _value = +event.target.value;
                                                console.log("v_value",_value)
                                                if(form.getValues().discountType == "1" && _value >= 90) {
                                                     form.setError("general.amount",{type:"max", message: "Amount can't exceed 90%"}, {shouldFocus: true})
                                                }


                                                    field.onChange(_value)

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </div>
            </div>
            <small className="my-3">The code your customers will enter during checkout. This will appear on your customer’s invoice.
                Uppercase letters and numbers only.</small>
            <div>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="general.desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Description</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>



        </div>
    )
}