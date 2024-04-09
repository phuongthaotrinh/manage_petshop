'use client';

import * as React from "react";
import { DiscountInfer } from "@/validations/discount";
import {UseFormReturn} from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {discount_type} from "@/constants/data";

type DiscountTypeProps = {
    form:UseFormReturn<DiscountInfer>
}

export function DiscountType ({form}:DiscountTypeProps) {
    const [type, setType] = React.useState<string>("");

    const child = React.useMemo(() => {
        if(type) {
            const sibling = discount_type.find((i) => i.id === type);
            if(sibling && sibling.children && sibling.children.length > 0 ) return sibling.children;
        }
    },[type]);


    return (
        <div className="space-y-5 ">
                <div id="discout_type" className="">
                        <FormField
                            control={form.control}
                            name="discountType"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(e) => {
                                                field.onChange(e);
                                                setType(e)
                                            }}
                                            defaultValue={field.value}
                                            className="grid md:grid-cols-2 sm:grid-col-1 gap-3 "
                                        >
                                            {discount_type.map((i:any, j:number) => (
                                                <FormItem key={j} className="border border-gray-900/25 p-4 rounded-md ">
                                                    <div className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value={i.id} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {i.name}
                                                        </FormLabel>
                                                    </div>
                                                    <div>
                                                        <FormDescription>{i.desc}</FormDescription>
                                                    </div>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </div>

                <div className="discount-child">
                    {child ? (
                            <FormField
                                control={form.control}
                                name="allocation"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Allowcation</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(e) => {
                                                    field.onChange(e);
                                                }}
                                                defaultValue={field.value}
                                                className="grid md:grid-cols-3 sm:grid-col-1 gap-3 "
                                            >
                                                {child.map((i:any, j:number) => (
                                                    <FormItem key={j} className="border border-gray-900/25 p-4 rounded-md ">
                                                        <div className="flex items-center gap-3">
                                                            <FormControl>
                                                                <RadioGroupItem value={i.id} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {i.name}
                                                            </FormLabel>
                                                        </div>
                                                        <div>
                                                            <FormDescription>{i.desc}</FormDescription>
                                                        </div>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                    ):null}
                </div>
        </div>
    )
}