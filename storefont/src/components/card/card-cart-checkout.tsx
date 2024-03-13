import {formatPrice} from "@/lib/helpers";
import * as React from "react";

export const CardCartCheckout = ({data}:
                       {data:any})   => {
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

                <div id="remove_prd" className="absolute -top-2 -left-1 w-5 h-5 bg-amber-500 rounded-full">
                    <span className="relative h-full grid place-items-center  cursor-pointer text-white text-sm">
                        {data?.quantity}
                    </span>
                </div>
            </div>

            <div className="flex-1">
                <div id="cart_info_product" className=" grid grid-flow-row gap-2 p-2">
                    <div className="text-base font-semibold flex items-center">
                        {data?.name}

                    </div>
                    <div  className="flex items-center justify-between gap-5">
                        <p className="text-sm">
                            {renderedAttributes}
                        </p>
                        <p className="text-sm font-semibold">
                            {formatPrice(Number(data?.price) * Number(data?.quantity))}
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}
