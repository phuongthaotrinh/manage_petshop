"use client"

import * as React from "react"
import Link from "next/link"
import {CopyIcon, EditIcon, MoreVertical, ScreenShareOffIcon, Trash} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {Checkbox} from "@/components/ui/checkbox"
import {usePathname} from "next/navigation";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {useGetListProduct} from "@/actions/queries/products";
import {useGetBrands} from "@/actions/queries/brand&categories";

interface ProductsTableShellProps {
    mode: 'draft' | 'published'
}

export function ProductTableShell({mode}:ProductsTableShellProps ) {
    const {data: raw, isPending:_,isError} = useGetListProduct();
    const {data: brands, isPending:brandSpin} = useGetBrands()
    const data = React.useMemo(() => {
        return raw?.filter((i:any) => i?.status === mode)
    },[raw,mode])

    console.log("mode", mode);
    console.log("data", data)

    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const pathname = usePathname();

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
                accessorKey: "category_ids",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Categories"/>
                ),
                cell: ({row}) => {
                        const cate =row.original.categories as any[]
                    return (
                        <>
                            {cate && cate?.map((i, j) => (
                                <p key={j}>
                                    {i?.name}
                                </p>
                            ))}
                        </>
                    )
                },
            },
            {
                accessorKey: "brand_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Brand"/>
                ),
                cell: ({row}) => {
                    return (
                        <>
                           <span> {row.original.brand?.name}     </span>
                            <img src={row.original.brand?.images} alt={row.original.brand?.name} className="max-w-10"/>
                        </>
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
        [data, isPending, mode]
    )

    function deleteSelectedRows() {

    }


    return (
        <>
            {data && !brandSpin && (
                <DataTableRaw
                    showToolbar={true}
                    columns={columns}
                    data={data}
                    searchableColumns={[
                        {
                            id: "title",
                            title: "title",
                        },
                    ]}
                    newRowLink={`${pathname}/create`}
                    deleteRowsAction={() => void deleteSelectedRows()}
                />
            )}


        </>
    )
}
