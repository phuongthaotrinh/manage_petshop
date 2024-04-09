'use client';


import {useGetDetailDiscount} from "@/actions/queries/discount";
import {useParams} from "next/navigation";

export function DiscountDetailTemplate () {
        const {id} = useParams()
        const {data, isPending} = useGetDetailDiscount(id.toString());
        console.log("detal", data)
        return (
            <>


            </>
        )
}