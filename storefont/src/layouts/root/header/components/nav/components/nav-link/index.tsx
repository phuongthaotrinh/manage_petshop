import styles from "./style.module.scss";
import Link from 'next/link';
import { motion } from 'framer-motion';
import {headerAnimate} from "@/constants/animation";
interface IndexProps {
    data: {
        title: string;
        href: string;
        index: number;
    };
    isActive: boolean;
    setSelectedIndicator: (href: string) => void;
}

const NavLink: React.FC<IndexProps> = ({ data, isActive, setSelectedIndicator }) => {
    const { title, href, index } = data;

    return (
        <motion.div
            className={styles.link}
            onMouseEnter={() => { setSelectedIndicator(href); }}
            custom={index}
            variants={headerAnimate.slide}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <motion.div
                variants={headerAnimate.scale}
                animate={isActive ? "open" : "closed"}
                className={styles.indicator}
            >
            </motion.div>
            <Link href={href}>{title}</Link>
        </motion.div>
    );
};

export default NavLink;
