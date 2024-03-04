'use client'

import * as React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {Form,FormField, FormItem, FormControl, FormLabel, FormMessage} from "@/components/ui/form"
import {
    useGetAllServices,
    useGetDetailServicesCombo,
    useGetAllServiceOfAllPets,
    useGetPetWeight
} from "@/actions/queries/services";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {startTransition, useEffect} from "react";
import {toast} from "react-hot-toast";
import {formSchema, defaultValue} from "@/validations/service-combo"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useCreateServicesCombo} from "@/actions/queries/services"
import {catchError, formatPrice, setValuesOfForm} from "@/lib/helpers";
import {useParams, useSearchParams, usePathname} from "next/navigation";
import {ServiceOfPetPriceTable} from "@/components/admin/services/service-of-pet-price";

export function CreateComboTemplate () {
    let searchParams = useSearchParams()
    const {data:services, isPending} = useGetAllServices();
    const {data} = useGetDetailServicesCombo(searchParams.get("v")!.toString());
    const {data:allServiceOfAllPets, isPending:allServicePetsSpin} = useGetAllServiceOfAllPets()
    const {data:weights, isPending:weightSpin} = useGetPetWeight();

    const [selectedId, setSelectedId]  = React.useState<any[]>([])
    const {mutateAsync:createFn} = useCreateServicesCombo()
    const [isCreateMode,setIsCreateMode ] = React.useState<boolean>(false)
    console.log("allServiceOfAllPets", allServiceOfAllPets)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue
    });


    React.useEffect(() => {
        if(searchParams.get('v') == "create"){
            setIsCreateMode(true)
        }
    },[searchParams]);

    React.useEffect(() => {
        if(data && !isCreateMode){
            setValuesOfForm(data, form);
            setSelectedId(data?.comboData?.map((i) => i.serviceId))
        }
    },[data,isCreateMode]);

    useEffect(() => {
        if(!allServicePetsSpin && allServiceOfAllPets && selectedId){

        }
    }, [allServicePetsSpin, allServiceOfAllPets,selectedId]);


    const onSubmit = (value:any) => {
        if(isCreateMode){
            value.serviceData = selectedId?.map((i) => i?._id);
            // startTransition(() => {
            //     toast.promise(createFn(value), {
            //         loading:"Creating...",
            //         success:() => {
            //             form.reset();
            //             setSelectedId([]);
            //             return "Create combo success"
            //         },
            //         error:(err) => catchError(err)
            //     })
            // })

            console.log("create combo", value)
        }else{
            value._id = searchParams.get("v");
            value.serviceData = selectedId?.map((i) => i?._id);
            toast('edit');
            console.log("edit", value)
        }
    }

    return (
        <>

            <div className="container space-y-3">
                <section>
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="min-h-[200px]  rounded-lg border"
                    >
                        <ResizablePanel defaultSize={60}>
                            <p className="font-bold px-2 text-orange-500">Services:</p>
                            <div className="flex h-full items-center justify-center p-6">
                                <section className="grid grid-cols-3 grid-flow-row gap-3 cursor-pointer">
                                    {services && services?.map((i, j) => (
                                        <div key={j} className="p-3 border border-slate-300 rounded-lg"
                                             onClick={() => {
                                                 const checkExist = selectedId.find((ii) => ii._id === i._id);
                                                 if(!checkExist)  setSelectedId([...selectedId, i])
                                             }}
                                        >
                                            {i?.name}
                                        </div>
                                    ))}
                                </section>
                            </div>

                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={40}>
                            <p className="font-bold px-2 text-orange-500">Selected services:</p>
                            <div className="relative flex h-full items-center justify-center p-6">

                                <div className="font-semibold grid grid-cols-3 gap-3">
                                    {selectedId?.map((i, j) => (
                                        <div key={j} className=" p-3 relative border border-slate-300 rounded-lg"
                                        >
                                            {i?.name}
                                            <button className="absolute -top-1 -right-1 bg-slate-200 w-4 h-4 rounded-full after:content-['x'] after:text-red-600 after:relative after:-top-1" onClick={() => {
                                                const remove = selectedId?.filter((item) => item._id !== i?._id);
                                                setSelectedId(remove)
                                            }}></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </section>
                <div>
                    {selectedId.length > 0 && (
                        <div className="flex flex-col gap-6">
                            {allServiceOfAllPets && allServiceOfAllPets?.map((i:any,j:any) => {
                                selectedId?.map((ii, jj) => {
                                    Object.keys(i.data).forEach(key => {
                                        return (
                                            <div key={j} className="border min-h-80">
                                                {i?.petId?.name}
                                            </div>
                                        )
                                    });

                                })
                            })}

                        </div>

                    )}
                </div>
                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tên combo </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tên combo" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="desc"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Desc</FormLabel>
                                    <FormControl>
                                        <Textarea  placeholder="Mô tả sản phẩm" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter price"
                                                type="number"
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Status</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>

                    </form>
                </Form>
            </div>


        </>
    )
}