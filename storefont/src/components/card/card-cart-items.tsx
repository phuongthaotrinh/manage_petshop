'use client'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {formatPrice} from "@/lib/helpers";
import {Input} from "@/components/ui/input";
import * as React from "react";

export const CardCartItems = ({data, updateQuantity,deleteProduct}:
                               {data:any, updateQuantity:(id:string, quantity:number) => void, deleteProduct:(id:string) => void})   => {
    const keys = Object.keys(data?.attributes);
    let renderedAttributes = '';

    keys.forEach((key, index) => {
        renderedAttributes += `${key}: ${data?.attributes[key]}`;
        if (index !== keys.length - 1) {
            renderedAttributes += '/';
        }
    });
    return (
        <div className="border border-slate-300 rounded  my-5 flex ">
            <div className="relative">
                <div id="image " className="row-span-3 relative">
                    <img src={data?.image} alt="" className="w-20 h-20 "/>
                </div>

                <div id="remove_prd" className="absolute -top-2 -left-1 w-5 h-5 bg-amber-500 rounded-full " onClick={() => deleteProduct(data?.id)}>
                    <span className="relative -top-1 left-1.5 cursor-pointer text-white text-base">x</span>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <div id="remove_prd" className="absolute -top-2 -left-1 w-5 h-5 bg-amber-500 rounded-full ">
                            <span className="relative -top-1 left-0 cursor-pointer text-white text-base">x</span>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteProduct(data?.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className="flex-1">
                <div id="cart_info_product" className=" grid grid-flow-row gap-2 p-2">
                    <div className="text-base font-semibold flex items-center">
                        {data?.name}
                        <div className="text-muted-foreground px-3 text-sm flex items-center">
                            ({renderedAttributes} )
                        </div>
                    </div>
                    <div  className="flex items-center  gap-5">
                        <p className="text-sm">Quantity: {data?.quantity}</p>
                        <p className="text-sm">Price: <span>
                            {formatPrice(Number(data?.price) * Number(data?.quantity))}
                        </span></p>
                        <Input  className="border border-orange-500 w-1/5   " type="number" min={1} value={data?.quantity}
                                onChange={(event:any) => {
                                    event.preventDefault();
                                    updateQuantity(data?.id, event.target.value);
                                }}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

