'use client'

import {useParams, usePathname, useRouter} from "next/navigation";
import {useGetAllServices, useGetPetWeight, useGetServiceOfPets} from "@/actions/queries/services";
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {CardContent, Card,} from "@/components/ui/card";
import {ArrowRight, Check} from "lucide-react";
import {clsx} from "clsx"
import {formatPrice} from "@/lib/helpers";
import {Icons} from "@/components/common/icon";
import {ServiceOfPetPriceTable} from "@/components/admin/services/service-of-pet-price";
import {toast} from "react-hot-toast";


export default function PetsServiceTemplate(){
    const {petId} = useParams()
    const pathname = usePathname();
    const route = useRouter()
    const {data:services, isPending:serviceSpin} = useGetAllServices();
    const {data:servicesOfPets, isPending:serviceOfPetSpin} = useGetServiceOfPets(petId.toString());

    const test = React.useMemo(() => {
        return (i: string): boolean => {
            if (services && servicesOfPets?.data) {
                const keys = Object.keys(servicesOfPets?.data);
                return keys.includes(i);
            }
            return false;
        }
    }, [servicesOfPets?.data, services,servicesOfPets]);

    return (
        <>
            <div className="mt-3">
                <div>
                    {services && !serviceSpin ? (
                        <div className="grid grid-cols-3  gap-3">
                            {services?.map((i, j) =>
                            {
                                const response = test(i?._id)
                                return   (
                                    <React.Fragment key={j}>
                                        <CardContent className="grid gap-4 cursor-pointer"
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
                    ): <></>}
                </div>
            </div>
            <ServiceOfPetPriceTable  />
        </>

    )
}