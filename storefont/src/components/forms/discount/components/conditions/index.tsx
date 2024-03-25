'use client';

import * as React from "react";
import {Button} from "@/components/ui/button"
import {PlusIcon} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {ArrowRight} from "lucide-react";
import {clsx} from "clsx"
import { AnimatePresence } from "framer-motion";
import FormWrapper from "@/components/forms/discount/components/form-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area"
import {useGetListProduct} from "@/actions/queries/products";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {DataTableRaw} from "@/components/common/data-table/table-raw";

interface ConditionsProps  {
    updateData:(value:any) => void;
    formState:any
}
export function Conditions ({updateData,formState}:ConditionsProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [goValue, setGoValue] = React.useState<string | null>(null)
    const [selectedRowIds, setSelectedRowIds] = React.useState<any[]>([])


    const saveOptionValue = () => {
        const payload = {
            condition_option: goValue,
            condition_data:selectedRowIds
        }
        updateData(payload);
        setGoValue(null);
        setOpen(false)
    }
    const cancelOption = () => {
        const payload = {
            condition_option: null,
            condition_data:[]
        }
        setOpen(false);
        setGoValue(null);
        updateData(payload)
    }


    return (
        <>
            <AnimatePresence mode="wait">
                <div id="btn_action">
                    <Button
                        onClick={() => {   setOpen(true) }}
                        variant="grey" className="w-full"
                        type="button"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Condition
                    </Button>
                </div>
                <Dialog open={open} onOpenChange={() => {setOpen(!open); setGoValue(null)}}>
                    <FormWrapper>
                        <DialogContent className="w-full  min-w-[750px]">
                            {goValue ? (
                                    <ScrollArea className="h-96 ">
                                        <div className="sticky top-0 bg-gray-100 p-2 uppercase">
                                            {goValue}
                                        </div>
                                        <div className="relative h-[40rem] z-20">
                                            <OptionValueComponent
                                                data={goValue}
                                                setSelectedRowIds={setSelectedRowIds}
                                                selectedRowIds={selectedRowIds}
                                                formState={formState}
                                            />
                                        </div>

                                        <div className="flex items-center justify-end sticky bottom-0 z-30">
                                            <Button variant="link" onClick={() => cancelOption()}>cancel</Button>
                                            <Button variant="orange" onClick={() => saveOptionValue()}>Save</Button>
                                        </div>
                                    </ScrollArea>


                            ):(
                               <>
                                   <DialogHeader className="h-20">
                                       <DialogTitle className="text-xl">Add Conditions</DialogTitle>
                                       <DialogDescription>
                                           Choose a condition type
                                       </DialogDescription>
                                   </DialogHeader>

                                   {conditions?.map((i, j) => (
                                       <ConditionItem formState={formState}  key={j} data={i} setGoValue={setGoValue} goValue={goValue} />
                                   ))}
                                   <DialogFooter className="sm:justify-start">
                                       <DialogClose asChild>
                                           <Button type="button" variant="secondary">
                                               Close
                                           </Button>
                                       </DialogClose>
                                   </DialogFooter>
                               </>
                            )}

                        </DialogContent>

                    </FormWrapper>
                </Dialog>

            </AnimatePresence>

        </>
    )
}


const ConditionItem = ({data, setGoValue, goValue,formState}:{data:{value: string, name: string, desc: string}, setGoValue:any, goValue:any,formState:any}) => {

    return (
        <>
            <div className={clsx("p-5 border rounded-sm cursor-pointer" ,{
                'border border-dreamOrange' : data?.value === (formState?.condition_option || goValue)
            })}
                 onClick={() => setGoValue(data?.value)}
            >
                <div className="flex justify-between">
                    <div>
                        <h3>{data?.name}</h3>
                        <small>{data?.desc}</small>
                    </div>
                    <Button variant="link" onClick={() => setGoValue(data?.value)}>
                        <ArrowRight className="w-4 h-4"/>
                    </Button>
                </div>
            </div>




        </>
    )
}




const conditions = [
    { value:'products', name: 'Product', desc:"Only for specific products "},
    { value:'customer_group', name: 'Customer group', desc:"Only for specific customer group "},
    { value:'services', name: 'Service', desc:"Only for specific services"},

];

const OptionValueComponent = ({data,setSelectedRowIds,selectedRowIds,formState}:{data:string,formState:any,selectedRowIds:any[],setSelectedRowIds:React.Dispatch<React.SetStateAction<any[]>>}) => {
    const {data:products,isPending} = useGetListProduct();

    const productColumn = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => {

                    return (
                        <Checkbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(value) => {
                                table.toggleAllPageRowsSelected(!!value);
                                setSelectedRowIds((prev) =>
                                    prev.length === products.length ? [] : products.map((row:any) => row._id)
                                )
                            }}
                            aria-label="Select all"
                            className="translate-y-[2px]"
                        />
                    )
                },
                cell: ({row}) => {
                    const checkChecked = formState?.condition_data?.some((i:any) => i?.includes(row.original?._id))
                  return  (
                        <Checkbox
                            checked={row.getIsSelected() || checkChecked}
                            onCheckedChange={(value) => {
                                row.toggleSelected(!!value)
                                setSelectedRowIds((prev) =>
                                    value
                                        ? [...prev, row.original._id]
                                        : prev.filter((id) => id !== row.original._id)
                                )
                            }}
                            aria-label="Select row"
                            className="translate-y-[2px]"
                        />
                    )
                },
                enableSorting: false,
                enableHiding: false,
            },

            {
                accessorKey: "title",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const url = row.original.thumbnail
                    return (
                        <div className="flex gap-3 items-center">
                            <img src={url}
                                 className="w-12 h-12"

                            />
                            {row.original.title}
                        </div>
                    )
                },
            },

        ],
        [products,isPending]
    )
    return (
        <>
            {data === "products" && (<>
               <div className='w-full p-2'>
                   <DataTableRaw
                       showToolbar={false}
                       columns={productColumn}
                       data={products ? products : []}
                       searchableColumns={[
                           {
                               id: "title",
                               title: "title",
                           },
                       ]}


                   />
               </div>


            </>)}
            {data === "customer_group" && (<>Load data of customer_group</>)}
            {data === "services" && (<>Load data of services</>)}

        </>
    )
}