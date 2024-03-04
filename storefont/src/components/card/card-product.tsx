import {Card} from "@/components/ui/card";
import React from "react";

interface CardProductProps {
    data:any
}
export  function CardProduct({data} :CardProductProps) {
    return (
        <>
            <Card className="keen-slider__slide space-y-4">
                <div>
                    <img src={data.img} alt={data.name}/>
                </div>
                <div className="p-2 text-center">
                    <p className="text-ellipsis overflow-hidden  ">
                        {data.name}
                    </p>
                    <p className="text-dream text-base font-bold pt-3">
                        {data.price}
                    </p>
                </div>
            </Card>

        </>
    )
}