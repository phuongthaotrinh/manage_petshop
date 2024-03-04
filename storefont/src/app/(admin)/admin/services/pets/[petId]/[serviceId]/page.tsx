'use client'

import {useParams, useRouter} from "next/navigation";
import {
    useGetDetailServiceById,
    useGetPetWeight,
    useGetServiceOfPets,
    useSetServicesPrice,
    useUpdateServicesPrice
} from "@/actions/queries/services";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Button} from "@/components/ui/button";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {ReloadIcon, RocketIcon} from "@radix-ui/react-icons";
import {toast} from "react-hot-toast";
import {catchError,setValuesOfForm} from "@/lib/helpers";
import {useEffect} from "react";
import {Input} from "@/components/ui/input";
import {MoveLeft, TableIcon} from "lucide-react";
import {ServiceOfPetPriceTable} from "@/components/admin/services/service-of-pet-price";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { z } from "zod"

interface InputObject {
    [key: string]: any;
}
function convertToObjectArray(inputObj: InputObject, raw?: any[]): any[] {
    const outputArray: any[] = [];
    for (const key in inputObj) {
        const value = isNaN(inputObj[key]) ? "undefined" : Number(inputObj[key]);
        const rawObject = raw && raw?.find(obj => obj.weightId._id === key);
        if (rawObject) {
            const obj: any = {
                weightId: key,
                price: value,
                id: rawObject.id
            };
            outputArray.push(obj);
        }else{
            const obj: any = {
                weightId: key,
                price: value,
            };
            outputArray.push(obj);
        }
    }
    return outputArray;
}


