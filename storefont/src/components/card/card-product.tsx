'use client';

import Link from "next/link"
import React from "react";
import {formatPrice} from '@/lib/helpers'
interface CardProductProps {
    data:any
}
export  function CardProduct({data} :CardProductProps) {
    if(data)
    return (
        <div className="border border-red-100 rounded-md grid space-y-5">
           <div id="thumbnail" title={data?.title}>
               <img src={data?.thumbnail ?data?.thumbnail : `/images/sp-1.jpg` }
                    alt={data?.title}
                    className="max-w-[233px] h-[233px] object-cover"/>
           </div>

         <div className="container my-3 space-y-5 relative">
             <div id="title" className="h-14 relative text-center">
                 <h3 title={data?.title} className="capitalize h-full font-bold relative text-sm hover:text-dreamOrange cursor-pointer">
                     <Link href={`product/${data?._id}`}>
                         {data?.title}
                     </Link>
                 </h3>
             </div>
            <div id="price">
                {formatPrice(566000)}
            </div>
         </div>


        </div>
    )
}