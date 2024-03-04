'use client';

import React, {useState} from "react";
import {Header} from "@/layouts/root/header";
import {Footer} from "@/layouts/root/footer";
import TopHeader from "@/layouts/root/top-header";
import {usePathname} from 'next/navigation';

export default function RootLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isHome, setIsHome] = useState(false);

    React.useEffect(() => {
        const length = pathname.length;
        if(length == 1) setIsHome(true)
    },[pathname])
    return (
        <>
            <TopHeader/>
            {isHome && <Header/>}
            <div>
                {children}
            </div>
            <Footer/>
        </>
    )
}