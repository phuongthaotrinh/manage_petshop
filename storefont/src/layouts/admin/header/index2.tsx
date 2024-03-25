'use client'

import {ResizableTemplate} from "@/components/resizeableTemplate"
import * as React from "react";
import {navigationConfig} from "@/constants/navigation";
const defaultLayout = [20,80]
const defaultCollapsed = false;

export default function AdminLayoutTemplate({children}:{children: React.ReactNode}) {

    return (
        <>
            <div className="hidden flex-col md:flex min-h-screen">
                <ResizableTemplate
                    navCollapsedSize={4}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navigation={navigationConfig.adminNav}
                >
                    {children}
                </ResizableTemplate>
            </div>
        </>
    )
}