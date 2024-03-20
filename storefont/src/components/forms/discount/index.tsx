'use client';

import {AccordionTrigger, Accordion, AccordionContent, AccordionItem} from "@/components/ui/accordion";
import React from "react";
import {DiscountType} from "@/components/forms/discount/components/discountType";
import {DiscountGeneral} from "@/components/forms/discount/components/general";
import {DiscountConfiguaration} from "@/components/forms/discount/components/discount-configuaration";
import {Conditions} from "@/components/forms/discount/components/conditions";


export function DiscountTemplate () {
    return (
        <>
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
                            <DiscountType />
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

                        <Conditions />
                    </AccordionContent>
                </AccordionItem>


            </Accordion>
        </>
    )
}