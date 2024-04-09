'use client';
import * as z from "zod";
import React, {useEffect, useId} from "react";
import {Form, FormItem, FormLabel, FormMessage, FormField} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShoppingBag, ArrowRightIcon} from "lucide-react";
import {notFound, useRouter} from "next/navigation";
import {UseQueryResult} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {generateUniqueId} from "@/lib/helpers";
import {formatPrice} from "@/lib/helpers";
import {clsx} from "clsx";


const quantitySchema = z.object({
    quantity:  z
        .number()
        .min(1)
});

const currentUser = "65b6811687653b571e30ccaa"
function compareArrays(a:any[], productVariant:any[]) {
    let result = {};
    if(!a || !productVariant) return result
    for (const variant of productVariant) {
        const variants = variant.variant_option.product_option_id;
        if (JSON.stringify(variants) === JSON.stringify(a)) {
            result ={...variant}
        }
    }
    return result;
}
export function ProductDetailTemplate  ({data,productId }:{data: UseQueryResult<any, Error>,productId: string}) {
    const [mode, setMode] = React.useState<"addCart" | "payment">("addCart")
    const route  = useRouter()
    const {data:product, isPending, isError} = data
    const id = generateUniqueId();
    const [variantSelect, setVariantSelect] = React.useState<{type: any, value: string}[]>([]);
    const [variantData, setVariantData] = React.useState<any>()
    const form = useForm<z.infer<typeof quantitySchema>>({
        resolver: zodResolver(quantitySchema),
        defaultValues: {
            quantity: 1
        },
        mode: "onChange",
    })

    const existVariant = React.useMemo(() => {
        return []
    },[product])

console.log("product", variantData)


    const onSubmit = (value:z.infer<typeof quantitySchema>) => {
            const payload = {
                quantity: value.quantity,
                product_id: productId,
                customer_id: currentUser,
                tempId: id
            }
            if(mode === "payment") {
                sessionStorage.setItem("cart_payment", JSON.stringify(payload));
                route.push('/cart')
            }else{
                sessionStorage.setItem("cart_draft", JSON.stringify(payload))

            }
    }

    const handleClick = React.useCallback((type: any, value: string) => {
        console.log("handleClick", type, value)
        setVariantSelect(prevVariantSelect => {
            let updatedVariants;
            if (prevVariantSelect.some((i) => i.type.includes(type))) {
                updatedVariants = prevVariantSelect.filter((item) => !item.type.includes(type));
            } else {
                updatedVariants = [...prevVariantSelect];
            }
            const newData = { type: type, value: value };
            return [...updatedVariants, newData];
        });
    }, []);

    React.useEffect(() => {
        if (product && product.productVariant && variantSelect) {
            const variantda = variantSelect.map(i => i?.value);
            const result = compareArrays(variantda, product.productVariant);
            setVariantData(result);
        }
    }, [product?.productVariant, variantSelect]);


    if(isError) notFound()


    if(product)
    return (
        <section className="space-y-5">

            <div id="infomation" className=" leading-loose tracking-wide space-y-5">
               <div id="section_title">
                   <h3 title={product?.title} className="capitalize leading-9 tracking-wide h-full font-bold relative text-xl hover:text-dreamOrange cursor-pointer">
                       {product?.title}
                   </h3>
                   <p> {product?.subtitle}</p>
               </div>

                <small className="text-xs text-muted-foreground my-3">{product?.description}</small>

                <div id="cate_n_brand" className="grid grid-cols-3 items-center">
                    <div className="inline-flex gap-3 items-center">Brand: <img src={product?.brand?.images?.[0]} alt={product?.brand?.name} className="w-20 object-cover"/></div>
                    <div className="flex gap-3 items-center col-span-2">
                        <span>Category:</span>
                        <div className=" col-span-2">
                            {/*{product?.categories?.images && <img key={product?.categories?.name} src={product?.categories?.images?.[0]} alt={product?.categories?.name} className="w-20 object-cover"/>}*/}
                            {product?.categories?.name}

                        </div>
                </div>
                </div>
            </div>
            <div id="price">
                {variantData?._id? <>Price: {formatPrice(variantData?.price)}</> : <p className="invisible">Price: {formatPrice(variantData?.price)}</p>}

            </div>
            <div id="variant" className=" space-y-5">
                {product.options?.sort((a: any, b: any) => a.title.localeCompare(b.title))?.map((i:any, j:any) => (
                    <div key={j} className=" space-y-3">
                         <span className="font-semibold uppercase">{i?.title}</span>
                            <div className="flex flex-wrap gap-3  ">
                                {i.data?.sort((a: any, b: any) => a.value.localeCompare(b.value))?.map((ii:any, jj:any) => (
                                    <Button
                                        className={clsx({
                                            "border border-dreamOrange":variantSelect.some((item) => item.type === i?.title && item.value===ii?._id)
                                        })}
                                        key={jj} variant="outline" onClick={() => handleClick(i?.title, ii?._id)}>
                                        {ii?.value}
                                    </Button>
                                ))}
                            </div>
                    </div>
                ))}
            </div>

            <div id="user_pick_quantity">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="w-auto max-w-sm"   >
                                    <FormLabel>Quantity</FormLabel>
                                    <Input className="border-2 border-orange-500" type="number" min={1} max={100} placeholder="Enter quantity" {...field} onChange={event => field.onChange(+event.target.value)}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 items-center w-full">
                            <Button type="submit" size="cart" variant="addToCard" disabled={!variantData?._id} >
                                <ShoppingBag  className="w-4 h-4- mr-2" />
                                Add to cart
                            </Button>
                            <Button type="submit" size="cart" variant="default" disabled={!variantData?._id} className="w-full"  onClick={() => setMode("payment")}>
                                <ArrowRightIcon  className="w-4 h-4- mr-2" />
                                Payment
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>























            </section>
    )
}