'use client';

import * as React from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useGetScheduleList} from "@/actions/queries/schedule";

import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {PencilRuler, Trash} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

import {usePathname, useRouter} from "next/navigation";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {useGetAllServices} from "@/actions/queries/services";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

export function ScheduleShellTemplate() {
    const {data,isPending}  = useGetScheduleList();
    const {data:services, isPending: serviceStt} = useGetAllServices();
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

    const pathname = usePathname();
    const route = useRouter();





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
                accessorKey: "customer_mail",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Mail"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <> {row.getValue("customer_mail")}  </>
                    )
                },
            },
            {
                accessorKey: "customer_phoneNumber",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Phone"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <> {row.getValue("customer_phoneNumber")}  </>
                    )
                },
            },
            {
                accessorKey: "serviceData",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Service"/>
                ),
                cell: ({row}) => {
                    return (
                        <> <b>{row.original.pet_id.name}</b> / {row.original.serviceData.name}  </>
                    )
                },
            },
            {
                accessorKey: "services",
                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id))
                },
                header: "services",
                enableHiding: true
            },
            {
                accessorKey: "customer_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Customer | Guest"/>
                ),
                cell: ({row}) => {
                    return (
                        <Badge> {!row.original.customer_id ? "guest" : "customer"}</Badge>
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
                cell: ({row}) =><> {row.original.status} </>
            },

            {
                id: "actions",
                cell: ({row}) => (
                    <div className="space-x-5">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <DotsHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(row.original.id)}
                                >
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View customer</DropdownMenuItem>
                                <DropdownMenuItem>View payment details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                ),
            },
        ],
        [data, isPending]
    )





    return (
        <>
            <div className=" h-screen p-5 rounded-md">
                {data && !isPending ? (
                    <>
                        <DataTableRaw
                            columns={columns}
                            data={data}
                            showToolbar={true}
                            searchableColumns={[
                                {
                                    id: "customer_phoneNumber",
                                    title: "Customer phone"
                                },
                                {
                                    id: "customer_mail",
                                    title: "Customer email"
                                }
                            ]}
                            filterableColumns={[
                                {
                                    id: "services",
                                    title: "Services",
                                    options: (services && !serviceStt && services.length > 0) ?
                                        services?.map((i) => {
                                            return {
                                                value: i?._id.toString(),
                                                label: i?.name,
                                            }
                                        }):[]
                                }
                            ]}

                        />
                        {/*<div className="w-full">*/}
                        {/*    <div className="flex items-center py-4">*/}
                        {/*        <Input*/}
                        {/*            placeholder="Filter emails..."*/}
                        {/*            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}*/}
                        {/*            onChange={(event) =>*/}
                        {/*                table.getColumn("email")?.setFilterValue(event.target.value)*/}
                        {/*            }*/}
                        {/*            className="max-w-sm"*/}
                        {/*        />*/}
                        {/*        <DropdownMenu>*/}
                        {/*            <DropdownMenuTrigger asChild>*/}
                        {/*                <Button variant="outline" className="ml-auto">*/}
                        {/*                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />*/}
                        {/*                </Button>*/}
                        {/*            </DropdownMenuTrigger>*/}
                        {/*            <DropdownMenuContent align="end">*/}
                        {/*                {table*/}
                        {/*                    .getAllColumns()*/}
                        {/*                    .filter((column) => column.getCanHide())*/}
                        {/*                    .map((column) => {*/}
                        {/*                        return (*/}
                        {/*                            <DropdownMenuCheckboxItem*/}
                        {/*                                key={column.id}*/}
                        {/*                                className="capitalize"*/}
                        {/*                                checked={column.getIsVisible()}*/}
                        {/*                                onCheckedChange={(value) =>*/}
                        {/*                                    column.toggleVisibility(!!value)*/}
                        {/*                                }*/}
                        {/*                            >*/}
                        {/*                                {column.id}*/}
                        {/*                            </DropdownMenuCheckboxItem>*/}
                        {/*                        )*/}
                        {/*                    })}*/}
                        {/*            </DropdownMenuContent>*/}
                        {/*        </DropdownMenu>*/}
                        {/*    </div>*/}
                        {/*    <div className="rounded-md border">*/}
                        {/*        <Table>*/}
                        {/*            <TableHeader>*/}
                        {/*                {table.getHeaderGroups().map((headerGroup) => (*/}
                        {/*                    <TableRow key={headerGroup.id}>*/}
                        {/*                        {headerGroup.headers.map((header) => {*/}
                        {/*                            return (*/}
                        {/*                                <TableHead key={header.id}>*/}
                        {/*                                    {header.isPlaceholder*/}
                        {/*                                        ? null*/}
                        {/*                                        : flexRender(*/}
                        {/*                                            header.column.columnDef.header,*/}
                        {/*                                            header.getContext()*/}
                        {/*                                        )}*/}
                        {/*                                </TableHead>*/}
                        {/*                            )*/}
                        {/*                        })}*/}
                        {/*                    </TableRow>*/}
                        {/*                ))}*/}
                        {/*            </TableHeader>*/}
                        {/*            <TableBody>*/}
                        {/*                {table.getRowModel().rows?.length ? (*/}
                        {/*                    table.getRowModel().rows.map((row) => (*/}
                        {/*                        <TableRow*/}
                        {/*                            key={row.id}*/}
                        {/*                            data-state={row.getIsSelected() && "selected"}*/}
                        {/*                        >*/}
                        {/*                            {row.getVisibleCells().map((cell) => (*/}
                        {/*                                <TableCell key={cell.id}>*/}
                        {/*                                    {flexRender(*/}
                        {/*                                        cell.column.columnDef.cell,*/}
                        {/*                                        cell.getContext()*/}
                        {/*                                    )}*/}
                        {/*                                </TableCell>*/}
                        {/*                            ))}*/}
                        {/*                        </TableRow>*/}
                        {/*                    ))*/}
                        {/*                ) : (*/}
                        {/*                    <TableRow>*/}
                        {/*                        <TableCell*/}
                        {/*                            colSpan={columns.length}*/}
                        {/*                            className="h-24 text-center"*/}
                        {/*                        >*/}
                        {/*                            No results.*/}
                        {/*                        </TableCell>*/}
                        {/*                    </TableRow>*/}
                        {/*                )}*/}
                        {/*            </TableBody>*/}
                        {/*        </Table>*/}
                        {/*    </div>*/}
                        {/*    <div className="flex items-center justify-end space-x-2 py-4">*/}
                        {/*        <div className="flex-1 text-sm text-muted-foreground">*/}
                        {/*            {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
                        {/*            {table.getFilteredRowModel().rows.length} row(s) selected.*/}
                        {/*        </div>*/}
                        {/*        <div className="space-x-2">*/}
                        {/*            <Button*/}
                        {/*                variant="outline"*/}
                        {/*                size="sm"*/}
                        {/*                onClick={() => table.previousPage()}*/}
                        {/*                disabled={!table.getCanPreviousPage()}*/}
                        {/*            >*/}
                        {/*                Previous*/}
                        {/*            </Button>*/}
                        {/*            <Button*/}
                        {/*                variant="outline"*/}
                        {/*                size="sm"*/}
                        {/*                onClick={() => table.nextPage()}*/}
                        {/*                disabled={!table.getCanNextPage()}*/}
                        {/*            >*/}
                        {/*                Next*/}
                        {/*            </Button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </>
                ):<>Loading...</>}
                </div>
        </>
    )
}

