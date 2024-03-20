'use client'
import style from "./style.module.scss";
import {CardProduct} from "@/components/card/card-product";
import React from "react";
import {useGetListProduct} from "@/actions/queries/products";
import {Carousel, CarouselItem, CarouselNext, CarouselContent,CarouselPrevious, CarouselApi} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {clsx} from "clsx"


export function FeaturedProduct() {
     const {data, isPending, isError} = useGetListProduct();



    const dataLenght = data?.length;
    if(data)
        return (
            <div className={style.section}>
                <div className={style.feature_prd_head}>
                    <h3 className={style.feature_prd_text}>
                        Sản phẩm nổi bật
                    </h3>
                </div>
                <div className={style.content}>
                    <div className="h-full">
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-1">
                                {data && data.map((item:any, index:any) => (
                                    <CarouselItem key={index} className={clsx("pl-1 ", {
                                        "md:basis-1/3 lg:basis-1/5 xs:basis-1/2":dataLenght,
                                    })}>
                                        <div className="p-1  h-full  rounded-md">
                                                    <CardProduct data={item}/>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {dataLenght > 5 && (
                                <>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </>
                            )}

                        </Carousel>
                    </div>

                </div>

            </div>
        )
}