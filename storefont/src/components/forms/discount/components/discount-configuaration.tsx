'use client'
import {Switch} from "@/components/ui/switch"
import * as React from "react";

import { TimePicker } from "@/components/ui/time-picker";
import {DateTimePicker} from "@/components/ui/date-time-picker";


export function DiscountConfiguaration () {
    const [checked, setChecked] = React.useState<string[]>([])
    const [currentCheck, setCurrentCheck] = React.useState<string>("")



    return (
        <div className="space-y-4">
            {configuaration.map((i, j) => (
                <>
                    <EnableDiscountItem key={j}
                                        data={i}
                                        setChecked={setChecked}
                                        checked={checked}
                                        setCurrentCheck={setCurrentCheck}
                    />
                    {(checked?.includes(i?.id)) && <p>{i.name}</p>}
                </>

            ))}


        </div>
    )
}

let change = 0
function EnableDiscountItem ({data, setChecked, checked,setCurrentCheck } :
                                 {data:{id: string, name: string, desc: string},  checked: string[], setChecked:React.Dispatch<React.SetStateAction<string[]>>,setCurrentCheck:React.Dispatch<React.SetStateAction<string>>})  {
    return (
       <>

           <div className="flex items-center gap-3 border rounded-md leading-7 p-5">
               <div className="flex-1">
                   <b>{data.name}</b>
                   <p className="text-muted-foreground text-sm">{data?.desc}</p>
               </div>
               <div>
                   <Switch name={data?.id}
                           onCheckedChange={(e) =>{
                               if(checked.length ==0) {
                                   setChecked([...data?.id]);
                               }
                               else {
                                   if(e == false) {
                                       const exist = checked.filter((i) => i !== data?.id)
                                       setChecked(exist)
                                   }else {
                                       setChecked([...checked, data?.id]);

                                   }
                               }
                               setCurrentCheck(data?.id)
                           }}
                           checked={checked.includes(data.id) }
                   />
               </div>
           </div>
       </>
    )
}


const configuaration = [
    {
        id: '1',
        name: "Start date",
        desc:"Schedule the discount to activate in the future."
    },
    {
        id: '2',
        name: "Discount has an expiry date?",
        desc:"Schedule the discount to deactivate in the future."
    },
    {
        id: '3',
        name: "Limit the number of redemptions?",
        desc:"Limit applies across all customers, not per customer."
    }
]

