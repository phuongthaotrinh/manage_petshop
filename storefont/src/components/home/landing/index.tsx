'use client'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import * as React from "react";

export  function Landing() {
    const images = [
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_2.png?1701914025229",
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_3.png?1701914025229",
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_1.png?1701914025229",
    ];
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full box-sizing  overflow-x-hidden"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images && images?.map((i, j) => (
                        <CarouselItem key={j}>
                            <img src={i} alt={i}  className="object-cover w-full h-full"/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    );
}
