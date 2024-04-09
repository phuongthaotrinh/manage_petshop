'use client'

import {useParams, usePathname, useRouter} from "next/navigation";
import {useCreateServices, useGetAllServices, useGetServiceOfPets} from "@/actions/queries/services";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {CardContent, Card,} from "@/components/ui/card";
import {ArrowRight, Check} from "lucide-react";
import {clsx} from "clsx";
import {ServiceOfPetPriceTable} from "@/components/admin/services/service-of-pet-price";
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog";
import {ServiceForms} from "@/components/forms/service-forms";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {defaultVal, formSchema} from "@/validations/services";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";

export default function PetsServiceTemplate(){
    const {petId} = useParams()
    const pathname = usePathname();
    const route = useRouter()
    const {data:services, isPending:serviceSpin} = useGetAllServices();
    const {data:servicesOfPets, isPending:serviceOfPetSpin} = useGetServiceOfPets(petId.toString());
    const [isPending, startTransition] = React.useTransition();
    const {mutateAsync:createFn} = useCreateServices();

    const test = React.useMemo(() => {
        return (i: string): boolean => {
            if (services && servicesOfPets?.data) {
                const keys = Object.keys(servicesOfPets?.data);
                return keys.includes(i);
            }
            return false;
        }
    }, [servicesOfPets?.data, services,servicesOfPets]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultVal
    })

    const onSubmit = (values:any) => {
        values.userId = "65b6815887653b571e30ccb3";
        startTransition(() => {
            toast.promise((createFn(values)),{
                loading:"Loading...",
                success:(data:any) => {
                    form.reset();
                    return "Success!"
                },
                error:(err) => catchError(err)
            })
        })
    }

    if(serviceSpin || serviceOfPetSpin) return  <p>Loading...</p>
    return (
        <>
            <div className="mt-3">
                <div>
                    {services && services?.length > 0 && !serviceSpin ? (
                       <>
                           <div className="grid grid-cols-3  gap-3">
                               {services?.map((i, j) =>
                               {
                                   const response = test(i?._id)
                                   return   (
                                       <React.Fragment key={j}>
                                           <CardContent className="grid gap-4 cursor-pointer "
                                                        key={j}
                                           >
                                               <div className={
                                                   clsx(" flex items-center space-x-4 rounded-md p-6 border ", {
                                                       "border-orange-400" : response,
                                                       // "bg-slate-100":!i.status
                                                   })
                                               }>
                                                   {response && <Check className={clsx("",{ "text-slate-300" : !i.status})}/>}
                                                   <div className="flex-1 space-y-1">
                                                       <p className="text-sm font-medium leading-none">
                                                           {i?.name}
                                                       </p>
                                                       <p className="text-sm text-muted-foreground">
                                                           {i?.desc}
                                                       </p>
                                                   </div>
                                                   <Button variant="secondary" disabled={serviceSpin || !i.status}
                                                           onClick={() => {
                                                               route.push(`${pathname}/${i?._id}`)
                                                           }}>
                                                       {serviceSpin ? "Loading" : "GO"}
                                                       <ArrowRight className="ml-2 h-4 w-4 " />
                                                   </Button>
                                               </div>
                                           </CardContent>
                                       </React.Fragment>

                                   )
                               })
                               }
                           </div>
                           <ServiceOfPetPriceTable  />
                       </>
                    ): <div className="h-20" >
                      <div className="grid place-items-center">
                          <img src="/images/empty.jpg" style={{ height: 300}} alt=""/>
                          <span className="font-semibold">YOU DONT HAVE ANY SERVICE</span>

                            <Dialog>
                                <DialogTrigger>
                                    <Button >Create</Button>
                                </DialogTrigger>
                                <DialogContent>
                                 <ServiceForms onSubmit={onSubmit} mode="create" form={form}/>
                                </DialogContent>
                            </Dialog>

                      </div>
                    </div>}
                </div>
            </div>

        </>

    )
}