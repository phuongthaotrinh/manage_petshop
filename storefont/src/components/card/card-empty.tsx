import * as React from "react";
import {cn} from "@/lib/utils";

interface CartEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType
    separated?: boolean
}

export function CardEmpty({
                        className,
                        children,
                        as: Comp = "section",

                        ...props
                    }: CartEmptyProps) {
    return (
        <Comp className={cn("px-1.5 grid place-items-center", className)} {...props}>
            <img src="https://res.cloudinary.com/dr9ebt5bg/image/upload/v1709787632/petshop/cart_banner_image_a75q1u.jpg" alt=""/>
                 {children}
        </Comp>
    )
}