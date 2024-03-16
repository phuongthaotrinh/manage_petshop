'use client';

import {HeaderAdmin} from "@/layouts/admin/header";
import {usePathname} from "next/navigation";
export default function AdminLayout({children}:{children:React.ReactNode}) {
    const pathname  = usePathname()
    const isCreatePrd = pathname.includes('products/create')

    return (
        <>
            {isCreatePrd ? (
                <>
                    {children}
                </>
            ):(
                <HeaderAdmin>
                        {children}
                </HeaderAdmin>
            )}

        </>
    )
}