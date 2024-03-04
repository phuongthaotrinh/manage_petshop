
import {useRef, useLayoutEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import {LandingAnimate} from "@/constants/animation";
import {motion} from 'framer-motion';
import {Banners} from "@/components/home/landing/components/banners";
import style from "./style.module.scss"

export  function Landing() {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: (e) => (direction = e.direction * -1),
            },
            x: '-500px',
        });
        requestAnimationFrame(animate);
    }, []);

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        } else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent});
        gsap.set(secondText.current, {xPercent: xPercent});
        requestAnimationFrame(animate);
        xPercent += 0.1 * direction;
    };

    return (
        <motion.main variants={LandingAnimate.slideUp} initial="initial" animate="enter" className={style.landing} >
            <Banners />
        </motion.main>
    );
}
