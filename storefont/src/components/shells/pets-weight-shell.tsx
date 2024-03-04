"use client"

import * as React from "react"
import {type ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {toast} from "react-hot-toast";
import { useGetPetWeight, useCreatePetWeightDefault} from "@/actions/queries/services";
import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {catchError} from "@/lib/helpers";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {weights} from "@/constants/data"

export  function PetsWeightShell() {
    const { data, isPending } = useGetPetWeight();
    const { mutateAsync:createFn } = useCreatePetWeightDefault();
    const [open, setOpen] = React.useState(false)
    const [_, startTransition] = React.useTransition()

    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    return <> {row.getValue("name")}   </>
                },
            },
            {
                accessorKey: "value",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="value"/>
                ),
                cell: ({row}) => {
                    return <> {row.getValue("name")}   </>
                },
            },

        ],
        [data, isPending,_]
    )

    return (
        <>
            {isPending ? (
                <DataTableSkeleton columnCount={6} />
            ):(
                <>
                    {data && (
                        <DataTableRaw columns={columns} data={data} showToolbar={true}
                                      searchableColumns={[
                                          {
                                              id: "name",
                                              title: "name",
                                          },
                                      ]}
                                      newRowAction={() => {
                                          if(data?.length > 0){
                                              toast('Nothing to generate!', {
                                                  icon: '👏',
                                              });
                                          }else{
                                              setOpen(true)
                                          }
                                      }}
                        />
                    )}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>New Pet Weight</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-72">
                                <div className="divide-y divide-blue-200 divide-dashed space-y-2">
                                    {weights?.map((item) => <div key={item?.value}>{item.name}</div> )}
                                </div>
                            </ScrollArea>
                            <DialogFooter>
                                <Button type="submit" onClick={() => {
                                    startTransition(() => {
                                        toast.promise((createFn(weights)),{
                                            loading:"Creating...",
                                            success: () => {
                                                setOpen(false)
                                                return "Creat success"
                                            },
                                            error:(err) => catchError(err)
                                        })
                                    })
                                }}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </>
            )}
        </>
    )
}
