"use client"

import {TruckIcon} from "lucide-react";
import * as React from "react";
import {cn} from "@/lib/utils";

export function ProgressCart ({needMore, percent, ...className}:{needMore:string | number | undefined, percent: string}) {
    return (
        <>
            <section id="cart_spinner"  className={cn(className)}>
                <div
                    className="cart-shipping__bar relative top-0 my-[10px] bg-[#e9e9e9] w-full h-[8px] rounded mt-2">
                    {needMore && needMore !== 0 ? (
                        <span
                            className="shipping-bar bg-[#ffbc11] relative h-full block transition-[width] rounded ease-in-out duration-[0.4s] delay-0 "
                            style={{width: `${percent}`}}>
                                <span
                                    className="icon bg-[#ffbc11] text-[#ffbc11] top-[-15px] w-[30px] h-[30px] inline-flex items-center justify-center rounded-full absolute right-0   translate-x-1/2">
                                    <TruckIcon style={{color: "#fff"}}/>
                                </span>
                         </span>
                    ) : (
                        <span
                            className="shipping-bar bg-[#3d9851] relative h-full block transition-[width] rounded ease-in-out duration-[0.4s] delay-0 "
                            style={{width: "100%"}}>
                            <span
                                className="icon bg-[#3d9851] text-[#3d9851] top-[-15px] w-[30px] h-[30px] inline-flex items-center justify-center rounded-full absolute  right-0   translate-x-1/2">
                                <TruckIcon style={{color: "#fff"}}/>
                            </span>
                        </span>
                    )}
                </div>
            </section>
        </>
    )
}