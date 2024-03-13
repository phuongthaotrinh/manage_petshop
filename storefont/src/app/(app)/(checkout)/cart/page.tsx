'use client'

import * as React from "react"
import {calcShippingFee, formatPrice} from "@/lib/helpers";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ProgressCart} from "@/components/progress";
import {CardEmpty} from "@/components/card/card-empty";
import {useRouter} from "next/navigation";
import  "@/components/card/card_voucher_items/coupon.css"
import {CardCartItems} from "@/components/card/card-cart-items";
import {CardVoucherItems} from "@/components/card/card_voucher_items";

export default function CartPage() {
    const [product, setProduct]= React.useState([...tempProduct])
    const [tempPrice, setTempPrice] = React.useState(0)
    const { percent, needMore } = React.useMemo(() => calcShippingFee(tempPrice), [tempPrice]);
    const router = useRouter();

    React.useEffect(() => {
        const totalPrice = product.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
        setTempPrice(totalPrice);
    }, [product]);


    const updateQuantity = (id: string, quantity: number): void => {
        setProduct(prevProducts =>
            prevProducts.map(product => {
                if (product.id === id) {

                    return {
                        ...product,
                        quantity: quantity
                    };
                }
                return product;
            })
        );
    }

    const deleteProduct = (id: string) => {
        setProduct(prevProducts =>
            prevProducts.filter(product => product.id !== id)
        );
    }

    return (
     <React.Suspense fallback={<>Loading...</>}>
         <Shell variant="default">
             <div className="grid grid-cols-3 gap-10">
                 <div className="col-span-2">
                     <PageHeader separated className="">
                         <div className="flex justify-between items-center">
                             <PageHeaderHeading size="sm">Your Cart</PageHeaderHeading>
                             <PageHeaderDescription size="sm">
                                 You have <b>{product.length} item</b> in cart
                             </PageHeaderDescription>
                         </div>
                     </PageHeader>

                     <div className="space-y-14">
                         <section className="mt-5 space-y-5">
                             <section id="cart_message">
                                 {needMore === 0 ? (
                                     <span className="text-dreamOrange font-semibold">Your order has been shipped free of charge.</span>
                                 ):(
                                     <>
                                         {product.length === 0
                                             ?
                                             <CardEmpty>
                                                 <h2>There are no products in the cart...</h2>
                                                 <h1>Return <b>Home Page</b></h1>
                                             </CardEmpty>
                                             : <>You need <span className="text-dreamOrange font-semibold px-1.5">{needMore}</span> to free shipping</>
                                         }
                                     </>
                                 )}
                             </section>
                             {product.length > 0 &&
                                 <ProgressCart needMore={needMore} percent={percent}/>
                             }

                         </section>
                         <section id="cart_product_list mt-5">
                             {product&& product?.map((i, j) => (
                                 <div key={j}>
                                     <CardCartItems data={i} updateQuantity={updateQuantity} deleteProduct={deleteProduct}/>
                                 </div>
                             ))}
                         </section>

                     </div>
                 </div>
                 <section id="info_mation" className="space-y-5 w-full overflow-hidden">
                     <Card id="card_cart_price" className="rounded shadow-sm">
                         <CardHeader>
                             <CardTitle >Thông tin đơn hàng   </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-5">
                             <div className="flex items-center justify-between">
                                 <h3 className="font-semibold">Tổng tiền: </h3>
                                 <span className="text-2xl text-red-600 font-semibold">{formatPrice(tempPrice)}</span>
                             </div>
                             <DropdownMenuSeparator />
                             <ul className="list-disc marker:text-gray-300 text-sm space-y-2">
                                 <li>Shipping fees will be calculated at the checkout page.</li>
                                 <li>You can also enter a discount code at the checkout page.</li>

                             </ul>
                             <Button disabled={!product.length} className="w-full rounded-sm" onClick={() =>router.push('/checkout')}>
                                 Checkout
                             </Button>
                         </CardContent>
                     </Card>

                         <Card id="card_voucher" className="rounded shadow-sm box-border">
                             <CardContent className="space-y-5 p-5">
                                <div className="coupon-initial  bgWhite">
                                    <div className=" grid gap-2">
                                        {vouchers && vouchers?.map((i,j) => (
                                            <CardVoucherItems key={j} data={i} />
                                        ))}
                                    </div>
                                </div>
                             </CardContent>
                         </Card>
             </section>
             </div>
         </Shell>
     </React.Suspense>
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
const vouchers = [
    {
        id: '1',
        title: "Miễn phí vận chuyển",
        subtitle:"Đơn hàng từ 300k",
        code:"A87TYRT55H",
        content:[
            'Dành cho đơn hàng từ 300k\n',
            'Mỗi khách hàng được sử dụng tối đa 1 lần.\n' ,
            'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán'
        ],
        ends_at: '10/12/2022',
        type: "shipping"
    },
    {
        id: '2',
        title: "Giảm 20%",
        subtitle:"Đơn hàng từ 200k",
        code:"QH5G8J0YC",
        content:[
            'Dành cho đơn hàng từ 300k\n',
            'Mỗi khách hàng được sử dụng tối đa 1 lần.\n',
            'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán'
        ],
        ends_at: '10/12/2022',
        type: "voucher"
    },
    {
        id: '3',
        title: "Giảm 50k",
        subtitle:"Đơn hàng từ 500k",
        code:"FT45YUO8H",
        content:[
            'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán'
        ],
        ends_at: '10/12/2022',
        type: "gift"
    }
]
