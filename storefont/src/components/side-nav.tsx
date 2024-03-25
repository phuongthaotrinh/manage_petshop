"use client"

import Link from "next/link";
import type {SidebarNavItem,MainNavItem, AdminServicesType} from "@/types"
import clsx from "clsx";
import {usePathname, useRouter, useSearchParams, useSelectedLayoutSegment} from "next/navigation"
import {Icons} from "@/components/common/icon";
import {ChevronLeftIcon} from "lucide-react"
import {navigationConfig} from "@/constants/navigation";
import * as React from "react";

type INavbarProps = {
    items :MainNavItem[],
    type:'home'
}|{
    items :SidebarNavItem[],
    type:'auth'
}|{
    items :AdminServicesType[],
    type:'admin_service'
}|{
    items: SidebarNavItem[],
    type: 'product'
}


export function SidebarNav({className, items,type, ...props}: INavbarProps & React.HTMLAttributes<HTMLDivElement>) {
    const segment = useSelectedLayoutSegment();
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const paramsType = searchParams.get('v');
    const [_, startTransition] = React.useTransition();
    const router = useRouter()
    if (!items?.length) return null;


    return (

        <>
            {!type || type === 'auth' && (
                <div className={clsx("flex w-full flex-col gap-2", className)} {...props}>
                    {items.map((item, index) => {
                        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon
                        const isTrue = item && item?.href?.includes(String(segment));
                        return item.href ? (
                            <Link
                                aria-label={item.title}
                                key={index}
                                href={item.href}
                                target={item.external ? "_blank" : ""}
                                rel={item.external ? "noreferrer" : ""}
                            >
                        <span
                            className={clsx(
                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-slate-200 hover:text-foreground",
                                {
                                    "bg-slate-200 font-medium text-black": isTrue,
                                    "text-gray-600": !isTrue,
                                    "pointer-events-none opacity-60": item.disabled
                                }
                            )}
                        >
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true"/>
                          <span>{item.title}</span>
                        </span>
                            </Link>
                        ) : (
                            <span
                                key={index}
                                className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                            >
                    {item.title}
                  </span>

                        )
                    })}
                </div>
            )}

            {type === "admin_service" && (
                <div  {...props}>
                    {navigationConfig.adminStoreMenu?.map((item, index) => {
                        //@ts-ignore
                        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon
                        const isTrue = item && item?.v?.includes(String(paramsType));
                        return (
                            <Link key={index} href={`${pathname}/?v=${item.v}`} className="my-3" >
                                    <span
                                        className={clsx(
                                            "group capitalize flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-slate-200 hover:text-foreground",
                                            {
                                                "bg-border font-bold text-black": isTrue,
                                                "text-gray-600": !isTrue,
                                            }
                                        )}
                                    >
                                         <Icon className="mr-2 h-4 w-4" aria-hidden="true"/>
                                      <span>{item.label}</span>
                                    </span>
                            </Link>
                        )
                    })}
                </div>
            )}

            {type === "product" && (
                <div className={clsx("flex w-full flex-col gap-2", className)} {...props}>
                    {items.map((item, index) => {
                        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon;
                        const newHref = item?.href &&  item?.href.replace(/^\/admin\/products/, '');
                        const getLastSegment = (url: string) => url.split('/').pop()!;
                        const isTrue = newHref && newHref?.includes(getLastSegment(pathname));

                        return item.href ? (
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    startTransition(() => {
                                        item?.href && router.replace(item?.href)
                                    })
                                }}
                                key={index}
                            >
                        <span
                            className={clsx(
                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-slate-200 hover:text-foreground",
                                {
                                    "bg-slate-200 font-medium text-black": isTrue ,
                                    "text-gray-600": !isTrue,
                                    "pointer-events-none opacity-60": item.disabled
                                }
                            )}
                        >
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true"/>
                          <span>{item.title}</span>
                        </span>
                            </div>
                        ) : (
                            <span
                                key={index}
                                className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                            >
                    {item.title}
                  </span>

                        )
                    })}
                </div>
            )}
        </>

    )
}