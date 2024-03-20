'use client';
import * as React from "react";
import {CardDiscountType} from "@/components/forms/discount/components/card-discount-type";

const type = [
    {
        name: "percentage",
        desc: "Discount applied in %",
        id: '1'
    },
    {
        name: "fixed amount",
        desc: "Discount in whole numbers",
        id: '2',
        children:[
            {
                name: "Total amount",
                desc:"Apply to the total amount",
                id: '2.1',
            },
            {
                name: "Item specific",
                desc:"Apply to every allowed item",
                id: '2.2',
            }

        ]
    },
    {
        name: "free shipping",
        desc: "Override delivery amount",
        id: '3',
    }
];



export function DiscountType () {
    const [typeChecked, setTypeChecked] = React.useState<any | null>(null);
    const [allowChecked, setAllowChecked] = React.useState<any | null>(null)

    const handleSubmit = (value:any) => {
        console.log("hale ", value)
    }


    return (
        <div className="space-y-5">
                <div id="discout_type" className="">
                    <div className="grid grid-cols-3 gap-x-3 items-center">
                        {type.map((i,j) => (
                            <CardDiscountType
                                key={j}
                                data={i}
                                name="discount_type"
                                setTypeChecked={setTypeChecked}

                            />
                        ))}
                    </div>
                </div>

                {typeChecked && typeChecked?.children && (
                    <>
                        <div id="allowcation" className="space-y-3">
                            <h3 className="text-md font-semibold ">Allocation</h3>

                            <div className="flex gap-x-3 items-center">
                                {typeChecked?.children?.map((i:any,j:number) => (
                                    <CardDiscountType
                                        key={j}
                                        data={i}
                                        name="allowcation"
                                        setAllowChecked={setAllowChecked}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}