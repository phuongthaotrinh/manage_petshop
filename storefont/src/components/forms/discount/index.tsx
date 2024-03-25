'use client';

import {AccordionTrigger, Accordion, AccordionContent, AccordionItem} from "@/components/ui/accordion";
import React from "react";
import {DiscountType} from "@/components/forms/discount/components/discountType";
import {DiscountGeneral} from "@/components/forms/discount/components/general";
import {DiscountConfiguaration} from "@/components/forms/discount/components/discount-configuaration";
import {Conditions} from "@/components/forms/discount/components/conditions/index";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface IDiscount {
    discountType:string,
    general:{
        code: string,
        value:number,
        desc:string
    },
    config:{
        startDate:{
            date:any,
            time:any
        },
        expiry:{
           date:any,
           time:any
        },
        unLimit:boolean
    },
    condition:{
        condition_type: string,
        condition_value:string[]
    }
}

export function DiscountTemplate () {
    const [formState,setFormState] = React.useState<any>();


    const updateData = React.useCallback((fieldToUpdate:any) => {
        setFormState((prevState:any) => ({...prevState, ...fieldToUpdate}));
    }, []);
    console.log("DiscountTemplate",formState);




    const handleOnSubmit = () => {
        console.log("handleOnSubmit",formState)
    }
    return (
        <>
            <form
                onSubmit={handleOnSubmit}
                className="w-full flex flex-col justify-between h-full"
            >
            <Accordion type="multiple" defaultValue={['item-1']} >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                                    <span className="font-semibold text-base relative
                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                          after:text-2xl after:text-red-600 ">
                                        Discount type
                                    </span>
                    </AccordionTrigger>
                    <AccordionContent>
                            <DiscountType updateData={updateData} formState={formState}/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                            <span className="font-semibold text-base relative
                                  after:relative after:bottom-0 after:left-2 after:content-['*']
                                  after:text-2xl after:text-red-600 ">
                                General
                            </span>
                    </AccordionTrigger>
                    <AccordionContent>
                                <DiscountGeneral />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>
                            <span className="font-semibold text-base relative">
                                Configuration
                            </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <DiscountConfiguaration />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>
                            <span className="font-semibold text-base relative">
                                Conditions
                            </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            <>
                                {formState?.condition_option && formState?.condition_data?.length && (
                                    <Alert variant="notification">
                                        <AlertTitle>Heads up!</AlertTitle>
                                        <AlertDescription>
                                            You has chosen <b>{formState?.condition_option}</b>, apply for {formState?.condition_data?.length} items                                </AlertDescription>
                                    </Alert>
                                )}

                            </>
                            <Conditions  updateData={updateData} formState={formState}/>
                        </div>

                    </AccordionContent>
                </AccordionItem>


            </Accordion>
            </form>
        </>
    )
}