import * as React from "react";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image";

export function Banners() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false

                function clearNextTimeout() {
                    clearTimeout(timeout)
                }

                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }

                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    );
    const images = [
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_2.png?1701914025229",
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_3.png?1701914025229",
        "https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/slider_1.png?1701914025229",
    ];
    return (
        <>
            <div ref={sliderRef} className="keen-slider">
                {images.map((item) => (
                    <div className="keen-slider__slide number-slide" key={item}>
                        <Image src={item} alt={item} fill={true} className="object-cover"/>
                    </div>
                ))}
            </div>
        </>
    )
}
