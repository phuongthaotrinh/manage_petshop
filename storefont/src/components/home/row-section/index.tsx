'use client';

import React  from "react";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import clsx from "clsx";

interface IRowSection {
    title: string,
    bgColor?: string,
    children:React.ReactNode,
    perView:number,
    spacing:number,
    href?:string
}

export function RowSection({title, bgColor, children,perView,spacing,href}: IRowSection) {

    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: perView,
            spacing: spacing
        },
    });


    return (
        <div className={clsx('py-10 mb-9 container', {
            "bg-red-400": bgColor
        })}>
            <section className="row-title space-y-10">
                <div
                    className="text-center w-full relative capitalize text-dreamPink text-3xl font-[1100] font-lemon tracking-wide select-text">
                    {title} <span
                    className="uppercase text-4xl font-lemon"> {title.length > 0 ? "PET CƯNG" :""}</span>
                    {title.length > 0 && (
                        <div className="w-full grid place-items-center my-3">
                            <img src="/images/bg-title.png" alt=""/>
                        </div>
                    )}
                </div>
                <div className="">
                    <div ref={ref} className="keen-slider">
                        {children}
                    </div>
                </div>
            </section>


        </div>
    )


}