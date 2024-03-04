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
import {petsValidType, formSchema, defaultPets,petsEditValidType} from "@/validations/pets"
import {PetsForms} from "@/components/forms/pets-forms";

export  function PetsShell() {
    const pathname  = usePathname();
    const route = useRouter()
    const { data, isPending } = useGetPets();
    const { mutateAsync:updateFn } = useUpdatePets();
    const { mutateAsync:deleteFn } = useDeletePet();
    const { mutateAsync:createFn } = useCreatePets();
    const [open, setOpen] = React.useState(false)

    const [formState, setFormState] = React.useState<petsEditValidType | null>(null)
    const [_, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [isCreateMode, setIsCreateMode] = React.useState(true)

    const form = useForm<petsValidType | petsEditValidType>({
        resolver: zodResolver(formSchema),
        defaultValues: formState !== null ? formState : defaultPets,
        values: formState !== null ? formState : defaultPets,
    })

    const deleteSelectedRowIds = () => {
        startTransition(() => {
            toast.promise(
                Promise.all(selectedRowIds.map((item) => {
                    deleteFn({petId:item.toString()})
                })),{
                    loading:"Deleting...",
                    success: "Deleting success",
                    error:(err) => catchError(err)
                }
            )
        })
    }

    function onSubmit(values: any) {
        if(isCreateMode) {
            startTransition(() => {
                toast.promise((createFn(values)),{
                    loading:"Deleting...",
                    success: () => {
                        form.reset();
                        setOpen(false)
                        return "Deleting success"
                    },
                    error:(err) => catchError(err)
                })
            })
        }else{
            startTransition(() => {
                toast.promise((updateFn({
                    ...values,
                    _id: formState?._id
                })),{
                    loading:"Updating...",
                    success: () => {
                        form.reset();
                        setOpen(!open);
                        setFormState(null);
                        setIsCreateMode(true)
                        return "Update success"
                    },
                    error:(err) => catchError(err)
                })
            })
        }

    }

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
                accessorKey: "icon",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Image"/>
                ),
                cell: ({row}) => {
                    //@ts-ignore
                    const IconRender = row.original.icon && Icons[row.original.icon]
                    return (
                        <>
                            {IconRender && <IconRender className="w-4 h-4 mr-2" />}
                        </>
                    )
                },
                maxSize:50
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
                        <Switch
                            checked={row?.original.status}
                            onCheckedChange={(w) => {
                                startTransition(() => {
                                    toast.promise(updateFn({
                                        _id: row.original.id,
                                        status: w
                                    }), {
                                        loading: "Loading...",
                                        success:"Change status success",
                                        error: (err) => catchError(err)
                                    })
                                })
                            }}
                        />

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
                                                toast.promise((deleteFn({petId:row.original.id})),{
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
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger asChild>
                                    <Button  variant="outline" size="icon" onClick={() => {
                                        setOpen(true);
                                        setFormState({
                                            icon: row.original.icon,
                                            status: row.original.status,
                                            name: row.original.name,
                                            _id:  row.original.id
                                        })
                                        setIsCreateMode(false)
                                    }}>
                                        <PencilRuler className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent asChild>
                                    <div>Edit Pet</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => route.push(`${pathname}/${row.original.id}`)}>
                                        <TableIcon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent asChild>
                                    <div>List service of pet</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

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
                    <Dialog open={open} onOpenChange={() => {
                        setOpen(!open);
                        form.reset();
                        setFormState(null);
                        setIsCreateMode(true)
                    }}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{isCreateMode ? 'Create' : 'Update'} Pet</DialogTitle>
                            </DialogHeader>
                               <PetsForms form={form} onSubmit={onSubmit} />
                        </DialogContent>
                    </Dialog>

                    {data && (
                        <DataTableRaw columns={columns} data={data} showToolbar={true}
                                      searchableColumns={[
                                          {
                                              id: "name",
                                              title: "name",
                                          },
                                      ]}
                                      newRowAction={() => setOpen(true)}
                                      deleteRowsAction={() => void deleteSelectedRowIds()}
                        />
                    )}
                </>
            )}
        </>
    )
}
