'use client';

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React from "react";

export const DiscountGeneral = () => {
    return (
        <div className="space-y-5">

            <div className="grid grid-cols-2 gap-3">
                {/*CODE*/}
                <div className="space-y-2">
                    <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                        Code
                    </Label>
                    <Input
                        autoFocus
                        type="text"
                        name="code"
                        id="name"
                        placeholder="SUMMERSALE10"
                        className="w-full"
                        required
                    />
                </div>


            {/* AMOUNT*/}
                <div className="space-y-2">
                    <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                        Amount
                    </Label>
                    <Input
                        autoFocus
                        type="text"
                        name="amount"
                        id="name"
                        placeholder="SUMMERSALE10"
                        className="0.00"
                        required
                    />
                </div>
            </div>
            <small className="my-3">The code your customers will enter during checkout. This will appear on your customer’s invoice.
                Uppercase letters and numbers only.</small>




            <div>
                <div className="space-y-2">
                    <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                        Description
                    </Label>
                    <Input
                        autoFocus
                        type="text"
                        name="desc"
                        id="desc"
                        placeholder="Summer Sale 2024"
                        className="w-full"
                        required
                    />
                </div>
            </div>



        </div>
    )
}