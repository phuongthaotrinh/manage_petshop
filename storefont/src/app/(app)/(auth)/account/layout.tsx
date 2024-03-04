'use client';

import * as React from "react";
import {SidebarNav} from "@/components/auth/side-nav"
import {navigationConfig} from "@/constants/navigation";
import {HorizontalMenu} from "@/components/common/horizontal-menu"
interface IAccount {
    children: React.ReactNode,
}

export default function ProfileLayout({children}: IAccount) {
    return (
        <HorizontalMenu sideNav={<SidebarNav items={navigationConfig.authNav} className="p-1"  type="auth"/>}>
            {children}
        </HorizontalMenu>
    )
}