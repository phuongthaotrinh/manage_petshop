'use client';
import * as React from "react"
import Link from "next/link";
import {type ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {Checkbox} from "@/components/ui/checkbox"
import {usePathname, useRouter} from "next/navigation";
import {DataTableRaw} from "@/components/common/data-table/table-raw";

import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {useDelDiscount, useGetDiscounts} from "@/actions/queries/discount";
import {Switch} from "@/components/ui/switch";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {PencilRuler, TableIcon, Trash} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";



export function DiscountShell () {
    const {data, isPending} = useGetDiscounts();
    const {mutateAsync:deleteFn} = useDelDiscount()
    const pathname  = usePathname();
    const route = useRouter();
    const [_, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);
                            //@ts-ignore
                            setSelectedRowIds((prev) =>
                                prev.length === data?.length ? [] : data?.map((row: { _id: any }) => row._id)
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "code",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Code"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <div className="truncate">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("code")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "condition_option",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Option"/>
                ),
                cell: ({row}) => <p>{row.original.condition_option}</p>,
            },
            {
                accessorKey: "usage_limit",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Quantity"/>
                ),
                cell: ({row}) => <p>{!row.original.usage_limit?.status ? "unlimited": `${row.original.usage_limit?.quantity}`}</p>,
            },
            {
                accessorKey: "usage_count",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Usaged"/>
                ),
                cell: ({row}) => <p>{row.original.usage_count}</p>,
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className="space-x-5">
                        <AlertDialog>
                            <AlertDialogTrigger disabled={isPending}>
                                <Trash className="w-4 h-4" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this record?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your pets
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isPending} >Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        disabled={isPending}
                                        onClick={() =>{
                                            startTransition(() => {
                                                toast.promise((deleteFn(row.original._id)),{
                                                    loading:"Deleting...",
                                                    success:() => "Delete sucess",
                                                    error:(e) => catchError(e)
                                                })
                                            })
                                        }}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                ),
            },

        ],
        [data, isPending,_]
    )


    return (

            <>
                {isPending  ? (
                    <DataTableSkeleton columnCount={6} />
                ):(
                    <>
                        {data && (
                            <DataTableRaw columns={columns} data={data} showToolbar={true}
                                          searchableColumns={[
                                              {
                                                  id: "code",
                                                  title: "code",
                                              },
                                          ]}
                                          newRowLink={`${pathname}/create`}

                            />
                        )}
                    </>
                )}
            </>
    )
}