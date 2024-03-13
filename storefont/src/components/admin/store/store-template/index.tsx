import {HorizontalMenu} from "@/components/common/horizontal-menu";
import {navigationConfig} from "@/constants/navigation";
import * as React from "react";
import {SidebarNav} from "@/components/side-nav";
export function StoreTemplate ({children}: {
    children: React.ReactNode,
}) {
    return (
        <HorizontalMenu sideNav={<SidebarNav items={navigationConfig.adminStoreMenu} className="p-1"  type="auth"/>}>
            {children}
        </HorizontalMenu>
    )
}