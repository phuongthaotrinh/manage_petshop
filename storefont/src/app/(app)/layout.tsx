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
        if(pathname.length === 1) setIsHome(true)
        else setIsHome(false)
    },[pathname]);

    return (
        <>
            <TopHeader/>
            {isHome && <Header/>}
            {!isHome && (
                <div className="h-16 bg-gray-200">
                    Header
                </div>
            )}
            <div className="">
                {children}
            </div>
            {/*<Footer/>*/}
        </>
    )
}