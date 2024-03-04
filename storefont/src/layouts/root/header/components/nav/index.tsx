import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {headerAnimate} from "@/constants/animation"
import NavLink from "./components/nav-link";
import Curve from './components/nav-curve';
import {navigationConfig} from "@/constants/navigation"

export default function Nav() {

    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    return (
        <motion.div
            variants={headerAnimate.menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.menu}
        >
            <div className={styles.body}>
                <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                        navigationConfig.homeNav.map( (data, index) => {
                            return <NavLink
                                key={index}
                                data={{...data, index}}
                                isActive={selectedIndicator == data.href}
                                setSelectedIndicator={setSelectedIndicator}
                            >
                            </NavLink>
                        })
                    }
                </div>

            </div>
            <Curve />
        </motion.div>
    )
}