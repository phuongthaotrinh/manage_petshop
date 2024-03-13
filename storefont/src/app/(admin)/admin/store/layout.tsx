import {HorizontalMenu} from "@/components/common/horizontal-menu";
import {SidebarNav} from "@/components/side-nav";
import {navigationConfig} from "@/constants/navigation";
import * as React from "react";

export default function StoreLayout ({children}: {
    children: React.ReactNode,
}) {
    return (
        <HorizontalMenu sideNav={<SidebarNav items={navigationConfig.adminStoreMenu} className="p-1"  type="auth"/>}>
            {children}
        </HorizontalMenu>
    )
}