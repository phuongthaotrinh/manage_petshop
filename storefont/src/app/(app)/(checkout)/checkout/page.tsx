'use client';

import * as React from "react";
import {Form, FormField, FormMessage, FormLabel,FormItem, FormControl } from "@/components/ui/form";
import {useForm} from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {GHNProvinces} from "@/components/common/provinces/GHNProvinces";
import Link from "next/link";
import {paymentFn, useGetShipFee} from "@/actions/queries/payment"
import { useEffect} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {usePathname, useRouter} from "next/navigation";




const initialValue = {
    shipping_address: "",
    shipping_user_name: "",
    shipping_phone: "",
    shipping_user_address_desc:""
}

const products =[
    {
        "id": "123123",
        "height":50,
        "length":20,
        "weight":200,
        "width":20,
        "price": 45000
    },
    {
        "id": "123123",
        "height":150,
        "length":120,
        "weight":200,
        "width":120,
        "price": 450000
    }
]
export default function CheckoutPage() {
  const [userProvince, setUserProvince] = React.useState({city: null, district:null, ward:null});
  const {data:fee,  isPending, isError, mutate,mutateAsync} = useGetShipFee()
   const route = useRouter()
    const pathname = usePathname()
    const form = useForm({
        defaultValues: initialValue,
        mode: "all"
    });
    const currentUser = "asdasdasd";

    useEffect(() => {
      if(userProvince.city && userProvince.district && userProvince.ward ){
         const payload = {products, districtID:userProvince.district, wardId:userProvince.ward};
         if(payload) {
             mutate(payload)
         }

      }
    },[userProvince.city, userProvince.district, userProvince.ward, products])


    const handleOnSubmit = async (value:any) => {
        // console.log("handleOnSubmit",value);
        route.push(`${pathname}/payment`)


    }

    const updateProvince = (value:any) => {
        const payload = {...userProvince, ...value};
        setUserProvince(payload)
    }





    return (
        <>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-3">
                                    {!currentUser && (
                                        <FormField
                                            control={form.control}
                                            name="shipping_address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a verified email to display" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="shipping_user_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                      <Input {...field}/>
                                                    </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="shipping_phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone number</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                        <FormField
                                            control={form.control}
                                            name="shipping_user_address_desc"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}/>
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <GHNProvinces  form={form} updateProvince={updateProvince} userProvince={userProvince}/>

                                     <div className="flex items-center justify-between">
                                            <Link href="/cart" className="text-blue-700 font-semibold">
                                                Your cart
                                            </Link>
                                         <Button type="submit" disabled={isPending} >
                                             {isPending &&  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }
                                             {isPending ? "Loading" : "Go to payment"}
                                         </Button>
                                     </div>
                                    </form>
            </Form>

        </>
    )
}



