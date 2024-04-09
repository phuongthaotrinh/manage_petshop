'use client';
import * as React from "react";
import {cn} from "@/lib/utils"

interface CardDiscountTypeProps {
    data:{name: string, desc:string, id:string},
    defaultChecked?: boolean,
    name:string,
    setTypeChecked?: React.Dispatch<React.SetStateAction<any>>,
    setAllowChecked?: React.Dispatch<React.SetStateAction<any>>
}
 export const CardDiscountType = ({data,defaultChecked, name, setTypeChecked,setAllowChecked}:CardDiscountTypeProps) => {
    return (
        <div className={cn("border rounded-md p-2.5 h-full cursor-pointer")}>
                <div className="flex gap-3 items-center ">
                    <div className="radio">
                        <input type="radio" name={name}
                               className="w-5 h-5 focus:ring-dreamOrange"
                                checked={defaultChecked}
                               id={data.name}
                                onChange={(e) =>{
                                    setTypeChecked && setTypeChecked(data);
                                    setAllowChecked && setAllowChecked(data)
                                }}
                        />
                    </div>
                    <div className="flex-1 grid">
                        <b>{data?.name}</b>
                        <small className="text-muted-foreground">{data?.desc}</small>
                    </div>
                </div>
        </div>
    )
}