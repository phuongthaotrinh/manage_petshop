'use client';

const noLayout = ['products/create', 'discount/create']
import {HeaderAdmin} from "@/layouts/admin/header";
import {usePathname} from "next/navigation";
export default function AdminLayout({children}:{children:React.ReactNode}) {
    const pathname  = usePathname()
    const isCreatePrd = noLayout.includes(pathname)
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