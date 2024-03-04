"use client"

import * as React from "react"
import Link from "next/link"
import {MoreVertical} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {fallbackImg} from "@/constants/fallbackImg";
import {Checkbox} from "@/components/ui/checkbox"
import {usePathname} from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {toast} from "react-hot-toast";
import { useGetPosts } from "@/actions/queries/news";
import { useDeletePost } from "@/actions/queries/news";

import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {catchError} from "@/lib/helpers";
import Image from "next/image";

export  function NewsShell() {
    const { data, isLoading:isPending, isError, isFetching } = useGetPosts();
    const { mutateAsync: deletePost } = useDeletePost();
    const [_, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const pathname  = usePathname();

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
                                prev.length === data.length ? [] : data.map((row: { id: any }) => row.id)
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
                accessorKey: "images",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Image"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    const images = row.original.images[0] ? row.original.images[0] : fallbackImg;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                <Image src={images}
                                       alt={row?.original?.name}
                                       width={50}
                                       height={50}
                                />
                            </Link>
                        </div>
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
                        <div className="lowercase truncate ">
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
                accessorKey: "tags",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="tags"/>
                    )
                },
                cell: ({row}) =>
                {
                    const tags = row.getValue("tags") ? row.getValue("tags") as string[] : [] ;
                    return <div className="">

                            {tags && tags.map((item:any, index:number) => ( <Badge variant="outline" key={index} className="mx-1"> {item.value} </Badge>))}


                    </div>
                },
                size:250
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
                                    href={`${pathname}/${row.original._id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    onClick={() =>{
                                        startTransition(() => {
                                            toast.promise((deletePost({postId:row.original.id})),{
                                                loading:"Deleting...",
                                                success:() => "Delete sucess",
                                                error:(e) => catchError(e)
                                            })
                                        })
                                    }}
                                    disabled={isPending}
                                >
                                    Delete
                                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [data, isPending]
    )

    const deleteSelectedRowIds = () => {
        startTransition(() => {
            toast.promise(
                Promise.all(selectedRowIds.map((item) => {
                    deletePost({postId:item.toString()})
                })),{
                    loading:"Deleting...",
                    success: "Deleting success",
                    error:(err) => catchError(err)
                }
            )
        })
    }
    return (
       <>
           {isPending ? (
               <DataTableSkeleton columnCount={6} />
           ):(
               <DataTableRaw columns={columns} data={data} showToolbar={true}
                     searchableColumns={[
                           {
                               id: "name",
                               title: "name",
                           },
                     ]}
                     newRowLink={`${pathname}/create`}
                             deleteRowsAction={() => void deleteSelectedRowIds()}
               />
           )}
       </>
    )
}
