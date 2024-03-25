'use client'

import Link from "next/link"
import {cn} from "@/lib/utils";
import clsx from "clsx";
import {navigationConfig} from "@/constants/navigation"
import {usePathname, useSelectedLayoutSegment} from "next/navigation";

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();
    return (
        // <nav
        //     className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        //     {...props}
        // >
        //     {navigationConfig.adminNav?.map((item, index) => {
        //         let isTrue = item && item?.href?.includes(String(segment))
        //
        //         return (
        //             <Link key={index}
        //                   href={item.href}
        //                   className={clsx("text-sm font-bold transition-colors hover:text-primary capitalize", {
        //                       "text-muted-foreground": pathname !== item.href
        //                   })}
        //             >
        //                 <span
        //                     className={clsx(
        //                         "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-slate-200 hover:text-foreground",
        //                         {
        //                             "font-bold text-black  ": isTrue,
        //                             "text-gray-400": !isTrue,
        //                         }
        //                     )}
        //                 >
        //                   <span>{item.title}</span>
        //                 </span>
        //
        //
        //             </Link>
        //         )
        //     })}
        // </nav>

        <div className="wf+-f">



        </div>


    )
}