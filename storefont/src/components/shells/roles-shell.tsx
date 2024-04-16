"use client";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"
import {useDeleteRole, useGetListRoles} from "@/actions/queries/role&permissions";
import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {Trash, Edit} from "lucide-react";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import NewsSkeLoading from "@/components/skeletons/news-ske";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {toast} from "react-hot-toast"


export function RoleTemplate () {
    const pathname = usePathname();
    const router = useRouter();

    const {data,status}  =useGetListRoles();
    const {mutateAsync, status:delStt}=useDeleteRole()

    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])


    const handleDelete = (id:any) => {
        toast.promise((mutateAsync(id)), {
            loading: "Deleting",
            success:"Delete success",
            error: "Delete fail"
        })
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
                            setSelectedRowIds((prev) =>
                                prev.length === data.length ? [] : data.map((row:any) => row.id)
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
                    return (
                        <div className="flex gap-3 items-center">
                            {row.original.name}
                        </div>
                    )
                },
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className="flex items-center gap-3">
                        <Button  variant="link" onClick={() => router.push(`${pathname}/${row.original.id}`)}>
                            <Edit  className="w-4 h-4 mr-2"/>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="link">
                                    <Trash className="w-4 h-4 mr-2"/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(row.original.id)}>OK</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ),
            },
        ],
        [data, status]
    )



    return (
        <>
            {status === "success" && (
                <DataTableRaw columns={columns} data={data} showToolbar={true}
                              newRowLink={`${pathname}/create`}
                                searchableColumns={[
                                    {
                                        id: "name",
                                        title: "Name"
                                    }
                                ]}
                />
            )}
            {status === "error" && (
                <>Something went wrong</>
            )}
            {status === "pending" && (
                <NewsSkeLoading />
            )}
        </>
    )
}