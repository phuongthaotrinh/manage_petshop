'use client';

import * as React from "react";
import {Button} from "@/components/ui/button"
import {PlusIcon} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { ArrowRight} from "lucide-react";
import {clsx} from "clsx"


export function Conditions () {
    const [open, setOpen] = React.useState<boolean>(false)
    const [goValue, setGoValue] = React.useState<string | null>(null)
    return (
        <>
            <div id="btn_action">
                <Button onClick={() => {
                    setOpen(true)
                }} variant="grey" className="w-full">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Condition
                </Button>
            </div>
            <Dialog open={open} onOpenChange={() => {setOpen(!open)}}>
                <DialogContent className="w-full  min-w-[750px]">
                    <DialogHeader className="h-20">
                        <DialogTitle className="text-xl">Add Conditions</DialogTitle>
                        <DialogDescription>
                            Choose a condition type
                        </DialogDescription>
                    </DialogHeader>

                    {conditions?.map((i, j) => (
                        <ConditionItem  key={j} data={i} setGoValue={setGoValue} goValue={goValue} />
                    ))}
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>




        </>
    )
}


const ConditionItem = ({data, setGoValue, goValue}:{data:{value: string, name: string, desc: string}, setGoValue:any, goValue:any}) => {
    return (
        <div className={clsx("p-5 border rounded-sm cursor-pointer" ,{
            'border border-dreamOrange' : data?.value === goValue
        })}
             onClick={() => setGoValue(data?.value)}
        >
            <div className="flex justify-between">
              <div>
                  <h3>{data?.name}</h3>
                  <small>{data?.desc}</small>
              </div>
                <Button variant="link" onClick={() => setGoValue(data?.value)}>
                    <ArrowRight className="w-4 h-4"/>
                </Button>
            </div>
        </div>
    )
}

const conditions = [
    { value:'products', name: 'Product', desc:"Only for specific products "},
    { value:'customer_group', name: 'Customer group', desc:"Only for specific customer group "},
    { value:'services', name: 'Service', desc:"Only for specific services"},

]