
import style from "./style.module.scss";
import {CardProduct} from "@/components/card/card-product";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import React from "react";
import {products} from "@/constants/fakeData";

export function FeaturedProduct() {
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free",
        slides: {
            perView: 4,
            spacing: 20
        },
    });


    return (
        <div className={style.section}>
            <div className={style.feature_prd_head}>
                <h3 className={style.feature_prd_text}>
                    Sản phẩm nổi bật
                </h3>
            </div>
            <div className={style.content}>
                <div ref={ref} className="keen-slider p-5">
                    {/*{products.map((item, index) => (*/}
                    {/*    <CardProduct key={index}  data={item}/>*/}
                    {/*))}*/}
                </div>

            </div>

        </div>
    )
}