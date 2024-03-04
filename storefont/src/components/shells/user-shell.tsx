"use client"

import * as React from "react"
import Link from "next/link"
import {MoreVertical} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTable} from "@/components/common/data-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {fallbackImg} from "@/constants/fallbackImg";
import {Checkbox} from "@/components/ui/checkbox"
import {usePathname} from "next/navigation";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {useGetCustomers} from "@/actions/queries/customers";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function UserTableShell() {
    const {data, isPending} = useGetCustomers()
    const [_, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const pathname = usePathname();
    const profile: any = {};
    const deleteUser = () => { }

    // Memoize the columns so they don't re-render on every render
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
                            setSelectedRowIds((prev:any) =>
                                prev.length === data?.length ? [] : data?.map((row) => row.id)
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
                accessorKey: "image",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Image"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    const images = row.original.images ? row.original.images[0] : fallbackImg;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                <img src={images}
                                     className="w-12 h-12"

                                />
                            </Link>
                        </div>
                    )
                },
                maxSize:50
            },
            {
                accessorKey: "username",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("username")}
                            </Link>
                        </div>
                    )
                },
            },

            {
                accessorKey: "email",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="email"/>
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("email")}</div>,
            },
            {
                accessorKey: "roleId",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="Role"/>
                    )
                },
                cell: ({row}) =>
                    <div>{row.getValue("roleId") == "1" ? "admin" : "user"}</div>,
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) =>
                    <div>
                        {row.getValue("status")}
                    </div>,
            },
            {
                accessorKey: "createdAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Created At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                accessorKey: "updatedAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="updated At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label="Open menu"
                                variant="ghost"
                            >
                                <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>
                                <Link
                                    href={`/admin/users/${row.original.id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {(profile?.user?.id != row.original.id) && (
                                <>

                                    <DropdownMenuItem
                                        onClick={() => {
                                            startTransition(() => {
                                                row.toggleSelected(false)
                                                // @ts-ignore
                                                toast.promise((deleteUser({id: row.original.id})),
                                                    {
                                                        loading: "Deleting...",
                                                        success: () => "Product deleted successfully.",
                                                        error: (err: unknown) => catchError(err),
                                                    }
                                                )

                                            })
                                        }}
                                        disabled={isPending}
                                    >
                                        Delete
                                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [data, isPending,_]
    )







    return (
        <>
            {!isPending &&  data ? (

                <DataTableRaw columns={columns} data={data} showToolbar={true}
                              searchableColumns={[
                                  {
                                      id: "username",
                                      title: "username",
                                  },
                              ]}
                              newRowLink={`${pathname}/create`}
                />
            ):(
                <>Loading.....</>
            )}

        </>
    )
}
