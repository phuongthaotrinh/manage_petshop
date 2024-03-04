'use client';
import {HorizontalMenu} from "@/components/common/horizontal-menu";
import {SidebarNav} from "@/components/auth/side-nav";
import {navigationConfig} from "@/constants/navigation";
import * as React from "react";
import {AnimatePresence} from "framer-motion";
import {usePathname} from "next/navigation";

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
                <HorizontalMenu sideNav={<SidebarNav items={navigationConfig.adminProductNCate} className="p-1"  type="product"/>}>
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </HorizontalMenu>
            )}
        </>
    )
}