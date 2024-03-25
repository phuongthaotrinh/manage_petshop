'use client';

const noLayout = ['products/create', 'discount/create']
import AdminLayoutTemplate from "@/layouts/admin/header/index2";
import {usePathname} from "next/navigation";
import React from "react"

export default function AdminLayout({children}:{children:React.ReactNode}) {
    const pathname  = usePathname();

    const isCreatePrd = React.useMemo(() => {
       return  noLayout.some(item => pathname.endsWith(item))
    },[pathname, noLayout]);

    return (
        <>
            {isCreatePrd ? (
                <>
                    {children}
                </>
            ):(
                <AdminLayoutTemplate>
                        {children}
                </AdminLayoutTemplate>
            )}

        </>
    )
}