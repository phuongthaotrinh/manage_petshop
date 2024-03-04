"use client"

import * as React from "react"
import Link from "next/link"
import {CopyIcon, EditIcon, MoreVertical, ScreenShareOffIcon, Trash} from "lucide-react"
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

interface ProductsTableShellProps {
    data: any[]
}

export function ProductTableShell({
                                   data
                               }: ProductsTableShellProps) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const pathname = usePathname();

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
                            setSelectedRowIds((prev) =>
                                prev.length === data.length ? [] : data.map((row) => row.id)
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
            {
                accessorKey: "collection_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Collection"/>
                ),
                cell: ({row}) => {
                    const url = row.original.thumbnail
                    return (
                        <div >
                            {row.original.collection ? row.original.collection?.title : '-'}
                        </div>
                    )
                },
            },
            {
                id: "subtitle",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Inventory"/>
                ),
                cell: ({row}) => {
                    const randomQuanty = Math.floor(Math.random() * 10) + 1
                    return (
                        <div >

                            {randomQuanty} in stock for {randomQuanty} variant(s)
                        </div>
                    )
                },
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
                               <EditIcon  className="w-4 h-4 mr-2"/>Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ScreenShareOffIcon   className="w-4 h-4 mr-2"/>Unpublish
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CopyIcon   className="w-4 h-4 mr-2"/>Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <Trash   className="w-4 h-4 mr-2"/>Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [data, isPending]
    )

    function deleteSelectedRows() {

    }

    const userStatus = [
        {
            label: 'active',
            value: '0'
        },
        {
            label: 'block',
            value: '1'
        }
    ]
    return (
        <>
            {data && (
                <DataTableRaw
                    showToolbar={true}
                    columns={columns}
                    data={data}
                    searchableColumns={[
                        {
                            id: "name",
                            title: "name",
                        },
                    ]}
                    filterableColumns={[
                        {
                            id: "block",
                            title: "status",
                            options: userStatus.map((category) => ({
                                label: category.label,
                                value: category.value,
                            })),
                        },
                    ]}
                    newRowLink={`${pathname}/create`}
                    deleteRowsAction={() => void deleteSelectedRows()}
                />
            )}


        </>
    )
}
