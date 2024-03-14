import {CardCartCheckout} from "@/components/card/card-cart-checkout";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {formatPrice} from "@/lib/helpers";
import * as React from "react";

export const CheckoutSegmentProduct = ({isPending, fee}:{isPending:boolean,fee: number | undefined }) => {
    return (
        <>
            <section id="cart_product_list mt-5">
                {tempProduct&& tempProduct?.map((i, j) => (
                    <div key={`${i.id}_${j}`}>
                        <CardCartCheckout data={i}/>
                    </div>
                ))}
                <DropdownMenuSeparator />
                <div className="flex gap-5 my-5">
                    <Input  placeholder="Enter voucher code" />
                    <Button disabled={isPending} >
                        {isPending &&  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }
                        {isPending ? "Loading" : "Apply"}
                    </Button>

                </div>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 my-3  justify-between space-y-1">
                    <p>Temporary price</p>
                    <p>7,837,500₫</p>
                    <p>Shipping Fee</p>
                    <p>{fee ? formatPrice(fee): '_____'}</p>
                </div>
                <DropdownMenuSeparator />

                <div className="grid grid-cols-2 my-3 justify-between items-center">
                    <p>Total</p>
                    <p className="text-2xl font-semibold">7,837,500₫</p>
                </div>
            </section></>
    )
}


const tempProduct  = [
    {
        id: '12',
        name: 'SPRING CHICKEN DOG TOY',
        attributes:
            {
                color: 'yellow',
                size: 'small'
            }
        ,
        image: 'https://petshop.fringestudio.com/cdn/shop/files/314133_SpringChicken_PHOTO_WEB_720x.jpg?v=1708122120',
        quantity: 12,
        price: 30000
    },
    {
        id: '11',
        name: 'HATCHED PLUSH DOG TOY',
        attributes:
            {
                color: 'green',
                size: 'small'
            }
        ,
        image: 'https://petshop.fringestudio.com/cdn/shop/files/314007_JustHatched_PHOTO_WEB_720x.jpg?v=1708121958',
        quantity: 1,
        price: 30000
    },
    {
        id: '5',
        name: ' CARROT BOUT YOU PLUSH DOG TOY',
        image: 'https://petshop.fringestudio.com/cdn/shop/files/314305_CarrotBoutYou_PHOTO_WEB_720x.jpg?v=1708120865',
        quantity: 2,
        price: 35000,

        attributes:
            {
                color: 'red',
                size: 'middle'
            }


    }
];