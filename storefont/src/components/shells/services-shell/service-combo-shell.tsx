"use client";

import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useGetAllServicesCombo, useGetPets} from "@/actions/queries/services";
import {usePathname, useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowRight, Check, Edit, Eye, Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Icons} from "@/components/common/icon";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {toast} from "react-hot-toast";
import {Separator} from "@/components/ui/separator";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {formatPrice} from "@/lib/helpers";

import {CardContent} from "@/components/ui/card";





export function ServiceComboShell() {
    const {data, isPending} = useGetAllServicesCombo();
    // const {data:pets, isPending:petSpin} = useGetPets()
     const [_, startTransition] = React.useTransition();
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const pathname = usePathname()
    const router = useRouter()
    const id = React.useId();


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
                                // @ts-ignore
                                prev.length === data?.length ? [] : data.map((row) => Number(row.id))
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
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/combo?v=${id}`}>
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
                    return (
                       <>{row.original.desc}</>
                    )
                },
            },
            {
                accessorKey: "price",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Price"/>
                ),
                cell: ({row}) => {
                    return (
                        <>{formatPrice(row.original.price)}</>
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
                accessorKey: "comboData",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="Service in"/>
                    )
                },
                enableSorting: false,
                cell: ({row}) =>
                {
                    return <div>
                        <HoverCard>
                            <HoverCardTrigger className="cursor-pointer"><Eye /></HoverCardTrigger>
                            <HoverCardContent className="w-full">
                                <div className="grid grid-cols-3  gap-3">
                                    {row.original.comboData?.map((i:any, j:any) => (
                                        <div key={j}>
                                            <div className="grid gap-4 p-3 rounded-md cursor-pointer border border-orange-500"
                                                 key={j}
                                            >
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {i?.serviceId?.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {i?.serviceId?.desc}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                },
            },
            {
                id: "actions",
                cell: ({row}) => {
                    const comboData = row.original.comboData
                    return (
                        <div className={"flex items-center gap-3"}>

                            <Button variant="link" onClick={() => {
                                startTransition(() => {
                                    router.push(`${pathname}/combo?v=${row.original._id}`)
                                })
                            }}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>

                        </div>
                    )
                },
            },
        ],
        [data, isPending,_]
    );



    return (
        <>
            {!isPending && data ? (
                <>
                    <DataTableRaw
                        columns={columns}
                        data={data?.map((i, j) => {
                            return i.combo
                        })}

                        showToolbar={true}
                        searchableColumns={[
                            {
                                id: "name",
                                title: "combo",
                            },
                        ]}
                        newRowLink={`${pathname}/combo?v=create`}
                        // deleteRowsAction={() => void deleteItem()}
                    />
                </>
            ):(
                <>Loadingg...</>
            )}
        </>
    )
}