'use client'
import {Switch} from "@/components/ui/switch"
import React,{memo} from "react";

import { TimePicker } from "@/components/ui/time-picker";
import {DateTimePicker} from "@/components/ui/date-time-picker";
import { IDiscount} from "@/validations/discount";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";

type DiscountConfig = {
    date: Date | null;
    time: Date | null;
    status: boolean;
    quantity?: number;
};

type ConfigType = {
    startDate: DiscountConfig;
    expiry: DiscountConfig;
    unLimit: DiscountConfig;
};


type IDiscountConfiguaration = IDiscount & {
    updateData:(value:Partial<IDiscount>) => void
}

export function DiscountConfiguration ({config, updateData}:IDiscountConfiguaration) {
    const [checked, setChecked] = React.useState<string[]>([])

    const handleConfigChange = (id: keyof ConfigType, value: Partial<DiscountConfig>) => {
            updateData({
                config: {
                    ...config,
                    [id]: {
                        ...config[id],
                        ...value,
                        status: checked.includes(id)
                    },
                },
            })


    };



    return (
        <div className="space-y-4">
            {configuaration.map((i, j) => (
                <React.Fragment key={`${j}.${i.id}`}>
                    <EnableDiscountItem key={`${j}.${i.id}`}
                                        data={i}
                                        setChecked={setChecked}
                                        checked={checked}
                                        updateData={updateData}
                                        config={config}
                    />

                        {checked && checked.includes(i.id) ? (
                            <>
                                {i.id !== "unLimit" ? (
                                    <div className={cn("grid grid-cols-2 gap-3 ")}>
                                        <DateTimePicker
                                            onChange={(date) =>{

                                                handleConfigChange(i.id as keyof ConfigType, {date} as any)
                                            }}
                                        />
                                        <TimePicker
                                            onChange={(time) =>{
                                                handleConfigChange(i.id as keyof ConfigType, {time} as any)
                                            }}
                                        />
                                    </div>
                                ) : (
                                        <Input
                                            onChange={(e) =>
                                                handleConfigChange(i.id as keyof ConfigType, {
                                                    quantity: parseInt(e.target.value, 10),
                                                })
                                            }
                                        />
                                )}
                            </>
                        ):null}
                </React.Fragment>
            ))}


        </div>
    )
}

interface EnableDiscountItemProps {
    data:{id: string, name: string, desc: string},
    checked: string[],
    setChecked:React.Dispatch<React.SetStateAction<string[]>>,
    updateData:(value:Partial<IDiscount>) => void,
    config:any
}

const  EnableDiscountItem = memo(
    function EnableDiscountItem ({data, setChecked, checked,updateData,config} :EnableDiscountItemProps)  {
        return (
                <div className="flex items-center gap-3 border rounded-md leading-7 p-5">
                    <div className="flex-1">
                        <b>{data.name}</b>
                        <p className="text-muted-foreground text-sm">{data?.desc}</p>
                    </div>
                    <div>
                        <Switch name={data?.id}
                                onCheckedChange={(e) =>{
                                    if(checked.length ===0) {
                                        setChecked([data?.id]);
                                    }
                                    else {
                                        if(!e) {
                                            const exist = checked.filter((i) => i !== data?.id)
                                            setChecked(exist);
                                            updateData({
                                                    config: {
                                                        ...config,
                                                        [data?.id]: {
                                                            date:  null,
                                                            time:  null,
                                                            status: false,
                                                            quantity: null
                                                        },
                                                    },

                                            })
                                        }else {
                                            setChecked([...checked, data?.id]);

                                        }
                                    }


                                }}
                                checked={checked.includes(data.id) }
                        />
                    </div>
                </div>
        )
    }
)


const configuaration = [
    {
        id: 'startDate',
        name: "Start date",
        desc:"Schedule the discount to activate in the future."
    },
    {
        id: 'expiry',
        name: "Discount has an expiry date?",
        desc:"Schedule the discount to deactivate in the future."
    },
    {
        id: 'unLimit',
        name: "Limit the number of redemptions?",
        desc:"Limit applies across all customers, not per customer."
    }
]
