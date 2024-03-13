'use client';

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Header} from "@/layouts/root/header";
import {Footer} from "@/layouts/root/footer";
import TopHeader from "@/layouts/root/top-header";
import {usePathname} from 'next/navigation';
import styles from "@/layouts/root/header/style.module.scss";
import Rounded from "@/components/common/rounded-button";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimatePresence} from "framer-motion";
import Nav from "@/layouts/root/header/components/nav";

export default function RootLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isHome, setIsHome] = useState(false);
    const header = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const button = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = React.useState(0);
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.config({nullTargetWarn: false});
        gsap.set('.null', {opacity: 1})
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {
                    gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"});
                },
                onEnterBack: () => {
                    if (setIsActive) {
                        gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"});
                        setIsActive(false);
                    }
                }
            }
        });
    }, []);




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
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => {
                    setIsActive(!isActive)
                }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav/>}
            </AnimatePresence>
            <div className="">
                {children}
            </div>


        </>
    )
}