export default function PetsServiceSetPrice(){
    const {petId, serviceId} = useParams();
    const [_, startTransition]  = React.useTransition()
    const {data, isPending} = useGetPetWeight();
    const [priceData, setPriceData] = React.useState<any>()
    const {mutateAsync:create}  = useSetServicesPrice();
    const {mutateAsync:update}  = useUpdateServicesPrice();
    const {data:servicesOfPets, isPending:serviceOfPetSpin} = useGetServiceOfPets(petId.toString());
    const {data:serviceNow, isPending:serviceNowSpin} = useGetDetailServiceById(serviceId.toString());

    const [priceDataWithId, setPriceDataWithId]= React.useState<any>();
    const [enableBaseServiceStt, setEnableBaseServiceStt] = React.useState<boolean>(true);
    const router = useRouter();
    const [test, setTest] = React.useState<string | undefined>(undefined)
    const [dataRaw, setDataRaw] = React.useState<any>()

    useEffect(() => {
        if(servicesOfPets && petId && serviceId && !serviceOfPetSpin) {
            const yes = Object.keys(servicesOfPets?.data).find((i) => i === serviceId);
            setTest(yes)
        }
        return () => {
            setPriceData({});
            setTest(undefined)
        }
    },[servicesOfPets, petId , serviceId,serviceOfPetSpin]);

    useEffect(() => {
        if(test!== undefined && !serviceOfPetSpin) {
                const YesData = servicesOfPets?.data[test];
                if(YesData && YesData?.[0]?.petId === petId) {
                    const convertData: { [key: string]: number }= {};
                    for(let key in YesData) {
                        YesData.forEach((item:any) => {
                            convertData[item?.weightId?._id] = item.price
                        })
                    }
                    setPriceData(convertData);
                    setPriceDataWithId(YesData)
                }
            }

    }, [test,serviceOfPetSpin]);


    useEffect(() => {
        if(petId && serviceId && test !== undefined) {
            Object.keys(priceData).forEach(key => {
                form.setValue(key, priceData[key]);
            });
        }

    },[priceData,petId, serviceId,test])

    useEffect(() => {

            if(!serviceNowSpin && serviceNow){
                 setEnableBaseServiceStt(serviceNow?.status)
            }

    }, [serviceNowSpin]);

    const form = useForm<any>()

    const onSubmit = (value:any) => {
        if(priceDataWithId) {
            const data = convertToObjectArray(value, priceDataWithId);
            const filterNull = data?.filter((i) => i.price !== "undefined")
            startTransition(() => {
                toast.promise(update(filterNull), {
                    loading:"Update",
                    success:"Update success",
                    error:(err) => catchError(err)
                })
            });
        }else{
            const data = convertToObjectArray(value);
            const payload = {
                data,
                petId,
                serviceId
            }
            startTransition(() => {
                toast.promise(create(payload), {
                    loading:"Loading",
                    success:"success",
                    error:(err) => catchError(err)
                })
            });
        }
    };
    return (
       <>
           {!serviceOfPetSpin && (
               <Shell variant="markdown" as="div" >
                   <PageHeaderShell separated>
                       <PageHeader className="flex-1">
                           <PageHeaderHeading size="sm">Setting price</PageHeaderHeading>
                           <PageHeaderDescription size="sm">
                               PetName: {servicesOfPets?.petId?.name}- {serviceNow && serviceNow?.name}
                           </PageHeaderDescription>
                       </PageHeader>
                       <div className="space-x-3 flex items-center">
                           <Button variant="outline" onClick={() => {
                               router.back();

                           }}>
                               <MoveLeft className="w-4 h-4 mr-2"/>Back
                           </Button>
                           <Sheet>
                               <SheetTrigger asChild>
                                   <Button variant="outline">
                                       <TableIcon className="w-4 h-4 mr-2"/> List of service
                                   </Button>
                               </SheetTrigger>
                               <SheetContent side="top" style={{height: "80vh"}}>
                                   <SheetHeader>
                                       <SheetTitle>Services list of: {servicesOfPets?.petId?.name}</SheetTitle>
                                       <div>
                                           {!serviceOfPetSpin && servicesOfPets &&  <ServiceOfPetPriceTable />}
                                           {serviceOfPetSpin && <p>Loading....</p>}

                                       </div>
                                   </SheetHeader>
                               </SheetContent>
                           </Sheet>
                       </div>

                   </PageHeaderShell>
                   {(!enableBaseServiceStt  || servicesOfPets?.petId?.status ==false)&& (
                       <Alert variant="destructive">
                           <RocketIcon className="h-4 w-4" />
                           <AlertTitle>Warning</AlertTitle>
                           <AlertDescription>
                               {!enableBaseServiceStt && "You can&apos;t edit price cause your service enable!." }
                               {servicesOfPets?.petId?.status ==false && "Your pet has blocking"}
                           </AlertDescription>
                       </Alert>
                   )}
                   <div className="mt-3">
                       <Form {...form} >
                           <form onSubmit={form.handleSubmit(onSubmit)}>
                               <div className="mt-3">
                                   {data && !isPending && !serviceOfPetSpin ? (
                                       <div className=" rounded-lg">
                                           <div className=" px-4 py-2 flex font-semibold">
                                               <div className="w-1/2">Weight</div>
                                               <div className="w-1/2">Price</div>
                                           </div>
                                           <div className="divide-y divide-gray-200">
                                               {data?.map((item, index) => (
                                                   <React.Fragment key={index}>
                                                       <div className="flex px-4 py-2">
                                                           <div className="w-1/2  font-medium">{item?.name}</div>
                                                           <div className="w-1/2">
                                                               <FormField
                                                                   control={form.control}
                                                                   name={item?._id}
                                                                   render={({ field }) => {
                                                                       return (
                                                                           <FormItem>
                                                                               <FormControl>
                                                                                   <Input
                                                                                       readOnly={!enableBaseServiceStt}
                                                                                       disabled={!enableBaseServiceStt}
                                                                                       placeholder="Enter price"
                                                                                       type="number"
                                                                                       value={field.value ? field.value : ""}
                                                                                       onChange={field.onChange}
                                                                                       className="w-full rounded-md  shadow-sm focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                                                                   />
                                                                               </FormControl>
                                                                               <FormMessage />
                                                                           </FormItem>
                                                                       );
                                                                   }}
                                                               />
                                                           </div>
                                                       </div>
                                                   </React.Fragment>
                                               ))}
                                           </div>
                                       </div>
                                   ) : (
                                       <>Loading...</>
                                   )}
                               </div>
                               <Button className="mt-3" disabled={isPending || !enableBaseServiceStt}>
                                   {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                   {isPending ? "Loading" : "Submit"}
                               </Button>
                           </form>
                       </Form>
                   </div>

               </Shell>
           )}

       </>

    )
}