'use client';

import {useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {Preloader} from "@/components/common/preloader";
import {Landing} from "@/components/home/landing";
import {RowSection} from "@/components/home/row-section";
import {navigationConfig} from "@/constants/navigation";
import {ServiceCard} from "@/components/card/service-card";
import {Service2Card} from "@/components/card/service-2-card";
import {Booking} from "@/components/home/booking";
import {FeaturedProduct} from "@/components/home/featured-product";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                const locomotiveScroll = new LocomotiveScroll();
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.cursor = 'default'
                    window.scrollTo(0, 0);
                }, 2000)
            }
        )()
    }, []);

    return (
        <main>
            <AnimatePresence mode='wait'>
                {isLoading && <Preloader/>}
            </AnimatePresence>
            <div className="space-y-10">
                <Landing/>
                <RowSection title="Chào mừng bạn đến với hệ thống cửa hàng" perView={4} spacing={60}>
                    <>
                        {navigationConfig.services.map((item, index) => (
                            <ServiceCard item={item} key={index}/>
                        ))}
                    </>
                </RowSection>
                <div className="pt-20">
                    <FeaturedProduct/>
                </div>
               <div id="#booking">
                   <RowSection title="Dịch vụ" perView={3} spacing={80}>
                       {navigationConfig.services2.map((item, index) => (
                           <Service2Card item={item} key={index}/>
                       ))}
                   </RowSection>
               </div>
                <RowSection title="" perView={5} spacing={Number(Math.floor(240 / 5))}>
                    {navigationConfig.brands.map((item, index) => (
                        <div className="keen-slider__slide" key={index}>
                            <div className="items-center grid place-items-center h-full">
                                <img src={`/images/${item}`} alt="item"
                                     className="aspect-video w-auto max-h-[60px] object-cover	"/>
                            </div>
                        </div>
                    ))}
                </RowSection>
                <RowSection title="BẢNG GIÁ DỊCH VỤ" perView={1} spacing={0}>
                    <img
                        src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/bang-pet-cung.jpg?1701914025229"
                        alt=""/>
                </RowSection>
                <Booking/>

            </div>
        </main>
    )
}
