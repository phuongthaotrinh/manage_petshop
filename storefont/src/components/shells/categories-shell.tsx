"use client"

import * as React from "react"
import Link from "next/link"
import {Trash, PencilRuler, TableIcon} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {Checkbox} from "@/components/ui/checkbox"
import {usePathname, useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {toast} from "react-hot-toast";
import {useGetPets, useUpdatePets, useDeletePet, useCreatePets} from "@/actions/queries/services";
import {Switch} from '@/components/ui/switch'
import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {catchError} from "@/lib/helpers";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Icons} from "@/components/common/icon";
import {brandValidType,defaultBrand, formSchema} from "@/validations/brands"
import {BrandForms} from "@/components/forms/brand-form";
import {useCreateBrand, useGetBrands, useGetCategories} from "@/actions/queries/brand&categories";
import {Brands} from "@/types/brand";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Shell} from "@/components/shells/shell";

export  function CategoriesShell() {
    const pathname  = usePathname();
    const route = useRouter()
    const {data, isPending } = useGetCategories();

    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

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
                                prev.length === data?.length ? [] : data?.map((row: { id: any }) => row.id)
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
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <div className="truncate">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "desc",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Desc"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <div className="truncate">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("desc")}
                            </Link>
                        </div>
                    )
                },
            },

            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) =>
                {
                    const stt = row.getValue("status")
                    return <div>
                        <Badge variant={stt == true ? "green" : "destructive"}>
                            {stt == true ? "active" : "unactive"}
                        </Badge>
                    </div>
                },
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
                                            // startTransition(() => {
                                            //     toast.promise((deleteFn({petId:row.original.id})),{
                                            //         loading:"Deleting...",
                                            //         success:() => "Delete sucess",
                                            //         error:(e) => catchError(e)
                                            //     })
                                            // })
                                        }}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => route.push(`${pathname}/${row.original.id}`)}>
                                        <PencilRuler className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent asChild>
                                    <div>Edit Pet</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>


                    </div>
                ),
            },
        ],
        [data, isPending,]
    )

    return (
        <>
            {isPending  ? (
                <DataTableSkeleton columnCount={6} />
            ):(
                < >
                    {data && (
                        <DataTableRaw columns={columns} data={data} showToolbar={true}
                                      searchableColumns={[
                                          {
                                              id: "name",
                                              title: "category name",
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
