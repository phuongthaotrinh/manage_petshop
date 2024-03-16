'use client';
import {HorizontalMenu} from "@/components/common/horizontal-menu";
import {navigationConfig} from "@/constants/navigation";
import * as React from "react";
import {AnimatePresence} from "framer-motion";
import {usePathname} from "next/navigation";
import {SidebarNav} from "@/components/side-nav";

export default function ProductLayout({children}:{children: React.ReactNode}) {
    const pathname  = usePathname()
    const isCreatePrd = pathname.includes('products/create')

    return (
        <>
            { isCreatePrd ? (
                <>
                    {children}
                </>
            ):(
                <HorizontalMenu sideNav={<SidebarNav items={navigationConfig.adminProductNCate} className=""  type="product"/>}>
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </HorizontalMenu>
            )}
        </>
    )
}