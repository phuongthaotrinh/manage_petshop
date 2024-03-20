'use client';

import * as React from "react";

interface IProps {
    children: React.ReactNode,
    sideNav: React.ReactNode
}

export  function HorizontalMenu({children, sideNav}: IProps) {
    return (

        <div className="flex min-h-screen flex-col">
            <div className="p-5  items-start md:grid md:grid-cols-[170px_minmax(0,1fr)] lg:grid-cols-[170px_minmax(0,1fr)] ">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                    {sideNav}
                </aside>
                <main className="flex w-full flex-col overflow-hidden">{children}</main>
            </div>
        </div>

    )
}