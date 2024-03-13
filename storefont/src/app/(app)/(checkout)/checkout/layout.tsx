'use client';

import * as React from "react";
import {Shell} from "@/components/shells/shell";
import {Breadcrumb} from "@/components/breadcrumb";
import {CheckoutSegmentProduct} from "@/components/checkoutSegmentProduct";
import {useGetShipFee} from "@/actions/queries/payment";
import {usePathname, useSelectedLayoutSegment} from "next/navigation";
import {breadcrumbCheckout} from "@/constants/breadcrumb";


export default function  CheckoutLayout ({children}:{children:React.ReactNode})  {
    const {data:fee,  isPending, isError, mutate,mutateAsync} = useGetShipFee()
    const [breadcrumb, setBreadcrumb] = React.useState([...breadcrumbCheckout])
    const segment = useSelectedLayoutSegment();
    const pathname = usePathname()



    React.useEffect(() => {
           const updateBreadcrumb = [...breadcrumb];
            updateBreadcrumb.forEach(crumb => {
                if(crumb.name.toLowerCase() === segment) {
                    crumb.isCurrent = true
                }
            });
        setBreadcrumb(updateBreadcrumb);

    },[segment,pathname])

    console.log("segment",segment)

    if(segment === "result") return <>  {children}</>

    else
    return (
        <>
                <Shell variant="default">
                    <div className="grid grid-cols-2 gap-10">
                        <div id="user_shipping_info" className="space-y-5">
                            <div id="breadcrumb">
                                {/*@ts-ignore*/}
                                <Breadcrumb data={breadcrumb} />
                            </div>

                            <div id="user_info_if_logged">

                            </div>

                            <div id="user_shipping_address">
                                {children}
                            </div>
                        </div>

                        <section id="cart_product_list mt-5">
                            <CheckoutSegmentProduct isPending={isPending} fee={fee} />
                        </section>
                    </div>
                </Shell>
        </>
    )
}