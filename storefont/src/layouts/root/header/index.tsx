'use client';

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from './style.module.scss';
import {usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments} from 'next/navigation';
import {AnimatePresence} from 'framer-motion';
import Nav from "@/layouts/root/header/components/nav";
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Rounded from "@/components/common/rounded-button";
import Magnetic from '@/components/common/magnetic';
import {clsx} from "clsx";
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {navigationConfig} from "@/constants/navigation";


export const Header: React.FC = () => {
    const header = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
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

    return (
        // bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        <header className="absolute top-0 w-full" ref={header}>
            <div
                className="relative top-[3.5rem] z-50 w-full 0 ">
                <div className="container text-white flex h-[75px] items-center justify-around  w-full border-2 border-dashed border-white rounded-full
                                bg-[#71cbe8] ring-offset-2
                ">
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-5 cursor-pointer">
                            {navigationConfig.homeNav.map((item, index) => {
                                const centerIndex = Math.floor(navigationConfig.homeNav.length / 2);
                                return (
                                    <React.Fragment key={index}>
                                        {index == centerIndex && (
                                            <div className={styles.grow}>
                                                <div className={styles.grow_wrap}>
                                                   <Link href="/">
                                                       <Image className={styles.grow_logo}
                                                              src="/images/logo.png"
                                                              width={167} height={117} alt="logo"/>
                                                   </Link>
                                                </div>
                                            </div>
                                        )}
                                        <NavigationMenuItem>
                                            <Magnetic>
                                                <div className={styles.el}>
                                                    <Link href={item.href}
                                                          className="text-white font-semibold">{item.title}</Link>
                                                </div>
                                            </Magnetic>
                                        </NavigationMenuItem>
                                    </React.Fragment>
                                )

                            })}

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
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
        </header>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"