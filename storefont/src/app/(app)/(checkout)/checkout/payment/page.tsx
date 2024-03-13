'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"
import {formatPrice} from "@/lib/helpers";
import {FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {paymentMethods} from "@/constants/payment";
import {clsx} from "clsx"
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {paymentFn} from "@/actions/queries/payment";

export default function PaymentPage() {
    const form = useForm();
    const route= useRouter();

    const onSubmit = async ({payment_method}:{payment_method:string}) => {
       if(payment_method === "vnpay") {
           await paymentFn({amount: 18000, orderDescription: "Paymeny of sue", language:"vn",bankCode:""}).then((data) => {
               window.location.href = `${data}`
           })
       }
       if(payment_method === "code" || !payment_method) {
           toast.success("Order Success");
           route.push(`/checkout/result`)
       }



    }


    return (
        <React.Suspense fallback={<>Loading...</>}>
          <div className="space-y-12">
              <section id="shippng_method" className="space-y-3">
                  <p className="font-bold">Shipping methods</p>
                  <Card className="shadow-sm  border border-dreamOrange ">
                      <CardContent className="grid gap-4 w-full p-0 m-0">
                         <div className="flex gap-3 p-4 items-center text-gray-600">
                            <div className=" flex gap-3 items-center flex-1">
                                <RadioGroup defaultValue="ship_code">
                                    <RadioGroupItem value="ship_code" id="ship_code"  className="cursor-default"/>
                                </RadioGroup>
                                <p className="font-semibold capitalize">home delivery</p>
                            </div>
                             <div className="">
                                 {formatPrice(0)}
                             </div>
                         </div>
                      </CardContent>
                  </Card>
              </section>

              <section id="payment_method_provider" className="space-y-3">
                  <p className="font-bold">Payment methods</p>
                  <PaymentMethod form={form} onSubmit={onSubmit} />
              </section>
          </div>
        </React.Suspense>
    )
}


const PaymentMethod = ({form, onSubmit}:{form: UseFormReturn<FieldValues, any, undefined>, onSubmit:(value:any) => void}) => {
    const [s, setS] = React.useState(paymentMethods[0]['subtitle']);
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="payment_method"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(event) => {
                                            field.onChange(event);
                                            setS(event)
                                        }}
                                        defaultValue={field.value ? field.value : paymentMethods[0]['subtitle']}
                                        className="flex flex-col space-y-1"

                                    >
                                        {paymentMethods.map((i,j) => (
                                           <React.Fragment key={j}>
                                               <Card className={clsx("shadow-sm border-2", {
                                                   " border-dreamOrange": i.subtitle === s,
                                                     "bg-gray-100 pointer-events-none ": !i.enable
                                               })}
                                               >
                                                   <CardContent className="flex  items-center gap-4 w-full  p-4 ">
                                                       <FormItem className="flex items-center space-x-3 space-y-0" key={i.id}>
                                                           <FormControl>
                                                               <RadioGroupItem value={i.subtitle} disabled={!i.enable} />
                                                           </FormControl>
                                                           <img src={i.image} alt={i.subtitle} className="w-5"/>
                                                           <FormLabel className="font-normal">
                                                               {i.title}
                                                           </FormLabel>
                                                       </FormItem>
                                                   </CardContent>
                                               </Card>

                                           </React.Fragment>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button  type="submit" size="lg">PAYMENT</Button>
                </form>
            </Form>

        </>
    )
}