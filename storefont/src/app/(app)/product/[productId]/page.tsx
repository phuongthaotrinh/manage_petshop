'use client';

import {useGetDetailPage} from "@/actions/queries/products"
import {GallaryCarousel} from "@/components/common/gallary-carousel";
import { EmblaOptionsType } from 'embla-carousel'
import {ProductDetailTemplate} from "@/components/product-detail-template";
import {UseQueryResult} from "@tanstack/react-query";
import {Shell} from "@/components/shells/shell"




interface IParams{
    params: {productId: string}
}

const OPTIONS: EmblaOptionsType = {}

export default function ProductDetailPage({params}:IParams )  {
    const detail:UseQueryResult<any, Error> = useGetDetailPage(params.productId);
    const draftProduct = [
        "https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_720x.jpg?v=1708122120",
        "https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_CALLOUTS_720x.jpg?v=1708122124",
        "https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_DOG_1_720x.jpg?v=1708122136",
        "https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_DOG_2_720x.jpg?v=1708122136",
        "https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_DOG_3_720x.jpg?v=1708122136"
    ]


    return (
        <Shell variant="default">
                <div className="grid grid-cols-2 gap-3">

            <div id="gallary">
                <GallaryCarousel slides={draftProduct} options={OPTIONS} />

            </div>
            <div id="content" className="p-5">
                <ProductDetailTemplate
                    data={detail}
                    productId={params.productId}
                />

            </div>


                </div>
        </Shell>
    )
}